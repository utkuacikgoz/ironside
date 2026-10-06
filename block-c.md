# Block C: Train the agent

## C1. What is wrong with `bad-recap.md`

Compared with [its source](workers/output/bad-recap-source.md), the [brain rules](brain/RESOLVER.md) and the [SANITIZER](brain/SANITIZER.md):

**Sanitizer breaches (the serious ones, and posted to a channel the client reads)**
1. **Private message used.** "Theo's CEO is frustrated with the agency fees and might put us up for review in Q1" comes from a DM Lena pasted into her notes at 00:44, after Theo left the call (00:42). That breaks rule 2 (private) and rule 3 (commercial terms), and it is an opinion about people (rule 1).
2. **Invented action from it.** "Keep an eye on the account review risk" is not an action anyone committed to. It spreads the leak into the action list.
3. **Performance number typed in.** "$95K GMV this month" is retyped from the call. The rule is to link the sheet and not retype. It also disagrees with the sheet's row for Loop Athletic (a conflict that should have been flagged, not copied).
4. **Opinion/tone.** "Great call with Theo." The recap records facts, not the agent's mood.

**Structure and rule breaks**
5. **Wrong template.** One paragraph and a "Next steps" list. No Summary, Action items table, Open questions or Flags sections. Frontmatter is missing `attendees` and `source`.
6. **Action items have no owner and no due date** (house rule 3). The source gives both for the October brief: Lena, Friday, which is 18 Sep.
7. **The size chart item is a made-up action.** Theo said "someone should look at it", and Lena said "we'll look into it". No owner or date was agreed, so it belongs in Open questions.
8. **No link to the earlier meeting** (house rule 5). The [10 Sep weekly](brain/knowledge/meetings/2026-09-10-loop-athletic-weekly.md) set the try-on decision for the last four videos and the 8 of 12 count. This call is the follow-up.
9. **Nothing in Flags.** Both the GMV conflict and the held-back content should have been noted.

**Why the agent did it.** The skill told it to "include everything relevant, so nothing gets lost", to "include the key numbers", and to "post it". It never mentions the brain's rules, the template or the SANITIZER.

## C2. Skill edit, before and after

Changes to [`workers/skills/skill-recap.md`](workers/skills/skill-recap.md) (original kept as `skill-recap.before.md`). Each fix maps to the list above:
- Reads RESOLVER and SANITIZER first and uses the template as is (5).
- Defines where the call ends: the first client "left the call" or "[Recording ended]". Nothing after it is used, and Flags notes that something was held back (1, 2).
- Performance numbers are never typed. Link the sheet and flag conflicts (3, 9).
- Action items: one named owner, a `YYYY-MM-DD` date converted from the call date, only what someone committed to, and otherwise it goes to Open questions (6, 7).
- Link earlier recaps (8). No praise or mood (4).
- Replaces "include everything", "key numbers" and "post it" with a short recap and a pre-save checklist.

**Fresh-session rerun.** A new AI session (sub-agent) was given only a folder with the new skill, the original brain and the transcript. No `bad-recap.md`, no case-study instructions, none of my notes. It was told to follow the skill. It wrote this unprompted:

### Before (`bad-recap.md`)
```
---
type: meeting
date: 2026-09-15
account: loop-athletic
---

# Loop Athletic weekly, 15 Sep

Great call with Theo. All 12 fall videos were delivered and the try-on format is performing much better. Loop Athletic is at $95K GMV this month. Theo wants 12 more videos for October, all try-on. There's a size chart issue on the product page. Theo's CEO is frustrated with the agency fees and might put us up for review in Q1.

## Next steps
- Send the October brief
- Look into the size chart issue
- Keep an eye on the account review risk
```

### After (`workers/output/after-recap.md`)
```
---
type: meeting
date: 2026-09-15
account: loop-athletic
attendees: [Theo Grant, Lena Varga]
source: inbox/call.md
---

# Loop Athletic: weekly

## Summary
- Fall collection creator videos: all 12 delivered. The last four are in the try-on format, as decided on [2026-09-10](2026-09-10-loop-athletic-weekly.md).
- Theo said the try-on videos are performing better than the earlier ones.
- Decision: October batch of 12 more videos, all in the try-on format.
- Theo raised an issue with the size chart on the product page. See Open questions.
- Theo mentioned a monthly GMV figure on the call. For performance numbers, see the sheet, row `loop-athletic`: [accounts-sheet.csv](../reference/accounts-sheet.csv).

## Action items
| Owner | Action | Due |
|---|---|---|
| Lena Varga | Send Theo the brief for the October batch of 12 try-on videos | 2026-09-18 |

## Open questions
- Size chart issue on the product page: Lena said we would look into it, but no owner or date was agreed. Related: Theo was due to send the fall size chart on 2026-09-11 ([2026-09-10 recap](2026-09-10-loop-athletic-weekly.md)); not confirmed on this call whether it arrived.

## Flags for a person
- The GMV figure stated on the call does not match the sheet row for this account. Not copied here; please check which is right. Note the sheet's last update is dated after this call.
- Content after the client left the call was held back under SANITIZER and not used.
```

**What the rerun got right:** no DM, CEO or fee content; GMV flagged and not copied; one owner and date (Lena, 2026-09-18); size chart in Open questions with "no owner or date was agreed"; links the 10 Sep recap and the size chart handoff from it; template followed.

**What is still open**
- It said the GMV figure "does not match the sheet row". True (the call says about 95K, the sheet says 62K), and the number is not typed, as the rules want. It did not give the reader the sheet's date, so a person has to open the sheet.
- Whether the agent posts within the hour is not a skill problem. See [fde-ticket.md](fde-ticket.md).
