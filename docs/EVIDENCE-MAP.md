# Research data

The Research page (`/research/`) lists every study from the curation Sheet,
newest first. It is built from two spreadsheets:

| File | One row per | Drives |
|------|-------------|--------|
| `_data/studies.csv` | article or study | the list on Research |
| `_data/topics.csv` | topic (treatment, condition, or mechanism) | the names shown in filters and tags |

Each study shows its title, year, and study type; selecting it reveals the
authors, journal, sample size, finding, conclusion, why it matters, its
topics, and a link to the source. The sidebar filters by **Treatment**
(`treatments` column), **Condition** (`conditions`), **Topic**
(`other_topics`), and **Study type** (`study_type`), plus a keyword search.

The Sheet and these files were originally built for an interactive "Evidence
Map", which is why the Sheet, workflow, and script keep that name.

## Curating in Google Sheets

The Google Sheet **"Research Hub — Evidence Map Curation"** in your Drive has
`studies` and `topics` tabs that match these files. It includes dropdowns for
the fixed-choice columns and an Instructions tab. A copy of the same workbook
is at [`curation/evidence-map-curation.xlsx`](curation/evidence-map-curation.xlsx),
so you can re-import it to Google Sheets if needed.

### Automatic sync

The **Sync Evidence Map** GitHub Action
(`.github/workflows/sync-evidence-map.yml`) runs every hour. It downloads both
tabs, checks them, and commits any changes to `_data/`, which republishes the
site. A tab is rejected, and the site keeps its current data, if:

- the header row doesn't match the column names below, or
- two rows share an id.

Rows without an id are skipped, so a half-typed row doesn't block the sync.

**One-time setup:**

1. In the Sheet: **File → Share → Publish to web**.
2. Under **Link**, choose the `studies` tab and **Comma-separated values (.csv)**,
   click **Publish**, and copy the link. Repeat for the `topics` tab.
   Leave "Automatically republish when changes are made" on (under
   *Published content and settings*).
3. Paste the two links into `STUDIES_CSV_URL` and `TOPICS_CSV_URL` in
   `.github/workflows/sync-evidence-map.yml` and commit.
4. Test it: **Actions** tab → **Sync Evidence Map** → **Run workflow**.

After that, edit the Sheet and the site catches up within about an hour.
Google refreshes published links a few minutes after an edit. To update
sooner, use **Run workflow**.

Publishing makes the two tabs readable by anyone with those links, including
rows marked `draft`. Keep private notes out of these tabs. They are not
shown on the site, but the links are not secret.

If a run fails, open it in the **Actions** tab. The error names the
problem, such as a renamed column, a duplicate id, or a tab that isn't
published. If it fails at "Commit changes" with a permission error, go to
**Settings → Actions → General → Workflow permissions**, choose **Read and
write permissions**, and save. GitHub emails you when a scheduled run fails.

### Manual alternative

If the sync isn't set up, or you'd rather not publish the Sheet, download each
tab as CSV (**File → Download → Comma-separated values**), rename the files to
`studies.csv` and `topics.csv`, and upload them to `_data/` on GitHub.

## Extracting entries from PDFs

[`curation/EXTRACTION-PROMPT.md`](curation/EXTRACTION-PROMPT.md) is a prompt to
use with Claude and one research PDF at a time. It returns rows you can paste
straight into the `studies` and `topics` tabs, plus verbatim quotes to check
them against. Keep its topic list and its list of studies already in the Sheet
up to date.

Each row counts as one study on the map, so a paper normally gets one row.
The prompt splits a paper only when its groups got different treatments or
conditions (for example, diet alone vs. diet plus FMT).

## Columns

**topics**

| Column | Notes |
|--------|-------|
| `id` | Short, lowercase, hyphenated, e.g. `fmt`, `dietary-fiber`. Don't rename an id after studies use it. |
| `name` | Display name |
| `type` | `treatment`, `condition`, or `mechanism` |
| `summary` | One-sentence description (not currently shown on the site) |
| `entry` | No longer used by the site; safe to leave or clear |

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
| `status` | `published` (shown), `draft` (not shown until you publish it), `hidden` (not shown), or `example` (shown with a Sample badge) |

Every topic id used in `studies.csv` should exist in `topics.csv`. If one is
missing or misspelled, the sync logs a warning naming it, and the site shows
the id itself (with hyphens as spaces) instead of a proper name.

## Sample data

Rows with status `example` are placeholders, not real studies. They are
listed with a "Sample" badge; delete them once you've added real studies.

## Technical notes

- Page: `research/index.html` (works without JavaScript). Search, filters,
  and counts: `assets/js/research.js`. Styles: the "Research" section of
  `assets/css/main.css`.
- Filters within a group match any selected option; groups combine. The
  current filters are kept in the address, so you can link to a view:
  `/research/?treatment=fmt`, `/research/?topic=scfa&type=Review`,
  `/research/?q=depression`. Link to one study (opened) with
  `/research/#<study-id>`.
- The old `/evidence-map/` and `/knowledge/` addresses redirect to Research.
