# Landing page verification

Checked locally on 6 October 2026 in headless Chrome. The redesign changes the presentation only. Case study documents and source CSV files remain unchanged.

## Automated checks

`npm test` passes at 320, 390, 768, 1024, and 1440 CSS pixels, including axe checks for WCAG 2 A/AA, 2.1 AA, and 2.2 AA. The expanded source log and timing scenario also pass the audit.

Interaction checks cover actual and hypothetical results, author highlights, keyboard tab navigation with arrows/Home/End, pod filters, reduced motion, forced colors, a 200% browser zoom viewport equivalent, no page overflow, and no external requests. Every embedded call matches `calls.csv`. Applying the hypothetical timing fix does not change the original source table.

## Mobile Lighthouse

| Category | Score |
| --- | --- |
| Performance | 100 |
| Accessibility | 100 |
| Best practices | 100 |
| SEO | 100 |

First contentful paint and largest contentful paint: 1.1 seconds. Total blocking time: 0 ms. Cumulative layout shift: 0. The standalone HTML is about 55 KB. There are no production packages or downloaded assets. The source table renders only when opened. Chart resizing is observed at its container, without a global resize loop.

These are local lab measurements against Python's static server, not production or field metrics. Enable gzip or Brotli on the eventual static host. Full accessibility conformance requires manual assistive technology testing; automated audits do not cover every criterion. Desktop and phone screenshots were visually reviewed. Real device and screen reader checks are still recommended before publishing.
