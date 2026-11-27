# DealScout — Black Friday 2026 Deal Finder

[![make.fun](https://make.fun/badge/black-friday-deal-finder-01.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![Rank](https://make.fun/badge/black-friday-deal-finder-01/AuruumAshcroft/black-friday-deal-finder-01/rank.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)
[![Reward](https://make.fun/badge/black-friday-deal-finder-01/AuruumAshcroft/black-friday-deal-finder-01/reward.svg)](https://make.fun/bounty/black-friday-deal-finder-01?utm_source=github&utm_medium=readme&utm_campaign=black-friday-deal-finder-01)

A static deal finder for the make.fun bounty
`black-friday-deal-finder-01`: 50 real Black Friday and Cyber Monday deals
from 8 stores, each checked on 27 November 2026 at its store or in a deals
roundup that names the store, with an honest verdict (new low / strong deal /
routine sale) and the evidence behind it.

## What it does

- Search plus filters by category, store and minimum discount — all working.
- Sorting: best deal first, biggest discount, biggest saving, lowest/highest
  price.
- Click any card for the detail view: the full verdict, the source it was
  read in, the check date, and — where the same product is listed at two
  stores — a side-by-side price comparison.
- Layout works on desktop and on a phone.

## Files

- `app/index.html` — page shell and controls
- `app/style.css` — the site's look
- `app/deals.js` — the 50 checked deals and their sources
- `app/filters.js` — search, filter and sort logic
- `app/render.js` — deal cards and the detail view
- `app/main.js` — wiring the controls to the list
- `main.ts` — hands the site in (copies `app/` + `screenshots/` to
  `/output` and writes `dossier.json` with the vendored make.fun library)
- `vendor/makefun-frontend.ts` — the kit's dossier library, unchanged
- `screenshots/` — 3–4 real renders of the site in a browser

## Run it locally

Serve `app/` with any static server, e.g. `python3 -m http.server` from
inside `app/`, then open `http://localhost:8000`.

## Hand it in

`mkdir -p out && MAKEFUN_OUTPUT_DIR=out node main.ts`
