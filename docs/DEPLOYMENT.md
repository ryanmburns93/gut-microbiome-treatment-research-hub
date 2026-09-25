# Deployment: GitHub Pages + custom domain

This is the same setup as rainbowdatalabs.com. GitHub hosts the site for free
and rebuilds it within a minute or two of every push to the publishing branch.

## 1. Pick the publishing branch

The scaffold was pushed to `claude/research-hub-scaffold-1hczdt`. Because the
repo was empty, that branch is currently the default. To publish from `main`
like the other site does, do one of these:

- **Rename it:** Settings → Branches → rename the default branch to `main`, or
- **Create `main` from it:** create a `main` branch from it, then make `main`
  the default in Settings → General → Default branch.

## 2. Turn on GitHub Pages

1. Repo **Settings → Pages**.
2. **Source:** *Deploy from a branch*. **Branch:** `main`, folder `/ (root)`. Save.
3. After about a minute the site is live at
   `https://ryanmburns93.github.io/gut-microbiome-treatment-research-hub/`.

> GitHub Pages on a free plan needs a **public** repository, which is the
> same requirement Rainbow-Data-Labs already meets.

The site works at that address right away, because `_config.yml` sets
`baseurl` to the repo name.

## 3. Connect the custom domain (once it's registered)

**At your domain registrar (DNS):**

For the bare domain (`example.org`), add four **A** records pointing to GitHub:

```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

For `www`, add a **CNAME** record pointing to `ryanmburns93.github.io`.

**On GitHub:** Settings → Pages → **Custom domain**. Enter the domain and save.
GitHub commits a `CNAME` file to the repo. When the DNS check passes, tick
**Enforce HTTPS**. The certificate can take up to about an hour.

**In `_config.yml`**, change these two lines so links work at the new address:

```yaml
url: "https://your-domain.org"
baseurl: ""
```

Optional but recommended: verify the domain under your GitHub account's
Settings → Pages → *Add a domain*. Verification keeps anyone else from
claiming it.

## Troubleshooting

- **Styles missing / links 404 after switching domains.** `baseurl` is still
  set to the repo name. Set it to `""`.
- **Build failed.** Repo → **Actions** tab → the failed "pages build and
  deployment" run shows the file and line. The usual cause is a front-matter
  typo in a `_knowledge/*.md` file, such as a missing `---` or bad indentation.
