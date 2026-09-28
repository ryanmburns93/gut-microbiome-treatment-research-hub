# Evidence Map extraction prompt

Use this to turn a research PDF into rows for the Evidence Map curation Sheet.

**How to use it**

1. Start a new chat with Claude and attach one PDF.
2. Paste everything inside the box below. Before sending, bring the
   **CURRENT TOPICS** and **ALREADY IN THE SHEET** lists up to date with the
   Sheet (the `topics` tab, and the `id` and `url` columns of the `studies`
   tab). Optionally, fill in the line about why you read the paper.
3. Review the reply, top to bottom:
   - **ROW PLAN**: do the design, the comparison, and the number of rows make
     sense? Most papers should give one row.
   - **STUDIES**: check `finding` and `conclusion` against the
     **EVIDENCE CHECK** quotes.
   - **UNCERTAINTIES**: settle each item, fixing the row if needed.
4. Copy the **STUDIES** block, click the first empty cell in column A of the
   `studies` tab, and paste. The tab-separated values fill the columns in order.
   Do the same for **NEW TOPICS** on the `topics` tab, if any were proposed.
5. Rows come in with status `draft`, which keeps them off the site. Change it to
   `published` once you've reviewed them.

One PDF per chat keeps the extraction focused and the topic ids consistent.
If the reply says it couldn't read part of the PDF (common with scanned
articles), try a text-based copy of the PDF before using the rows.

```text
You are helping me curate an evidence map of gut microbiome treatment research for a public educational website. Readers are non-specialists. Extract structured entries from the attached PDF.

=== GROUND RULES ===

- Only report what this PDF states. Do not add facts from outside the paper, including anything you remember about this paper or its authors.
- If a field isn't stated, leave it blank instead of guessing, and list it under UNCERTAINTIES.
- If any pages can't be read (e.g. scanned images, missing pages), say which ones at the top of UNCERTAINTIES, and extract only what you could read.
- If the paper contradicts itself (e.g. different counts or dates in different places), don't pick one silently. Leave the detail out of the row, or use the version from the results or tables, and note the conflict under UNCERTAINTIES.

[Optional context: I read this paper because ___ ]

=== STEP 1: UNDERSTAND THE STUDY ===

Before writing any rows, work out from the Methods and Results:
- Design: how participants were assigned (randomly or not), whether there was a control group, blinding, and follow-up length.
- Groups: what each group received, and whether any got placebo, sham, usual care, or no treatment.
- Main outcome: the primary outcome the authors name. If none is named, the outcome the abstract leads with.
- Analyzed count: participants included in the main analysis, per group and in total. If the paper reports both a per-protocol and an intention-to-treat analysis, note which is primary and whether they disagree.

=== STEP 2: DECIDE THE ROWS ===

On the website, every row counts as one study and strengthens the lines between its topics. Splitting a paper into rows that share the same topics makes it count twice. Aim for one row per paper.

Create more than one row only when the paper gives separate results for different combinations of topics:
- Different conditions (e.g. a probiotic helped IBS but not ulcerative colitis): one row per condition.
- Groups that received different treatment topics with no placebo or untreated group (e.g. diet alone vs. diet plus FMT): one row per group.
  - The row for the basic treatment (e.g. diet alone) is judged against the participants' own baseline.
  - The row for the add-on treatment (e.g. diet plus FMT) is judged against the other group: benefit if it did significantly better; mixed if it improved from baseline but not significantly more than the other group; no-effect if it didn't improve from baseline either.
  - State the comparison between groups in each row's conclusion, and note in relevance that there was no placebo or untreated group.

Keep one row when groups differ only in how the same treatment was given: route (e.g. capsules vs. colonoscopy), dose, schedule, formulation, or donor. This includes noninferiority and head-to-head trials of the same treatment. Put the comparison between groups in the conclusion.

If the PDF is a review or meta-analysis, create rows for the review's own conclusions, not for each study it cites.
If the PDF is not a research article (e.g. news, editorial, guideline, study protocol with no results), say so in ROW PLAN and still extract what fits, using study_type "Other" and finding "n/a".

=== STEP 3: JUDGE THE FINDING ===

Judge each row on the main outcome, using the comparison the design allows:
- Placebo, sham, or untreated control: treatment group vs. control.
- Groups getting different treatment topics, no untreated group: follow the rules in STEP 2.
- All groups got the same treatment in different ways (e.g. capsules vs. colonoscopy): the treatment's effect vs. baseline in the groups combined. "Not inferior" means similar, not better; say which way, if any, the groups differed.
- One group only (before/after, case series, case report): change from baseline. If the paper runs no statistical tests (typical for case reports), use the direction of change the authors report, and note under UNCERTAINTIES that no statistical test was done.
- Cohort, case-control, and cross-sectional studies: the association the paper reports between the treatment and the condition. Describe it as a link, not a cause.
- No treatment effect tested (e.g. comparing the microbiome of patients and healthy people, or mechanism work): n/a.

Secondary outcomes and side effects don't change the finding unless the authors treat them as central, or harms were serious enough to change the authors' overall judgment (then use harm or mixed). Mention them in the conclusion if notable.

=== CURRENT TOPICS (reuse these ids whenever they fit) ===

id | name | type
fmt | Fecal microbiota transplantation (FMT) | treatment
probiotics | Probiotics | treatment
prebiotics | Prebiotics | treatment
dietary-fiber | Dietary fiber | treatment
rcdi | Recurrent C. difficile infection | condition
ibs | Irritable bowel syndrome (IBS) | condition
ulcerative-colitis | Ulcerative colitis | condition
antibiotic-diarrhea | Antibiotic-associated diarrhea | condition
scfa | Short-chain fatty acids | mechanism
microbial-diversity | Microbial diversity | mechanism
bile-acids | Bile acids | mechanism
type-2-diabetes | Type 2 diabetes | condition
bifidobacterium | Bifidobacterium | mechanism
prevotella | Prevotella | mechanism
sulfate-reducing-bacteria | Sulfate-reducing bacteria | mechanism
mediterranean-diet | Mediterranean-style diet | treatment
depression | Depression | condition
bipolar-disorder | Bipolar disorder | condition
schizophrenia | Schizophrenia | condition
lactic-acid-bacteria | Lactic acid bacteria | mechanism

Which topics to tag:
- treatments: the intervention(s) the study gave and evaluated. Not background medication, bowel preparation, or treatments the participants were already taking.
- conditions: the condition(s) participants were enrolled for. Add another condition only if the study measured it as a named outcome with its own results.
- other_topics: mechanisms the study actually measured and reported results for (e.g. microbial diversity before and after treatment). Not mechanisms only mentioned in the introduction or discussion.

Map synonyms to an existing id (e.g. "fecal transplant", "stool transplant", "faecal microbiota transplantation" -> fmt). Only propose a new topic when nothing above fits and the topic is central to this paper. New ids are lowercase words joined by hyphens, e.g. "small-intestinal-bacterial-overgrowth". Types: treatment (an intervention), condition (a disease or health state), mechanism (a biological process, molecule, or microbe that explains how or why).

=== ALREADY IN THE SHEET ===

If the attached paper's DOI or title matches one of these, stop and reply only: "Already in the Sheet: <id>". Also avoid reusing these ids for new rows.

id | url
su-2022-a, su-2022-b | https://doi.org/10.1038/s41598-022-05127-9
jacka-2017 | https://doi.org/10.1186/s12916-017-0791-y
mcguinness-2022 | https://doi.org/10.1038/s41380-022-01456-3
rapoport-2022 | https://doi.org/10.20524/aog.2022.0695
zhang-2025 | https://doi.org/10.3389/fpsyt.2025.1656969
clancy-2021 | https://doi.org/10.3389/fnut.2021.653653

=== STUDY COLUMNS (in this exact order) ===

1. id: first author's last name + year, lowercase, hyphenated, with accents and spaces removed (e.g. "smith-2024", "van-nood-2013"). Only if this PDF produces several rows, add -a, -b, ... (e.g. "smith-2024-a"). If the id is taken, add -b, -c, ... and say so under UNCERTAINTIES.
2. title: full article title as printed, including any subtitle after a colon.
3. authors: first author's last name + " et al." if more than two authors (e.g. "Smith et al."); otherwise both last names joined by " and ".
4. year: publication year as printed on the article (the issue year if both an online and an issue date are given).
5. journal: journal name as printed, not abbreviated.
6. url: "https://doi.org/" + the DOI if the PDF prints one; otherwise a PubMed or publisher URL printed in the PDF; otherwise blank. Never construct a URL that isn't in the PDF.
7. study_type: exactly one of: Randomized controlled trial | Systematic review | Meta-analysis | Cohort study | Case-control study | Cross-sectional study | Case series | Case report | Animal study | In vitro study | Review | Other
   Decide from the Methods section, not from how the paper labels itself.
   - Randomized controlled trial: participants were randomly assigned to groups, including trials where every group gets a treatment.
   - Case series: one group of two or more people, all treated and followed, with no comparison group.
   - Case report: one patient (or a report on each of two or three individual patients).
   - Cross-sectional study: groups compared at one point in time (e.g. patients' microbiomes vs. healthy controls').
   - Other: anything else, including non-randomized trials with a control group; name the actual design under UNCERTAINTIES.
   If the paper describes its design inconsistently, say so under UNCERTAINTIES.
8. sample_size: participants in the main analysis for the group(s) this row describes (digits only), after dropouts. A one-row paper uses the total across all its groups. If rows are split by group, use that group's count. For meta-analyses, the total participants pooled. Blank for animal, in vitro, and narrative reviews.
9. treatments: treatment topic ids, separated by semicolons with no spaces.
10. conditions: condition topic ids, separated by semicolons with no spaces.
11. other_topics: mechanism topic ids, separated by semicolons with no spaces.
12. finding: exactly one of (see STEP 3 for what to compare against):
    - benefit: the main outcome improved
    - no-effect: no meaningful or significant change in the main outcome
    - mixed: some main outcomes or subgroups improved and others didn't, or results conflict
    - harm: the treatment worsened outcomes or caused serious adverse effects
    - n/a: the study doesn't test a treatment's effect
13. conclusion: what the study found, in at most 2 plain-language sentences and 60 words.
    - Start with who was studied and how many (e.g. "In 105 adults with recurrent C. difficile infection, ..."; "In one man with bipolar II disorder, ...").
    - Give the main result with 1-2 key numbers in everyday form (e.g. "96% in both groups", "81% vs 31%").
    - No confidence intervals, p-values, statistical test names, or abbreviations a general reader wouldn't know.
    - Keep the authors' hedges, and don't claim more than the design supports. Use "was followed by" rather than "caused" when there was no control group.
    - Leave out details the paper contradicts itself on.
14. relevance: why this matters, in at most 2 plain-language sentences and 60 words. Say what it adds, confirms, or contradicts, and its main limits: no control or placebo group, open-label (unblinded), small size, short follow-up, animal-only, self-reported outcomes, other treatments given at the same time, or industry funding declared in the paper. Don't repeat the numbers already in the conclusion.
15. status: always "draft".

=== BEFORE YOU REPLY, CHECK EACH ROW ===

- It has exactly 15 fields (14 tabs), with no tabs or line breaks inside a field.
- study_type and finding are exactly one of the allowed values.
- Every topic id is in CURRENT TOPICS or in your NEW TOPICS block.
- If there are two or more rows, their treatments or conditions differ. If they don't, merge them.
- sample_size matches the analyzed count, and adds up across rows split by group.
- conclusion and relevance are each 2 sentences or fewer, 60 words or fewer, and free of statistical jargon.
- Every number in conclusion and relevance appears in the PDF.

=== OUTPUT FORMAT ===

Reply with exactly these five sections, in this order.

ROW PLAN
Two to four short lines: the design, the groups and what they got, the main outcome, the analyzed count, how many rows you are creating and why, and the comparison used for the finding.

STUDIES
A single code block containing one line per row. Separate the 15 columns with TAB characters, in the order above. No header row. Leave empty fields empty, but keep their tab separators.

NEW TOPICS
If you used any topic id not in CURRENT TOPICS, a single code block with one line per new topic, with these 5 columns separated by TAB characters: id, name, type, summary (one plain-language sentence), entry (leave empty). If none, write "None".

EVIDENCE CHECK
For each row id: a short verbatim quote from the PDF, with its page number, supporting the finding, and one supporting each number in the conclusion. Then say where the sample size came from (e.g. "Figure 1, per-protocol analysis").

UNCERTAINTIES
Unreadable pages first, then anything ambiguous, guessed, left blank, contradictory in the paper, or judged without statistical tests. If nothing, write "None".
```
