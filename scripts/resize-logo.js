// Logo Resizer Script for CampusStream
// This script uses Sharp library to resize your 1024x1024 logo to all required sizes

const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const INPUT_LOGO = path.join(__dirname, '../public/logo-original.png');
const OUTPUT_DIR = path.join(__dirname, '../public');

// Required logo sizes for PWA and web
const sizes = [
  { name: 'logo-16.png', width: 16, height: 16 },
  { name: 'logo-32.png', width: 32, height: 32 },
  { name: 'logo-192.png', width: 192, height: 192 },
  { name: 'logo-512.png', width: 512, height: 512 },
  { name: 'apple-touch-icon.png', width: 180, height: 180 },
  { name: 'og-image.png', width: 1200, height: 630, fit: 'contain', background: '#ffffff' },
];

async function resizeLogos() {
  try {
    // Check if input logo exists
    if (!fs.existsSync(INPUT_LOGO)) {
      console.error('❌ Error: logo-original.png not found in public/ folder');
      console.log('📁 Please place your 1024x1024 logo at: public/logo-original.png');
      process.exit(1);
    }

    console.log('🎨 Starting logo resize process...\n');

    // Resize to all required sizes
    for (const size of sizes) {
      const outputPath = path.join(OUTPUT_DIR, size.name);
      
      const options = {
        width: size.width,
        height: size.height,
        fit: size.fit || 'cover',
      };

      if (size.background) {
        options.background = size.background;
      }

      await sharp(INPUT_LOGO)
        .resize(options)
        .png()
        .toFile(outputPath);

      console.log(`✅ Created: ${size.name} (${size.width}x${size.height})`);
    }

    // Create favicon.ico (multi-resolution)
    const faviconPath = path.join(OUTPUT_DIR, 'favicon.ico');
    await sharp(INPUT_LOGO)
      .resize(32, 32)
      .png()
      .toFile(faviconPath.replace('.ico', '-temp.png'));

    // Rename temp to ico (Note: true ICO format requires additional library)
    fs.renameSync(faviconPath.replace('.ico', '-temp.png'), faviconPath.replace('.ico', '.png'));
    console.log('✅ Created: favicon.png (32x32) - Use as favicon');

    console.log('\n🎉 Logo resizing complete!');
    console.log('📦 Generated files in public/ folder:');
    sizes.forEach(size => console.log(`   - ${size.name}`));
    console.log('   - favicon.png\n');

  } catch (error) {
    console.error('❌ Error resizing logos:', error.message);
    process.exit(1);
  }
}

resizeLogos();
