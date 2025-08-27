const { test, expect } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

test.describe('SPPP Website Comprehensive Analysis for New Website Development', () => {
  test('Thorough Analysis of Old Website for Modern Redesign', async ({ page }) => {
    console.log('🚀 Starting Comprehensive Analysis of OLD SPPP Website for NEW Modern Website Development...');
    
    // Create comprehensive analysis object for new website planning
    const analysis = {
      url: 'https://www.penangport.gov.my/ms/',
      timestamp: new Date().toISOString(),
      projectContext: 'OLD WEBSITE ANALYSIS FOR NEW MODERN WEBSITE DEVELOPMENT',
      overallScore: 0,
      categories: {
        // SPLaSK Compliance (Government Requirements)
        spLaSKCompliance: { score: 0, maxScore: 25, findings: [], requirements: [] },
        
        // Technical Foundation
        technicalFoundation: { score: 0, maxScore: 20, findings: [], requirements: [] },
        
        // User Experience & Design
        userExperience: { score: 0, maxScore: 20, findings: [], requirements: [] },
        
        // Content & Information Architecture
        contentArchitecture: { score: 0, maxScore: 15, findings: [], requirements: [] },
        
        // Performance & Optimization
        performance: { score: 0, maxScore: 10, findings: [], requirements: [] },
        
        // Accessibility & Standards
        accessibility: { score: 0, maxScore: 10, findings: [], requirements: [] }
      },
      screenshots: [],
      detailedFindings: [],
      improvementOpportunities: [],
      newWebsiteRequirements: [],
      technicalSpecifications: [],
      contentMigrationNotes: [],
      designRecommendations: []
    };
    
    // Create comprehensive screenshots directory
    const screenshotsDir = 'screenshots/comprehensive-analysis';
    if (!fs.existsSync(screenshotsDir)) {
      fs.mkdirSync(screenshotsDir, { recursive: true });
    }
    
    try {
      // Navigate to the main page
      console.log('🌐 Navigating to OLD SPPP website for comprehensive analysis...');
      await page.goto(analysis.url, { waitUntil: 'networkidle', timeout: 30000 });
      
      // Capture main page screenshot
      await page.screenshot({ path: `${screenshotsDir}/01-main-page-old.png`, fullPage: true });
      analysis.screenshots.push('01-main-page-old.png');
      console.log('📸 Main page screenshot captured for analysis');
      
      // ===== SPLaSK COMPLIANCE ANALYSIS (Government Requirements) =====
      console.log('\n🏛️ Analyzing SPLaSK Compliance (Government Requirements)...');
      
      // 1. HTTPS Availability
      const url = page.url();
      if (url.startsWith('https://')) {
        analysis.categories.spLaSKCompliance.score += 5;
        analysis.categories.spLaSKCompliance.findings.push('✅ HTTPS is enabled');
        analysis.categories.spLaSKCompliance.requirements.push('Maintain HTTPS for new website');
      } else {
        analysis.categories.spLaSKCompliance.findings.push('❌ HTTPS not enabled - CRITICAL for new website');
        analysis.categories.spLaSKCompliance.requirements.push('Implement HTTPS as mandatory requirement');
      }
      
      // 2. Meta Title Length
      const title = await page.title();
      if (title && title.length < 70) {
        analysis.categories.spLaSKCompliance.score += 3;
        analysis.categories.spLaSKCompliance.findings.push('✅ Meta title within 70 characters');
      } else {
        analysis.categories.spLaSKCompliance.findings.push(`❌ Meta title exceeds 70 characters (${title?.length || 0} chars)`);
        analysis.categories.spLaSKCompliance.requirements.push('Ensure all meta titles < 70 characters');
      }
      
      // 3. Meta Description Length
      const metaDescription = await page.locator('meta[name="description"]').getAttribute('content');
      if (metaDescription && metaDescription.length < 160) {
        analysis.categories.spLaSKCompliance.score += 3;
        analysis.categories.spLaSKCompliance.findings.push('✅ Meta description within 160 characters');
      } else {
        analysis.categories.spLaSKCompliance.findings.push(`❌ Meta description exceeds 160 characters (${metaDescription?.length || 0} chars)`);
        analysis.categories.spLaSKCompliance.requirements.push('Ensure all meta descriptions < 160 characters');
      }
      
      // 4. Image Alt Attributes
      const images = await page.locator('img').count();
      const imagesWithAlt = await page.locator('img[alt]').count();
      if (images > 0) {
        const altPercentage = Math.round((imagesWithAlt / images) * 100);
        if (altPercentage === 100) {
          analysis.categories.spLaSKCompliance.score += 3;
          analysis.categories.spLaSKCompliance.findings.push('✅ All images have alt attributes');
        } else {
          analysis.categories.spLaSKCompliance.findings.push(`❌ Only ${altPercentage}% of images have alt attributes`);
          analysis.categories.spLaSKCompliance.requirements.push('Ensure 100% image alt attribute coverage');
        }
      }
      
      // 5. Header Tags
      const h1Tags = await page.locator('h1').count();
      const h2Tags = await page.locator('h2').count();
      if (h1Tags > 0) {
        analysis.categories.spLaSKCompliance.score += 3;
        analysis.categories.spLaSKCompliance.findings.push('✅ H1 header tag present');
      } else {
        analysis.categories.spLaSKCompliance.findings.push('❌ H1 header tag missing');
        analysis.categories.spLaSKCompliance.requirements.push('Implement proper H1 header structure');
      }
      
      // 6. Language Function (BM/English)
      const languageToggle = await page.locator('a[href*="/en/"], a[href*="/ms/"]').count();
      if (languageToggle > 0) {
        analysis.categories.spLaSKCompliance.score += 3;
        analysis.categories.spLaSKCompliance.findings.push('✅ Language toggle found (BM/English)');
        analysis.categories.spLaSKCompliance.requirements.push('Maintain dual language support');
      } else {
        analysis.categories.spLaSKCompliance.findings.push('❌ Language toggle not found');
        analysis.categories.spLaSKCompliance.requirements.push('Implement dual language (BM/English) support');
      }
      
      // 7. Search Function
      const searchInput = await page.locator('input[type="search"], input[name*="search"], form[action*="search"]').count();
      if (searchInput > 0) {
        analysis.categories.spLaSKCompliance.score += 3;
        analysis.categories.spLaSKCompliance.findings.push('✅ Search function available');
      } else {
        analysis.categories.spLaSKCompliance.findings.push('❌ Search function missing - CRITICAL');
        analysis.categories.spLaSKCompliance.requirements.push('Implement comprehensive search functionality');
      }
      
      // 8. SPLaSK Tags Analysis
      console.log('🏷️ Analyzing SPLaSK tags...');
      const allElements = await page.locator('*').all();
      let spLaSKTagCount = 0;
      const foundTags = [];
      
      for (const element of allElements.slice(0, 200)) { // Check more elements
        try {
          const attributes = await element.evaluate(el => {
            const attrs = {};
            for (const attr of el.attributes) {
              if (attr.name.startsWith('splwpk-')) {
                attrs[attr.name] = attr.value;
              }
            }
            return attrs;
          });
          
          if (Object.keys(attributes).length > 0) {
            spLaSKTagCount += Object.keys(attributes).length;
            for (const [key, value] of Object.entries(attributes)) {
              foundTags.push(`${key}="${value}"`);
            }
          }
        } catch (error) {
          // Continue if element is not accessible
        }
      }
      
      if (spLaSKTagCount > 0) {
        analysis.categories.spLaSKCompliance.score += 2;
        analysis.categories.spLaSKCompliance.findings.push(`✅ SPLaSK tags found: ${spLaSKTagCount}`);
        analysis.categories.spLaSKCompliance.requirements.push('Maintain and expand SPLaSK tag implementation');
      } else {
        analysis.categories.spLaSKCompliance.findings.push('❌ No SPLaSK tags found');
        analysis.categories.spLaSKCompliance.requirements.push('Implement comprehensive SPLaSK tag system');
      }
      
      // ===== TECHNICAL FOUNDATION ANALYSIS =====
      console.log('\n⚙️ Analyzing Technical Foundation...');
      
      // 1. Viewport Meta Tag
      const viewportMeta = await page.locator('meta[name="viewport"]').count();
      if (viewportMeta > 0) {
        analysis.categories.technicalFoundation.score += 5;
        analysis.categories.technicalFoundation.findings.push('✅ Viewport meta tag found');
        analysis.categories.technicalFoundation.requirements.push('Maintain responsive design foundation');
      } else {
        analysis.categories.technicalFoundation.findings.push('❌ Viewport meta tag missing');
        analysis.categories.technicalFoundation.requirements.push('Implement responsive design foundation');
      }
      
      // 2. CSS Layout Techniques
      const layoutAnalysis = await page.evaluate(() => {
        const hasGrid = document.querySelectorAll('.grid, .row, .col, [class*="grid"], [class*="row"]').length > 0;
        const hasFlexbox = document.querySelectorAll('[style*="display: flex"], [class*="flex"]').length > 0;
        
        return {
          hasGrid: hasGrid,
          hasFlexbox: hasFlexbox,
          hasModernCSS: hasGrid || hasFlexbox
        };
      });
      
      if (layoutAnalysis.hasModernCSS) {
        analysis.categories.technicalFoundation.score += 5;
        analysis.categories.technicalFoundation.findings.push('✅ Modern CSS layout techniques');
        analysis.categories.technicalFoundation.requirements.push('Enhance with advanced CSS Grid and Flexbox');
      } else {
        analysis.categories.technicalFoundation.findings.push('❌ No modern CSS layout techniques');
        analysis.categories.technicalFoundation.requirements.push('Implement modern CSS Grid and Flexbox layouts');
      }
      
      // 3. JavaScript Features
      const jsAnalysis = await page.evaluate(() => {
        const hasModernJS = 'fetch' in window || 'Promise' in window;
        
        return {
          hasModernJS: hasModernJS
        };
      });
      
      if (jsAnalysis.hasModernJS) {
        analysis.categories.technicalFoundation.score += 5;
        analysis.categories.technicalFoundation.findings.push('✅ Modern JavaScript features');
        analysis.categories.technicalFoundation.requirements.push('Enhance with modern JavaScript frameworks');
      } else {
        analysis.categories.technicalFoundation.findings.push('❌ No modern JavaScript features');
        analysis.categories.technicalFoundation.requirements.push('Implement modern JavaScript framework');
      }
      
      // 4. Performance Features
      const performanceAnalysis = await page.evaluate(() => {
        const images = document.querySelectorAll('img');
        const optimizedImages = Array.from(images).filter(img => 
          img.src.includes('.webp') || img.src.includes('.svg') || img.hasAttribute('loading') || img.hasAttribute('srcset')
        );
        const hasLazyLoading = document.querySelectorAll('img[loading="lazy"]').length > 0;
        
        return {
          totalImages: images.length,
          optimizedImages: optimizedImages.length,
          hasLazyLoading: hasLazyLoading
        };
      });
      
      if (performanceAnalysis.hasLazyLoading) {
        analysis.categories.technicalFoundation.score += 5;
        analysis.categories.technicalFoundation.findings.push('✅ Lazy loading implemented');
        analysis.categories.technicalFoundation.requirements.push('Enhance lazy loading and image optimization');
      } else {
        analysis.categories.technicalFoundation.findings.push('❌ No lazy loading');
        analysis.categories.technicalFoundation.requirements.push('Implement comprehensive lazy loading and image optimization');
      }
      
      // ===== USER EXPERIENCE ANALYSIS =====
      console.log('\n👥 Analyzing User Experience...');
      
      // 1. Navigation Quality
      const navigationAnalysis = await page.evaluate(() => {
        const nav = document.querySelector('nav, .navigation, .menu, .navbar');
        const menuItems = document.querySelectorAll('nav a, .navigation a, .menu a, .navbar a');
        const hasBreadcrumbs = document.querySelectorAll('.breadcrumb, .breadcrumbs, [class*="breadcrumb"]').length > 0;
        
        return {
          hasNavigation: !!nav,
          menuItemCount: menuItems.length,
          hasBreadcrumbs: hasBreadcrumbs,
          navigationQuality: menuItems.length >= 5 ? 'Good' : 'Poor'
        };
      });
      
      if (navigationAnalysis.navigationQuality === 'Good') {
        analysis.categories.userExperience.score += 5;
        analysis.categories.userExperience.findings.push('✅ Comprehensive navigation menu');
        analysis.categories.userExperience.requirements.push('Enhance with mega menu and advanced navigation');
      } else {
        analysis.categories.userExperience.findings.push('❌ Limited navigation options');
        analysis.categories.userExperience.requirements.push('Implement comprehensive navigation system');
      }
      
      if (navigationAnalysis.hasBreadcrumbs) {
        analysis.categories.userExperience.score += 3;
        analysis.categories.userExperience.findings.push('✅ Breadcrumb navigation present');
      } else {
        analysis.categories.userExperience.requirements.push('Implement breadcrumb navigation');
      }
      
      // 2. Search Functionality (Detailed)
      if (searchInput > 0) {
        analysis.categories.userExperience.score += 5;
        analysis.categories.userExperience.findings.push('✅ Search functionality available');
        analysis.categories.userExperience.requirements.push('Enhance search with advanced filters and suggestions');
      } else {
        analysis.categories.userExperience.findings.push('❌ No search functionality - MAJOR UX GAP');
        analysis.categories.userExperience.requirements.push('Implement comprehensive search system with filters, suggestions, and results');
      }
      
      // 3. Content Structure
      const contentAnalysis = await page.evaluate(() => {
        const sections = document.querySelectorAll('section, .section, [class*="section"]');
        const articles = document.querySelectorAll('article, .article, [class*="article"]');
        const hasStructuredContent = sections.length > 0 || articles.length > 0;
        const hasCardLayout = document.querySelectorAll('.card, [class*="card"]').length > 0;
        
        return {
          sectionCount: sections.length,
          articleCount: articles.length,
          hasStructuredContent: hasStructuredContent,
          hasCardLayout: hasCardLayout
        };
      });
      
      if (contentAnalysis.hasStructuredContent) {
        analysis.categories.userExperience.score += 4;
        analysis.categories.userExperience.findings.push('✅ Structured content organization');
        analysis.categories.userExperience.requirements.push('Enhance with card-based layouts and better content structure');
      } else {
        analysis.categories.userExperience.findings.push('❌ Poor content structure');
        analysis.categories.userExperience.requirements.push('Implement structured content organization with cards and sections');
      }
      
      // 4. Mobile Experience
      console.log('📱 Testing mobile user experience...');
      await page.setViewportSize({ width: 375, height: 667 });
      await page.waitForTimeout(2000);
      
      const mobileAnalysis = await page.evaluate(() => {
        const mobileMenu = document.querySelector('.mobile-menu, .hamburger, .toggle-menu, [class*="mobile"], [class*="hamburger"]');
        const hasMobileMenu = !!mobileMenu;
        const touchTargets = document.querySelectorAll('a, button, input, [role="button"]');
        const smallTouchTargets = Array.from(touchTargets).filter(el => {
          const rect = el.getBoundingClientRect();
          return rect.width < 44 || rect.height < 44;
        });
        
        return {
          hasMobileMenu: hasMobileMenu,
          touchTargetCount: touchTargets.length,
          smallTouchTargetCount: smallTouchTargets.length,
          hasProperTouchTargets: smallTouchTargets.length === 0
        };
      });
      
      if (mobileAnalysis.hasMobileMenu) {
        analysis.categories.userExperience.score += 3;
        analysis.categories.userExperience.findings.push('✅ Mobile-friendly navigation');
        analysis.categories.userExperience.requirements.push('Enhance mobile navigation with better UX patterns');
      } else {
        analysis.categories.userExperience.findings.push('❌ Poor mobile navigation');
        analysis.categories.userExperience.requirements.push('Implement comprehensive mobile navigation system');
      }
      
      if (mobileAnalysis.hasProperTouchTargets) {
        analysis.categories.userExperience.score += 2;
        analysis.categories.userExperience.findings.push('✅ Proper touch target sizes');
      } else {
        analysis.categories.userExperience.requirements.push('Ensure all touch targets are at least 44x44px');
      }
      
      // Capture mobile screenshot
      await page.screenshot({ path: `${screenshotsDir}/02-mobile-old.png`, fullPage: true });
      analysis.screenshots.push('02-mobile-old.png');
      
      // Reset to desktop viewport
      await page.setViewportSize({ width: 1280, height: 720 });
      
      // ===== CONTENT ARCHITECTURE ANALYSIS =====
      console.log('\n📚 Analyzing Content Architecture...');
      
      // 1. Required Sections Check
      const requiredSections = [
        { name: 'About Us', selectors: ['a[href*="about"]', 'a[href*="tentang"]', 'a:has-text("About")', 'a:has-text("Tentang")'] },
        { name: 'Contact', selectors: ['a[href*="contact"]', 'a[href*="hubungi"]', 'a:has-text("Contact")', 'a:has-text("Hubungi")'] },
        { name: 'News', selectors: ['a[href*="news"]', 'a[href*="berita"]', 'a:has-text("News")', 'a:has-text("Berita")'] },
        { name: 'Services', selectors: ['a[href*="service"]', 'a[href*="perkhidmatan"]', 'a:has-text("Service")', 'a:has-text("Perkhidmatan")'] },
        { name: 'FAQ', selectors: ['a[href*="faq"]', 'a:has-text("FAQ")'] },
        { name: 'Client Charter', selectors: ['a[href*="charter"]', 'a[href*="piagam"]', 'a:has-text("Charter")', 'a:has-text("Piagam")'] },
        { name: 'Privacy Policy', selectors: ['a[href*="privacy"]', 'a[href*="privasi"]', 'a:has-text("Privacy")', 'a:has-text("Privasi")'] },
        { name: 'Sitemap', selectors: ['a[href*="sitemap"]', 'a[href*="peta-laman"]'] }
      ];
      
      let foundSections = 0;
      for (const section of requiredSections) {
        let found = false;
        for (const selector of section.selectors) {
          if (await page.locator(selector).count() > 0) {
            found = true;
            break;
          }
        }
        if (found) {
          foundSections++;
          analysis.categories.contentArchitecture.findings.push(`✅ ${section.name} section found`);
        } else {
          analysis.categories.contentArchitecture.findings.push(`❌ ${section.name} section missing`);
          analysis.categories.contentArchitecture.requirements.push(`Implement ${section.name} section`);
        }
      }
      
      const sectionScore = Math.round((foundSections / requiredSections.length) * 15);
      analysis.categories.contentArchitecture.score = sectionScore;
      
      // 2. Content Quality Analysis
      const contentQualityAnalysis = await page.evaluate(() => {
        const paragraphs = document.querySelectorAll('p');
        const hasRichContent = paragraphs.length > 10;
        const hasImages = document.querySelectorAll('img').length > 5;
        const hasVideos = document.querySelectorAll('video, iframe[src*="youtube"], iframe[src*="vimeo"]').length > 0;
        
        return {
          paragraphCount: paragraphs.length,
          hasRichContent: hasRichContent,
          hasImages: hasImages,
          hasVideos: hasVideos
        };
      });
      
      if (contentQualityAnalysis.hasRichContent) {
        analysis.categories.contentArchitecture.requirements.push('Enhance content with multimedia and interactive elements');
      } else {
        analysis.categories.contentArchitecture.requirements.push('Develop comprehensive content strategy');
      }
      
      // ===== PERFORMANCE ANALYSIS =====
      console.log('\n⚡ Analyzing Performance...');
      
      // 1. Page Load Time
      const startTime = Date.now();
      await page.reload();
      await page.waitForLoadState('networkidle');
      const loadTime = Date.now() - startTime;
      
      if (loadTime <= 3000) {
        analysis.categories.performance.score += 5;
        analysis.categories.performance.findings.push(`✅ Excellent load time: ${loadTime}ms`);
        analysis.categories.performance.requirements.push('Maintain fast loading times');
      } else if (loadTime <= 5000) {
        analysis.categories.performance.score += 3;
        analysis.categories.performance.findings.push(`✅ Good load time: ${loadTime}ms`);
        analysis.categories.performance.requirements.push('Optimize for sub-3 second loading');
      } else {
        analysis.categories.performance.findings.push(`❌ Slow load time: ${loadTime}ms`);
        analysis.categories.performance.requirements.push('Implement comprehensive performance optimization');
      }
      
      // 2. Resource Analysis
      const resourceAnalysis = await page.evaluate(() => {
        const scripts = document.querySelectorAll('script[src]');
        const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
        const images = document.querySelectorAll('img');
        const totalResources = scripts.length + stylesheets.length + images.length;
        
        return {
          scriptCount: scripts.length,
          stylesheetCount: stylesheets.length,
          imageCount: images.length,
          totalResources: totalResources
        };
      });
      
      if (resourceAnalysis.totalResources > 50) {
        analysis.categories.performance.requirements.push('Optimize resource loading and implement lazy loading');
      }
      
      // ===== ACCESSIBILITY ANALYSIS =====
      console.log('\n♿ Analyzing Accessibility...');
      
      // 1. Semantic HTML
      const semanticAnalysis = await page.evaluate(() => {
        const semanticElements = document.querySelectorAll('header, nav, main, section, article, aside, footer');
        const hasSemanticStructure = semanticElements.length > 0;
        
        return {
          semanticElementCount: semanticElements.length,
          hasSemanticStructure: hasSemanticStructure
        };
      });
      
      if (semanticAnalysis.hasSemanticStructure) {
        analysis.categories.accessibility.score += 5;
        analysis.categories.accessibility.findings.push('✅ Semantic HTML structure');
        analysis.categories.accessibility.requirements.push('Enhance semantic structure and add ARIA labels');
      } else {
        analysis.categories.accessibility.findings.push('❌ No semantic HTML structure');
        analysis.categories.accessibility.requirements.push('Implement comprehensive semantic HTML structure');
      }
      
      // 2. Keyboard Navigation
      const keyboardAnalysis = await page.evaluate(() => {
        const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]');
        const hasKeyboardSupport = focusableElements.length > 0;
        const hasSkipLinks = document.querySelectorAll('[href*="#main"], [href*="#content"], .skip-link').length > 0;
        
        return {
          focusableElementCount: focusableElements.length,
          hasKeyboardSupport: hasKeyboardSupport,
          hasSkipLinks: hasSkipLinks
        };
      });
      
      if (keyboardAnalysis.hasKeyboardSupport) {
        analysis.categories.accessibility.score += 3;
        analysis.categories.accessibility.findings.push('✅ Keyboard navigation support');
        analysis.categories.accessibility.requirements.push('Enhance keyboard navigation with skip links');
      } else {
        analysis.categories.accessibility.findings.push('❌ Limited keyboard navigation');
        analysis.categories.accessibility.requirements.push('Implement comprehensive keyboard navigation');
      }
      
      if (keyboardAnalysis.hasSkipLinks) {
        analysis.categories.accessibility.score += 2;
        analysis.categories.accessibility.findings.push('✅ Skip links present');
      } else {
        analysis.categories.accessibility.requirements.push('Implement skip links for accessibility');
      }
      
      // Calculate final scores
      Object.keys(analysis.categories).forEach(category => {
        const cat = analysis.categories[category];
        analysis.overallScore += cat.score;
      });
      
      const maxPossibleScore = Object.values(analysis.categories).reduce((sum, cat) => sum + cat.maxScore, 0);
      analysis.overallScore = Math.round((analysis.overallScore / maxPossibleScore) * 100);
      
      // Generate comprehensive recommendations
      analysis.improvementOpportunities = [
        'Implement comprehensive search functionality',
        'Optimize page load speed to under 3 seconds',
        'Enhance mobile user experience',
        'Implement modern CSS Grid and Flexbox layouts',
        'Add comprehensive SPLaSK tag system',
        'Enhance content structure with card-based layouts',
        'Implement advanced navigation patterns',
        'Add multimedia and interactive content',
        'Enhance accessibility with ARIA labels and skip links',
        'Implement modern JavaScript framework',
        'Add comprehensive image optimization',
        'Implement lazy loading and performance optimization'
      ];
      
      // Generate new website requirements
      analysis.newWebsiteRequirements = [
        'Modern, responsive design system',
        'Comprehensive search functionality',
        'Advanced navigation with mega menus',
        'Card-based content layouts',
        'Modern CSS Grid and Flexbox implementation',
        'Progressive Web App capabilities',
        'Advanced accessibility features',
        'Performance optimization and lazy loading',
        'Comprehensive SPLaSK compliance',
        'Modern JavaScript framework (React/Vue/Angular)',
        'Advanced content management system',
        'Multimedia and interactive content support'
      ];
      
      // Generate technical specifications
      analysis.technicalSpecifications = [
        'Modern CSS framework (Tailwind CSS, Bootstrap 5)',
        'JavaScript framework (React, Vue, or Angular)',
        'Responsive design with mobile-first approach',
        'CSS Grid and Flexbox for layouts',
        'Modern image formats (WebP, AVIF)',
        'Lazy loading and performance optimization',
        'Progressive Web App features',
        'Advanced accessibility implementation',
        'SEO optimization and meta tag management',
        'Content management system integration'
      ];
      
      // Generate content migration notes
      analysis.contentMigrationNotes = [
        'Preserve existing content structure',
        'Enhance content with modern layouts',
        'Add multimedia elements where appropriate',
        'Implement card-based content presentation',
        'Optimize images for web performance',
        'Enhance content with interactive elements',
        'Implement proper content hierarchy',
        'Add rich media and video content',
        'Enhance text content with better typography',
        'Implement content search and filtering'
      ];
      
      // Generate design recommendations
      analysis.designRecommendations = [
        'Modern, clean design aesthetic',
        'Professional color palette with excellent contrast',
        'Typography system with clear hierarchy',
        'Card-based layout system',
        'Modern iconography and illustrations',
        'Interactive elements and micro-animations',
        'Responsive design with mobile-first approach',
        'Accessibility-focused design patterns',
        'Modern navigation patterns',
        'Professional government website aesthetic'
      ];
      
      // Save comprehensive results
      const resultsFile = `${screenshotsDir}/comprehensive-analysis-results.json`;
      fs.writeFileSync(resultsFile, JSON.stringify(analysis, null, 2));
      
      // Display comprehensive results
      console.log('\n🎯 Comprehensive Analysis Complete!');
      console.log(`📊 Overall Score: ${analysis.overallScore}%`);
      console.log('\n📋 Category Scores:');
      Object.keys(analysis.categories).forEach(category => {
        const cat = analysis.categories[category];
        console.log(`  ${category}: ${cat.score}/${cat.maxScore} (${Math.round((cat.score/cat.maxScore)*100)}%)`);
      });
      
      console.log('\n🚀 Key Improvement Opportunities:');
      analysis.improvementOpportunities.slice(0, 5).forEach(opp => console.log(`  • ${opp}`));
      
      console.log('\n🏗️ New Website Requirements:');
      analysis.newWebsiteRequirements.slice(0, 5).forEach(req => console.log(`  • ${req}`));
      
      console.log(`\n📸 Screenshots saved: ${analysis.screenshots.length} files`);
      console.log(`💾 Results saved to: ${resultsFile}`);
      
    } catch (error) {
      console.error('❌ Error during comprehensive analysis:', error.message);
      analysis.detailedFindings = [`❌ Error: ${error.message}`];
      
      // Save error results
      const resultsFile = `${screenshotsDir}/comprehensive-analysis-results.json`;
      fs.writeFileSync(resultsFile, JSON.stringify(analysis, null, 2));
    }
  });
});



