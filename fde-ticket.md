# FDE ticket: recap agent

**What a skill file can't fix**

1. **Latency.** Agent recaps post 45 to 91 min after the call (59 posts, median 65, only 49% inside an hour). AM-posted recaps: median 18, never late. South's agent median is 74 vs 55.5 to 59 elsewhere; stage timestamps are needed to establish the cause. Please trace where the minutes go. Target: 90% of recorded calls within 20 min, plus an on-demand run an AM can trigger.
2. **Silent misses.** c117 and c140 (South, Kettle & Crumb) were recorded and never got a recap. Alert the same day.
3. **No hard gate.** `bad-recap.md` posted a pasted DM and fee remarks to a channel the client reads. In code: cut the transcript at the first client "left the call", and block posting unless every action has an owner and a date and no performance number is typed.
