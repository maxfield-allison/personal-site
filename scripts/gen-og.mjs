// Regenerate the Open Graph image from scripts/og.svg into public/og.png.
// Run: pnpm og
import sharp from 'sharp';

await sharp('scripts/og.svg', { density: 150 })
  .resize(1200, 630)
  .png()
  .toFile('public/og.png');

console.log('public/og.png regenerated');
