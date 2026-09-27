# Evidence Map extraction prompt

Use this to turn a research PDF into rows for the Evidence Map curation Sheet.

**How to use it**

1. Start a new chat with Claude and attach one PDF.
2. Paste everything inside the box below. Before sending, update the
   **CURRENT TOPICS** list if you've added topics to the Sheet since last time.
   Optionally, fill in the line about why you read the paper.
3. Check the rows against the **EVIDENCE CHECK** quotes, especially `finding`
   and `conclusion`.
4. Copy the **STUDIES** block, click the first empty cell in column A of the
   `studies` tab, and paste. The tab-separated values fill the columns in order.
   Do the same for **NEW TOPICS** on the `topics` tab, if any were proposed.
5. Rows come in with status `draft`, which keeps them off the site. Change it to
   `published` once you've reviewed them.

One PDF per chat keeps the extraction focused and the topic ids consistent.

```text
You are helping me curate an evidence map of gut microbiome treatment research for a public educational website. Extract structured entries from the attached PDF.

Only report what the paper itself states. Do not add facts from outside the paper. If a field isn't stated, leave it blank instead of guessing, and list it under UNCERTAINTIES.

[Optional context: I read this paper because ___ ]

=== WHAT TO EXTRACT ===

Create one row for the study reported in this PDF.
- If the paper reports separate results for different treatment/condition pairs (e.g. one probiotic helped IBS but not ulcerative colitis), create one row per pair so each row has a single clear finding.
- If the study compares two or more treatment groups with no placebo or untreated group (e.g. diet alone vs. diet plus FMT), create one row per group:
  - The row for the basic treatment (e.g. diet alone) is judged against the participants' own baseline.
  - The row for the add-on treatment (e.g. diet plus FMT) is judged against the other group: benefit if it did significantly better; mixed if it improved from baseline but not significantly more than the other group; no-effect if it didn't improve from baseline either.
  - State the comparison between groups in each row's conclusion, and note in relevance that there was no placebo or untreated group.
- If the PDF is a review or meta-analysis, create rows for the review's own conclusions, not for each study it cites.
- If the PDF is not a research article (e.g. news, editorial, guideline), say so and still extract what fits, using study_type "Other".

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

Map synonyms to an existing id (e.g. "fecal transplant" or "stool transplant" -> fmt). Only propose a new topic when nothing above fits. New ids are lowercase words joined by hyphens, e.g. "small-intestinal-bacterial-overgrowth". Types: treatment (an intervention), condition (a disease or health state), mechanism (a biological process, molecule, or microbe that explains how or why).

=== STUDY COLUMNS (in this exact order) ===

1. id: first author's last name + year, lowercase, hyphenated (e.g. "smith-2024"). If this PDF produces several rows, add -a, -b, ... (e.g. "smith-2024-a").
2. title: full article title.
3. authors: first author's last name + "et al." if more than two authors (e.g. "Smith et al."); otherwise both last names joined by "and".
4. year: publication year.
5. journal: journal name as printed.
6. url: "https://doi.org/" + the DOI if the PDF prints one; otherwise a PubMed or publisher URL printed in the PDF; otherwise blank. Never construct a URL that isn't in the PDF.
7. study_type: exactly one of: Randomized controlled trial | Systematic review | Meta-analysis | Cohort study | Case-control study | Case series | Animal study | In vitro study | Review | Other
   Decide from the Methods section, not from how the paper labels itself. Use "Randomized controlled trial" only if participants were randomly assigned to groups; this includes trials where every group gets a treatment. A single-group before/after study is "Case series". If the paper describes its design inconsistently, say so under UNCERTAINTIES.
8. sample_size: number of human participants analyzed in the group(s) this row describes (digits only), after dropouts. If the paper is split into one row per group, use that group's count; if a row covers the whole study, use the total. For meta-analyses, the total participants pooled. Blank for animal, in vitro, and narrative reviews. If the paper gives conflicting counts, use the analyzed count from the results or tables and note the conflict under UNCERTAINTIES.
9. treatments: treatment topic ids, separated by semicolons with no spaces.
10. conditions: condition topic ids, separated by semicolons with no spaces.
11. other_topics: mechanism topic ids, separated by semicolons with no spaces.
12. finding: exactly one of:
    - benefit: the treatment significantly improved the main outcome vs. control or baseline
    - no-effect: no significant difference on the main outcome
    - mixed: some outcomes or subgroups improved and others didn't, or results conflict
    - harm: the treatment worsened outcomes or caused significant adverse effects
    - n/a: the study doesn't test a treatment's effect (e.g. mechanistic or descriptive work)
13. conclusion: 1-2 plain-language sentences stating the paper's main conclusion, as the authors support it. Include key numbers if central (e.g. "resolution in 81% vs 31%"). No hype; keep the authors' hedges.
14. relevance: 1-2 plain-language sentences on why this matters to someone following gut microbiome treatment research (e.g. what it adds, confirms, or contradicts, or its limits such as small size, short follow-up, or animal-only).
15. status: always "draft".

=== OUTPUT FORMAT ===

Reply with exactly these four sections, in this order.

STUDIES
A single code block containing one line per row. Separate the 15 columns with TAB characters, in the order above. No header row. No tabs or line breaks inside any field. Leave empty fields empty, but keep their tab separators.

NEW TOPICS
If you used any topic id not in CURRENT TOPICS, a single code block with one line per new topic, with these 5 columns separated by TAB characters: id, name, type, summary (one plain-language sentence), entry (leave empty). If none, write "None".

EVIDENCE CHECK
For each row id: a short verbatim quote from the PDF, with its page number, supporting the finding and the conclusion, plus where each row's sample size came from.

UNCERTAINTIES
Anything ambiguous, guessed, left blank, or judged from limited information (e.g. only the abstract was readable). If nothing, write "None".
```
