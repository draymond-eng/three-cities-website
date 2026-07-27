# Three Cities Social — Website

Static marketing site for Three Cities Social, a membership club in Chicago.
No framework, no bundler. Plain HTML, one shared stylesheet, a little vanilla JS.

---

## Repo layout

| Path | What it is |
|---|---|
| `site/` | **Source of truth. Edit here.** All pages + `styles.css` + `events.js` |
| `deploy/` | **Generated. Never hand-edit.** Flattened build that Netlify publishes |
| `build.js` | Rewrites `site/` → `deploy/` and copies assets |
| `uploads/` | Photography (real members and clubhouses) |
| `assets/logos/`, `assets/icons/` | Brand marks. Use the supplied files, never redraw |
| `join.html` | Standalone paid-ads landing page. Lives at repo root, deploys as-is |

### Why `deploy/` exists

Pages in `site/` reference assets one level up (`../uploads/photo.jpg`) because they
sit in a subdirectory. Netlify publishes from a single flat root, so those paths must
become `uploads/photo.jpg`. `build.js` does that rewrite and copies everything into
`deploy/`.

**Run `node build.js` after editing anything in `site/`.** Netlify also runs it
automatically on every push (see `netlify.toml`), so committing `site/` changes alone
is enough to ship.

---

## Pages

| URL | File | Purpose |
|---|---|---|
| `/` | `site/index.html` | Homepage. Targets "social club in Chicago" |
| `/story` | `site/story.html` | Founder letter, testimonials |
| `/locations` | `site/locations.html` | Hub linking to both neighborhood pages |
| `/river-north` | `site/river-north.html` | Targets "social club River North" |
| `/wicker-park` | `site/wicker-park.html` | Targets "social club Wicker Park" |
| `/programming` | `site/events.html` | Full calendar, rendered from `events.js` |
| `/membership` | `site/membership.html` | Pricing tiers + application form |
| `/host` | `site/host.html` | Venue rental inquiries |
| `/networking-events-chicago` | `site/networking-events-chicago.html` | SEO landing page |
| `/host-a-dinner` | `site/host-a-dinner.html` | Chef dinner series inquiry. Unlinked, `noindex` |
| `/host-signup` | `site/host-signup.html` | Bar host signup. Unlinked, `noindex` |
| `/join.html` | `join.html` | Paid Instagram/Meta ads landing page |

Unlinked pages are shared by direct URL only. Keep them out of the nav.

---

## Updating the calendar

Everything lives in **`site/events.js`**. One array, one object per event:

```js
{ date: "2026-08-14", time: "19:00", title: "Long Table Dinner",
  location: "Three Cities · River North", access: "Members Only", pillar: "Talk" },
```

- `date` — `YYYY-MM-DD`
- `time` — 24-hour for sorting. Rendered as 12-hour on the page
- `access` — `"Members Only"` or `"Open to Public"` (public gets the accent flag)
- `pillar` — one of `Move`, `Play`, `Talk`, `Social`, `Serve`
- `rsvp` — optional URL. Adds an RSVP link on the calendar row

The homepage pulls the next three upcoming events automatically, preferring one per
pillar. The Programming page renders the full list grouped by month. Drop past months
when they're no longer relevant.

---

## Forms

Three forms, each posting to its own Google Apps Script web app that writes to a sheet
and emails the team. The endpoint is a `GSCRIPT_URL` variable in each page's inline
script.

| Form | Page |
|---|---|
| Membership application | `site/membership.html` |
| Venue inquiry | `site/host.html` |
| Chef dinner inquiry | `site/host-a-dinner.html` |
| Bar host signup | `site/host-signup.html` |

The receiving scripts add a sheet column automatically for any new field name, so
adding a question to a form needs no change on the Google side. Changing **who gets
notified** does: edit the `NOTIFY` array in the Apps Script, then redeploy it as a
**New version** (Deploy → Manage deployments → pencil → New version). Saving alone
does not take effect.

Submissions land in a tab named **Submissions**, and new columns append at the far
right — scroll over to find them.

---

## Brand rules

The full design system lives separately, but these are the ones that get broken most:

**Palette** — off-white `#E0D4C8` base, matte black `#35302C` ink, autumn rust
`#984929` as the single action color, ocean teal `#427179` for contrast sections.
Clay olive `#A19D7F` and matte gold `#6B582A` exist but stay sparing. All defined as
CSS custom properties at the top of `site/styles.css`. Use the tokens, not hex.

**Type** — Playfair Display for display (substitute for Butler), Mulish for body
(substitute for Avenir). Swap in the licensed faces when available.

**Every Apply button is rust.** No charcoal, no outline versions of the primary action.

**Voice**
- **No em dashes anywhere.** Use periods or commas. This includes page titles
- Say what we are, not what we are not. No "not a bar, not networking"
- Never the word "salon"
- Never mention a membership cap or limit in public copy
- No exclamation points, no emoji on marketing surfaces
- Connection leads. Coworking is a feature we mention, never the headline

**Photography** — real members, real moments, warm grade. Never stock. Never AI
generated. If there's no matching photo, use type instead of forcing a bad one.

---

## SEO conventions

Every page carries a unique `<title>`, `<meta name="description">`, canonical URL,
Open Graph tags, and Twitter card tags. Title separator is a pipe, never an em dash:
`Page Name | Three Cities Social`.

The homepage carries Organization JSON-LD with both clubhouse addresses. The two
neighborhood pages carry LocalBusiness schema. `sitemap.xml` and `robots.txt` sit in
`deploy/`.

Internal link anchor text is a ranking signal. Use the term the target page is trying
to win: "networking events in Chicago", "social club in River North", "Chicago social
club" back to the homepage.

---

## Deploying

Push to `main`. Netlify runs `node build.js` and publishes `deploy/`.

Manual fallback: run `node build.js` locally, then drag the `deploy/` folder onto
Netlify's production deploys.
