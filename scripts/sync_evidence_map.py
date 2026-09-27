#!/usr/bin/env python3
"""Pull the Evidence Map curation Sheet into _data/.

Downloads the `studies` and `topics` tabs from their "Publish to web" CSV
links, checks that each looks like the expected table, and writes
_data/studies.csv and _data/topics.csv. Run by
.github/workflows/sync-evidence-map.yml; see docs/EVIDENCE-MAP.md.

Usage: STUDIES_CSV_URL=... TOPICS_CSV_URL=... python3 scripts/sync_evidence_map.py
Exits non-zero, leaving the existing files untouched, if anything looks wrong.
"""

import csv
import io
import os
import sys
import urllib.request

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TABLES = {
    "studies": {
        "env": "STUDIES_CSV_URL",
        "columns": ["id", "title", "authors", "year", "journal", "url", "study_type", "sample_size",
                    "treatments", "conditions", "other_topics", "finding", "conclusion", "relevance", "status"],
    },
    "topics": {
        "env": "TOPICS_CSV_URL",
        "columns": ["id", "name", "type", "summary", "entry"],
    },
}


def fetch(url):
    request = urllib.request.Request(url, headers={"User-Agent": "evidence-map-sync"})
    with urllib.request.urlopen(request, timeout=60) as response:
        return response.read().decode("utf-8-sig")


def parse(name, text, columns):
    if text.lstrip().startswith("<"):
        raise ValueError(f"{name}: got a web page instead of CSV. Check the tab is published as CSV.")

    rows = list(csv.reader(io.StringIO(text)))
    if not rows:
        raise ValueError(f"{name}: the CSV is empty.")

    header = [h.strip() for h in rows[0]]
    if header[:len(columns)] != columns:
        raise ValueError(f"{name}: header row doesn't match.\n  expected: {columns}\n  got:      {header}")

    # Keep only the known columns (ignores helper columns added to the right)
    # and drop fully blank rows.
    # A row without an id is usually still being typed: skip it rather than
    # blocking the whole sync.
    body = []
    for line, row in enumerate(rows[1:], start=2):
        row = (row + [""] * len(columns))[:len(columns)]
        row = [cell.strip() for cell in row]
        if not any(row):
            continue
        if not row[0]:
            print(f"::warning::{name}: skipping row {line}, which has no id")
            continue
        body.append(row)

    ids = [r[0] for r in body]
    dupes = sorted({v for v in ids if ids.count(v) > 1})
    if dupes:
        raise ValueError(f"{name}: duplicate ids: {', '.join(dupes)}")
    return body


def to_csv(columns, body):
    out = io.StringIO()
    writer = csv.writer(out, lineterminator="\n")
    writer.writerow(columns)
    writer.writerows(body)
    return out.getvalue()


def main():
    tables = {}
    for name, spec in TABLES.items():
        url = os.environ.get(spec["env"], "").strip()
        if not url:
            print(f"{spec['env']} is not set; nothing to sync.")
            return 0
        tables[name] = parse(name, fetch(url), spec["columns"])

    # Cross-check: every topic id used by a study should exist in topics.
    # Unknown ids still render (the map flags them), so only warn.
    known = {row[0] for row in tables["topics"]}
    cols = TABLES["studies"]["columns"]
    for row in tables["studies"]:
        for col in ("treatments", "conditions", "other_topics"):
            for topic_id in filter(None, (t.strip() for t in row[cols.index(col)].split(";"))):
                if topic_id not in known:
                    print(f"::warning::study {row[0]} uses topic '{topic_id}', which isn't in the topics tab")

    for name, body in tables.items():
        path = os.path.join(ROOT, "_data", f"{name}.csv")
        with open(path, "w", encoding="utf-8", newline="") as f:
            f.write(to_csv(TABLES[name]["columns"], body))
        print(f"{name}: {len(body)} rows")
    return 0


if __name__ == "__main__":
    try:
        sys.exit(main())
    except Exception as err:  # report cleanly in the Actions log
        print(f"::error::{err}")
        sys.exit(1)
