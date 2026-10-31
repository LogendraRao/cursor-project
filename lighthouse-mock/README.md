# Lighthouse Children's Home: website design mocks

Two design directions for the Lighthouse Children Welfare Home Association (Bangsar, Kuala Lumpur).
Static HTML/CSS, no framework, no database, no payment gateway.

| | Design A: Warm Editorial | Design B: Trust & Transparency |
|---|---|---|
| Feel | Story-led, serif headlines, cream + navy | Conversion-led, bright, rounded cards |
| Hero | Big headline + lighthouse illustration | Headline + quick-give card (Monthly / One-time) |
| Extras | Numbered sections, sticky mobile Donate bar | Trust bar, FAQ accordion, tabbed donate page |

Both have a **Home** page and a **Donate** page (bank details with copy buttons, DuitNow QR slot, WhatsApp / email "send your slip").

## View it

Open `dist/index.html` in a browser (it links to both designs).

## Change the content

All text for **both** designs lives in `content.json`. Edit it, then:

```bash
node build.mjs     # needs Node 18+, no npm install
```

Anything marked `[CONFIRM]` shows as a yellow highlight on the page. Search `content.json` for `CONFIRM`
to find everything the Home must verify before launch.

## Must be confirmed by the Home before launch

- Exact bank account name, bank, number, DuitNow ID and QR image (never copy these from third-party sites: there are scam accounts using charity names)
- Registration details and the year of registration
- Number of children and youths, ages, number of homes, monthly funding need (public sources disagree)
- Receipt / tax-exemption policy
- What each gift amount covers (current figures are illustrative)
- Founder quote, news items, Instagram handle
- Real photography, **only with written guardian consent**. The mock uses illustrations, no children's images.
- Whether the existing site (lighthousechildrenshomekl.com) is being replaced, and who owns that domain

## Before going live

- Remove `<meta name="robots" content="noindex">` from `src/shared/lib.mjs` (it is there so the mock is not indexed)
- Add real photos with descriptive `alt` text, a sitemap and Google Business Profile
- Replace the "Design mock" footer line

## Structure

```
content.json          all editable content
build.mjs             builds dist/ from content + templates
src/shared/lib.mjs    SEO <head> + JSON-LD (NGO), icons, illustration, tiny JS
src/a/, src/b/        templates.mjs + style.css for each design
dist/                 the built site (open this)
```

Weight: each page is about 12–21 KB of HTML plus one stylesheet (10–14 KB) and an 8 KB logo. The only JavaScript is
about 30 lines (mobile menu, copy button, tabs), and pages work without it.
