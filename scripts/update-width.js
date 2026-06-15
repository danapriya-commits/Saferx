const fs = require('fs');
const path = require('path');

const targetDir = 'e:\\dataprox360\\saferx-main';

const files = [
  'app/contact/page.tsx',
  'app/about/page.tsx',
  'components/site-footer.tsx',
  'components/section.tsx',
  'components/home/why-choose.tsx',
  'components/home/testimonials.tsx',
  'components/home/projects.tsx',
  'components/home/featured-solutions.tsx',
  'components/home/hero.tsx',
  'components/home/equipment-categories.tsx',
  'components/home/cta.tsx',
  'components/home/certifications.tsx',
  'components/home/blog-preview.tsx',
  'components/site-header.tsx'
];

for (const file of files) {
  const fullPath = path.join(targetDir, file);
  if (fs.existsSync(fullPath)) {
    let content = fs.readFileSync(fullPath, 'utf8');
    content = content.replace(/max-w-7xl/g, 'max-w-[1536px]');
    content = content.replace(/max-w-\[1600px\]/g, 'max-w-[1536px]');
    fs.writeFileSync(fullPath, content);
    console.log('Updated', file);
  } else {
    console.log('File not found:', fullPath);
  }
}
