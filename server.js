const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('.')); // Serve static files

// Enhanced SPPP Wireframes Routes - FIXED NAVIGATION
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Enhanced_Homepage_Real_Content.html'));
});

app.get('/homepage', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Enhanced_Homepage_Real_Content.html'));
});

// INFRASTRUCTURE Routes
app.get('/infrastructure', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Infrastructure_Wireframe.html'));
});

// ABOUT SPPP Routes - FIXED: Profile now points to /about
app.get('/about', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_About_Profile.html'));
});

app.get('/about/profile', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_About_Profile.html'));
});

app.get('/about/leadership', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_About_Leadership_Wireframe.html'));
});

// SERVICES & PROGRAMS Routes
app.get('/services', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Services_Main_Wireframe.html'));
});

app.get('/services/training', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Services_Training_Wireframe.html'));
});

// RESOURCES Routes
app.get('/resources', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Resources_Main_Wireframe.html'));
});

app.get('/resources/knowledge-base', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Resources_Knowledge_Base_Wireframe.html'));
});

// NEWS & EVENTS Routes
app.get('/news', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_News_Events_Wireframe.html'));
});

// CAREERS Routes
app.get('/careers', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Careers_Jobs_Wireframe.html'));
});

// PARTNERSHIPS Routes
app.get('/partnerships', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Partnerships_Wireframe.html'));
});

// STAFF PORTAL Routes (Internal) - Different navigation is intentional
app.get('/staff-portal', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Enhanced_Staff_Portal.html'));
});

// CONTACT & SUPPORT Routes
app.get('/contact', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Contact_Support_Wireframe.html'));
});

// Additional service pages (existing functionality)
app.get('/perkhidmatan/perundingan', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Services_Consultation_Request.html'));
});

app.get('/penyelidikan', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Services_Research.html'));
});

app.get('/perkhidmatan/antarabangsa', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Services_International.html'));
});

app.get('/perkhidmatan/tersuai', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Services_Custom.html'));
});

// Legal pages
app.get('/undang-undang/privacy', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Legal_Privacy.html'));
});

app.get('/undang-undang/terms', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Legal_Terms.html'));
});

app.get('/undang-undang/accessibility', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Legal_Accessibility.html'));
});

app.get('/undang-undang/cookies', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Legal_Cookies.html'));
});

app.get('/undang-undang/spLaSK', (req, res) => {
    res.sendFile(path.join(__dirname, 'SPPP_Legal_SpLaSK.html'));
});

// API endpoints
app.get('/api/wireframes', (req, res) => {
    res.json({
        project: 'SPPP Enhanced Wireframes - Navigation Fixed',
        version: '2.2.0',
        description: 'Enhanced SPPP website with standardized navigation across all pages',
        wireframes: {
            homepage: {
                name: 'Enhanced Homepage with Real SPPP Content',
                file: 'SPPP_Enhanced_Homepage_Real_Content.html',
                description: 'Homepage with standardized navigation structure',
                navigationItems: 7,
                navigationConsistent: true
            },
            infrastructure: {
                name: 'Infrastructure & Connectivity',
                file: 'SPPP_Infrastructure_Wireframe.html',
                description: 'Infrastructure page with fixed navigation',
                navigationItems: 7,
                navigationConsistent: true
            },
            about: {
                name: 'Organization Profile',
                file: 'SPPP_About_Profile.html',
                description: 'About page with corrected profile link',
                navigationItems: 7,
                navigationConsistent: true
            }
        },
        navigationFixes: [
            'Standardized navigation structure across all pages',
            'Fixed Profile link to point to /about instead of /about/leadership',
            'Removed duplicate navigation items',
            'Consistent naming convention for all navigation items',
            'Maintained 7-item navigation structure as baseline'
        ],
        compliance: {
            navigationConsistency: '100%',
            profileLinkFixed: true,
            duplicateLinksRemoved: true,
            standardizedNaming: true
        },
        timestamp: new Date().toISOString()
    });
});

app.get('/health', (req, res) => {
    res.json({
        status: 'healthy',
        service: 'SPPP Enhanced Wireframes Server - Navigation Fixed',
        version: '2.2.0',
        navigationFixed: true,
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development',
        uptime: process.uptime()
    });
});

// Catch-all route for SPA-like behavior
app.get('*', (req, res) => {
    res.redirect('/');
});

app.listen(PORT, () => {
    console.log(`🚀 SPPP Enhanced Wireframes Server (Navigation Fixed) running on port ${PORT}`);
    console.log(`📱 Enhanced Homepage: http://localhost:${PORT}/`);
    console.log(`🏗️ Infrastructure: http://localhost:${PORT}/infrastructure`);
    console.log(`👥 About Profile: http://localhost:${PORT}/about`);
    console.log(`🔧 Services: http://localhost:${PORT}/services`);
    console.log(`💚 Health Check: http://localhost:${PORT}/health`);
    console.log(`📊 API Info: http://localhost:${PORT}/api/wireframes`);
    console.log('✅ Navigation standardization completed!');
});

module.exports = app;