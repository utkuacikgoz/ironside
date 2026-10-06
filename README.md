# Ironside: Biz Ops case study

**Start with South. Recover posting time before adding recording capacity.**

[Open the live case study](https://ironside-case-study.vercel.app/).

This fictional Brightline agency case combines client delivery, operational analysis, and improvements to a recap agent. The recommendation is to reuse South's existing client summaries, correct East's reporting, and address West's recording gap separately.

## Review the decision

| Pod | Timely recaps / all calls | Share | Intervention |
| --- | --- | --- | --- |
| North | 36 / 40 | 90% | Reuse its posting workflow |
| East | 21 / 30 | 70% | Correct the dashboard denominator |
| South | 14 / 40 | 35% | Recover late posts and establish ownership |
| West | 3 / 30 | 10% | Fix recording capture |

South has 20 late posts. Moving 18 inside the hour would reach 80%. Marcus already writes a client summary, so the proposed workflow changes where that work is posted and requires an owner and date for each action.

**35% is measured. 70% is the proposed week one goal. 85% is a timing scenario.** The target is 80% in every pod, not a company average.

Start with the [analysis](block-b.md), [execution plan](plan.md), and [engineering ticket](fde-ticket.md). The [interactive page](demo/index.html) presents the same evidence and lets a reviewer test the timing scenario without changing the original records.

## Deliverables

| Case requirement | Output |
| --- | --- |
| A1: weekly recap | [22 September recap](brain/knowledge/meetings/2026-09-22-kettle-and-crumb-weekly.md) |
| A2: business review and proposed updates | [24 September recap](brain/knowledge/meetings/2026-09-24-kettle-and-crumb-monthly-business-review.md), [approval proposals](proposed-changes.md) |
| A3: account preparation | [Dana and affiliates briefing](answer.md) |
| B1 and B2: measurement and prioritization | [Ranking and cause](block-b.md) |
| B3: accountable execution | [One week plan](plan.md) |
| C1 and C2: recap review and skill revision | [Review and rerun](block-c.md), [revised skill](workers/skills/skill-recap.md), [after recap](workers/output/after-recap.md) |
| C3: system changes | [Engineering ticket](fde-ticket.md) |
| Extra: daily checks | [Dashboard recomputation and recap linter](extra/README.md) |
| Required process record | [AI work log](log.md) |

The original [brief](INSTRUCTIONS.md), call transcripts, dashboard, call log, and company brain are retained as evidence. All brands, people, and numbers are fictional. People and account updates remain proposals; the reference sheet is unchanged.

## Run the page

From the repository root:

```sh
python3 -m http.server 4173 --bind 127.0.0.1
```

Open `http://127.0.0.1:4173/demo/`. Static hosting needs `demo/index.html`, `demo/styles.css`, and `demo/fonts/` together. The page has no runtime packages or third party requests.

## Verify the work

Recompute the metric and check the revised recap:

```sh
python3 extra/bizops.py number calls.csv
python3 extra/bizops.py lint workers/output/after-recap.md
```

The original `workers/output/bad-recap.md` should fail the linter. The checker is a practical heuristic, not a complete privacy or factual correctness guarantee.

Run browser verification:

```sh
cd demo
npm ci
npx playwright install chromium
npm test
```

Tests cover five screen widths, graph overlap and clipping, keyboard controls, the timing model, source data parity, and automated WCAG A/AA checks. [Verification results](demo/QA.md) record the local mobile measurements and their limits. Manual screen reader and real device checks remain before publication.
