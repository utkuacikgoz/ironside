# Ironside landing page

A static page with no runtime packages or third party requests. Host `index.html`, `styles.css`, and `fonts/` together. Open `index.html` directly, or run `python3 -m http.server 4173 --bind 127.0.0.1` from this directory and visit http://127.0.0.1:4173.

The monochrome redesign leads with South's timing gap. Select a pod, compare all four, highlight authors or outcomes, and use the rescue slider to model the path to 80%. The page also includes recap comparison, keyboard operated weekday tabs, disclosures, and a filterable source table. The source table always shows original results. In the scenario, select between zero and 20 of South's late posts to model within 30 minutes. Rescuing 18 reaches the 80% target; missing recaps remain missing. The Friday goal is a proposal, not an achieved result.

## Verify

From `demo/`:

```sh
npm ci
npx playwright install chromium
npm test
```

Alternatively, set `CHROME_PATH` to an installed Chrome executable. Set `SCREENSHOT_DIR` to save desktop and phone screenshots. Test dependencies are development tools only; there is no build step.

The tests cover 320, 390, 768, 1024, and 1440 pixel layouts; axe checks for WCAG 2 A/AA, 2.1 AA, and 2.2 AA; keyboard tabs; data and scenario integrity; reduced motion; forced colors; a 200% browser zoom viewport equivalent; and external requests. These automated checks do not establish full accessibility conformance. Screen reader testing and broader device checks remain useful before publication.

The chart data is embedded from `../calls.csv` so the page also works offline. The test compares every embedded record against the CSV. If the source data changes, update the embedded `CALLS` array and rerun the tests. No source case study documents are changed.

The previous page was a fragment hosted as a Claude artifact. This version is a complete HTML document for static hosting. Publishing it does not update the existing Claude artifact automatically.

## Design system

Inter Tight matches Psst. Font files are hosted locally, subset to Latin and punctuation, and licensed under the included `fonts/OFL.txt`. The page uses a single stylesheet with an 8 pixel spacing scale, a 1248 pixel content width, 44 to 48 pixel controls, and consistent heading, body, and secondary text sizes. The chart uses a deterministic beeswarm to retain actual posting times without overlapping dots. Its axis and data share the same SVG coordinates.
