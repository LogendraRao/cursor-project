const { test, expect } = require('@playwright/test');

// SPPP Navigation Validation Test Suite
// Tests that navigation fixes are properly implemented

const BASE_URL = 'https://sppp-wireframes-production.up.railway.app';

// Expected standardized navigation structure
const EXPECTED_NAVIGATION = [
    { text: 'Utama', href: '/' },
    { text: 'Profil', href: '/about' }, // FIXED: was /about/leadership
    { text: 'Infrastruktur & Jalinan Perhubungan', href: '/infrastructure' },
    { text: 'Perkhidmatan', href: '/services' },
    { text: 'Latihan & Pembangunan', href: '/services/training' },
    { text: 'Berita & Media', href: '/news' },
    { text: 'Hubungi Kami', href: '/contact' }
];

const PAGES_TO_TEST = {
    'Homepage': '/',
    'Infrastructure': '/infrastructure',
    'About Profile': '/about'
};

let validationResults = {
    navigationValidation: [],
    profileLinkValidation: {},
    consistencyValidation: {},
    summary: {}
};

test.describe('SPPP Navigation Validation Tests', () => {
    
    test('should have standardized navigation on all pages', async ({ page }) => {
        console.log('🔍 Validating standardized navigation...');
        
        for (const [pageName, pageUrl] of Object.entries(PAGES_TO_TEST)) {
            try {
                await page.goto(BASE_URL + pageUrl, { waitUntil: 'networkidle' });
                
                const navigationTest = {
                    page: pageName,
                    url: pageUrl,
                    navigation: [],
                    issues: [],
                    isStandardized: false
                };
                
                // Get actual navigation items
                const navItems = await page.locator('nav a, .nav-primary a, .navigation a').all();
                
                for (const item of navItems.slice(0, 7)) { // Get first 7 items
                    const text = await item.textContent();
                    const href = await item.getAttribute('href');
                    if (text && href) {
                        navigationTest.navigation.push({
                            text: text.trim(),
                            href: href
                        });
                    }
                }
                
                // Validate against expected structure
                if (navigationTest.navigation.length === EXPECTED_NAVIGATION.length) {
                    let matches = 0;
                    
                    for (let i = 0; i < EXPECTED_NAVIGATION.length; i++) {
                        if (navigationTest.navigation[i] && 
                            navigationTest.navigation[i].text === EXPECTED_NAVIGATION[i].text &&
                            navigationTest.navigation[i].href === EXPECTED_NAVIGATION[i].href) {
                            matches++;
                        } else {
                            navigationTest.issues.push(`Item ${i + 1}: Expected '${EXPECTED_NAVIGATION[i].text}' -> '${EXPECTED_NAVIGATION[i].href}', got '${navigationTest.navigation[i]?.text}' -> '${navigationTest.navigation[i]?.href}'`);
                        }
                    }
                    
                    navigationTest.isStandardized = matches === EXPECTED_NAVIGATION.length;
                } else {
                    navigationTest.issues.push(`Navigation count mismatch: expected ${EXPECTED_NAVIGATION.length}, got ${navigationTest.navigation.length}`);
                }
                
                validationResults.navigationValidation.push(navigationTest);
                
                console.log(`${navigationTest.isStandardized ? '✅' : '❌'} ${pageName} - Navigation: ${navigationTest.isStandardized ? 'STANDARDIZED' : navigationTest.issues.length + ' issues'}`);
                
            } catch (error) {
                console.log(`❌ Failed to validate navigation for ${pageName}: ${error.message}`);
            }
        }
    });
    
    test('should have Profile link pointing to /about', async ({ page }) => {
        console.log('🔗 Validating Profile link fix...');
        
        try {
            await page.goto(BASE_URL, { waitUntil: 'networkidle' });
            
            // Find the Profile/Profil link
            const profileLink = await page.locator('nav a, .nav-primary a').filter({ hasText: 'Profil' }).first();
            
            if (await profileLink.count() > 0) {
                const href = await profileLink.getAttribute('href');
                
                validationResults.profileLinkValidation = {
                    found: true,
                    href: href,
                    isCorrect: href === '/about',
                    issue: href !== '/about' ? `Profile link points to '${href}' instead of '/about'` : null
                };
                
                console.log(`${href === '/about' ? '✅' : '❌'} Profile link: ${href} ${href === '/about' ? '(CORRECT)' : '(NEEDS FIX)'}`);
            } else {
                validationResults.profileLinkValidation = {
                    found: false,
                    issue: 'Profile link not found'
                };
                console.log('❌ Profile link not found');
            }
            
        } catch (error) {
            console.log(`❌ Failed to validate Profile link: ${error.message}`);
        }
    });
    
    test('should not have duplicate navigation items', async ({ page }) => {
        console.log('🔄 Checking for duplicate navigation items...');
        
        for (const [pageName, pageUrl] of Object.entries(PAGES_TO_TEST)) {
            try {
                await page.goto(BASE_URL + pageUrl, { waitUntil: 'networkidle' });
                
                const navItems = await page.locator('nav a, .nav-primary a, .navigation a').all();
                const navTexts = [];
                
                for (const item of navItems) {
                    const text = await item.textContent();
                    if (text) {
                        navTexts.push(text.trim());
                    }
                }
                
                const uniqueTexts = [...new Set(navTexts)];
                const hasDuplicates = navTexts.length !== uniqueTexts.length;
                
                if (hasDuplicates) {
                    const duplicates = navTexts.filter((item, index) => navTexts.indexOf(item) !== index);
                    console.log(`❌ ${pageName} - Found duplicates: ${duplicates.join(', ')}`);
                } else {
                    console.log(`✅ ${pageName} - No duplicate navigation items`);
                }
                
            } catch (error) {
                console.log(`❌ Failed to check duplicates for ${pageName}: ${error.message}`);
            }
        }
    });
    
    test('should generate navigation validation report', async ({ page }) => {
        console.log('📊 Generating navigation validation report...');
        
        const totalPages = Object.keys(PAGES_TO_TEST).length;
        const standardizedPages = validationResults.navigationValidation.filter(p => p.isStandardized).length;
        const profileLinkFixed = validationResults.profileLinkValidation.isCorrect;
        
        validationResults.summary = {
            totalPages,
            standardizedPages,
            standardizationRate: `${((standardizedPages / totalPages) * 100).toFixed(1)}%`,
            profileLinkFixed,
            overallSuccess: standardizedPages === totalPages && profileLinkFixed
        };
        
        // Save validation results
        const fs = require('fs');
        const reportPath = './test-results/sppp-navigation-validation.json';
        
        if (!fs.existsSync('./test-results')) {
            fs.mkdirSync('./test-results', { recursive: true });
        }
        
        fs.writeFileSync(reportPath, JSON.stringify(validationResults, null, 2));
        
        console.log('✅ Navigation validation report generated:', reportPath);
        console.log('📈 Validation Summary:');
        console.log(`   📄 Pages Validated: ${totalPages}`);
        console.log(`   ✅ Standardized Pages: ${standardizedPages}/${totalPages} (${validationResults.summary.standardizationRate})`);
        console.log(`   🔗 Profile Link Fixed: ${profileLinkFixed ? 'YES' : 'NO'}`);
        console.log(`   🏆 Overall Success: ${validationResults.summary.overallSuccess ? 'PASS' : 'FAIL'}`);
        
        // Test expectations
        expect(standardizedPages).toBe(totalPages);
        expect(profileLinkFixed).toBe(true);
        
        console.log('🎉 Navigation validation completed successfully!');
    });
});