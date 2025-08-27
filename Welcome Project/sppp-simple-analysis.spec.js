const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('SPPP Website Simple Analysis', () => {
  test('Analyze SPPP Website Basic Compliance', async ({ page }) => {
    console.log('🚀 Starting SPPP Website Simple Analysis...');
    
    // Create results object
    const results = {
      url: 'https://www.penangport.gov.my/ms/',
      timestamp: new Date().toISOString(),
      findings: [],
      compliance: {
        https: false,
        dualLanguage: false,
        responsive: false,
        searchFunction: false,
        metaTags: false,
        accessibility: false,
        performance: false
      }
    };
    
    try {
      // Navigate to the main page
      console.log('🌐 Navigating to SPPP website...');
      await page.goto(results.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Take screenshot of main page
      const screenshotsDir = 'screenshots';
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      
      await page.screenshot({ path: `${screenshotsDir}/01-main-page-simple.png`, fullPage: true });
      console.log('📸 Main page screenshot captured');
      
      // 1. Check HTTPS
      const url = page.url();
      if (url.startsWith('https://')) {
        results.compliance.https = true;
        results.findings.push('✅ HTTPS is enabled');
        console.log('✅ HTTPS is enabled');
      } else {
        results.findings.push('❌ HTTPS is not enabled');
        console.log('❌ HTTPS is not enabled');
      }
      
      // 2. Check page title
      const title = await page.title();
      results.findings.push(`📄 Page Title: ${title}`);
      console.log(`📄 Page Title: ${title}`);
      
      if (title && title.length < 70) {
        results.findings.push('✅ Page title is within 70 characters');
        console.log('✅ Page title is within 70 characters');
      } else {
        results.findings.push(`❌ Page title exceeds 70 characters (${title?.length || 0} chars)`);
        console.log(`❌ Page title exceeds 70 characters (${title?.length || 0} chars)`);
      }
      
      // 3. Check meta description
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      if (metaDescription) {
        results.findings.push(`📝 Meta Description: ${metaDescription.substring(0, 100)}...`);
        console.log(`📝 Meta Description: ${metaDescription.substring(0, 100)}...`);
        
        if (metaDescription.length <= 160) {
          results.findings.push('✅ Meta description is within 160 characters');
          console.log('✅ Meta description is within 160 characters');
        } else {
          results.findings.push(`❌ Meta description exceeds 160 characters (${metaDescription.length} chars)`);
          console.log(`❌ Meta description exceeds 160 characters (${metaDescription.length} chars)`);
        }
      } else {
        results.findings.push('❌ Meta description not found');
        console.log('❌ Meta description not found');
      }
      
      // 4. Check for language toggle
      const languageToggle = await page.locator('a[href*="/en/"], a[href*="/ms/"]').count();
      if (languageToggle > 0) {
        results.compliance.dualLanguage = true;
        results.findings.push('✅ Language toggle found (BM/English)');
        console.log('✅ Language toggle found (BM/English)');
      } else {
        results.findings.push('❌ Language toggle not found');
        console.log('❌ Language toggle not found');
      }
      
      // 5. Check for search function
      const searchInput = await page.locator('input[type="search"], input[name*="search"], form[action*="search"]').count();
      if (searchInput > 0) {
        results.compliance.searchFunction = true;
        results.findings.push('✅ Search function found');
        console.log('✅ Search function found');
      } else {
        results.findings.push('❌ Search function not found');
        console.log('❌ Search function not found');
      }
      
      // 6. Check for main navigation menu
      const mainMenu = await page.locator('nav, .main-menu, .navigation, .menu, .navbar').count();
      if (mainMenu > 0) {
        results.findings.push('✅ Main navigation menu found');
        console.log('✅ Main navigation menu found');
      } else {
        results.findings.push('❌ Main navigation menu not found');
        console.log('❌ Main navigation menu not found');
      }
      
      // 7. Check for key sections (without clicking)
      const sections = [
        { name: 'About Us', selectors: ['a[href*="about"]', 'a[href*="tentang"]', 'a:has-text("About")', 'a:has-text("Tentang")'] },
        { name: 'Contact', selectors: ['a[href*="contact"]', 'a[href*="hubungi"]', 'a:has-text("Contact")', 'a:has-text("Hubungi")'] },
        { name: 'News', selectors: ['a[href*="news"]', 'a[href*="berita"]', 'a:has-text("News")', 'a:has-text("Berita")'] },
        { name: 'Services', selectors: ['a[href*="service"]', 'a[href*="perkhidmatan"]', 'a:has-text("Service")', 'a:has-text("Perkhidmatan")'] }
      ];
      
      for (const section of sections) {
        let found = false;
        for (const selector of section.selectors) {
          if (await page.locator(selector).count() > 0) {
            found = true;
            break;
          }
        }
        if (found) {
          results.findings.push(`✅ ${section.name} section found`);
          console.log(`✅ ${section.name} section found`);
        } else {
          results.findings.push(`❌ ${section.name} section not found`);
          console.log(`❌ ${section.name} section not found`);
        }
      }
      
      // 8. Check for social media links
      const socialMediaLinks = await page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]').count();
      if (socialMediaLinks > 0) {
        results.findings.push('✅ Social media links found');
        console.log('✅ Social media links found');
      } else {
        results.findings.push('❌ Social media links not found');
        console.log('❌ Social media links not found');
      }
      
      // 9. Check for MyGov portal link
      const myGovLink = await page.locator('a[href*="malaysia.gov.my"]').count();
      if (myGovLink > 0) {
        results.findings.push('✅ MyGov portal link found');
        console.log('✅ MyGov portal link found');
      } else {
        results.findings.push('❌ MyGov portal link not found');
        console.log('❌ MyGov portal link not found');
      }
      
      // 10. Check images with alt attributes
      const images = await page.locator('img').count();
      const imagesWithAlt = await page.locator('img[alt]').count();
      if (images > 0) {
        const altPercentage = Math.round((imagesWithAlt / images) * 100);
        results.findings.push(`📸 Images: ${imagesWithAlt}/${images} have alt attributes (${altPercentage}%)`);
        console.log(`📸 Images: ${imagesWithAlt}/${images} have alt attributes (${altPercentage}%)`);
        
        if (altPercentage === 100) {
          results.findings.push('✅ All images have alt attributes');
          console.log('✅ All images have alt attributes');
        } else {
          results.findings.push('❌ Not all images have alt attributes');
          console.log('❌ Not all images have alt attributes');
        }
      }
      
      // 11. Check header tags
      const h1Tags = await page.locator('h1').count();
      const h2Tags = await page.locator('h2').count();
      results.findings.push(`📋 Header tags: H1=${h1Tags}, H2=${h2Tags}`);
      console.log(`📋 Header tags: H1=${h1Tags}, H2=${h2Tags}`);
      
      if (h1Tags > 0) {
        results.findings.push('✅ H1 header tag present');
        console.log('✅ H1 header tag present');
      } else {
        results.findings.push('❌ H1 header tag not present');
        console.log('❌ H1 header tag not present');
      }
      
      // 12. Check viewport meta tag for responsive design
      const viewportMeta = await page.locator('meta[name="viewport"]').count();
      if (viewportMeta > 0) {
        results.compliance.responsive = true;
        results.findings.push('✅ Viewport meta tag found (responsive design)');
        console.log('✅ Viewport meta tag found (responsive design)');
      } else {
        results.findings.push('❌ Viewport meta tag not found');
        console.log('❌ Viewport meta tag not found');
      }
      
      // 13. Test responsive design by changing viewport
      console.log('📱 Testing mobile responsiveness...');
      await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
      await page.waitForTimeout(2000);
      
      const mobileScreenshot = `${screenshotsDir}/02-mobile-view-simple.png`;
      await page.screenshot({ path: mobileScreenshot, fullPage: true });
      console.log('📸 Mobile view screenshot captured');
      
      // Check if mobile menu appears
      const mobileMenu = await page.locator('.mobile-menu, .hamburger, .toggle-menu, [class*="mobile"], [class*="hamburger"]').count();
      if (mobileMenu > 0) {
        results.compliance.responsive = true;
        results.findings.push('✅ Mobile menu/version detected');
        console.log('✅ Mobile menu/version detected');
      } else {
        results.findings.push('❌ Mobile menu/version not detected');
        console.log('❌ Mobile menu/version not detected');
      }
      
      // Reset to desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      // 14. Check page load time
      console.log('⚡ Testing page load time...');
      const startTime = Date.now();
      await page.reload();
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      if (loadTime <= 5000) {
        results.compliance.performance = true;
        results.findings.push(`⚡ Page load time: ${loadTime}ms (within 5 second requirement)`);
        console.log(`⚡ Page load time: ${loadTime}ms (within 5 second requirement)`);
      } else {
        results.findings.push(`🐌 Page load time: ${loadTime}ms (exceeds 5 second requirement)`);
        console.log(`🐌 Page load time: ${loadTime}ms (exceeds 5 second requirement)`);
      }
      
      // 15. Check for SPLaSK specific tags
      const splaskTags = await page.locator('[splwpk-*]').count();
      if (splaskTags > 0) {
        results.findings.push(`🏷️ SPLaSK tags found: ${splaskTags}`);
        console.log(`🏷️ SPLaSK tags found: ${splaskTags}`);
      } else {
        results.findings.push('❌ No SPLaSK tags found');
        console.log('❌ No SPLaSK tags found');
      }
      
      // Generate compliance score
      const complianceItems = Object.values(results.compliance);
      const compliantItems = complianceItems.filter(item => item === true).length;
      const totalComplianceItems = complianceItems.length;
      const complianceScore = Math.round((compliantItems / totalComplianceItems) * 100);
      
      results.findings.push(`📊 Overall Compliance Score: ${compliantItems}/${totalComplianceItems} (${complianceScore}%)`);
      console.log(`📊 Overall Compliance Score: ${compliantItems}/${totalComplianceItems} (${complianceScore}%)`);
      
      // Save results to file
      const resultsFile = `${screenshotsDir}/sppp-simple-analysis-results.json`;
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
      results.findings.push(`💾 Analysis results saved to: ${resultsFile}`);
      console.log(`💾 Analysis results saved to: ${resultsFile}`);
      
      console.log('\n📋 Analysis Complete!');
      console.log(`📸 Screenshots saved: 2 files`);
      console.log(`📊 Compliance Score: ${complianceScore}%`);
      
    } catch (error) {
      console.error('❌ Error during analysis:', error.message);
      results.findings.push(`❌ Error: ${error.message}`);
      
      // Save error results
      const screenshotsDir = 'screenshots';
      if (!fs.existsSync(screenshotsDir)) {
        fs.mkdirSync(screenshotsDir, { recursive: true });
      }
      const resultsFile = `${screenshotsDir}/sppp-simple-analysis-results.json`;
      fs.writeFileSync(resultsFile, JSON.stringify(results, null, 2));
    }
  });
});

