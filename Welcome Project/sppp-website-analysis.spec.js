const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('SPPP Website Analysis', () => {
  let analysisResults = {
    url: 'https://www.penangport.gov.my/ms/',
    timestamp: new Date().toISOString(),
    findings: [],
    screenshots: [],
    compliance: {
      dualLanguage: false,
      responsive: false,
      accessibility: false,
      searchFunction: false,
      sitemap: false,
      contactInfo: false,
      aboutUs: false,
      newsSection: false,
      clientCharter: false,
      privacyPolicy: false,
      https: false,
      mobileVersion: false
    }
  };

  test.beforeAll(async ({ browser }) => {
    // Create screenshots directory if it doesn't exist
    const screenshotsDir = path.join(__dirname, 'screenshots');
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
  });

  test('Analyze SPPP Website Structure and Compliance', async ({ page, browser }) => {
    console.log('🚀 Starting SPPP Website Analysis...');
    
    // Navigate to the main page
    await page.goto(analysisResults.url);
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
    
    // Take screenshot of main page
    const mainPageScreenshot = 'screenshots/01-main-page.png';
    await page.screenshot({ path: mainPageScreenshot, fullPage: true });
    analysisResults.screenshots.push(mainPageScreenshot);
    
    // Check HTTPS
    const url = page.url();
    if (url.startsWith('https://')) {
      analysisResults.compliance.https = true;
      analysisResults.findings.push('✅ HTTPS is enabled');
    } else {
      analysisResults.findings.push('❌ HTTPS is not enabled');
    }

    // Check page title and meta description
    const title = await page.title();
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    
    analysisResults.findings.push(`📄 Page Title: ${title}`);
    if (metaDescription) {
      analysisResults.findings.push(`📝 Meta Description: ${metaDescription}`);
      if (metaDescription.length <= 160) {
        analysisResults.findings.push('✅ Meta description is within 160 characters');
      } else {
        analysisResults.findings.push('❌ Meta description exceeds 160 characters');
      }
    } else {
      analysisResults.findings.push('❌ Meta description not found');
    }

    // Check for language toggle
    const languageToggle = await page.locator('a[href*="/en/"], a[href*="/ms/"]').count();
    if (languageToggle > 0) {
      analysisResults.compliance.dualLanguage = true;
      analysisResults.findings.push('✅ Language toggle found (BM/English)');
    } else {
      analysisResults.findings.push('❌ Language toggle not found');
    }

    // Check for search function
    const searchInput = await page.locator('input[type="search"], input[name*="search"], form[action*="search"]').count();
    if (searchInput > 0) {
      analysisResults.compliance.searchFunction = true;
      analysisResults.findings.push('✅ Search function found');
    } else {
      analysisResults.findings.push('❌ Search function not found');
    }

    // Check for main navigation menu
    const mainMenu = await page.locator('nav, .main-menu, .navigation, .menu').count();
    if (mainMenu > 0) {
      analysisResults.findings.push('✅ Main navigation menu found');
    } else {
      analysisResults.findings.push('❌ Main navigation menu not found');
    }

    // Check for About Us section
    const aboutUsLink = await page.locator('a[href*="about"], a[href*="tentang"], a:has-text("About"), a:has-text("Tentang")').count();
    if (aboutUsLink > 0) {
      analysisResults.compliance.aboutUs = true;
      analysisResults.findings.push('✅ About Us section found');
    } else {
      analysisResults.findings.push('❌ About Us section not found');
    }

    // Check for Contact section
    const contactLink = await page.locator('a[href*="contact"], a[href*="hubungi"], a:has-text("Contact"), a:has-text("Hubungi")').count();
    if (contactLink > 0) {
      analysisResults.compliance.contactInfo = true;
      analysisResults.findings.push('✅ Contact section found');
    } else {
      analysisResults.findings.push('❌ Contact section not found');
    }

    // Check for News section
    const newsLink = await page.locator('a[href*="news"], a[href*="berita"], a:has-text("News"), a:has-text("Berita")').count();
    if (newsLink > 0) {
      analysisResults.compliance.newsSection = true;
      analysisResults.findings.push('✅ News section found');
    } else {
      analysisResults.findings.push('❌ News section not found');
    }

    // Check for Client Charter
    const clientCharterLink = await page.locator('a[href*="charter"], a[href*="piagam"], a:has-text("Charter"), a:has-text("Piagam")').count();
    if (clientCharterLink > 0) {
      analysisResults.compliance.clientCharter = true;
      analysisResults.findings.push('✅ Client Charter section found');
    } else {
      analysisResults.findings.push('❌ Client Charter section not found');
    }

    // Check for Privacy Policy
    const privacyPolicyLink = await page.locator('a[href*="privacy"], a[href*="privasi"], a:has-text("Privacy"), a:has-text("Privasi")').count();
    if (privacyPolicyLink > 0) {
      analysisResults.compliance.privacyPolicy = true;
      analysisResults.findings.push('✅ Privacy Policy section found');
    } else {
      analysisResults.findings.push('❌ Privacy Policy section not found');
    }

    // Check for sitemap
    const sitemapLink = await page.locator('a[href*="sitemap"], a[href*="peta-laman"]').count();
    if (sitemapLink > 0) {
      analysisResults.compliance.sitemap = true;
      analysisResults.findings.push('✅ Sitemap found');
    } else {
      analysisResults.findings.push('❌ Sitemap not found');
    }

    // Check for social media links
    const socialMediaLinks = await page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]').count();
    if (socialMediaLinks > 0) {
      analysisResults.findings.push('✅ Social media links found');
    } else {
      analysisResults.findings.push('❌ Social media links not found');
    }

    // Check for online services
    const onlineServicesLink = await page.locator('a[href*="service"], a[href*="perkhidmatan"], a:has-text("Service"), a:has-text("Perkhidmatan")').count();
    if (onlineServicesLink > 0) {
      analysisResults.findings.push('✅ Online services section found');
    } else {
      analysisResults.findings.push('❌ Online services section not found');
    }

    // Check for MyGov portal link
    const myGovLink = await page.locator('a[href*="malaysia.gov.my"]').count();
    if (myGovLink > 0) {
      analysisResults.findings.push('✅ MyGov portal link found');
    } else {
      analysisResults.findings.push('❌ MyGov portal link not found');
    }

    // Check for images with alt attributes
    const images = await page.locator('img').count();
    const imagesWithAlt = await page.locator('img[alt]').count();
    if (images > 0) {
      const altPercentage = Math.round((imagesWithAlt / images) * 100);
      analysisResults.findings.push(`📸 Images: ${imagesWithAlt}/${images} have alt attributes (${altPercentage}%)`);
    }

    // Check for header tags
    const h1Tags = await page.locator('h1').count();
    const h2Tags = await page.locator('h2').count();
    analysisResults.findings.push(`📋 Header tags: H1=${h1Tags}, H2=${h2Tags}`);

    // Check viewport meta tag for responsive design
    const viewportMeta = await page.locator('meta[name="viewport"]').count();
    if (viewportMeta > 0) {
      analysisResults.compliance.responsive = true;
      analysisResults.findings.push('✅ Viewport meta tag found (responsive design)');
    } else {
      analysisResults.findings.push('❌ Viewport meta tag not found');
    }

    // Test responsive design by changing viewport
    await page.setViewportSize({ width: 375, height: 667 }); // Mobile viewport
    await page.waitForTimeout(1000);
    
    const mobileScreenshot = 'screenshots/02-mobile-view.png';
    await page.screenshot({ path: mobileScreenshot, fullPage: true });
    analysisResults.screenshots.push(mobileScreenshot);
    
    // Check if mobile menu appears
    const mobileMenu = await page.locator('.mobile-menu, .hamburger, .toggle-menu, [class*="mobile"], [class*="hamburger"]').count();
    if (mobileMenu > 0) {
      analysisResults.compliance.mobileVersion = true;
      analysisResults.findings.push('✅ Mobile menu/version detected');
    } else {
      analysisResults.findings.push('❌ Mobile menu/version not detected');
    }

    // Reset to desktop viewport
    await page.setViewportSize({ width: 1280, height: 720 });

    // Navigate to About Us page if available
    const aboutUsLinkElement = page.locator('a[href*="about"], a[href*="tentang"], a:has-text("About"), a:has-text("Tentang")').first();
    if (await aboutUsLinkElement.count() > 0) {
      await aboutUsLinkElement.click();
      await page.waitForLoadState('networkidle');
      
      const aboutPageScreenshot = 'screenshots/03-about-page.png';
      await page.screenshot({ path: aboutPageScreenshot, fullPage: true });
      analysisResults.screenshots.push(aboutPageScreenshot);
      
      analysisResults.findings.push('✅ Successfully navigated to About Us page');
    }

    // Navigate to Contact page if available
    const contactLinkElement = page.locator('a[href*="contact"], a[href*="hubungi"], a:has-text("Contact"), a:has-text("Hubungi")').first();
    if (await contactLinkElement.count() > 0) {
      await contactLinkElement.click();
      await page.waitForLoadState('networkidle');
      
      const contactPageScreenshot = 'screenshots/04-contact-page.png';
      await page.screenshot({ path: contactPageScreenshot, fullPage: true });
      analysisResults.screenshots.push(contactPageScreenshot);
      
      analysisResults.findings.push('✅ Successfully navigated to Contact page');
    }

    // Check for broken links (basic check)
    const allLinks = await page.locator('a[href]').all();
    let brokenLinks = 0;
    let totalLinks = allLinks.length;
    
    for (let i = 0; i < Math.min(allLinks.length, 10); i++) { // Check first 10 links
      try {
        const href = await allLinks[i].getAttribute('href');
        if (href && !href.startsWith('#')) {
          const response = await page.request.get(href.startsWith('http') ? href : new URL(href, page.url()).href);
          if (response.status() >= 400) {
            brokenLinks++;
          }
        }
      } catch (error) {
        brokenLinks++;
      }
    }
    
    if (totalLinks > 0) {
      const brokenPercentage = Math.round((brokenLinks / Math.min(totalLinks, 10)) * 100);
      analysisResults.findings.push(`🔗 Link check: ${brokenLinks}/${Math.min(totalLinks, 10)} broken links found (${brokenPercentage}%)`);
    }

    // Check page load time
    const startTime = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    if (loadTime <= 5000) {
      analysisResults.findings.push(`⚡ Page load time: ${loadTime}ms (within 5 second requirement)`);
    } else {
      analysisResults.findings.push(`🐌 Page load time: ${loadTime}ms (exceeds 5 second requirement)`);
    }

    // Generate compliance score
    const complianceItems = Object.values(analysisResults.compliance);
    const compliantItems = complianceItems.filter(item => item === true).length;
    const totalComplianceItems = complianceItems.length;
    const complianceScore = Math.round((compliantItems / totalComplianceItems) * 100);
    
    analysisResults.findings.push(`📊 Overall Compliance Score: ${compliantItems}/${totalComplianceItems} (${complianceScore}%)`);

    // Save analysis results to file
    const resultsFile = 'screenshots/sppp-analysis-results.json';
    fs.writeFileSync(resultsFile, JSON.stringify(analysisResults, null, 2));
    analysisResults.findings.push(`💾 Analysis results saved to: ${resultsFile}`);

    // Log all findings
    console.log('\n📋 SPPP Website Analysis Results:');
    analysisResults.findings.forEach(finding => {
      console.log(finding);
    });

    console.log(`\n📸 Screenshots saved: ${analysisResults.screenshots.length} files`);
    console.log(`📊 Compliance Score: ${complianceScore}%`);
  });

  test.afterAll(async () => {
    console.log('\n✅ SPPP Website Analysis Complete!');
    console.log('📁 Check the screenshots directory for captured images and analysis results.');
  });
});

