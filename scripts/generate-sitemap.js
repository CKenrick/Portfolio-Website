#!/usr/bin/env node

/**
 * Generate Sitemap Script
 * Dynamically generates sitemap.xml for the portfolio
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const config = {
  baseUrl: 'https://chriskenrick.dev',
  outputPath: path.join(__dirname, '../public/sitemap.xml'),
  lastModified: new Date().toISOString(),
  changefreq: {
    home: 'weekly',
    about: 'monthly',
    projects: 'weekly',
    resume: 'monthly',
    contact: 'monthly'
  },
  priority: {
    home: 1.0,
    about: 0.8,
    projects: 0.9,
    resume: 0.7,
    contact: 0.6
  }
};

// Define site structure
const siteStructure = [
  {
    path: '/',
    section: 'home',
    title: 'Home'
  },
  {
    path: '/#about',
    section: 'about',
    title: 'About'
  },
  {
    path: '/#projects',
    section: 'projects',
    title: 'Projects'
  },
  {
    path: '/#resume',
    section: 'resume',
    title: 'Resume'
  },
  {
    path: '/#contact',
    section: 'contact',
    title: 'Contact'
  }
];

// Generate sitemap XML
const generateSitemap = () => {
  const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
  const xmlNamespace = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9 http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">';
  
  const urls = siteStructure.map(page => {
    const url = `${config.baseUrl}${page.path}`;
    const lastmod = config.lastModified;
    const changefreq = config.changefreq[page.section] || 'monthly';
    const priority = config.priority[page.section] || 0.5;
    
    return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
  }).join('\n');
  
  const xmlFooter = '</urlset>';
  
  return `${xmlHeader}
${xmlNamespace}
  
  <!-- Homepage -->
${urls}
  
  <!-- Static Assets -->
  <url>
    <loc>${config.baseUrl}/manifest.json</loc>
    <lastmod>${config.lastModified}</lastmod>
    <changefreq>yearly</changefreq>
    <priority>0.3</priority>
  </url>
  
${xmlFooter}`;
};

// Write sitemap to file
const writeSitemap = () => {
  try {
    const sitemapContent = generateSitemap();
    fs.writeFileSync(config.outputPath, sitemapContent, 'utf8');
    //console.log(`✅ Sitemap generated successfully at: ${config.outputPath}`);
    
    // Validate the generated XML
    const stats = fs.statSync(config.outputPath);
    //console.log(`📊 Sitemap size: ${stats.size} bytes`);
    //console.log(`📝 Pages included: ${siteStructure.length}`);
    //console.log(`🔗 Base URL: ${config.baseUrl}`);
    //console.log(`⏰ Last modified: ${config.lastModified}`);
    
  } catch (error) {
    console.error('❌ Error generating sitemap:', error);
    process.exit(1);
  }
};

// Generate robots.txt if it doesn't exist
const generateRobotsTxt = () => {
  const robotsPath = path.join(__dirname, '../public/robots.txt');
  
  if (!fs.existsSync(robotsPath)) {
    const robotsContent = `User-agent: *
Allow: /

# Disallow admin or sensitive areas
Disallow: /admin/
Disallow: /private/
Disallow: /*.json$
Disallow: /src/
Disallow: /scripts/
Disallow: /config/

# Allow important files
Allow: /sitemap.xml
Allow: /manifest.json
Allow: /favicon.ico
Allow: /*.css$
Allow: /*.js$
Allow: /*.png$
Allow: /*.jpg$
Allow: /*.jpeg$
Allow: /*.svg$
Allow: /*.webp$

# Sitemap location
Sitemap: ${config.baseUrl}/sitemap.xml

# Crawl delay
Crawl-delay: 1

# Specific directives for major search engines
User-agent: Googlebot
Allow: /
Crawl-delay: 1

User-agent: Bingbot
Allow: /
Crawl-delay: 1

User-agent: facebookexternalhit
Allow: /

User-agent: Twitterbot
Allow: /

# Block bad bots
User-agent: AhrefsBot
Disallow: /

User-agent: MJ12bot
Disallow: /`;

    fs.writeFileSync(robotsPath, robotsContent, 'utf8');
    //console.log(`✅ Robots.txt generated successfully at: ${robotsPath}`);
  } else {
    //console.log(`ℹ️  Robots.txt already exists at: ${robotsPath}`);
  }
};

// Main execution
const main = () => {
  //console.log('🚀 Starting sitemap generation...');
  
  // Ensure public directory exists
  const publicDir = path.join(__dirname, '../public');
  if (!fs.existsSync(publicDir)) {
    fs.mkdirSync(publicDir, { recursive: true });
    //console.log(`📁 Created public directory: ${publicDir}`);
  }
  
  // Generate sitemap
  writeSitemap();
  
  // Generate robots.txt if needed
  generateRobotsTxt();
  
  //console.log('✨ SEO files generation completed!');
};

// Run the script
if (require.main === module) {
  main();
}

module.exports = {
  generateSitemap,
  writeSitemap,
  generateRobotsTxt,
  config
}; 