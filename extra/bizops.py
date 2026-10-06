#!/usr/bin/env python3
"""bizops.py: two checks I'd run every day.
  lint <recap.md>      fail a recap that breaks RESOLVER/SANITIZER (exit 1 if any problem)
  number <calls.csv>   recompute "recap within 60 min" per pod, split by AM vs agent
"""
import csv, re, sys
from datetime import datetime as D
from collections import defaultdict

SECTIONS = ["## Summary", "## Action items", "## Open questions", "## Flags for a person"]
FRONT = ["type", "date", "account", "attendees", "source"]
# performance numbers must link to the sheet: $ amounts near these words, or "NN affiliates"
PERF = re.compile(r"(gmv|ad spend|retention|active affiliates?)[^\n.]{0,40}(\$\s?\d|\d+\s?[kKmM%]|\d{3,})|(\$\s?\d[\d,.]*\s?[kKmM]?)[^\n.]{0,40}(gmv|ad spend)|\b\d+\s+active affiliates(?![^\n.]{0,25}\b(by|target)\b)", re.I)
BAD = re.compile(r"\b(flaky|difficult|checked out|frustrated|great call|between us|\bDM\b|fees?|margins?)\b", re.I)
PHONE = re.compile(r"\+?\d[\d\s().-]{8,}\d")

def lint(path):
    t = open(path).read(); errs = []
    m = re.match(r"---\n(.*?)\n---\n", t, re.S)
    fm = m.group(1) if m else ""
    for k in FRONT:
        if not re.search(rf"^{k}:", fm, re.M): errs.append(f"frontmatter missing '{k}'")
    for s in SECTIONS:
        if s not in t: errs.append(f"missing section '{s}'")
    if "## Action items" in t:
        block = t.split("## Action items")[1].split("\n## ")[0]
        rows = [r for r in block.splitlines() if r.startswith("|") and not re.match(r"\|\s*(Owner|-)", r)]
        for r in rows:
            c = [x.strip() for x in r.strip("|").split("|")]
            if len(c) != 3 or not c[0] or re.search(r"\b(we|team|all|everyone|and)\b", c[0], re.I):
                errs.append(f"action needs exactly one named owner: {r}")
            if len(c) == 3 and not re.fullmatch(r"\d{4}-\d{2}-\d{2}", c[2]):
                errs.append(f"action needs a YYYY-MM-DD due date: {r}")
        if not rows and not re.search(r"^- ", block, re.M) and "None" not in block:
            errs.append("action items table is empty")
    body = t[m.end():] if m else t
    body = re.sub(r"\]\([^)]*\)", "]", body)              # drop link targets
    body = re.sub(r"\d{4}-\d{2}-\d{2}", "DATE", body)    # ISO dates are not phone numbers
    body = re.sub(r"\d\d:\d\d", "TIME", body)           # nor are call timestamps
    for pat, why in [(PERF, "performance number typed, link the sheet"), (BAD, "SANITIZER word (opinion, private, fees)"), (PHONE, "possible phone number")]:
        for mm in pat.finditer(body):
            errs.append(f"{why}: '{mm.group(0).strip()[:50]}'")
    if re.search(r"^\d\d:\d\d ", body, re.M): errs.append("looks like raw transcript lines")
    for e in errs: print("FAIL", e)
    print("OK" if not errs else f"{len(errs)} problem(s)")
    return 1 if errs else 0

def number(path):
    pods = defaultdict(lambda: dict(held=0, rec=0, ok=0, am=0, ag=0))
    for r in csv.DictReader(open(path)):
        p = pods[r["pod"]]; p["held"] += 1; p["rec"] += r["recorded"] == "yes"
        if r["recap_posted_at"]:
            lag = (D.strptime(r["recap_posted_at"], "%Y-%m-%d %H:%M") - D.strptime(r["call_end"], "%Y-%m-%d %H:%M")).total_seconds() / 60
            if lag <= 60: p["ok"] += 1
            p["am" if r["posted_by"] == "AM" else "ag"] += 1
    print(f"{'pod':6} {'calls':>5} {'recorded':>8} {'on-time':>7} {'share':>6}  AM-posted agent-posted")
    for n, p in sorted(pods.items(), key=lambda x: -x[1]["ok"] / x[1]["held"]):
        print(f"{n:6} {p['held']:5} {p['rec']:8} {p['ok']:7} {p['ok']/p['held']:6.0%}  {p['am']:9} {p['ag']:12}  {'<80%' if p['ok']/p['held']<.8 else ''}")

if __name__ == "__main__":
    if len(sys.argv) == 3 and sys.argv[1] == "lint": sys.exit(lint(sys.argv[2]))
    if len(sys.argv) == 3 and sys.argv[1] == "number": number(sys.argv[2])
    else: print(__doc__)
