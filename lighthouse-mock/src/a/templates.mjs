// Design A — "Warm Editorial"
import { esc, flag, head, icons, lighthouse, script } from "../shared/lib.mjs";

const FONT =
  "https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,500;0,9..144,600;1,9..144,500&family=Inter:wght@400;500;600&display=swap";

const header = (c, active) => `
<a class="skip" href="#main">Skip to content</a>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="${esc(c.org.short)} home">
      <img src="../assets/logo.png" alt="" width="44" height="44">
      <span><strong>Lighthouse</strong><small>Children Welfare Home</small></span>
    </a>
    <button class="menu" data-nav-toggle aria-expanded="false" aria-controls="nav">Menu</button>
    <nav id="nav" data-nav aria-label="Main">
      <a href="index.html#about"${active === "about" ? ' aria-current="page"' : ""}>About</a>
      <a href="index.html#programs">What we do</a>
      <a href="index.html#help">Get involved</a>
      <a href="index.html#news">News</a>
      <a href="index.html#contact">Contact</a>
      <a class="btn btn-red" href="donate.html"${active === "donate" ? ' aria-current="page"' : ""}>Donate now</a>
    </nav>
  </div>
</header>`;

const footer = (c) => `
<footer class="site-footer" id="contact">
  <div class="wrap foot-grid">
    <div>
      <img src="../assets/logo.png" alt="" width="64" height="64">
      <p class="foot-name">${esc(c.org.name)}</p>
      <p class="foot-sub">${esc(c.org.region)}</p>
      <p class="reg">${flag(c.org.registered)}</p>
    </div>
    <div>
      <h2>Visit &amp; contact</h2>
      <ul class="contact">
        <li>${icons.pin}<span>${c.org.address.map(esc).join("<br>")}</span></li>
        <li>${icons.phone}<a href="tel:+${c.org.phoneRaw}">${esc(c.org.phone)}</a></li>
        <li>${icons.mail}<a href="mailto:${esc(c.org.email)}">${esc(c.org.email)}</a></li>
        <li>${icons.fb}<a href="${esc(c.org.facebook)}" rel="noopener">Follow us on Facebook</a></li>
      </ul>
    </div>
    <div>
      <h2>Support the children</h2>
      <p>Every month, the Home needs your help to keep the lights on and the kitchen full.</p>
      <a class="btn btn-red" href="donate.html">Donate now ${icons.arrow}</a>
    </div>
  </div>
  <div class="wrap legal">
    <p>${esc(c.privacy)}</p>
    <p class="mock">Design mock A · placeholder content to be confirmed by the Home</p>
  </div>
</footer>
<a class="sticky-donate" href="donate.html">Donate now</a>`;

export function home(c) {
  const o = c.org;
  return `${head({ c, base: "../", title: `${o.short}, ${o.region} | Children's welfare home in Bangsar`, desc: o.description, font: FONT })}
<body class="a">
${header(c, "")}
<main id="main">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="eyebrow">Bangsar · ${esc(o.region)}</p>
        <h1>A safe harbour for <em>children</em> who need one.</h1>
        <p class="lede">${esc(o.description)}</p>
        <div class="cta-row">
          <a class="btn btn-red btn-lg" href="donate.html">Donate now ${icons.arrow}</a>
          <a class="link" href="#about">Our story</a>
        </div>
      </div>
      <div class="hero-art">${lighthouse()}</div>
    </div>
  </section>

  <section class="stats" aria-label="At a glance">
    <div class="wrap stats-row">
      ${c.stats.map((s) => `<div><p class="num">${esc(s.value)}</p><p>${esc(s.label)}</p></div>`).join("")}
    </div>
    <p class="wrap stat-note">${flag("[CONFIRM] Figures come from public news reports and must be verified by the Home before launch.")}</p>
  </section>

  <section class="section about" id="about">
    <div class="wrap two">
      <div>
        <p class="eyebrow">01 · Who we are</p>
        <h2>${esc(c.about.heading)}</h2>
      </div>
      <div class="prose">
        ${c.about.body.map((p) => `<p>${esc(p)}</p>`).join("")}
        <blockquote><p>${flag(c.about.pullquote)}</p><footer>${esc(c.about.pullquoteBy)}</footer></blockquote>
      </div>
    </div>
  </section>

  <section class="section programs" id="programs">
    <div class="wrap">
      <p class="eyebrow">02 · What we do</p>
      <h2>Four things every child here can count on.</h2>
      <ol class="rows">
        ${c.programs.map((p, i) => `<li><span class="n">0${i + 1}</span>${icons[p.icon]}<h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></li>`).join("")}
      </ol>
    </div>
  </section>

  <section class="gifts" id="gifts">
    <div class="wrap">
      <p class="eyebrow">03 · Where your gift goes</p>
      <h2>Small, steady gifts keep a home running.</h2>
      <div class="gift-row">
        ${c.gifts.map((g) => `<div class="gift"><p class="amt">${esc(g.amount)}</p><p class="per">${esc(g.per)}</p><p>${flag(g.text)}</p></div>`).join("")}
      </div>
      <a class="btn btn-navy btn-lg" href="donate.html">Choose how to give ${icons.arrow}</a>
    </div>
  </section>

  <section class="section help" id="help">
    <div class="wrap two">
      <div>
        <p class="eyebrow">04 · Get involved</p>
        <h2>There is a way for everyone to help.</h2>
      </div>
      <ul class="help-list">
        ${c.waysToHelp.map((w) => `<li><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p></li>`).join("")}
      </ul>
    </div>
  </section>

  <section class="section news" id="news">
    <div class="wrap">
      <div class="news-head">
        <div><p class="eyebrow">05 · News</p><h2>Latest from the Home</h2></div>
        <a class="link" href="${esc(o.facebook)}" rel="noopener">All updates on Facebook ${icons.arrow}</a>
      </div>
      <div class="news-list">
        ${c.news.map((n) => `<article><p class="meta">${flag(n.date)} · ${esc(n.tag)}</p><h3>${esc(n.title)}</h3><p>${flag(n.text)}</p></article>`).join("")}
      </div>
    </div>
  </section>
</main>
${footer(c)}
${script}
</body>
</html>`;
}

export function donate(c) {
  const b = c.donate.bank;
  const row = (label, val) => `
    <div class="bank-row"><div><p class="k">${label}</p><p class="v">${flag(val)}</p></div>
    <button type="button" class="copy" data-copy="${esc(val)}" aria-label="Copy ${label}">${icons.copy}<span class="copy-label">Copy</span></button></div>`;
  return `${head({ c, base: "../", title: `Donate | ${c.org.short}`, desc: "Give to the Lighthouse Children Welfare Home by bank transfer. Three simple steps, no fees.", font: FONT })}
<body class="a">
${header(c, "donate")}
<main id="main">
  <section class="hero small">
    <div class="wrap">
      <p class="eyebrow">Donate</p>
      <h1>Give a child a steady tomorrow.</h1>
      <p class="lede">${esc(c.donate.intro)}</p>
    </div>
  </section>

  <section class="section steps">
    <div class="wrap steps-grid">
      <ol class="step-list">
        <li>
          <span class="step-n">1</span>
          <div><h2>Choose your gift</h2>
          <p>Give monthly or once. Any amount helps. Here is what a gift can cover:</p>
          <ul class="chips">${c.gifts.slice(0, 3).map((g) => `<li><strong>${esc(g.amount)}</strong> ${esc(g.per)}</li>`).join("")}<li><strong>Any</strong> amount</li></ul></div>
        </li>
        <li>
          <span class="step-n">2</span>
          <div><h2>Make a bank transfer</h2>
          <p>Use online banking or your banking app. Put the reference below so we can thank you.</p>
          <div class="bank">
            ${row("Account name", b.accountName)}${row("Bank", b.bankName)}${row("Account number", b.accountNumber)}${row("DuitNow", b.duitnow)}${row("Reference", b.reference)}
          </div>
          <div class="qr" role="img" aria-label="Placeholder for DuitNow QR code"><span>DuitNow QR<br><small>[confirm] upload from the Home</small></span></div></div>
        </li>
        <li>
          <span class="step-n">3</span>
          <div><h2>Send us your slip</h2>
          <p>${flag(c.donate.receipt)}</p>
          <div class="cta-row">
            <a class="btn btn-red" href="https://wa.me/${c.org.phoneRaw}?text=Hi%20Lighthouse%2C%20I%20have%20made%20a%20donation.">${icons.chat} WhatsApp the slip</a>
            <a class="btn btn-ghost" href="mailto:${esc(c.org.email)}?subject=Donation%20slip">${icons.mail} Email the slip</a>
          </div></div>
        </li>
      </ol>
      <aside class="safe">
        ${icons.shield}
        <h2>Give with confidence</h2>
        <p>${esc(c.donate.warning)}</p>
        <p>${flag(c.org.registered)}</p>
        <p>${esc(c.privacy)}</p>
      </aside>
    </div>
  </section>
</main>
${footer(c)}
${script}
</body>
</html>`;
}
