# Deployment: GitHub Pages + gutbrainbiome.com via Cloudflare

| Piece | Where | What it does |
|-------|-------|--------------|
| Registrar | Namecheap | You own the domain there. Its only job now is to point to Cloudflare's nameservers. |
| DNS | Cloudflare (free plan) | Holds the records that send the domain to GitHub. Also offers free email forwarding. |
| Hosting | GitHub Pages | Builds and serves the site from the `main` branch. |

The repo is already set up for the domain: the `CNAME` file contains
`gutbrainbiome.com`, and `_config.yml` has `url: "https://gutbrainbiome.com"`
and `baseurl: ""`.

## 1. Add the domain to Cloudflare

1. In Cloudflare: **Add a domain** → enter `gutbrainbiome.com` → choose the **Free** plan.
2. Cloudflare scans the domain's existing DNS records. **Delete any Namecheap
   parking records** it imports, such as a CNAME `www` → `parkingpage.namecheap.com`
   or URL-redirect records.
3. Cloudflare shows **two nameservers** (e.g. `xxx.ns.cloudflare.com`). Keep that page open.

## 2. Point Namecheap at Cloudflare

1. Namecheap → **Domain List** → **Manage** next to gutbrainbiome.com.
2. Under **Nameservers**, choose **Custom DNS** and enter the two Cloudflare
   nameservers. Save with the green checkmark.
3. If **DNSSEC** is on under Advanced DNS, turn it off first. It's off by
   default for new domains. You can turn it on later from Cloudflare.

Cloudflare emails you when the domain is **Active**. That usually takes minutes
but can take up to 24 hours.

## 3. Add the DNS records in Cloudflare

Cloudflare → gutbrainbiome.com → **DNS → Records**. Add these with **Proxy
status: DNS only** (grey cloud):

| Type | Name | Content |
|------|------|---------|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| AAAA | `@` | `2606:50c0:8000::153` |
| AAAA | `@` | `2606:50c0:8001::153` |
| AAAA | `@` | `2606:50c0:8002::153` |
| AAAA | `@` | `2606:50c0:8003::153` |
| CNAME | `www` | `ryanmburns93.github.io` |

These are GitHub Pages' published addresses. The AAAA (IPv6) records are
optional but recommended.

> **Keep the grey cloud (DNS only) for now.** GitHub has to see its own
> addresses to verify the domain and issue the HTTPS certificate. See step 6
> before turning on Cloudflare's proxy (orange cloud).

## 4. Turn on the custom domain in GitHub

1. Repo **Settings → Pages**. Confirm **Source** is *Deploy from a branch*,
   `main`, `/ (root)`.
2. **Custom domain** should already show `gutbrainbiome.com`, picked up from
   the `CNAME` file. If it's blank, type it in and **Save**.
3. Wait for the DNS check to pass, then tick **Enforce HTTPS**. The certificate
   can take up to about an hour. The checkbox stays greyed out until it's ready.

`www.gutbrainbiome.com` and the old `ryanmburns93.github.io/...` address both
redirect to `https://gutbrainbiome.com` automatically.

## 5. Verify the domain with GitHub (recommended)

Verification stops anyone else from pointing a GitHub Pages site at your domain.

1. GitHub → your profile picture → **Settings → Pages → Add a domain** →
   `gutbrainbiome.com`.
2. GitHub shows a TXT record (name like `_github-pages-challenge-ryanmburns93`).
   Add it in Cloudflare DNS exactly as shown.
3. Back in GitHub, click **Verify**. Leave the TXT record in place afterwards.

## 6. Optional: Cloudflare's proxy (orange cloud)

With DNS only (grey cloud), Cloudflare just answers DNS lookups and GitHub
serves the site and certificate. That's the simplest reliable setup, and
GitHub Pages already uses a CDN.

If you later want Cloudflare's caching, analytics, or security features, switch
the records to **Proxied** (orange cloud), but only **after** Enforce HTTPS is
working, and:

- Set **SSL/TLS → Overview → encryption mode** to **Full (strict)**.
  *Flexible* causes an endless redirect loop with GitHub's Enforce HTTPS.
- If GitHub later reports a certificate problem for the domain, switch back to
  grey cloud until it's resolved. GitHub renews the certificate itself and can
  have trouble doing that through the proxy.

## Email at the domain (optional, free)

Cloudflare **Email → Email Routing** can forward addresses like
`contact@gutbrainbiome.com` to your Gmail. Setup adds its own MX and TXT
records automatically, and it doesn't affect the website.

## Troubleshooting

- **"Domain's DNS record could not be retrieved" / "improperly configured" in
  GitHub.** Nameserver changes are still propagating, the parking records
  weren't deleted, or the records are proxied (orange cloud). Check each, wait,
  then click **Check again** in Settings → Pages.
- **Too many redirects.** Cloudflare proxy is on with SSL mode *Flexible*.
  Set it to *Full (strict)* or turn the proxy off.
- **Styles missing or links broken.** `baseurl` in `_config.yml` must be `""`
  when using the custom domain.
- **Build failed.** Repo → **Actions** tab → the failed "pages build and
  deployment" run shows the file and line. The usual cause is a front-matter
  typo in a `_reading/*.md` file.
