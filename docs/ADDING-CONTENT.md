# Adding content

Every change below can be made directly in GitHub's web editor. Commit, wait a
minute, and it's live.

The site has three parts:

| Part | Pages | Where the content lives |
|------|-------|-------------------------|
| **Research** | Research | `_data/studies.csv`, `_data/topics.csv` (synced from the curation Sheet) |
| **Our Story** | `/story/` | `story/index.md`, `_data/mood.csv`, `_data/fmt-doses.yml` |
| **Community** | `/community/`, Resources & Reading | `_data/efforts.yml`, `_data/community.yml`, `_data/resources.yml` |

## Write the story page

Edit `story/index.md`. Each section has a placeholder paragraph followed by a
`{: .placeholder}` line, which shows it in a dashed "To write" box. Replace
the paragraph with your own words and delete the `{: .placeholder}` line
under it. Add, remove, or rename `##` sections freely.

This page is public and personal. Share only what the person it's about is
comfortable with, and consider leaving out full names, locations, and
clinician or clinic names.

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

## Add a Reading article

1. Copy [`entry-template.md`](entry-template.md) into `_reading/` and rename
   it. The file name becomes the URL, so `_reading/probiotics-for-ibs.md`
   becomes `/reading/probiotics-for-ibs/`. Use lowercase words and hyphens.
2. Fill in the front matter (the block between the `---` lines):

   | Field | Required | Notes |
   |-------|----------|-------|
   | `title` | yes | |
   | `summary` | recommended | Shown in the Reading list and at the top of the article |
   | `tags` | optional | Shown in the article's sidebar |
   | `key_points` | recommended | Plain-language bullets shown first in an "At a glance" box |
   | `evidence` | optional | `established`, `emerging`, or `preliminary` (shown as a colored badge) |
   | `status` | optional | `draft` shows a Draft badge. Remove it when the article is ready |
   | `last_reviewed` | recommended | `YYYY-MM-DD` |
   | `sources` | recommended | List of `title` / `url` / optional `note`, rendered as a numbered list |

3. Write the body in Markdown below the front matter.

The article appears under **Reading** at the top of Resources & Reading.
The two articles in `_reading/` are outlines: rewrite or delete them.

## Add studies to Research

See [EVIDENCE-MAP.md](EVIDENCE-MAP.md). Studies are curated in the Google
Sheet and sync to `_data/` every hour; Research updates on its own.

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
[FMT]({{ '/reading/fecal-microbiota-transplantation/' | relative_url }})
```
