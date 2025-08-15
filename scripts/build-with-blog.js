#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Building Portfolio with Blog...\n');

try {
  // Build the main portfolio
  console.log('📦 Building main portfolio...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Portfolio build completed!\n');

  // Build the blog
  console.log('📝 Building blog...');
  process.chdir('blog');
  execSync('npm run build', { stdio: 'inherit' });
  process.chdir('..');
  console.log('✅ Blog build completed!\n');

  // Copy blog build to portfolio build directory
  console.log('🔗 Copying blog to portfolio build...');
  const blogBuildPath = path.join(__dirname, '../blog/out');
  const portfolioBuildPath = path.join(__dirname, '../build');
  const blogDestPath = path.join(portfolioBuildPath, 'blog');

  // Ensure build directory exists
  if (!fs.existsSync(portfolioBuildPath)) {
    console.error('❌ Portfolio build directory not found! Make sure portfolio build completed successfully.');
    process.exit(1);
  }

  // Remove existing blog directory if it exists
  if (fs.existsSync(blogDestPath)) {
    fs.rmSync(blogDestPath, { recursive: true, force: true });
  }

  // Copy blog build
  if (fs.existsSync(blogBuildPath)) {
    fs.cpSync(blogBuildPath, blogDestPath, { recursive: true });
    console.log('✅ Blog copied to portfolio build!\n');
  } else {
    console.error('❌ Blog build directory not found! Make sure blog build completed successfully.');
    process.exit(1);
  }

  // Create a simple redirect for the blog root
  const blogIndexContent = `<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>Redirecting to Blog...</title>
  <meta http-equiv="refresh" content="0; url=/blog/">
  <link rel="canonical" href="/blog/">
</head>
<body>
  <p>If you are not redirected automatically, follow this <a href="/blog/">link to the blog</a>.</p>
</body>
</html>`;

  fs.writeFileSync(path.join(blogDestPath, 'index.html'), blogIndexContent);

  console.log('🎉 Build completed successfully!');
  console.log('📁 Portfolio: ./build/');
  console.log('📁 Blog: ./build/blog/');
  console.log('\n💡 You can now deploy the ./build directory to your hosting provider.');
  console.log('🌐 Blog will be accessible at: https://yourdomain.com/blog');

} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}