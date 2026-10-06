---
type: skill
step: recap
owner: Brightline ops
updated: 2026-10-02
---

# Skill: recap a client call

You turn one recorded client call into a recap for the brain. The recap is read by everyone in the brain and posted to the client's Slack channel, **including the client**. Write every line as if the people named are reading it.

## Input
The transcript of one call (frontmatter has title, date, attendees).

## Output
One file: `brain/knowledge/meetings/YYYY-MM-DD-brand-slug.md`, using the template in `brain/RESOLVER.md` exactly. Do not invent other sections. Do not write anything else to the brain.

## Before you write
1. Read `brain/RESOLVER.md` and `brain/SANITIZER.md`.
2. Read the account page and the earlier recaps for this brand. Read the sheet row for this account (`brain/knowledge/reference/accounts-sheet.csv`). Do not edit any of them.

## Steps
1. **Find the end of the call.** The call ends at the first line where a client attendee leaves (`[X left the call]`) or at `[Recording ended]`, whichever comes first. Everything after a client leaves is a side conversation. Do not use it. Do not quote it, paraphrase it, or let it shape an action item. This includes notes, pasted messages and DMs, and lines like "still recording". Note in Flags that something was held back, without repeating it.
2. **Summary: 3 to 6 bullets.** Facts, decisions, what the client told us. No praise or mood ("great call"). No opinions about people. Write what was said, with the date if it matters.
3. **Performance numbers are never typed.** GMV, ad spend, active affiliates, retention and similar: write "see the sheet, row `<account>`" and link `../reference/accounts-sheet.csv`. If the call states one that disagrees with the sheet, or the sheet has no such field, say so in Flags. Do not copy it into the recap. Targets, budgets and rates the client agrees to are decisions: record them as said.
4. **Never write down** (SANITIZER): opinions about people, anything private, our fees, margins or rates, personal data, transcript text.
5. **Link, don't repeat.** If something was already said in an earlier recap, say so and link it. Don't present it as new. Link earlier recaps that this call follows up on.
6. **Action items:** one table, `Owner | Action | Due`.
   - One person per item, by name. Not "we" or "the team".
   - Due date is `YYYY-MM-DD`. Turn "Friday" or "by tomorrow" into a date from the call date. State the conversion if it is a guess.
   - Only things someone committed to on the call. Never invent an action, and never add "keep an eye on" items.
   - If nobody was named or no date was agreed, it is not an action item. Put it under Open questions.
7. **Open questions:** things raised and not settled, including who owns them.
8. **Check before saving.** Re-read the file and ask:
   - Any typed GMV, spend, affiliate or retention number? Replace it with the sheet link.
   - Any line the named person or brand wouldn't be fine reading? Delete it.
   - Anything that came from after a client left, or from a pasted message? Delete it.
   - Every action item has one owner and a date?
   - Frontmatter has `type, date, account, attendees, source`?
9. Save the file. If the pipeline posts to Slack, it posts this file and nothing else.

## Do not
- "Include everything relevant so nothing gets lost". A recap is short. The recording tool keeps the rest.
- Copy numbers "so the team has them handy".
