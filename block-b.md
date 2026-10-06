# Block B: Move the number

Number = share of client calls with a recap posted within 60 minutes of call end. Recomputed from `calls.csv` (140 calls, 1 to 24 Sep), not read off the dashboard. Script: `extra/bizops.py number calls.csv`.

## B1. Ranking

| Rank | Pod (lead) | Calls | On time | **Share** | Dashboard says |
|---|---|---|---|---|---|
| 1 | North (Sam Whitaker) | 40 | 36 | **90%** | 90% |
| 2 | East (Aisha Rahman) | 30 | 21 | **70%** | 75% (wrong) |
| 3 | South (Marcus Obi) | 40 | 14 | **35%** | 35% |
| 4 | West (Lena Varga) | 30 | 3 | **10%** | 10% |

Only North is over the 80% target.

**The dashboard overstates East.** 21 of 30 calls is 70%. The 75% is 21 of the 28 *recorded* calls, so East is on a different denominator from the other three pods. Fix the dashboard formula before anyone reports it.

**The extra number: who posts the recap, and how fast.**

| Posted by | Recaps | On time | Median minutes after call |
|---|---|---|---|
| AM, by hand | 45 | 45 (100%) | 18 (max 28) |
| Recap agent | 59 | 29 (49%) | 65 (min 45, max 91) |

Every late recap is an agent post. No AM-posted recap was late. The agent never posted faster than 45 minutes in any pod. So the one-hour target is met only when a person posts, or when the agent happens to land in the first 15 minutes of its 45 to 90 minute range.

The split also shows what kind of gap each pod has:

| Pod | Calls recorded | On time, of recorded | AM posted | Agent median |
|---|---|---|---|---|
| North | 95% | 95% | 33 | 58 min |
| East | 93% | 75% | 12 | 59 min |
| South | 90% | 39% | **0** | **74 min** |
| West | **13%** | 75% | 0 | 56 min |

## B2. Which pod first: South

**Why not West, which is lowest.** West's gap is capture: 26 of 30 calls were WhatsApp, so nothing was recorded and nothing reached the agent. Of the 4 calls that were recorded, 3 were on time. Fixing capture needs a tool or a client behavior change. Lena is already on it ([NOW.md](brain/NOW.md)), and I can't move it in a week. Even when solved, the agent's own lag (median 56 min) leaves it marginal.

**Why South.** South needs 18 more on-time calls to reach 80% (32 of 40), and almost all of them are already recorded and already get a recap. 34 of 36 recorded South calls got a recap, but 20 of the 34 were late (median 74 min, max 91). If those 34 landed inside the hour, South would be at 85% with no new recording. Catching the 2 missed posts would add 5 more points (90%). The 4 phone calls can't be recorded, so 90% is the ceiling.

**What is actually causing it.** Three things, in order of how sure I am:
1. **Nobody in South posts a recap themselves.** 0 of 36, against 33 of 38 in North. The Slack thread ([slack-thread.txt](slack-thread.txt)) says why: the bot lands after Marcus has already emailed his own summary to the client, so they skip it ("content is fine when it shows up", "if it posted in 10-15 min I'd use it"). Their work is happening. It just isn't in the channel, so it isn't counted and isn't in the brain.
2. **The agent has a 45 minute floor and South gets the slow end.** South agent median is 74 min against 55 to 59 in the other pods. I tested whether that comes from load (calls ending around the same time) or time of day. Neither explains it (correlation about 0 and -0.17). I can't see the cause from the data. That's a question for engineering (C3).
3. **Silent failures.** 2 recorded South calls never got a recap: c117 (22 Sep) and c140 (24 Sep), both Kettle & Crumb, the account with the 60-affiliate push. Kettle & Crumb is 0 for 4 on time. Those are the calls I recapped by hand in Block A.

**Priya's proposal (count the emailed summaries).** I wouldn't. It moves South to its target without changing anything the client or the team gets: emails aren't in the brain, have no owner and due date per action, and aren't in `calls.csv`, so nobody can audit the number. My counter: the same text Marcus emails, posted in the client channel with an owner and a date per action, *is* a recap. That counts, and costs him no extra time. See [plan.md](plan.md).
