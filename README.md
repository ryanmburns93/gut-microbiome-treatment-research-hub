# Gut Brain Biome - Patient Resources, Emerging Treatments & Research Hub

Source for the research hub website at **https://gutbrainbiome.com**. It's hosted the same way as
rainbowdatalabs.com: free **GitHub Pages** hosting from this repo, a custom
domain (registered at Namecheap, DNS managed in Cloudflare) pointed at GitHub, and a **Google Apps Script → Google Sheet** backend
for the contact form. The one difference is that GitHub Pages runs
[Jekyll](https://jekyllrb.com/) on every push. Studies come from a Google Sheet
that syncs hourly, articles are Markdown files, and GitHub turns them into pages. Nothing to install, no build
step, no servers.

## Site map

The site is organized in three equal parts: **Research** (every study, with
filters), **Our Story** (a personal record of the condition and
journey), and **Community** (networking, emerging resources, and ongoing
efforts).

| Page | URL | Source |
|------|-----|--------|
| Landing page | `/` | `index.html` |
| Research (studies with filters) | `/research/` | `research/index.html`, data in `_data/studies.csv` + `_data/topics.csv` |
| Our Story | `/story/` | `story/index.md`, chart data in `_data/mood.csv` and `_data/fmt-doses.yml` |
| Community | `/community/` | `community/index.html`, data in `_data/efforts.yml` + `_data/community.yml` |
| Resources & Reading | `/resources/` | `resources/index.html`, articles in `_reading/`, links in `_data/resources.yml` |
| Reading articles | `/reading/<name>/` | `_reading/<name>.md` |
| About + contact form | `/about/` | `about/index.md` |

## Where things live

```
_config.yml              Site title, URL, contact form endpoint
_data/navigation.yml     Main menu (add new pages here)
_data/resources.yml      Link lists on Resources & Reading
_data/efforts.yml        Ongoing efforts (Community page and home page)
_data/community.yml      Community groups and emerging resources
_data/topics.csv         Topic names for Research filters (synced from the curation Sheet)
_data/studies.csv        Studies listed on Research (synced from the curation Sheet)
_reading/                One Markdown file per Reading article
_layouts/, _includes/    Page templates (header, footer, entry layout, cards)
assets/css/main.css      All styles (colors are variables at the top)
assets/js/               Menu toggle, Research filters, Our Story chart, contact form
google-apps-script/      Contact form backend (Apps Script + setup guide)
docs/                    How-to guides and the entry template (not published)
```

## Guides

- **[docs/DEPLOYMENT.md](docs/DEPLOYMENT.md)**: turn on GitHub Pages and connect your domain.
- **[docs/EVIDENCE-MAP.md](docs/EVIDENCE-MAP.md)**: curate studies in Google Sheets and publish them to Research.
- **[docs/ADDING-CONTENT.md](docs/ADDING-CONTENT.md)**: add Reading articles, resources, and new pages.
- **[google-apps-script/SETUP.md](google-apps-script/SETUP.md)**: connect the contact form to a Google Sheet.

## Local preview (optional)

You don't need to preview locally; GitHub builds the site on every push. If
you want to preview anyway, with Ruby installed:

```sh
bundle install
bundle exec jekyll serve
# open http://localhost:4000/
```
