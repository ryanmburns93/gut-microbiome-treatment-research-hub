# Adding content

Every change below can be made directly in GitHub's web editor. Commit, wait a
minute, and it's live.

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
