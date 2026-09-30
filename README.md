# Gut Brain Biome - Patient Resources, Emerging Treatments & Research Hub

Source for the research hub website at **https://gutbrainbiome.com**. It's hosted the same way as
rainbowdatalabs.com: free **GitHub Pages** hosting from this repo, a custom
domain (registered at Namecheap, DNS managed in Cloudflare) pointed at GitHub, and a **Google Apps Script → Google Sheet** backend
for the contact form. The one difference is that GitHub Pages runs
[Jekyll](https://jekyllrb.com/) on every push. You write knowledge entries as
Markdown files, and GitHub turns them into pages. Nothing to install, no build
step, no servers.

## Site map

The site is organized in three equal parts: **Research** (Knowledge Base,
Evidence Map), **Our Story** (a personal record of the condition and
journey), and **Community** (networking, emerging resources, and ongoing
efforts).

| Page | URL | Source |
|------|-----|--------|
| Landing page | `/` | `index.html` |
| Knowledge Base (searchable index) | `/knowledge/` | `knowledge/index.html` |
| Knowledge entries | `/knowledge/<name>/` | `_knowledge/<name>.md` |
| Evidence Map (interactive graph) | `/evidence-map/` | `evidence-map/index.html`, data in `_data/topics.csv` + `_data/studies.csv` |
| Our Story | `/story/` | `story/index.md`, treatments in `_data/treatment-log.yml` |
| Journey updates | `/story/<name>/` | `_journey/<name>.md` |
| Community | `/community/` | `community/index.html`, data in `_data/efforts.yml` + `_data/community.yml` |
| Resources | `/resources/` | `resources/index.html`, links in `_data/resources.yml` |
| About + contact form | `/about/` | `about/index.md` |

## Where things live

```
_config.yml              Site title, URL, contact form endpoint
_data/navigation.yml     Main menu (add new pages here)
_data/categories.yml     Knowledge Base sections
_data/resources.yml      Resources page content
_data/treatment-log.yml  "What we've tried" table on Our Story
_data/efforts.yml        Ongoing efforts (Community page and home page)
_data/community.yml      Community groups and emerging resources
_data/topics.csv         Evidence Map topics (exported from the curation Sheet)
_data/studies.csv        Evidence Map studies (exported from the curation Sheet)
_knowledge/              One Markdown file per knowledge entry
_journey/                One Markdown file per Our Story update
_layouts/, _includes/    Page templates (header, footer, entry layout, cards)
assets/css/main.css      All styles (colors are variables at the top)
assets/js/               Menu toggle, Knowledge Base search, Evidence Map, contact form
google-apps-script/      Contact form backend (Apps Script + setup guide)
docs/                    How-to guides and the entry template (not published)
```

## Guides

- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**: turn on GitHub Pages and connect your domain.
- **[docs/EVIDENCE-MAP.md](docs/EVIDENCE-MAP.md)**: curate studies in Google Sheets and publish them to the Evidence Map.
- **[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md)**: add knowledge entries, resources, sections, and new pages.
- **[google-apps-script/SETUP.md](google-apps-script/SETUP.md)**: connect the contact form to a Google Sheet.

## Local preview (optional)

You don't need to preview locally; GitHub builds the site on every push. If
you want to preview anyway, with Ruby installed:

```sh
bundle install
bundle exec jekyll serve
# open http://localhost:4000/
```
