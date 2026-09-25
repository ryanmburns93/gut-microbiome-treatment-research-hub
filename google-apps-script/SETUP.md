# Contact form → Google Sheets setup

This is the same pattern as the Rainbow Data Labs site. The site is static,
so the form POSTs to a small Google Apps Script web app you own, which
appends each message as a row in a Google Sheet you own. You can reuse the
same Google account.

## 1. Create the sheet

Create a new Google Sheet, e.g. "Research Hub — Messages". Leave it empty;
the script creates a "Messages" tab and header row on first use.

## 2. Add the script

In the Sheet: **Extensions → Apps Script**. Replace the placeholder `Code.gs`
contents with [`Code.gs`](./Code.gs) from this folder, then save.

## 3. Deploy as a web app

1. **Deploy → New deployment** → gear icon → **Web app**.
2. **Execute as:** Me. **Who has access:** Anyone.
3. **Deploy**, authorize when prompted, and copy the **Web app URL** (ends in `/exec`).

## 4. Wire it into the site

Paste the URL into `_config.yml`:

```yaml
contact_endpoint: "https://script.google.com/macros/s/…/exec"
```

Until then, the form shows a "not configured yet" message instead of failing.

## Notes

- After editing the script, create a **new deployment version** (Deploy →
  Manage deployments → edit → New version). The `/exec` URL stays the same.
- The hidden "company" field is a spam honeypot. Submissions that fill it in
  are silently dropped.
