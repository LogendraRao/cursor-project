const { test, expect } = require('@playwright/test');

// SPPP Comprehensive Link and Consistency Test Suite
// Tests all pages, links, and identifies any remaining issues

const BASE_URL = 'https://sppp-wireframes-production.up.railway.app';

// All known pages from the website
const ALL_PAGES = {
  'Homepage': '/',
  'Infrastructure': '/infrastructure', 
  'About Profile': '/about',
  'About Leadership': '/about/leadership',
  'Services': '/services',
  'Services Training': '/services/training',
  'Resources': '/resources',
  'Resources Knowledge Base': '/resources/knowledge-base',
  'News': '/news',
  'Careers': '/careers',
  'Partnerships': '/partnerships',
  'Staff Portal': '/staff-portal',
  'Contact': '/contact'
};

// Additional pages found in previous analysis
const ADDITIONAL_PAGES = {
  'Service Consultation': '/perkhidmatan/perundingan',
  'Research': '/penyelidikan', 
  'International Services': '/perkhidmatan/antarabangsa',
  'Custom Services': '/perkhidmatan/tersuai',
  'Privacy Policy': '/undang-undang/privacy',
  'Terms': '/undang-undang/terms',
  'Accessibility': '/undang-undang/accessibility',
  'Cookies Policy': '/undang-undang/cookies',
  'SpLaSK': '/undang-undang/spLaSK'
};

let testResults = {
  pageAccessibility: [],
  linkValidation: [],
  navigationConsistency: [],
  brokenLinks: [],
  inconsistencies: [],
  summary: {}
};

test.describe('SPPP Comprehensive Link and Consistency Tests', () => {

  test('should test accessibility of all main pages', async ({ page }) => {
    console.log('🔍 Testing accessibility of all main pages...');
    
    const allPages = { ...ALL_PAGES, ...ADDITIONAL_PAGES };
    
    for (const [pageName, pageUrl] of Object.entries(allPages)) {
      try {
        console.log(`Testing: ${pageName} (${pageUrl})`);
        const response = await page.goto(BASE_URL + pageUrl, { 
          waitUntil: 'networkidle',
          timeout: 10000 
        });
        
        const pageTest = {
          page: pageName,
          url: pageUrl,
          fullUrl: BASE_URL + pageUrl,
          status: response?.status() || 'unknown',
          accessible: response?.ok() || false,
          title: '',
          h1: '',
          hasNavigation: false,
          issues: []
        };
        
        if (response?.ok()) {
          // Get page details
          pageTest.title = await page.title();
          
          const h1Element = await page.locator('h1').first();
          pageTest.h1 = await h1Element.count() > 0 ? await h1Element.textContent() : 'No H1';
          
          // Check for navigation
          const navCount = await page.locator('nav, .nav-primary, .navigation').count();
          pageTest.hasNavigation = navCount > 0;
          
          if (!pageTest.hasNavigation) {
            pageTest.issues.push('Missing navigation');
          }
          if (!pageTest.h1 || pageTest.h1 === 'No H1') {
            pageTest.issues.push('Missing H1 tag');
          }
        } else {
          pageTest.issues.push(`HTTP ${pageTest.status} error`);
        }
        
        testResults.pageAccessibility.push(pageTest);
        
        console.log(`${pageTest.accessible ? '✅' : '❌'} ${pageName} - Status: ${pageTest.status}`);
        
      } catch (error) {
        testResults.pageAccessibility.push({
          page: pageName,
          url: pageUrl,
          fullUrl: BASE_URL + pageUrl,
          status: 'ERROR',
          accessible: false,
          error: error.message,
          issues: ['Page failed to load']
        });
        console.log(`❌ ${pageName} - Error: ${error.message}`);
      }
    }
  });

  test('should validate all internal links', async ({ page }) => {
    console.log('🔗 Validating all internal links...');
    
    // Start from homepage and collect all unique internal links
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    const allLinks = await page.locator('a[href]').all();
    const internalLinks = new Set();
    
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      if (href && 
          !href.startsWith('mailto:') && 
          !href.startsWith('tel:') && 
          !href.startsWith('#') &&
          !href.startsWith('http') &&
          href !== '/') {
        // Clean up the href
        const cleanHref = href.startsWith('/') ? href : '/' + href;
        internalLinks.add(cleanHref);
      }
    }
    
    console.log(`Found ${internalLinks.size} unique internal links to test`);
    
    // Test each internal link
    for (const linkPath of Array.from(internalLinks)) {
      try {
        const fullUrl = BASE_URL + linkPath;
        const response = await page.request.get(fullUrl);
        const status = response.status();
        
        const linkTest = {
          path: linkPath,
          fullUrl: fullUrl,
          status: status,
          working: status >= 200 && status < 400,
          issues: []
        };
        
        if (!linkTest.working) {
          linkTest.issues.push(`HTTP ${status} error`);
          testResults.brokenLinks.push(linkTest);
        }
        
        testResults.linkValidation.push(linkTest);
        
        console.log(`${linkTest.working ? '✅' : '❌'} ${linkPath} - Status: ${status}`);
        
      } catch (error) {
        const linkTest = {
          path: linkPath,
          fullUrl: BASE_URL + linkPath,
          status: 'ERROR',
          working: false,
          issues: [error.message],
          error: error.message
        };
        
        testResults.linkValidation.push(linkTest);
        testResults.brokenLinks.push(linkTest);
        console.log(`❌ ${linkPath} - Error: ${error.message}`);
      }
    }
  });

  test('should check navigation consistency across all working pages', async ({ page }) => {
    console.log('🧭 Checking navigation consistency across all pages...');
    
    // Get all accessible pages
    const workingPages = testResults.pageAccessibility.filter(p => p.accessible);
    let referenceNavigation = null;
    
    for (const pageData of workingPages) {
      if (pageData.page === 'Staff Portal') continue; // Skip staff portal (different navigation)
      
      try {
        await page.goto(pageData.fullUrl, { waitUntil: 'networkidle' });
        
        const navTest = {
          page: pageData.page,
          url: pageData.url,
          navigation: [],
          navigationCount: 0,
          issues: []
        };
        
        // Get navigation items
        const navItems = await page.locator('nav a, .nav-primary a, .navigation a').all();
        
        for (const item of navItems) {
          const text = await item.textContent();
          const href = await item.getAttribute('href');
          if (text && href) {
            navTest.navigation.push({
              text: text.trim(),
              href: href
            });
          }
        }
        
        navTest.navigationCount = navTest.navigation.length;
        
        // Set first page as reference
        if (!referenceNavigation && navTest.navigationCount > 0) {
          referenceNavigation = {
            count: navTest.navigationCount,
            items: navTest.navigation.slice(0, 7) // First 7 items
          };
        }
        
        // Compare with reference
        if (referenceNavigation) {
          if (navTest.navigationCount !== referenceNavigation.count) {
            navTest.issues.push(`Navigation count mismatch: expected ${referenceNavigation.count}, got ${navTest.navigationCount}`);
          }
          
          // Check item consistency (first 7 items)
          const itemsToCheck = Math.min(7, navTest.navigation.length);
          for (let i = 0; i < itemsToCheck; i++) {
            if (referenceNavigation.items[i] && navTest.navigation[i]) {
              if (referenceNavigation.items[i].text !== navTest.navigation[i].text) {
                navTest.issues.push(`Item ${i + 1} text differs: expected '${referenceNavigation.items[i].text}', got '${navTest.navigation[i].text}'`);
              }
              if (referenceNavigation.items[i].href !== navTest.navigation[i].href) {
                navTest.issues.push(`Item ${i + 1} href differs: expected '${referenceNavigation.items[i].href}', got '${navTest.navigation[i].href}'`);
              }
            }
          }
        }
        
        testResults.navigationConsistency.push(navTest);
        
        if (navTest.issues.length > 0) {
          testResults.inconsistencies.push(navTest);
        }
        
        console.log(`${navTest.issues.length === 0 ? '✅' : '❌'} ${pageData.page} - Navigation: ${navTest.issues.length === 0 ? 'CONSISTENT' : navTest.issues.length + ' issues'}`);
        
      } catch (error) {
        console.log(`❌ Failed to test navigation for ${pageData.page}: ${error.message}`);
      }
    }
  });

  test('should check for missing or problematic pages', async ({ page }) => {
    console.log('🔍 Checking for missing or problematic pages...');
    
    const inaccessiblePages = testResults.pageAccessibility.filter(p => !p.accessible);
    const pagesWithIssues = testResults.pageAccessibility.filter(p => p.issues && p.issues.length > 0);
    
    console.log(`\n📊 Page Accessibility Summary:`);
    console.log(`   Total pages tested: ${testResults.pageAccessibility.length}`);
    console.log(`   Accessible pages: ${testResults.pageAccessibility.filter(p => p.accessible).length}`);
    console.log(`   Inaccessible pages: ${inaccessiblePages.length}`);
    console.log(`   Pages with issues: ${pagesWithIssues.length}`);
    
    if (inaccessiblePages.length > 0) {
      console.log(`\n❌ Inaccessible Pages:`);
      inaccessiblePages.forEach(page => {
        console.log(`   - ${page.page} (${page.url}): Status ${page.status}`);
      });
    }
    
    if (pagesWithIssues.length > 0) {
      console.log(`\n⚠️  Pages with Issues:`);
      pagesWithIssues.forEach(page => {
        console.log(`   - ${page.page}: ${page.issues.join(', ')}`);
      });
    }
  });

  test('should generate comprehensive test report', async ({ page }) => {
    console.log('📊 Generating comprehensive test report...');
    
    const totalPages = testResults.pageAccessibility.length;
    const accessiblePages = testResults.pageAccessibility.filter(p => p.accessible).length;
    const totalLinks = testResults.linkValidation.length;
    const brokenLinksCount = testResults.brokenLinks.length;
    const workingLinks = totalLinks - brokenLinksCount;
    const navigationInconsistencies = testResults.inconsistencies.length;
    
    testResults.summary = {
      pageAccessibility: {
        total: totalPages,
        accessible: accessiblePages,
        inaccessible: totalPages - accessiblePages,
        accessibilityRate: `${((accessiblePages / totalPages) * 100).toFixed(1)}%`
      },
      linkValidation: {
        total: totalLinks,
        working: workingLinks,
        broken: brokenLinksCount,
        successRate: `${totalLinks > 0 ? ((workingLinks / totalLinks) * 100).toFixed(1) : 0}%`
      },
      navigationConsistency: {
        pagesWithInconsistencies: navigationInconsistencies,
        consistentPages: testResults.navigationConsistency.length - navigationInconsistencies,
        consistencyRate: `${testResults.navigationConsistency.length > 0 ? (((testResults.navigationConsistency.length - navigationInconsistencies) / testResults.navigationConsistency.length) * 100).toFixed(1) : 0}%`
      },
      overallHealth: {
        score: Math.round((accessiblePages/totalPages + workingLinks/Math.max(totalLinks,1) + (testResults.navigationConsistency.length - navigationInconsistencies)/Math.max(testResults.navigationConsistency.length,1)) / 3 * 100),
        issues: testResults.brokenLinks.length + testResults.inconsistencies.length + (totalPages - accessiblePages)
      }
    };
    
    // Save comprehensive results
    const fs = require('fs');
    const reportPath = './test-results/sppp-comprehensive-test-report.json';
    
    if (!fs.existsSync('./test-results')) {
      fs.mkdirSync('./test-results', { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(testResults, null, 2));
    
    console.log('\n✅ Comprehensive test report generated:', reportPath);
    console.log('\n📈 Final Test Summary:');
    console.log(`   📄 Page Accessibility: ${testResults.summary.pageAccessibility.accessibilityRate} (${accessiblePages}/${totalPages})`);
    console.log(`   🔗 Link Success Rate: ${testResults.summary.linkValidation.successRate} (${workingLinks}/${totalLinks})`);
    console.log(`   🧭 Navigation Consistency: ${testResults.summary.navigationConsistency.consistencyRate}`);
    console.log(`   🏆 Overall Health Score: ${testResults.summary.overallHealth.score}%`);
    console.log(`   ⚠️  Total Issues Found: ${testResults.summary.overallHealth.issues}`);
    
    if (testResults.brokenLinks.length > 0) {
      console.log(`\n❌ Broken Links Found (${testResults.brokenLinks.length}):`);
      testResults.brokenLinks.forEach(link => {
        console.log(`   - ${link.path} (Status: ${link.status})`);
      });
    }
    
    if (testResults.inconsistencies.length > 0) {
      console.log(`\n❌ Navigation Inconsistencies Found (${testResults.inconsistencies.length}):`);
      testResults.inconsistencies.forEach(page => {
        console.log(`   - ${page.page}: ${page.issues.join(', ')}`);
      });
    }
    
    console.log('\n🎉 Comprehensive testing completed!');
  });
});