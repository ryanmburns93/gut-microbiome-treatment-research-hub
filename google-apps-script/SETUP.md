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

## 5. Email notifications

The script emails you each time a message is saved. The email comes from
your own Gmail account, has the visitor's message in the body, and has
**Reply-To set to the visitor**, so hitting Reply answers them directly.

To turn it on (or after pasting in an updated `Code.gs`):

1. In the Apps Script editor, pick **`testNotification`** from the function
   dropdown in the toolbar and click **Run**.
2. Google asks for permission to **send email as you**. Approve it. You may
   see "Google hasn't verified this app": choose **Advanced → Go to (project
   name)**. It's your own script, so this is expected.
3. Check your inbox for the test email.
4. **Deploy → Manage deployments** → pencil icon → **Version: New version** →
   **Deploy**. The live form only uses the updated script after this step. The
   `/exec` URL stays the same.

Notifications go to the account that owns the script. To send them
somewhere else, or to several people, set `NOTIFY_EMAIL` at the top of the
script (comma-separated), then repeat step 4.

Tip: in Gmail, make a filter for emails with the subject containing "via
gutbrainbiome.com" to label them or mark them important.

Limits: a personal Gmail account can send about 100 of these a day. If a
notification fails, the message is still saved to the Sheet, and the
visitor still sees "Thanks". Spam caught by the honeypot sends no email.

## Notes

- After editing the script, create a **new deployment version** (Deploy →
  Manage deployments → edit → New version). The `/exec` URL stays the same.
- The hidden "company" field is a spam honeypot. Submissions that fill it in
  are silently dropped.
