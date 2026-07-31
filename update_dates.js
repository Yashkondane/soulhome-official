const fs = require('fs');
const path = require('path');

const filesToUpdate = [
  'app/admin/waitlist/waitlist-client.tsx',
  'app/admin/resources/page.tsx',
  'app/admin/members/members-client.tsx',
  'app/admin/blogs/page.tsx',
  'app/(public)/kundalini-school/[slug]/page.tsx',
  'app/(public)/blog/page.tsx',
  'app/(public)/blog/[slug]/page.tsx'
];

for (const file of filesToUpdate) {
  const filePath = path.join(process.cwd(), file);
  if (!fs.existsSync(filePath)) continue;
  
  let content = fs.readFileSync(filePath, 'utf8');
  let hasChanges = false;
  
  const dateFields = ['entry.created_at', 'resource.created_at', 'p.created_at', 'profile.created_at', 'dl.downloaded_at', 'blog.created_at', 'blog.published_at!'];
  
  for (const field of dateFields) {
    if (content.includes('new Date(' + field + ')')) {
      content = content.split('new Date(' + field + ')').join('safeDate(' + field + ')');
      hasChanges = true;
    }
  }
  
  if (hasChanges) {
    if (!content.includes('import { safeDate }')) {
      const lastImportIndex = content.lastIndexOf('import ');
      const nextLineIndex = content.indexOf('\n', lastImportIndex);
      content = content.slice(0, nextLineIndex) + '\nimport { safeDate } from "@/lib/utils"\n' + content.slice(nextLineIndex);
    }
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Updated', file);
  }
}
