#!/usr/bin/env node

/**
 * SEO Validation Script
 * Validates that all SEO improvements are working correctly
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//console.log('🔍 Validating SEO Implementation...\n');

// Check if essential files exist
const requiredFiles = [
  'public/robots.txt',
  'public/sitemap.xml', 
  'src/utils/seo.js',
  'src/hooks/useSEO.js',
  'src/components/dev/SEODashboard.jsx',
  'scripts/generate-sitemap.js',
  'index.html'
];

let allFilesExist = true;

requiredFiles.forEach(file => {
  const filePath = path.join(__dirname, '..', file);
  if (fs.existsSync(filePath)) {
    //console.log(`✅ ${file} - Found`);
  } else {
    //console.log(`❌ ${file} - Missing`);
    allFilesExist = false;
  }
});

//console.log('\n📄 Checking HTML Meta Tags...');

// Check HTML file for SEO elements
const htmlPath = path.join(__dirname, '..', 'index.html');
if (fs.existsSync(htmlPath)) {
  const html = fs.readFileSync(htmlPath, 'utf8');
  
  const seoChecks = [
    { name: 'Title Tag', pattern: /<title>.*<\/title>/, required: true },
    { name: 'Meta Description', pattern: /<meta name="description"/, required: true },
    { name: 'Meta Keywords', pattern: /<meta name="keywords"/, required: true },
    { name: 'OpenGraph Title', pattern: /<meta property="og:title"/, required: true },
    { name: 'OpenGraph Description', pattern: /<meta property="og:description"/, required: true },
    { name: 'Twitter Card', pattern: /<meta name="twitter:card"/, required: true },
    { name: 'Canonical URL', pattern: /<link rel="canonical"/, required: true },
    { name: 'JSON-LD Schema', pattern: /<script type="application\/ld\+json">/, required: true },
    { name: 'Robots Meta', pattern: /<meta name="robots"/, required: true }
  ];
  
  seoChecks.forEach(check => {
    if (html.match(check.pattern)) {
      //console.log(`✅ ${check.name} - Present`);
    } else {
      //console.log(`${check.required ? '❌' : '⚠️'} ${check.name} - ${check.required ? 'Missing' : 'Optional'}`);
      if (check.required) allFilesExist = false;
    }
  });
}

//console.log('\n🤖 Checking robots.txt...');

const robotsPath = path.join(__dirname, '..', 'public', 'robots.txt');
if (fs.existsSync(robotsPath)) {
  const robots = fs.readFileSync(robotsPath, 'utf8');
  
  const robotsChecks = [
    'User-agent:',
    'Allow:',
    'Sitemap:',
    'Crawl-delay:'
  ];
  
  robotsChecks.forEach(check => {
    if (robots.includes(check)) {
      //console.log(`✅ ${check} directive - Present`);
    } else {
      //console.log(`❌ ${check} directive - Missing`);
    }
  });
}

//console.log('\n🗺️ Checking sitemap.xml...');

const sitemapPath = path.join(__dirname, '..', 'public', 'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  const sitemap = fs.readFileSync(sitemapPath, 'utf8');
  
  const sitemapChecks = [
    '<urlset',
    '<url>',
    '<loc>',
    '<lastmod>',
    '<changefreq>',
    '<priority>'
  ];
  
  sitemapChecks.forEach(check => {
    if (sitemap.includes(check)) {
      //console.log(`✅ ${check} element - Present`);
    } else {
      //console.log(`❌ ${check} element - Missing`);
    }
  });
  
  // Count URLs
  const urlCount = (sitemap.match(/<url>/g) || []).length;
  //console.log(`📊 Total URLs in sitemap: ${urlCount}`);
}

//console.log('\n📦 Checking package.json scripts...');

const packagePath = path.join(__dirname, '..', 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  const requiredScripts = [
    'generate-sitemap',
    'seo-setup'
  ];
  
  requiredScripts.forEach(script => {
    if (packageJson.scripts && packageJson.scripts[script]) {
      //console.log(`✅ ${script} script - Available`);
    } else {
      //console.log(`❌ ${script} script - Missing`);
    }
  });
}

//console.log('\n' + '='.repeat(50));

if (allFilesExist) {
  //console.log('🎉 SEO Implementation Validation: PASSED');
  //console.log('✨ All required SEO components are properly implemented!');
  //console.log('\n📋 Available Commands:');
  //console.log('  npm run generate-sitemap  - Update sitemap.xml');
  //console.log('  npm run seo-setup         - Complete SEO setup');
  //console.log('  npm start                 - Start dev server with SEO dashboard');
  //console.log('\n🔧 Development Features:');
  //console.log('  • SEO Dashboard available at localhost:3000 (development only)');
  //console.log('  • Real-time SEO monitoring and recommendations');
  //console.log('  • Automatic meta tag updates based on scroll position');
  //console.log('  • Performance tracking and user engagement metrics');
} else {
  //console.log('❌ SEO Implementation Validation: FAILED');
  //console.log('⚠️  Some required components are missing. Please check the output above.');
}

//console.log('\n📈 Expected Benefits:');
//console.log('  • Improved search engine visibility');
//console.log('  • Enhanced social media sharing');
//console.log('  • Better crawling and indexing');
//console.log('  • Professional online presence');
//console.log('  • Real-time SEO monitoring');

//console.log('\n📚 Documentation: docs/SEO_IMPLEMENTATION.md');
//console.log('='.repeat(50)); 