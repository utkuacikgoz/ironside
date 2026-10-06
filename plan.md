# Plan: South pod, week of 5 to 9 Oct 2026

## Message to Marcus (send Mon 5 Oct, 9am)
> Marcus, you were right in #pod-south: the bot posts 45 to 90 min after the call (South median is 74), so your own notes win. When an AM posts, it takes 18 min and is never late.
> This week, post the summary you'd email Dana in the client channel instead, same text, with an owner and a date on each action. That counts as the recap, so there's no double work.
> I'll sit with you for 30 min Monday to set it up, and I'm asking engineering for a 15 min draft you can edit.
> Goal by Friday: 7 of 10 South calls with a recap in the channel within the hour. Can we do Monday 10am?

## What Marcus will push back with, and my answer
- **"I already send the client a summary. This is double work."** It isn't: the post replaces the email. Same text in the channel, plus owner and date per action (about 3 extra minutes). The channel copy is what feeds the brain and the next call prep.
- **"Priya said we can count emailed summaries."** I'll agree the target with Priya first, using the data: emails aren't logged, can't be audited, and have no owners or dates per action. The channel post of the same text is accepted as a recap.
- **"The bot should be faster, fix that."** Agreed, and it is on engineering's list below. But even the fastest agent run we have seen (45 min) leaves little margin, so the AM post stays the reliable path.

## What keeps it going after I stop checking in
- **Default, not discipline.** Engineering's draft lands in the channel within 15 min, so the AM's job becomes "edit and confirm", not "write".
- **One owner, one weekly look.** Marcus owns the number. The dashboard is generated from `calls.csv` with `posted_by`, and gets pasted into #pod-south every Monday. 10 minutes in the pod's standup. Tomas is the backup poster when Marcus is out.
- **A checker, not a reviewer.** `extra/bizops.py lint` runs on any recap and fails on missing owners, missing dates, typed performance numbers and the SANITIZER list, so nobody has to police quality.
- **A missed-recap alert** (below), so a skipped call is noticed the same day.

## The week

**What I do myself**
- Mon: 30 min with Sam Whitaker to see exactly how North's AMs post in 18 min, then copy it for Marcus rather than invent it. 30 min with Marcus to set it up.
- Mon: fix the dashboard (East denominator). Add `posted_by` and a lag column to the weekly view.
- Tue: write the two missing K&C recaps (done in Block A) and backfill c117 and c140 in the log.
- Tue to Thu: check each South call in `calls.csv` the same day. If a recap is late, ask once, not at the end of the week.
- Wed: send Priya the one-page version of B1/B2.
- Fri: report the number, from `calls.csv` only.

**What I ask of the pod**
- Marcus and Tomas: after each call, post the summary in the client channel within 30 min (the aim is 60). Same text as the email.
- Every action has an owner and a date. If the owner or date wasn't agreed, it goes under Open questions.
- Nothing from after the client leaves the call, no opinions about people.
- Tell me when the bot's draft is wrong. I'll turn it into a fix in the skill.

**What I ask of engineering** (full ticket: [fde-ticket.md](fde-ticket.md))
1. Start the agent as soon as the recording is available, and tell us where the 45 to 90 minutes go. Target: 15 min for 90% of calls.
2. An "on demand" run so an AM can trigger the recap right after the call.
3. A same-day alert when a recorded call has no recap (c117 and c140 went unnoticed).
4. Check why South's agent runs are slower than the other pods' (74 vs 55 to 59 min median).

## Number by Friday
**South: 70% (7 of 10 calls with a recap in the channel within 60 min), from 35%.** About 10 calls a week at South's recent pace, and about 1 in 10 is a phone call that can't be recorded, so 90% is the ceiling for now. I'm not promising 80%, because week one is a habit change for two people. 80% by 31 Oct comes from the plan above sticking.
