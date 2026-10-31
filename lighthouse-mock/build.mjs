// Static site builder: content.json + templates -> dist/. No dependencies. Run: node build.mjs
import { readFileSync, writeFileSync, mkdirSync, copyFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as A from "./src/a/templates.mjs";
import * as B from "./src/b/templates.mjs";

const root = dirname(fileURLToPath(import.meta.url));
const c = JSON.parse(readFileSync(join(root, "content.json"), "utf8"));
const dist = join(root, "dist");

const write = (rel, html) => {
  const f = join(dist, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, html);
};

for (const [dir, T] of [["a", A], ["b", B]]) {
  write(`${dir}/index.html`, T.home(c));
  write(`${dir}/donate.html`, T.donate(c));
  copyFileSync(join(root, `src/${dir}/style.css`), join(dist, dir, "style.css"));
}

write(
  "index.html",
  `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>Lighthouse Children's Home: website design mocks</title><meta name="robots" content="noindex">
<style>
body{margin:0;font:17px/1.6 system-ui,sans-serif;background:#fbf5e9;color:#0f1b3d;display:grid;place-items:center;min-height:100vh;padding:24px}
main{max-width:860px;width:100%}img{border-radius:50%}h1{font-size:2rem;margin:.6rem 0 .3rem}p{margin:0 0 1rem;color:#4d5878}
.g{display:grid;grid-template-columns:1fr 1fr;gap:18px;margin-top:1.4rem}@media(max-width:700px){.g{grid-template-columns:1fr}}
.c{background:#fff;border:2px solid #0f1b3d;border-radius:16px;padding:1.4rem}.c h2{margin:0 0 .3rem}
.c a{font-weight:700;color:#0f1b3d;margin-right:1.2rem}small{display:block;margin-top:1.4rem;color:#4d5878}
</style></head><body><main>
<img src="assets/logo.png" width="72" height="72" alt="">
<h1>${c.org.name}</h1><p>Two website design mocks. Same content (from <code>content.json</code>), different design directions. Each has a home page and a Donate page.</p>
<div class="g">
<div class="c"><h2>Design A · Warm Editorial</h2><p>Story-led, serif headlines, cream and navy, asymmetric layout.</p><a href="a/index.html">Open home</a><a href="a/donate.html">Donate page</a></div>
<div class="c"><h2>Design B · Trust &amp; Transparency</h2><p>Conversion-led, quick-give card, trust bar, FAQ, tabbed donate page.</p><a href="b/index.html">Open home</a><a href="b/donate.html">Donate page</a></div>
</div><small>Mock only. Placeholder content is highlighted and must be confirmed by the Home.</small></main></body></html>`
);

console.log("Built dist/: index, a/{index,donate}, b/{index,donate}");
