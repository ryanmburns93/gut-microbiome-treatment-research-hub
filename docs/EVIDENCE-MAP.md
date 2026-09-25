# Evidence Map

The Evidence Map (`/evidence-map/`) is an interactive graph of research
topics. It is built entirely from two spreadsheets:

| File | One row per | Drives |
|------|-------------|--------|
| `_data/topics.csv` | topic (treatment, condition, or mechanism) | the circles on the map |
| `_data/studies.csv` | article or study | the lines between circles, and every study list |

Each topic is a node. Every pair of topics that appear in the same study is
connected, and line thickness shows how many studies connect them. Visitors
can:

- select a topic to see its summary and studies
- select a line to see the studies that connect two topics
- search, filter by topic type, or switch to a text-only List view

A topic linked to a Knowledge Base entry (the `entry` column) also adds a
"Studies in the Evidence Map" section to that entry.

## Curating in Google Sheets

The Google Sheet **"Research Hub — Evidence Map Curation"** in your Drive has
`studies` and `topics` tabs that match these files. It includes dropdowns for
the fixed-choice columns and an Instructions tab. A copy of the same workbook
is at [`curation/evidence-map-curation.xlsx`](curation/evidence-map-curation.xlsx),
so you can re-import it to Google Sheets if needed.

**To publish changes:**

1. In the Sheet, select the `studies` tab → **File → Download → Comma-separated values (.csv)**.
   Do the same for the `topics` tab.
2. Rename the downloads to `studies.csv` and `topics.csv`.
3. On GitHub, open the `_data` folder → **Add file → Upload files**, drop both files in, and commit.

The map updates within a minute or two.

## Columns

**topics**

| Column | Notes |
|--------|-------|
| `id` | Short, lowercase, hyphenated, e.g. `fmt`, `dietary-fiber`. Don't rename an id after studies use it. |
| `name` | Display name |
| `type` | `treatment`, `condition`, or `mechanism` |
| `summary` | One sentence shown when the topic is selected |
| `entry` | Optional Knowledge Base file name without `.md`, e.g. `fecal-microbiota-transplantation` |

**studies**

| Column | Notes |
|--------|-------|
| `id` | Unique, e.g. `smith-2024` |
| `title`, `authors`, `year`, `journal` | Citation details |
| `url` | PubMed, DOI, or publisher link |
| `study_type`, `sample_size` | e.g. `Randomized controlled trial`, `120` |
| `treatments`, `conditions`, `other_topics` | Topic ids separated by semicolons, e.g. `fmt;probiotics`. Use `other_topics` for mechanisms. |
| `finding` | `benefit`, `no-effect`, `mixed`, `harm`, or `n/a` |
| `conclusion` | The study's main conclusion in 1–2 sentences |
| `relevance` | Why it matters to the broader topic |
| `status` | `published`, `draft` (shows a Draft badge), `hidden` (left off the site), or `example` |

Every topic id used in `studies.csv` must exist in `topics.csv`. If one is
missing or misspelled, the map shows a data-check warning naming it.

## Sample data

The eight `example` rows are placeholders, not real studies. While any exist,
the map shows a "Sample data" notice. Delete them once you've added real
studies.

## Technical notes

- The graph is drawn with [Cytoscape.js](https://js.cytoscape.org/) (MIT
  license), stored in `assets/js/vendor/`, so the site doesn't depend on an
  outside host.
- Page: `evidence-map/index.html`. Behavior: `assets/js/evidence-map.js`.
  Styles: the "Evidence Map" section of `assets/css/main.css`. Topic-type
  colors are the `--map-*` variables at the top of that file.
- Link to a topic or connection with `/evidence-map/#topic=<id>` or
  `/evidence-map/#link=<id1>__<id2>` (ids in alphabetical order).
