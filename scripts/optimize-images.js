import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configuration
const INPUT_DIR = path.join(__dirname, '../src/images');
const OUTPUT_DIR = path.join(__dirname, '../src/images/optimized');
const QUALITY = 80;

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

// Image sizes to generate
const SIZES = {
  thumbnail: 150,
  small: 320,
  medium: 640,
  large: 1200,
  xlarge: 1920
};

async function optimizeImage(inputPath, filename) {
  const name = path.parse(filename).name;
  const ext = path.parse(filename).ext.toLowerCase();
  
  // Skip if not a raster image
  if (!['.jpg', '.jpeg', '.png', '.gif', '.webp'].includes(ext)) {
    console.log(`Skipping ${filename} - not a raster image`);
    return;
  }

  console.log(`Processing ${filename}...`);

  try {
    const image = sharp(inputPath);
    const metadata = await image.metadata();
    
    console.log(`Original: ${metadata.width}x${metadata.height}, ${metadata.format}`);

    // Generate different sizes
    for (const [sizeName, width] of Object.entries(SIZES)) {
      // Skip if original is smaller than target size
      if (metadata.width < width && sizeName !== 'thumbnail') {
        continue;
      }

      const actualWidth = Math.min(width, metadata.width);
      
      // Generate JPEG version
      const jpegPath = path.join(OUTPUT_DIR, `${name}-${sizeName}.jpg`);
      await image
        .resize(actualWidth, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .jpeg({ quality: QUALITY, progressive: true })
        .toFile(jpegPath);

      // Generate WebP version
      const webpPath = path.join(OUTPUT_DIR, `${name}-${sizeName}.webp`);
      await image
        .resize(actualWidth, null, { 
          withoutEnlargement: true,
          fit: 'inside'
        })
        .webp({ quality: QUALITY })
        .toFile(webpPath);

      console.log(`  Generated ${sizeName}: ${actualWidth}px (JPEG & WebP)`);
    }

    // Generate a blur placeholder (very small, base64 encoded)
    const placeholderPath = path.join(OUTPUT_DIR, `${name}-placeholder.jpg`);
    const placeholderBuffer = await image
      .resize(20, null, { 
        withoutEnlargement: true,
        fit: 'inside'
      })
      .jpeg({ quality: 50 })
      .toBuffer();

    // Write placeholder and also save as data URL
    fs.writeFileSync(placeholderPath, placeholderBuffer);
    
    const placeholderDataURL = `data:image/jpeg;base64,${placeholderBuffer.toString('base64')}`;
    const placeholderJSPath = path.join(OUTPUT_DIR, `${name}-placeholder.js`);
    fs.writeFileSync(placeholderJSPath, `export default "${placeholderDataURL}";`);
    
    console.log(`  Generated placeholder: 20px (JPEG & Data URL)`);
    
  } catch (error) {
    console.error(`Error processing ${filename}:`, error);
  }
}

async function processDirectory() {
  console.log('Starting image optimization...\n');
  
  const files = fs.readdirSync(INPUT_DIR);
  
  for (const file of files) {
    const filePath = path.join(INPUT_DIR, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile()) {
      await optimizeImage(filePath, file);
      console.log(''); // Empty line for readability
    }
  }
  
  console.log('Image optimization complete!');
  
  // Generate index file for easier imports
  generateIndexFile();
}

function generateIndexFile() {
  const files = fs.readdirSync(OUTPUT_DIR);
  const imageGroups = {};
  
  // Group files by base name
  files.forEach(file => {
    const match = file.match(/^(.+?)-(thumbnail|small|medium|large|xlarge|placeholder)\.(jpg|webp|js)$/);
    if (match) {
      const [, baseName, size, ext] = match;
      if (!imageGroups[baseName]) {
        imageGroups[baseName] = {};
      }
      if (!imageGroups[baseName][size]) {
        imageGroups[baseName][size] = {};
      }
      imageGroups[baseName][size][ext] = file;
    }
  });
  
  // Generate index.js
  let indexContent = '// Auto-generated image optimization index\n\n';
  
  Object.entries(imageGroups).forEach(([baseName, sizes]) => {
    const camelCaseName = baseName.replace(/[-_](.)/g, (_, letter) => letter.toUpperCase());
    
    indexContent += `export const ${camelCaseName} = {\n`;
    
    Object.entries(sizes).forEach(([size, formats]) => {
      indexContent += `  ${size}: {\n`;
      Object.entries(formats).forEach(([ext, filename]) => {
        if (ext === 'js') {
          indexContent += `    placeholder: () => import('./${filename}').then(m => m.default),\n`;
        } else {
          indexContent += `    ${ext}: '/src/images/optimized/${filename}',\n`;
        }
      });
      indexContent += `  },\n`;
    });
    
    indexContent += `};\n\n`;
  });
  
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.js'), indexContent);
  console.log('Generated index.js for optimized images');
}

// Run the optimization
processDirectory().catch(console.error); 