// Design B — "Trust & Transparency"
import { esc, flag, head, icons, lighthouse, script } from "../shared/lib.mjs";

const FONT =
  "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Manrope:wght@600;700;800&display=swap";

const header = (c, active) => `
<a class="skip" href="#main">Skip to content</a>
<div class="topbar"><div class="wrap">
  <span>${icons.shield} Registered non-profit welfare home · Bangsar, Kuala Lumpur</span>
  <span><a href="tel:+${c.org.phoneRaw}">${icons.phone} ${esc(c.org.phone)}</a><a href="${esc(c.org.facebook)}" rel="noopener">${icons.fb} Facebook</a></span>
</div></div>
<header class="site-header">
  <div class="wrap bar">
    <a class="brand" href="index.html" aria-label="${esc(c.org.short)} home">
      <img src="../assets/logo.png" alt="" width="46" height="46">
      <span>Lighthouse<small>Children Welfare Home</small></span>
    </a>
    <button class="menu" data-nav-toggle aria-expanded="false" aria-controls="nav">Menu</button>
    <nav id="nav" data-nav aria-label="Main">
      <a href="index.html#about">About</a>
      <a href="index.html#programs">Our work</a>
      <a href="index.html#help">Get involved</a>
      <a href="index.html#faq">FAQ</a>
      <a href="index.html#contact">Contact</a>
      <a class="btn btn-sun" href="donate.html"${active === "donate" ? ' aria-current="page"' : ""}>Donate now</a>
    </nav>
  </div>
</header>`;

const footer = (c) => `
<footer class="site-footer" id="contact">
  <div class="wrap foot-grid">
    <div class="foot-brand">
      <img src="../assets/logo.png" alt="" width="56" height="56">
      <p class="foot-name">${esc(c.org.name)}</p>
      <p>${esc(c.org.region)}</p>
      <p class="reg">${flag(c.org.registered)}</p>
    </div>
    <div>
      <h2>Contact</h2>
      <ul class="contact">
        <li>${icons.pin}<span>${c.org.address.map(esc).join("<br>")}</span></li>
        <li>${icons.phone}<a href="tel:+${c.org.phoneRaw}">${esc(c.org.phone)}</a></li>
        <li>${icons.mail}<a href="mailto:${esc(c.org.email)}">${esc(c.org.email)}</a></li>
      </ul>
    </div>
    <div>
      <h2>Follow</h2>
      <ul class="contact">
        <li>${icons.fb}<a href="${esc(c.org.facebook)}" rel="noopener">Facebook</a></li>
        <li>${icons.chat}<a href="https://wa.me/${c.org.phoneRaw}">WhatsApp</a></li>
      </ul>
      <a class="btn btn-sun" href="donate.html">Donate now</a>
    </div>
  </div>
  <div class="wrap legal"><p>${esc(c.privacy)}</p><p class="mock">Design mock B · placeholder content to be confirmed by the Home</p></div>
</footer>`;

const faq = [
  ["Is my donation safe?", "Give only by bank transfer to the account shown on our donate page, and confirm the details by calling us first. We never ask for donations through personal accounts."],
  ["Will I get a receipt?", "[CONFIRM] Send your transfer slip with your name and email and we will acknowledge your gift. Confirm tax-receipt policy with the Home."],
  ["Can I give clothes, toys or books?", "Yes. Please call or WhatsApp ahead so we can tell you what is needed most right now."],
  ["Can I visit or volunteer?", "We welcome volunteers who can tutor, mentor or share a skill. Visits are arranged in advance to protect the children's privacy and routine."],
];

export function home(c) {
  const o = c.org;
  return `${head({ c, base: "../", title: `${o.short}, ${o.region} | Donate to a children's welfare home`, desc: o.description, font: FONT })}
<body class="b">
${header(c, "")}
<main id="main">
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="pill">${esc(o.region)}</p>
        <h1>Help us keep the lighthouse lit for children who need a safe home.</h1>
        <p class="lede">${esc(o.description)}</p>
        <ul class="ticks"><li>Run entirely on public donations</li><li>Simple bank transfer, no fees</li><li>Direct line to the Home</li></ul>
      </div>
      <div class="give-card" data-tabs data-mode="monthly" aria-label="Quick give">
        <div class="tabs" role="tablist" aria-label="Gift type">
          <button role="tab" data-mode="monthly" aria-selected="true">Monthly</button>
          <button role="tab" data-mode="once" aria-selected="false">One-time</button>
        </div>
        <p class="gc-title">Give to Lighthouse</p>
        <p class="gc-sub"><span class="m">A steady monthly gift is the most useful way to help.</span><span class="o">Cover a special need with a one-time gift.</span></p>
        <ul class="amounts">${c.gifts.slice(0, 3).map((g) => `<li>${esc(g.amount)}</li>`).join("")}<li>Any</li></ul>
        <a class="btn btn-red btn-block" href="donate.html">Continue to bank details ${icons.arrow}</a>
        <p class="gc-note">${icons.shield} Bank transfer · no payment gateway · no fees</p>
      </div>
    </div>
  </section>

  <section class="trust" aria-label="Why donors trust us">
    <div class="wrap trust-row">
      <div>${icons.shield}<p><strong>Registered</strong>Registered with the Registrar of Societies ${flag("[CONFIRM]")}</p></div>
      <div>${icons.heart}<p><strong>Child-first</strong>No children's names or faces without consent</p></div>
      <div>${icons.mail}<p><strong>Accountable</strong>Receipts and thank-you for every gift ${flag("[CONFIRM]")}</p></div>
      <div>${icons.phone}<p><strong>Reachable</strong>Call or WhatsApp us on ${esc(o.phone)}</p></div>
    </div>
  </section>

  <section class="section about" id="about">
    <div class="wrap about-grid">
      <div class="about-art">${lighthouse({ sky: "#dbe6ff", sea: "#1e3fae", lamp: "#f6d635" })}</div>
      <div>
        <p class="kicker">About the Home</p>
        <h2>${esc(c.about.heading)}</h2>
        ${c.about.body.map((p) => `<p>${esc(p)}</p>`).join("")}
        <div class="stat-grid">
          ${c.stats.slice(0, 3).map((s) => `<div><p class="num">${esc(s.value)}</p><p>${esc(s.label)}</p></div>`).join("")}
        </div>
        <p class="note">${flag("[CONFIRM] Figures from public news reports; the Home to verify.")}</p>
      </div>
    </div>
  </section>

  <section class="section programs" id="programs">
    <div class="wrap">
      <p class="kicker">Our work</p><h2>How your support changes a child's day</h2>
      <div class="cards">
        ${c.programs.map((p) => `<article class="card">${icons[p.icon]}<h3>${esc(p.title)}</h3><p>${esc(p.text)}</p></article>`).join("")}
      </div>
    </div>
  </section>

  <section class="gifts">
    <div class="wrap">
      <div class="gifts-head"><div><p class="kicker light">What a gift does</p><h2>Every ringgit goes to the children's daily needs.</h2></div>
      <a class="btn btn-sun btn-lg" href="donate.html">Give now ${icons.arrow}</a></div>
      <div class="gift-grid">
        ${c.gifts.map((g) => `<div class="gift"><p class="amt">${esc(g.amount)}</p><p class="per">${esc(g.per)}</p><p>${flag(g.text)}</p></div>`).join("")}
      </div>
    </div>
  </section>

  <section class="section help" id="help">
    <div class="wrap">
      <p class="kicker">Get involved</p><h2>Four ways to help</h2>
      <div class="help-grid">
        ${c.waysToHelp.map((w, i) => `<a class="help-card" href="${i < 2 ? "donate.html" : "#contact"}"><span class="idx">${i + 1}</span><h3>${esc(w.title)}</h3><p>${esc(w.text)}</p><span class="go">${i < 2 ? "Donate" : "Get in touch"} ${icons.arrow}</span></a>`).join("")}
      </div>
    </div>
  </section>

  <section class="section news">
    <div class="wrap">
      <div class="head-row"><div><p class="kicker">Updates</p><h2>Latest from the Home</h2></div><a class="btn btn-ghost" href="${esc(o.facebook)}" rel="noopener">${icons.fb} See Facebook</a></div>
      <div class="news-grid">
        ${c.news.map((n) => `<article><p class="tag">${esc(n.tag)} · ${flag(n.date)}</p><h3>${esc(n.title)}</h3><p>${flag(n.text)}</p></article>`).join("")}
      </div>
    </div>
  </section>

  <section class="section faq" id="faq">
    <div class="wrap faq-wrap">
      <div><p class="kicker">Questions</p><h2>Before you give</h2></div>
      <div>${faq.map(([q, a]) => `<details><summary>${esc(q)}</summary><p>${flag(a)}</p></details>`).join("")}</div>
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
<body class="b">
${header(c, "donate")}
<main id="main">
  <section class="page-hero">
    <div class="wrap">
      <p class="pill">Donate</p>
      <h1>Give a child a steady tomorrow</h1>
      <p class="lede">${esc(c.donate.intro)}</p>
    </div>
  </section>

  <section class="section">
    <div class="wrap d-grid" data-tabs data-mode="monthly">
      <div class="d-main">
        <div class="tabs big" role="tablist" aria-label="Gift type">
          <button role="tab" data-mode="monthly" aria-selected="true">Give monthly</button>
          <button role="tab" data-mode="once" aria-selected="false">Give once</button>
        </div>

        <article class="step"><span class="badge">1</span><div>
          <h2>Choose your gift</h2>
          <p class="m">Monthly gifts help us plan ahead. Set a recurring transfer in your banking app on a date that suits you.</p>
          <p class="o">A one-time gift can cover a special need such as medical bills, school fees or a celebration.</p>
          <ul class="amounts">${c.gifts.slice(0, 3).map((g) => `<li>${esc(g.amount)}</li>`).join("")}<li>Any amount</li></ul>
        </div></article>

        <article class="step"><span class="badge">2</span><div>
          <h2>Transfer to our bank account</h2>
          <div class="bank">${row("Account name", b.accountName)}${row("Bank", b.bankName)}${row("Account number", b.accountNumber)}${row("DuitNow", b.duitnow)}${row("Reference", b.reference)}</div>
          <div class="qr" role="img" aria-label="Placeholder for DuitNow QR code"><span>DuitNow QR<br><small>[confirm] upload from the Home</small></span></div>
        </div></article>

        <article class="step"><span class="badge">3</span><div>
          <h2>Send us your slip</h2>
          <p>${flag(c.donate.receipt)}</p>
          <div class="btn-row">
            <a class="btn btn-red" href="https://wa.me/${c.org.phoneRaw}?text=Hi%20Lighthouse%2C%20I%20have%20made%20a%20donation.">${icons.chat} WhatsApp the slip</a>
            <a class="btn btn-ghost" href="mailto:${esc(c.org.email)}?subject=Donation%20slip">${icons.mail} Email the slip</a>
          </div>
        </div></article>
      </div>

      <aside class="d-side">
        <div class="safe">${icons.shield}<h2>Give with confidence</h2><p>${esc(c.donate.warning)}</p><p>${flag(c.org.registered)}</p></div>
        <div class="side-card"><h3>Prefer to talk first?</h3><p>${icons.phone} <a href="tel:+${c.org.phoneRaw}">${esc(c.org.phone)}</a></p><p>${icons.mail} <a href="mailto:${esc(c.org.email)}">${esc(c.org.email)}</a></p></div>
      </aside>
    </div>
  </section>
</main>
${footer(c)}
${script}
</body>
</html>`;
}
