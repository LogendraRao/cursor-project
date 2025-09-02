const { test, expect } = require('@playwright/test');

// SPPP Header and Navigation Analysis Test Suite
// Comprehensive analysis of headers, navigation, and sitemap alignment

const BASE_URL = 'https://sppp-wireframes-production.up.railway.app';

// Main pages to analyze based on the current website structure
const MAIN_PAGES = {
  'Homepage': '/',
  'Infrastructure': '/infrastructure',
  'About Profile': '/about',
  'About Leadership': '/about/leadership', 
  'Services': '/services',
  'Resources': '/resources',
  'News': '/news',
  'Careers': '/careers',
  'Partnerships': '/partnerships',
  'Staff Portal': '/staff-portal',
  'Contact': '/contact'
};

let analysisResults = {
  headerAnalysis: [],
  navigationAnalysis: [],
  linkValidation: [],
  sitemapAlignment: {
    foundPages: [],
    missingPages: [],
    brokenLinks: [],
    inconsistentHeaders: []
  },
  summary: {}
};

test.describe('SPPP Header and Navigation Analysis', () => {
  
  test('should analyze headers across all main pages', async ({ page }) => {
    console.log('🔍 Analyzing headers across all pages...');
    
    for (const [pageName, pageUrl] of Object.entries(MAIN_PAGES)) {
      try {
        await page.goto(BASE_URL + pageUrl, { waitUntil: 'networkidle' });
        
        const headerAnalysis = {
          page: pageName,
          url: pageUrl,
          fullUrl: BASE_URL + pageUrl,
          header: {},
          issues: []
        };
        
        // Analyze header structure
        const headerElement = await page.locator('header').first();
        const headerExists = await headerElement.count() > 0;
        
        if (headerExists) {
          // Get header sections
          const headerTop = await page.locator('.header-top').count() > 0;
          const headerMain = await page.locator('.header-main').count() > 0;
          const logo = await page.locator('.logo').count() > 0;
          const navigation = await page.locator('nav').count() > 0;
          
          // Get page title
          const pageTitle = await page.title();
          const h1Element = await page.locator('h1').first();
          const h1Text = await h1Element.count() > 0 ? await h1Element.textContent() : 'No H1 found';
          
          // Get navigation items
          const navItems = await page.locator('nav a, .nav-primary a, .navigation a').all();
          const navigationLinks = [];
          
          for (const item of navItems) {
            const text = await item.textContent();
            const href = await item.getAttribute('href');
            if (text && href) {
              navigationLinks.push({ text: text.trim(), href });
            }
          }
          
          headerAnalysis.header = {
            hasHeader: headerExists,
            hasHeaderTop: headerTop,
            hasHeaderMain: headerMain,
            hasLogo: logo,
            hasNavigation: navigation,
            pageTitle,
            h1Text: h1Text?.trim() || 'No H1',
            navigationLinks: navigationLinks.slice(0, 10) // Limit to first 10 for readability
          };
          
          // Check for issues
          if (!logo) headerAnalysis.issues.push('Missing logo');
          if (!navigation) headerAnalysis.issues.push('Missing navigation');
          if (!h1Text || h1Text === 'No H1 found') headerAnalysis.issues.push('Missing or empty H1');
          if (navigationLinks.length === 0) headerAnalysis.issues.push('No navigation links found');
          
        } else {
          headerAnalysis.issues.push('No header element found');
          headerAnalysis.header = { hasHeader: false };
        }
        
        analysisResults.headerAnalysis.push(headerAnalysis);
        
        console.log(`${headerAnalysis.issues.length === 0 ? '✅' : '❌'} ${pageName} - Header analysis: ${headerAnalysis.issues.length === 0 ? 'PASS' : headerAnalysis.issues.length + ' issues'}`);
        
      } catch (error) {
        console.log(`❌ Failed to analyze header for ${pageName}: ${error.message}`);
        analysisResults.headerAnalysis.push({
          page: pageName,
          url: pageUrl,
          fullUrl: BASE_URL + pageUrl,
          error: error.message,
          issues: ['Page failed to load']
        });
      }
    }
  });
  
  test('should validate all navigation links', async ({ page }) => {
    console.log('🔗 Validating navigation links...');
    
    // Start from homepage and collect all unique links
    await page.goto(BASE_URL, { waitUntil: 'networkidle' });
    
    const allLinks = await page.locator('a[href]').all();
    const uniqueLinks = new Set();
    
    for (const link of allLinks) {
      const href = await link.getAttribute('href');
      if (href && !href.startsWith('mailto:') && !href.startsWith('tel:') && !href.startsWith('#')) {
        // Convert relative URLs to absolute
        const fullUrl = href.startsWith('http') ? href : BASE_URL + (href.startsWith('/') ? href : '/' + href);
        uniqueLinks.add(fullUrl);
      }
    }
    
    console.log(`Found ${uniqueLinks.size} unique links to validate`);
    
    // Test each unique link
    for (const linkUrl of Array.from(uniqueLinks).slice(0, 20)) { // Limit to first 20 for performance
      try {
        const response = await page.request.get(linkUrl);
        const status = response.status();
        
        const linkTest = {
          url: linkUrl,
          status: status,
          working: status >= 200 && status < 400,
          issues: status >= 400 ? [`HTTP ${status} error`] : []
        };
        
        analysisResults.linkValidation.push(linkTest);
        
        console.log(`${linkTest.working ? '✅' : '❌'} ${linkUrl} - Status: ${status}`);
        
      } catch (error) {
        analysisResults.linkValidation.push({
          url: linkUrl,
          status: 'ERROR',
          working: false,
          issues: [error.message]
        });
        console.log(`❌ ${linkUrl} - Error: ${error.message}`);
      }
    }
  });
  
  test('should analyze navigation consistency', async ({ page }) => {
    console.log('🧭 Analyzing navigation consistency...');
    
    let referenceNavigation = null;
    
    for (const [pageName, pageUrl] of Object.entries(MAIN_PAGES)) {
      try {
        await page.goto(BASE_URL + pageUrl, { waitUntil: 'networkidle' });
        
        const navAnalysis = {
          page: pageName,
          url: pageUrl,
          navigation: {},
          issues: []
        };
        
        // Get navigation structure
        const navItems = await page.locator('nav a, .nav-primary a, .navigation a').all();
        const navigationStructure = [];
        
        for (const item of navItems) {
          const text = await item.textContent();
          const href = await item.getAttribute('href');
          if (text && href) {
            navigationStructure.push({
              text: text.trim(),
              href: href
            });
          }
        }
        
        navAnalysis.navigation = {
          itemCount: navigationStructure.length,
          items: navigationStructure.slice(0, 8) // First 8 items for comparison
        };
        
        // Compare with reference (first page)
        if (!referenceNavigation) {
          referenceNavigation = navAnalysis.navigation;
        } else {
          // Check consistency
          if (referenceNavigation.itemCount !== navAnalysis.navigation.itemCount) {
            navAnalysis.issues.push(`Navigation item count mismatch: expected ${referenceNavigation.itemCount}, got ${navAnalysis.navigation.itemCount}`);
          }
          
          // Check if main navigation items are consistent
          const referenceTexts = referenceNavigation.items.map(item => item.text);
          const currentTexts = navAnalysis.navigation.items.map(item => item.text);
          
          const missingItems = referenceTexts.filter(text => !currentTexts.includes(text));
          const extraItems = currentTexts.filter(text => !referenceTexts.includes(text));
          
          if (missingItems.length > 0) {
            navAnalysis.issues.push(`Missing navigation items: ${missingItems.join(', ')}`);
          }
          if (extraItems.length > 0) {
            navAnalysis.issues.push(`Extra navigation items: ${extraItems.join(', ')}`);
          }
        }
        
        analysisResults.navigationAnalysis.push(navAnalysis);
        
        console.log(`${navAnalysis.issues.length === 0 ? '✅' : '❌'} ${pageName} - Navigation: ${navAnalysis.issues.length === 0 ? 'CONSISTENT' : navAnalysis.issues.length + ' issues'}`);
        
      } catch (error) {
        console.log(`❌ Failed to analyze navigation for ${pageName}: ${error.message}`);
      }
    }
  });
  
  test('should generate comprehensive analysis report', async ({ page }) => {
    console.log('📊 Generating comprehensive analysis report...');
    
    // Calculate summary statistics
    const totalPages = Object.keys(MAIN_PAGES).length;
    const pagesWithIssues = analysisResults.headerAnalysis.filter(p => p.issues && p.issues.length > 0).length;
    const brokenLinks = analysisResults.linkValidation.filter(l => !l.working).length;
    const workingLinks = analysisResults.linkValidation.filter(l => l.working).length;
    const pagesWithNavIssues = analysisResults.navigationAnalysis.filter(p => p.issues && p.issues.length > 0).length;
    
    // Identify common issues
    const allHeaderIssues = analysisResults.headerAnalysis.flatMap(p => p.issues || []);
    const commonIssues = {};
    allHeaderIssues.forEach(issue => {
      commonIssues[issue] = (commonIssues[issue] || 0) + 1;
    });
    
    // Generate sitemap alignment data
    const foundPages = analysisResults.headerAnalysis.filter(p => !p.error).map(p => ({
      name: p.page,
      url: p.url,
      title: p.header?.pageTitle || 'Unknown',
      h1: p.header?.h1Text || 'Unknown'
    }));
    
    const missingPages = analysisResults.headerAnalysis.filter(p => p.error || (p.issues && p.issues.includes('Page failed to load')));
    
    analysisResults.summary = {
      totalPages,
      pagesAnalyzed: analysisResults.headerAnalysis.length,
      pagesWithHeaderIssues: pagesWithIssues,
      headerHealthRate: `${(((totalPages - pagesWithIssues) / totalPages) * 100).toFixed(1)}%`,
      
      linksAnalyzed: analysisResults.linkValidation.length,
      workingLinks,
      brokenLinks,
      linkHealthRate: `${workingLinks > 0 ? ((workingLinks / (workingLinks + brokenLinks)) * 100).toFixed(1) : 0}%`,
      
      navigationConsistency: {
        pagesWithNavIssues,
        consistencyRate: `${(((totalPages - pagesWithNavIssues) / totalPages) * 100).toFixed(1)}%`
      },
      
      commonIssues: Object.entries(commonIssues).sort(([,a], [,b]) => b - a).slice(0, 5),
      
      siteStructure: {
        foundPages: foundPages.length,
        missingOrBrokenPages: missingPages.length,
        workingPages: foundPages
      }
    };
    
    // Save detailed results
    const fs = require('fs');
    const reportPath = './test-results/sppp-header-navigation-analysis.json';
    
    if (!fs.existsSync('./test-results')) {
      fs.mkdirSync('./test-results', { recursive: true });
    }
    
    fs.writeFileSync(reportPath, JSON.stringify(analysisResults, null, 2));
    
    console.log('✅ Analysis report generated:', reportPath);
    console.log('📈 Analysis Summary:');
    console.log(`   📄 Pages Analyzed: ${analysisResults.summary.pagesAnalyzed}/${analysisResults.summary.totalPages}`);
    console.log(`   🏷️  Header Health: ${analysisResults.summary.headerHealthRate}`);
    console.log(`   🔗 Link Health: ${analysisResults.summary.linkHealthRate} (${workingLinks} working, ${brokenLinks} broken)`);
    console.log(`   🧭 Navigation Consistency: ${analysisResults.summary.navigationConsistency.consistencyRate}`);
    
    if (analysisResults.summary.commonIssues.length > 0) {
      console.log('   ⚠️  Most Common Issues:');
      analysisResults.summary.commonIssues.forEach(([issue, count]) => {
        console.log(`      - ${issue} (${count} pages)`);
      });
    }
    
    console.log('🎉 Header and navigation analysis completed!');
  });
});