# Log

**Human hours: 1. AI hours: under 1 h of Claude Code (Sonnet 5.5) work time, including one fresh sub-agent session for C2.**
Skipped: nothing. Extra credit done (`extra/`).

**First instruction:** the case-study brief pasted as-is ("this is a new project …"), followed by the zip.

**Three things the AI got wrong**
1. **Started without the input files.** It went looking in the wrong repo, then in the empty `ironside` repo, and reported there was nothing to work on. Caught because the folders weren't there; fixed by getting the zip. Input fixed, not the instruction.
2. **Overstated a finding in B1.** First draft said every on-time miss "on a recorded call" was an agent post. Re-checking the claim against the numbers showed 2 recorded South calls got no recap at all (c117, c140), and those are neither. Fixed the output (and used the case in B2 and the ticket). The instruction was not changed.
3. **The linter in `extra/` threw false positives** (ISO dates read as phone numbers, the 60-affiliate target read as a typed performance number). Caught by running it on recaps I knew were clean before trusting it. Fixed the code, and the same check is now the habit: run any checker on known-good and known-bad files.

Also worth knowing: an early attempt to copy the uploads straight into the `ironside` repo was blocked by the permission system. I redid everything in a scratch folder and have not pushed anything.

**Send-back notes**
- Time spent: about 1 hour of human time.
- Skipped: none.
- **Next to automate:** the pre-post gate. Run `extra/bizops.py lint` on every agent recap before it posts, so a private line or a typed number can't reach a channel the client reads. Second, an on-demand "recap now" for AMs, because the only reliable way to be inside the hour today is a person posting (18 min median vs 65). Third, post `bizops.py number` to each pod channel every Monday from `calls.csv`, because the dashboard already had one wrong number (East, 75% vs 70%).
