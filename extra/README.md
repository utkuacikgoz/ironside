`bizops.py` does two checks I'd run every day. `lint` fails a recap that breaks the brain's rules (template, one owner and a date per action, typed performance numbers, SANITIZER words). `number` recomputes the one-hour recap share per pod from `calls.csv` (it caught the East 75% vs 70% error).
Run: `python3 extra/bizops.py lint brain/knowledge/meetings/<file>.md` or `python3 extra/bizops.py number calls.csv`.
Why this one: I'd rather catch a bad recap before the client reads it than apologise after, and the dashboard should never be hand-typed.
Next: run `lint` as the gate before the agent posts (see fde-ticket.md), and post `number` to #pod channels every Monday.
