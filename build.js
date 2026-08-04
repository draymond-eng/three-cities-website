/**
 * Build: site/ -> deploy/
 *
 * The pages in site/ live one directory down, so they reference assets as
 * ../uploads/... and ../assets/... Netlify publishes a single flat root, so
 * this rewrites those to uploads/... and assets/... and copies everything
 * into deploy/.
 *
 * Run: node build.js
 * Netlify runs this automatically on every push (see netlify.toml).
 */

const fs = require('fs');
const path = require('path');

const ROOT = __dirname;
const SITE = path.join(ROOT, 'site');
const OUT = path.join(ROOT, 'deploy');

/** Directories copied verbatim from repo root into deploy/. */
const ASSET_DIRS = ['uploads', 'assets'];

/** Files copied verbatim from repo root into deploy/. */
const ROOT_FILES = ['join.html'];

/** Path rewrites applied to every HTML file moved out of site/. */
const REWRITES = [
  [/\.\.\/uploads\//g, 'uploads/'],
  [/\.\.\/assets\//g, 'assets/'],
  [/\.\.\/join\.html/g, 'join.html'],
];

function rmrf(target) {
  if (fs.existsSync(target)) fs.rmSync(target, { recursive: true, force: true });
}

function mkdirp(target) {
  fs.mkdirSync(target, { recursive: true });
}

function copyDir(from, to) {
  if (!fs.existsSync(from)) return 0;
  mkdirp(to);
  let count = 0;
  for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
    const src = path.join(from, entry.name);
    const dst = path.join(to, entry.name);
    if (entry.isDirectory()) {
      count += copyDir(src, dst);
    } else {
      fs.copyFileSync(src, dst);
      count++;
    }
  }
  return count;
}

function build() {
  rmrf(OUT);
  mkdirp(OUT);

  // 1. Pages, stylesheets, and scripts out of site/, with paths rewritten.
  let pages = 0;
  let passthrough = 0;
  for (const name of fs.readdirSync(SITE)) {
    const src = path.join(SITE, name);
    if (fs.statSync(src).isDirectory()) continue;

    if (name.endsWith('.html')) {
      let html = fs.readFileSync(src, 'utf8');
      for (const [find, replace] of REWRITES) html = html.replace(find, replace);
      fs.writeFileSync(path.join(OUT, name), html);
      pages++;
    } else {
      fs.copyFileSync(src, path.join(OUT, name));
      passthrough++;
    }
  }

  // 2. Photography and brand assets.
  let assets = 0;
  for (const dir of ASSET_DIRS) {
    assets += copyDir(path.join(ROOT, dir), path.join(OUT, dir));
  }

  // 3. Root-level standalone pages (the paid-ads landing page).
  let roots = 0;
  for (const name of ROOT_FILES) {
    const src = path.join(ROOT, name);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, path.join(OUT, name));
      roots++;
    }
  }

  // 4. Clean URLs. Netlify serves /membership from membership.html when
  //    pretty URLs are on, but an explicit redirects file removes any doubt
  //    and lets the unlinked pages keep working without the .html suffix.
  const redirects = fs
    .readdirSync(OUT)
    .filter((f) => f.endsWith('.html') && f !== 'index.html')
    .map((f) => {
      const slug = f.replace(/\.html$/, '');
      return `/${slug}\t/${f}\t200`;
    })
    .join('\n');
  // The Programming page's canonical URL is /programming, not /events.
  fs.writeFileSync(
    path.join(OUT, '_redirects'),
    redirects + '\n/programming\t/events.html\t200\n'
  );

  // 5. Search engine files. Sitemap covers indexable pages only, at their
  //    canonical URLs; unlinked noindex pages and the ads landing page stay out.
  const SITE_URL = 'https://threecitiessocial.com';
  const CANONICAL_PATHS = [
    '/',
    '/story',
    '/locations',
    '/river-north',
    '/wicker-park',
    '/programming',
    '/membership',
    '/host',
    '/networking-events-chicago',
  ];
  const today = new Date().toISOString().slice(0, 10);
  const sitemap =
    '<?xml version="1.0" encoding="UTF-8"?>\n' +
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' +
    CANONICAL_PATHS.map(
      (p) =>
        `  <url><loc>${SITE_URL}${p}</loc><lastmod>${today}</lastmod></url>`
    ).join('\n') +
    '\n</urlset>\n';
  fs.writeFileSync(path.join(OUT, 'sitemap.xml'), sitemap);

  fs.writeFileSync(
    path.join(OUT, 'robots.txt'),
    `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
  );

  console.log(
    `Built deploy/: ${pages} pages, ${passthrough} support files, ` +
      `${assets} assets, ${roots} root pages.`
  );
}

build();
