// Shared helpers for both designs: escaping, SEO <head>, icons, art, tiny JS.

export const esc = (s = "") =>
  String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

// Wrap "[CONFIRM] ..." markers so unverified content is visibly flagged in the mock.
export const flag = (s = "") =>
  esc(s)
    .replace(/\[CONFIRM ([^\]]+)\]/g, '<mark class="confirm" title="To be confirmed by the Home">[confirm: $1]</mark>')
    .replace(/\[CONFIRM\]([^<]*)/g, '<mark class="confirm" title="To be confirmed by the Home">[confirm]$1</mark>');

export function head({ c, base, title, desc, page, font }) {
  const o = c.org;
  const ld = {
    "@context": "https://schema.org",
    "@type": "NGO",
    name: o.name,
    alternateName: o.short,
    description: o.description,
    url: o.domain,
    telephone: o.phone,
    email: o.email,
    logo: "assets/logo.png",
    sameAs: [o.facebook],
    address: {
      "@type": "PostalAddress",
      streetAddress: o.street,
      addressLocality: o.city,
      postalCode: o.postcode,
      addressCountry: "MY",
    },
    areaServed: ["Kuala Lumpur", "Selangor"],
  };
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="noindex, nofollow"><!-- MOCK: remove on launch -->
<link rel="icon" href="${base}assets/favicon.png">
<meta property="og:type" content="website">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${base}assets/logo.png">
<meta name="theme-color" content="#0f1b3d">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="${font}" rel="stylesheet">
<link rel="stylesheet" href="style.css">
<script type="application/ld+json">${JSON.stringify(ld)}</script>
</head>`;
}

const I = (d) =>
  `<svg class="ico" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${d}</svg>`;

export const icons = {
  home: I('<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/><path d="M10 20v-6h4v6"/>'),
  book: I('<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5"/><path d="M9 7h6"/>'),
  heart: I('<path d="M12 20s-8-5-8-11a4.5 4.5 0 018-2.5A4.5 4.5 0 0120 9c0 6-8 11-8 11z"/>'),
  music: I('<path d="M9 18V5l11-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="17" cy="16" r="3"/>'),
  arrow: I('<path d="M5 12h14"/><path d="M13 6l6 6-6 6"/>'),
  copy: I('<rect x="9" y="9" width="11" height="11" rx="2"/><path d="M5 15V6a2 2 0 012-2h9"/>'),
  phone: I('<path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/>'),
  mail: I('<rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/>'),
  pin: I('<path d="M12 21s7-6 7-11a7 7 0 00-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'),
  shield: I('<path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6z"/><path d="M9 12l2 2 4-4"/>'),
  chat: I('<path d="M4 5h16v11H9l-5 4z"/>'),
  fb: I('<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8z"/>'),
};

// Flat lighthouse illustration in the logo's own palette (stands in for photography).
export function lighthouse({ sky = "#f6d635", sea = "#1e3fae", tower = "#e03b2e", cap = "#e03b2e", lamp = "#f6d635", beam = true } = {}) {
  return `<svg class="art" viewBox="0 0 400 480" role="img" aria-label="Illustration of a lighthouse over a calm sea" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="480" fill="${sky}"/>
  ${beam ? `<polygon points="200,150 0,70 0,230" fill="#fff" opacity=".35"/><polygon points="200,150 400,70 400,230" fill="#fff" opacity=".35"/>` : ""}
  <rect y="300" width="400" height="180" fill="${sea}"/>
  <path d="M0 330 q25-12 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#fff" stroke-opacity=".35" stroke-width="3"/>
  <path d="M0 365 q25-12 50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0 t50 0" fill="none" stroke="#fff" stroke-opacity=".2" stroke-width="3"/>
  <path d="M150 470 L172 210 H228 L250 470 Z" fill="${tower}"/>
  <rect x="165" y="285" width="70" height="12" fill="#0f1b3d" opacity=".85"/>
  <rect x="191" y="235" width="18" height="38" rx="9" fill="#0f1b3d" opacity=".9"/>
  <rect x="191" y="330" width="18" height="52" rx="9" fill="#0f1b3d" opacity=".9"/>
  <rect x="166" y="148" width="68" height="62" fill="${lamp}" stroke="#0f1b3d" stroke-width="5"/>
  <path d="M166 178 H234 M166 194 H234 M184 148 V210 M200 148 V210 M216 148 V210" stroke="#0f1b3d" stroke-width="2" opacity=".7"/>
  <rect x="158" y="206" width="84" height="10" fill="#0f1b3d"/>
  <path d="M168 148 a32 30 0 0 1 64 0 z" fill="${cap}" stroke="#0f1b3d" stroke-width="5"/>
</svg>`;
}

// Tiny progressive-enhancement JS: mobile nav + copy-to-clipboard. No dependencies.
export const script = `<script>
(function(){
  var b=document.querySelector('[data-nav-toggle]'),n=document.querySelector('[data-nav]');
  if(b&&n){b.addEventListener('click',function(){var o=n.classList.toggle('open');b.setAttribute('aria-expanded',o)})}
  document.querySelectorAll('[data-copy]').forEach(function(el){
    el.addEventListener('click',function(){
      var t=el.getAttribute('data-copy'),l=el.querySelector('.copy-label');
      (navigator.clipboard?navigator.clipboard.writeText(t):Promise.reject()).then(function(){
        if(l){var p=l.textContent;l.textContent='Copied';setTimeout(function(){l.textContent=p},1600)}
      }).catch(function(){});
    });
  });
  document.querySelectorAll('[data-tabs]').forEach(function(g){
    g.querySelectorAll('[role=tab]').forEach(function(t){
      t.addEventListener('click',function(){
        g.querySelectorAll('[role=tab]').forEach(function(x){x.setAttribute('aria-selected',x===t)});
        g.setAttribute('data-mode',t.getAttribute('data-mode'));
      });
    });
  });
})();
</script>`;
