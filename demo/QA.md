# Landing page verification

Checked locally on 6 October 2026 in headless Chrome. The page opens with a 40 call board and a timing model that defaults to the 18 recovered posts needed for the target. Evidence, execution owners, client safeguards, and deliverables follow. Secondary chart filters are disclosed on demand. The original case inputs and CSV datasets remain unchanged. Derived outputs have navigation paths normalized; proposal wording distinguishes targets from existing system behavior.

## Automated checks

`npm test` passes at 320, 390, 768, 1024, and 1440 CSS pixels, including axe checks for WCAG 2 A/AA, 2.1 AA, and 2.2 AA. The expanded source log and timing scenario also pass the audit.

Interaction checks cover actual and hypothetical results, author and outcome highlights, pod selection and comparison, the rescue slider, owner and recap tabs with arrows/Home/End, pod filters, reduced motion, forced colors, a 200% browser zoom viewport equivalent, no page overflow, and no external requests. Every embedded call matches `calls.csv`. Applying the hypothetical timing fix does not change the original source table.

## Mobile Lighthouse

| Category | Score |
| --- | --- |
| Performance | 99 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

First contentful paint: 1.5 seconds. Largest contentful paint: 1.8 seconds. Total blocking time: 0 ms. Cumulative layout shift: 0. The HTML is about 42 KB. Inter Tight is hosted locally; the five font weights total about 125 KB after subsetting. There are no runtime packages or third party requests. The source table renders only when opened. Chart resizing is observed at its container, without a global resize loop. Every pod and comparison view is checked for dot overlap and clipping at all five widths. Model states are also checked.

These are local lab measurements against Python's static server, not production or field metrics. Enable gzip or Brotli on the eventual static host. Full accessibility conformance requires manual assistive technology testing; automated audits do not cover every criterion. Desktop and phone screenshots were visually reviewed. Real device and screen reader checks are still recommended before publishing.
