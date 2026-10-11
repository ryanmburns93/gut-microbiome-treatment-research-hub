# Accessibility plan (WCAG 2.2 AA)

Target: **WCAG 2.2 Level AA** on every page of gutbrainbiome.com. AA is the
level referenced by the ADA Title II rule, Section 508, and the EU
Accessibility Act, and it's the usual meaning of "WCAG compliant."

## Where the site stands (audit of October 11, 2026)

The site was built locally and checked with axe-core (WCAG 2.0/2.1/2.2 A and
AA rules plus best practices) on nine pages in both light and dark mode, then
checked by hand for keyboard use, 320px reflow, headings, and things axe
can't test.

**Already in good shape:**

- `lang="en"`, a unique `<title>` on every page, and a working skip link
- Landmarks (`header`, `nav`, `main`, `footer`), a labeled breadcrumb, and
  `aria-current` on the active nav item
- Every form field has a real `<label>`; the contact form status is announced
  (`role="status"`) and the research count is a polite live region
- A strong, visible focus outline (`:focus-visible`, 3px) on all controls
- Descriptive alt text on content images; the decorative logo uses `alt=""`
- Color tokens with a dark-mode set; no axe contrast failures in either mode
- No horizontal scrolling at 320px wide (WCAG 1.4.10 Reflow)
- Data tables use `<caption>` and `scope`; status in the bacteria table is shown
  with text and symbols, not color alone
- The talk has a full transcript, and the mood chart has a table alternative
- Links don't open new tabs unexpectedly

**axe found only one issue:** the utility bar sits outside any landmark (a
best-practice rule, not a WCAG failure). The remaining issues below came from
the manual review.

## Issues to fix

Priority: **P1** = WCAG AA failure, fix first. **P2** = likely failure or
risk for real users. **P3** = improvement beyond the minimum.

| # | Pri | Issue | WCAG | Where |
|---|-----|-------|------|-------|
| 1 | P1 | Filter options with 0 matches fade to 45% opacity (about 3:1 contrast, below 4.5:1) but remain clickable | 1.4.3 | `assets/css/main.css` `.facet-option.is-empty` |
| 2 | P1 | Slides PDF is untagged (no structure, reading order, or alt text for screen readers) | 1.1.1, 1.3.1 | `files/story/psychobiotics-nerd-nite-2026-08-20.pdf` |
| 3 | P1 | The video depends on YouTube auto-captions, which aren't accurate enough to count as captions | 1.2.2 | `_data/presentation.yml` (YouTube video) |
| 4 | P1 | Daily values in the mood chart are available only by mouse/touch hover; keyboard and screen reader users get only monthly averages | 2.1.1, 1.1.1 | `assets/js/mood-chart.js`, `_includes/mood-chart.html` |
| 5 | P2 | Research page skips from `h1` to `h3` (the study list has no `h2`), and the "Conclusion"/"Why it matters" `h3`s repeat for every study | 1.3.1, 2.4.6 | `research/index.html` |
| 6 | P2 | Filter checkboxes are 16×16px; WCAG 2.2 asks for 24×24px or enough spacing | 2.5.8 | `.facet-option input` |
| 7 | P2 | The live result count is announced on every keystroke while typing in search | 4.1.3 (usability) | `assets/js/research.js` |
| 8 | P2 | Opening a study from a link (`/research/#id`) scrolls to it but doesn't move keyboard focus | 2.4.3 | `openFromHash()` in `research.js` |
| 9 | P2 | Charts and slide images in the talk are shown visually but not always described in the narration | 1.2.5 (audio description) | Video + transcript |
| 10 | P2 | Contact form: required fields aren't marked visibly, and errors rely on the browser's built-in bubble, which some screen readers read poorly | 3.3.1, 3.3.2 | `_includes/contact-form.html`, `contact-form.js` |
| 11 | P3 | Utility bar is outside a landmark | best practice | `_includes/header.html` |
| 12 | P3 | The 36-minute transcript has no headings to jump between | 2.4.10 (AAA) | `story/presentation/index.html` |
| 13 | P3 | Mobile menu can't be closed with Escape | usability | `assets/js/nav.js` |
| 14 | P3 | Several small text styles (0.62–0.78rem) are hard to read for low-vision users | usability | `.brand-line1`, badges, table headers |

## Plan

### Phase 1: quick code fixes (done October 11, 2026)

Fixed issues #1, #5, #6, #7, #8, #10, #11 and #13. After the changes, axe
reports no violations on any page in light or dark mode. Notes on how each
fix ended up:

- Faded filters: no opacity; names with no matches use `--text-muted`.
- Headings: a visually hidden `h2` "Studies" fixes the skipped level. The
  inner `h3`s stay, since closed `<details>` hide them from screen readers.
- Target size: the checkbox now sits inside its label, so each row (at least
  28px tall) is a single click target.
- Hash focus: each study `<li>` has `tabindex="-1"`. Browsers move focus to
  a `#fragment` target themselves and reset focus set on anything else.
- Contact form: the browser's validation bubbles are replaced with an error
  under each field, linked by `aria-describedby` and marked `aria-invalid`.
  Focus moves to the first problem.

Original task list:

1. **Faded filters (#1).** Remove the opacity and use `--text-muted` for the
   label instead, adding a visually hidden "(no matches)" if needed. Keep text
   at 4.5:1 or more.
2. **Research headings (#5).** Add `<h2 class="visually-hidden">Studies</h2>`
   above the list. Change the inner "Conclusion" and "Why it matters" headings
   to `<h4>`, or make them bold paragraphs.
3. **Target size (#6).** Make the whole option row the click target (the label
   already covers it) and give rows at least 24px height, or make the checkbox
   larger.
4. **Live region (#7).** Debounce the status update about 500ms after the
   user stops typing.
5. **Hash focus (#8).** After opening a study from the URL, focus its
   `<summary>`.
6. **Contact form (#10).** Add "(required)" to the labels. On submit failure,
   write the message into the existing status region and focus the first
   invalid field, with `aria-invalid` and `aria-describedby`.
7. **Landmark and Escape key (#11, #13).** Wrap the utility bar in the
   `<header>` or give it `role="region"` with a label, and close the menu on
   Escape, returning focus to the toggle.

### Phase 2: media and documents (a few days, mostly content work)

**Done October 11, 2026:** #4 (mood chart) and #9 (audio description).
- Our Story has a "Show daily data" section below the averages table: one
  table per month with each day's ratings, sleep, and FMT doses, built from
  `_data/mood.csv` and `_data/fmt-doses.yml`, so it updates with the data.
- The transcript has a "Slide:" note at the point each slide appeared,
  describing its text, photos, and charts (including the chart trends).

**Still open:** #3 (captions, in YouTube Studio) and #2 (tagged PDF).


8. **Captions (#3).** In YouTube Studio, open the auto-generated captions,
   correct them (the transcript page already has the corrected text), and
   publish them as the video's main English track.
9. **Audio description (#9).** Wherever the talk says "you can see…" or shows
   a chart, add a short bracketed description in the transcript, for example
   *[Slide: line chart of depressed-mood scores falling after the February
   FMT]*. A transcript that describes the visuals is an accepted alternative.
10. **Slides PDF (#2).** Export a tagged PDF from the original deck
    (PowerPoint/Keynote/Google Slides with tagging or "accessibility" turned
    on), add alt text to each chart and photo first, and set the document
    title and language. Check it with Adobe Acrobat's Accessibility Checker or
    the free PAC tool. (The current file was assembled with pypdf, which
    removes tags.) If that isn't practical, say next to the link that the
    transcript holds the same content.
11. **Mood chart (#4).** Pick one:
    - *Simpler:* add a "Show daily data" `<details>` with a full date-by-date
      table (built by Liquid from `_data/mood.csv`), or
    - *Richer:* make the chart focusable and let the arrow keys move the
      crosshair, with the readout in a live region.

    The data table is the more robust choice and also helps people who use
    screen magnifiers.

### Phase 3: guardrails so it stays compliant

12. **Automated check in CI.** Add a GitHub Actions workflow that builds the
    site with Jekyll and runs `pa11y-ci` or `@axe-core/cli` on every page in
    the sitemap for each pull request, failing on any violation. The audit
    script used for this review can be the starting point.
13. **Content checklist.** Add a short section to `docs/ADDING-CONTENT.md`:
    - Every image needs alt text that conveys its meaning, or `alt=""` if it's
      decorative.
    - Use headings in order and don't skip levels.
    - Link text should make sense on its own, not "click here."
    - Videos need corrected captions and a transcript.
    - PDFs must be tagged, or have an HTML equivalent.
    - Don't use color as the only way to show meaning.
14. **Accessibility statement.** Add an `/accessibility/` page linked from the
    footer. It should state the WCAG 2.2 AA target, the known exceptions
    (until Phase 2 is done), the date it was last reviewed, and how to report
    a barrier (the contact form). Many accessibility laws expect this.

### Phase 4: test with real assistive technology (once, then yearly)

Automated tools catch roughly 30–40% of issues. Do one manual pass:

- **Keyboard only:** Tab through every page and use the research filters,
  study details, the menu, the contact form, and the video. Check that focus
  is always visible and never trapped.
- **Screen readers:** use NVDA + Firefox on Windows, VoiceOver + Safari on
  macOS/iOS, and TalkBack on Android. Listen to the headings list, landmarks,
  the filter count announcements, and the chart's alternative.
- **Zoom:** test at 200% and 400% browser zoom, and with the text-spacing
  bookmarklet (WCAG 1.4.12).
- **Display settings:** test Windows High Contrast / forced colors, and
  confirm the focus ring and checkboxes still show.
- **People:** if possible, ask one or two disabled users to try the core
  tasks: find a study about probiotics, read the story, and send a message.
  Ryan's contacts on the Fort Collins Disability Advisory Board may be a good
  place to start.

## Done when

- [ ] All P1 items fixed (#1 and #4 done; #2 PDF and #3 captions remain)
- [ ] All P2 items fixed or listed as known exceptions in the statement
- [ ] The CI accessibility check passes on every page
- [ ] The manual keyboard and screen reader pass is done and its findings fixed
- [ ] The accessibility statement is published with a review date
