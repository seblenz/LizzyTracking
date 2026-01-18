#!/usr/bin/env node
/**
 * LizzyTracker - Icon Generator Script
 * Generates PWA icons from the SVG source
 *
 * Usage: node setup-icons.js
 *
 * Prerequisites:
 * npm install sharp
 *
 * Or use the generate-icons.html file in a browser to manually generate icons.
 */

const fs = require('fs');
const path = require('path');

// Check if sharp is available
let sharp;
try {
    sharp = require('sharp');
} catch (e) {
    console.log('Sharp module not found. Installing...');
    console.log('Run: npm install sharp');
    console.log('');
    console.log('Alternatively, open generate-icons.html in your browser to generate icons manually.');
    process.exit(1);
}

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];
const iconsDir = path.join(__dirname, 'icons');
const svgPath = path.join(iconsDir, 'icon.svg');

async function generateIcons() {
    console.log('Generating PWA icons...\n');

    // Ensure icons directory exists
    if (!fs.existsSync(iconsDir)) {
        fs.mkdirSync(iconsDir, { recursive: true });
    }

    // Check if SVG exists
    if (!fs.existsSync(svgPath)) {
        console.error('SVG icon not found at:', svgPath);
        process.exit(1);
    }

    for (const size of sizes) {
        const outputPath = path.join(iconsDir, `icon-${size}.png`);

        try {
            await sharp(svgPath)
                .resize(size, size)
                .png()
                .toFile(outputPath);

            console.log(`Generated: icon-${size}.png`);
        } catch (error) {
            console.error(`Failed to generate icon-${size}.png:`, error.message);
        }
    }

    console.log('\nIcon generation complete!');
    console.log('Icons saved to:', iconsDir);
}

generateIcons().catch(console.error);
