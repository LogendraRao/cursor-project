const { chromium } = require('playwright');

async function checkBrokenLinks(baseUrl) {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  
  const visitedUrls = new Set();
  const brokenLinks = [];
  const validLinks = [];
  
  async function checkLink(url, sourceUrl = null) {
    if (visitedUrls.has(url)) {
      return;
    }
    
    visitedUrls.add(url);
    
    try {
      console.log(`Checking: ${url}`);
      
      const response = await page.goto(url, { 
        waitUntil: 'networkidle',
        timeout: 30000 
      });
      
      if (!response || response.status() >= 400) {
        brokenLinks.push({
          url: url,
          status: response ? response.status() : 'No response',
          sourceUrl: sourceUrl
        });
        console.log(`❌ BROKEN: ${url} (Status: ${response ? response.status() : 'No response'})`);
      } else {
        validLinks.push(url);
        console.log(`✅ OK: ${url} (Status: ${response.status()})`);
        
        // Only crawl internal links from the same domain
        if (url.startsWith(baseUrl)) {
          const links = await page.$$eval('a[href]', anchors => 
            anchors.map(anchor => anchor.href).filter(href => href && href.trim() !== '')
          );
          
          for (const link of links) {
            // Convert relative URLs to absolute
            let absoluteUrl;
            try {
              absoluteUrl = new URL(link, url).href;
            } catch (e) {
              console.log(`⚠️  Invalid URL: ${link}`);
              continue;
            }
            
            // Only check links from the same domain or external links
            if (absoluteUrl.startsWith(baseUrl) || !absoluteUrl.startsWith(baseUrl)) {
              await checkLink(absoluteUrl, url);
            }
          }
        }
      }
    } catch (error) {
      brokenLinks.push({
        url: url,
        status: 'Error',
        error: error.message,
        sourceUrl: sourceUrl
      });
      console.log(`❌ ERROR: ${url} - ${error.message}`);
    }
  }
  
  await checkLink(baseUrl);
  
  await browser.close();
  
  return {
    brokenLinks,
    validLinks,
    totalChecked: visitedUrls.size
  };
}

async function main() {
  const targetUrl = 'https://astana-dental-dr-afiq.replit.app/';
  
  console.log(`🔍 Starting broken link check for: ${targetUrl}`);
  console.log('=====================================\n');
  
  const results = await checkBrokenLinks(targetUrl);
  
  console.log('\n=====================================');
  console.log('📊 SUMMARY REPORT');
  console.log('=====================================');
  console.log(`Total links checked: ${results.totalChecked}`);
  console.log(`Valid links: ${results.validLinks.length}`);
  console.log(`Broken links: ${results.brokenLinks.length}`);
  
  if (results.brokenLinks.length > 0) {
    console.log('\n❌ BROKEN LINKS FOUND:');
    console.log('======================');
    results.brokenLinks.forEach((link, index) => {
      console.log(`${index + 1}. URL: ${link.url}`);
      console.log(`   Status: ${link.status}`);
      if (link.error) {
        console.log(`   Error: ${link.error}`);
      }
      if (link.sourceUrl) {
        console.log(`   Found on: ${link.sourceUrl}`);
      }
      console.log('');
    });
  } else {
    console.log('\n✅ No broken links found! All links are working properly.');
  }
}

main().catch(console.error);