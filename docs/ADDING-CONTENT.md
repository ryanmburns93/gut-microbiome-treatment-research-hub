# Adding content

Every change below can be made directly in GitHub's web editor. Commit, wait a
minute, and it's live.

The site has three parts:

| Part | Pages | Where the content lives |
|------|-------|-------------------------|
| **Research** | Knowledge Base, Evidence Map | `_knowledge/`, `_data/topics.csv`, `_data/studies.csv` |
| **Our Story** | `/story/` and its dated updates | `story/index.md`, `_journey/`, `_data/treatment-log.yml` |
| **Community** | `/community/`, Resources | `_data/efforts.yml`, `_data/community.yml`, `_data/resources.yml` |

## Write the story page

Edit `story/index.md`. Each section has a placeholder paragraph followed by a
`{: .placeholder}` line, which shows it in a dashed "To write" box. Replace
the paragraph with your own words and delete the `{: .placeholder}` line
under it. Add, remove, or rename `##` sections freely.

This page is public and personal. Share only what the person it's about is
comfortable with, and consider leaving out full names, locations, and
clinician or clinic names.

## Add a journey update

1. Copy `_journey/starting-this-journal.md` and rename it. The file name
   becomes the URL, so `_journey/first-gi-appointment.md` becomes
   `/story/first-gi-appointment/`.
2. Set `title`, `date` (`YYYY-MM-DD`), an optional `phase` label (e.g.
   Diagnosis, Treatment, Setback, Milestone), and a one-line `summary`.
   `status: draft` shows a Draft badge; remove it when the update is ready.
3. Write the update in Markdown below the front matter.

Updates appear on Our Story (newest first), with Earlier/Later links between
them, and the latest three appear on the home page. The starter update is a
placeholder: rewrite or delete it.

## Log a treatment

Add an item to `_data/treatment-log.yml` (instructions at the top of the
file). Set `topic:` to an Evidence Map topic id from `_data/topics.csv` to add
a "See the research" link from your experience to the studies. Replace the
example item.

## Add an ongoing effort

Add an item to `_data/efforts.yml` with a `title`, `kind` (Our project,
Clinical trial, Research study, Community initiative), `status` (Active,
Recruiting, Planned, Completed), `summary`, optional `url`, and `updated`
date. The first three also appear on the home page, so keep the most current
at the top.

## Add a community group or emerging resource

Add a link under `groups` or `emerging` in `_data/community.yml`, with a
`title`, `url`, and optional `description`. Add `added: YYYY-MM-DD` to show a
"New" badge for 60 days. Reference databases and registries belong in
`_data/resources.yml` instead.

## Add a knowledge entry

1. Copy [`entry-template.md`](entry-template.md) into `_knowledge/` and rename
   it. The file name becomes the URL, so `_knowledge/probiotics-for-ibs.md`
   becomes `/knowledge/probiotics-for-ibs/`. Use lowercase words and hyphens.
2. Fill in the front matter (the block between the `---` lines):

   | Field | Required | Notes |
   |-------|----------|-------|
   | `title` | yes | |
   | `category` | yes | An `id` from `_data/categories.yml` |
   | `summary` | recommended | Shown on cards, in search, and at the top of the entry |
   | `tags` | optional | Searchable, e.g. `[probiotics, IBS]` |
   | `key_points` | recommended | Plain-language bullets shown first in an "At a glance" box, for non-specialist readers |
   | `evidence` | optional | `established`, `emerging`, or `preliminary` (shown as a colored badge) |
   | `status` | optional | `draft` shows a Draft badge. Remove it when the entry is ready |
   | `last_reviewed` | recommended | `YYYY-MM-DD`. Drives "Recently reviewed" on the home page |
   | `sources` | recommended | List of `title` / `url` / optional `note`, rendered as a numbered list |

3. Write the body in Markdown below the front matter.

The entry appears on the Knowledge Base page, in search, and in the home
page's topic counts automatically.

The two entries in `_knowledge/` are examples. Rewrite or delete them.

## Add studies to the Evidence Map

See [EVIDENCE-MAP.md](EVIDENCE-MAP.md). Studies are curated in the Google
Sheet and uploaded to `_data/` as CSV files. To show a topic's studies on a
Knowledge Base entry, put the entry's file name in that topic's `entry` column.

## Add a Knowledge Base section

Add an item to `_data/categories.yml` with an `id`, `name`, and
`description`. It appears as a filter chip, a section, and a home page topic
card.

## Add a resource link

Add an item under a group's `links:` in `_data/resources.yml`, or add a new
group with its own `id`, `name`, and `links`.

## Add a new top-level page

1. Create a folder with an `index.md`, e.g. `glossary/index.md`:

   ```markdown
   ---
   title: Glossary
   lede: Optional one-line intro under the title.
   ---

   Page content in Markdown…
   ```

2. Add it to the menu in `_data/navigation.yml`:

   ```yaml
   - title: Glossary
     url: /glossary/
   ```

## Change the look

The site uses a clinical/institutional theme: navy and blue on white, Public Sans
for headings and interface text, and Source Serif for article text (both
from Google Fonts). Colors, fonts, and spacing are variables at the top of
`assets/css/main.css`. The dark-mode palette is in the
`prefers-color-scheme: dark` block right below them.

The evidence-level definitions shown on every entry live in
`_layouts/entry.html`. Adjust them to match your curation criteria.

## Internal links

Inside Markdown, link with Liquid so links keep working if the domain changes:

```markdown
[FMT]({{ '/knowledge/fecal-microbiota-transplantation/' | relative_url }})
```
