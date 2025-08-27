const { test, expect } = require('@playwright/test');

test.describe('SPPP Website Compliance Check', () => {
  test('Check SPLaSK Compliance Requirements', async ({ page }) => {
    console.log('🔍 Starting SPLaSK Compliance Check for SPPP Website...');
    
    // Navigate to the main page
    await page.goto('https://www.penangport.gov.my/ms/');
    await page.waitForLoadState('networkidle');
    
    console.log('\n📋 Checking SPLaSK Compliance Criteria...');
    
    // 1. Check HTTPS Availability
    const url = page.url();
    if (url.startsWith('https://')) {
      console.log('✅ 3.5.2 HTTPS Availability: PASSED');
    } else {
      console.log('❌ 3.5.2 HTTPS Availability: FAILED');
    }
    
    // 2. Check Meta Title Length
    const title = await page.title();
    if (title && title.length < 70) {
      console.log('✅ 3.1.3 Meta title < 70 characters: PASSED');
    } else {
      console.log(`❌ 3.1.3 Meta title < 70 characters: FAILED (${title?.length || 0} chars)`);
    }
    
    // 3. Check Meta Description Length
    const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
    if (metaDescription && metaDescription.length < 160) {
      console.log('✅ 3.1.3 Meta description < 160 characters: PASSED');
    } else {
      console.log(`❌ 3.1.3 Meta description < 160 characters: FAILED (${metaDescription?.length || 0} chars)`);
    }
    
    // 4. Check Images with Alt Attributes
    const images = await page.locator('img').count();
    const imagesWithAlt = await page.locator('img[alt]').count();
    if (images > 0) {
      const altPercentage = (imagesWithAlt / images) * 100;
      if (altPercentage === 100) {
        console.log('✅ 3.1.3 All images have alt attributes: PASSED');
      } else {
        console.log(`❌ 3.1.3 All images have alt attributes: FAILED (${altPercentage.toFixed(1)}%)`);
      }
    }
    
    // 5. Check Header Tags
    const h1Tags = await page.locator('h1').count();
    if (h1Tags > 0) {
      console.log('✅ 3.1.3 Header tag H1 present: PASSED');
    } else {
      console.log('❌ 3.1.3 Header tag H1 present: FAILED');
    }
    
    // 6. Check Viewport Meta Tag
    const viewportMeta = await page.locator('meta[name="viewport"]').count();
    if (viewportMeta > 0) {
      console.log('✅ 3.1.2 Device Responsiveness: PASSED');
    } else {
      console.log('❌ 3.1.2 Device Responsiveness: FAILED');
    }
    
    // 7. Check Language Function (BM/English)
    const languageToggle = await page.locator('a[href*="/en/"], a[href*="/ms/"]').count();
    if (languageToggle > 0) {
      console.log('✅ 3.8.1 Language Function (BM/English): PASSED');
    } else {
      console.log('❌ 3.8.1 Language Function (BM/English): FAILED');
    }
    
    // 8. Check Search Function
    const searchInput = await page.locator('input[type="search"], input[name*="search"], form[action*="search"]').count();
    if (searchInput > 0) {
      console.log('✅ 3.2.2 Search Function: PASSED');
    } else {
      console.log('❌ 3.2.2 Search Function: FAILED');
    }
    
    // 9. Check About Us Section
    const aboutUsLink = await page.locator('a[href*="about"], a[href*="tentang"], a:has-text("About"), a:has-text("Tentang")').count();
    if (aboutUsLink > 0) {
      console.log('✅ 3.3.3 About Us section: PASSED');
    } else {
      console.log('❌ 3.3.3 About Us section: FAILED');
    }
    
    // 10. Check Contact Details
    const contactLink = await page.locator('a[href*="contact"], a[href*="hubungi"], a:has-text("Contact"), a:has-text("Hubungi")').count();
    if (contactLink > 0) {
      console.log('✅ 3.3.3 Contact Details: PASSED');
    } else {
      console.log('❌ 3.3.3 Contact Details: FAILED');
    }
    
    // 11. Check News Section
    const newsLink = await page.locator('a[href*="news"], a[href*="berita"], a:has-text("News"), a:has-text("Berita")').count();
    if (newsLink > 0) {
      console.log('✅ 3.3.3 News section: PASSED');
    } else {
      console.log('❌ 3.3.3 News section: FAILED');
    }
    
    // 12. Check Client Charter
    const clientCharterLink = await page.locator('a[href*="charter"], a[href*="piagam"], a:has-text("Charter"), a:has-text("Piagam")').count();
    if (clientCharterLink > 0) {
      console.log('✅ 3.3.3 Client Charter: PASSED');
    } else {
      console.log('❌ 3.3.3 Client Charter: FAILED');
    }
    
    // 13. Check Privacy Policy
    const privacyPolicyLink = await page.locator('a[href*="privacy"], a[href*="privasi"], a:has-text("Privacy"), a:has-text("Privasi")').count();
    if (privacyPolicyLink > 0) {
      console.log('✅ 3.4.1 Privacy Policy: PASSED');
    } else {
      console.log('❌ 3.4.1 Privacy Policy: FAILED');
    }
    
    // 14. Check Sitemap
    const sitemapLink = await page.locator('a[href*="sitemap"], a[href*="peta-laman"]').count();
    if (sitemapLink > 0) {
      console.log('✅ 3.2.1 Sitemap: PASSED');
    } else {
      console.log('❌ 3.2.1 Sitemap: FAILED');
    }
    
    // 15. Check MyGov Portal Link
    const myGovLink = await page.locator('a[href*="malaysia.gov.my"]').count();
    if (myGovLink > 0) {
      console.log('✅ 3.2.1 Link to MyGov Portal: PASSED');
    } else {
      console.log('❌ 3.2.1 Link to MyGov Portal: FAILED');
    }
    
    // 16. Check Social Media Presence
    const socialMediaLinks = await page.locator('a[href*="facebook"], a[href*="twitter"], a[href*="instagram"], a[href*="linkedin"]').count();
    if (socialMediaLinks > 0) {
      console.log('✅ 2.26 Social Media Presence: PASSED');
    } else {
      console.log('❌ 2.26 Social Media Presence: FAILED');
    }
    
    // 17. Check Online Services
    const onlineServicesLink = await page.locator('a[href*="service"], a[href*="perkhidmatan"], a:has-text("Service"), a:has-text("Perkhidmatan")').count();
    if (onlineServicesLink > 0) {
      console.log('✅ 3.3.4 Online Services: PASSED');
    } else {
      console.log('❌ 3.3.4 Online Services: FAILED');
    }
    
    // 18. Check W3C Disability Accessibility
    const accessibilityFeatures = await page.locator('[class*="accessibility"], [class*="font-size"], [class*="contrast"]').count();
    if (accessibilityFeatures > 0) {
      console.log('✅ 3.2.3 W3C Disability Accessibility: PASSED');
    } else {
      console.log('❌ 3.2.3 W3C Disability Accessibility: FAILED');
    }
    
    // 19. Check Page Load Time
    const startTime = Date.now();
    await page.reload();
    await page.waitForLoadState('networkidle');
    const loadTime = Date.now() - startTime;
    
    if (loadTime <= 5000) {
      console.log(`✅ 3.6.2 Loading Time < 5 seconds: PASSED (${loadTime}ms)`);
    } else {
      console.log(`❌ 3.6.2 Loading Time < 5 seconds: FAILED (${loadTime}ms)`);
    }
    
    // 20. Check Mobile Responsiveness
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    
    const mobileMenu = await page.locator('.mobile-menu, .hamburger, .toggle-menu, [class*="mobile"], [class*="hamburger"]').count();
    if (mobileMenu > 0) {
      console.log('✅ 3.1.2 Mobile Version/Responsive Design: PASSED');
    } else {
      console.log('❌ 3.1.2 Mobile Version/Responsive Design: FAILED');
    }
    
    // Reset viewport
    await page.setViewportSize({ width: 1280, height: 720 });
    
    console.log('\n🎯 SPLaSK Compliance Check Complete!');
  });
});

