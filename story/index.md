---
title: Our Story
lede: Monica's experience with bipolar II disorder, the fecal microbiota transplants we tried, and what the data has shown so far, good and bad.
scripts:
  - /assets/js/mood-chart.js
---

<!--
  Written in Markdown. Dated updates live in _journey/ and appear in the
  timeline below. The chart reads _data/mood.csv, _data/fmt-doses.yml and
  _data/mood-summary.yml. See docs/ADDING-CONTENT.md.
-->

## Why we're sharing this

I'm Ryan, Monica's husband. I'm a data scientist with type 1 diabetes, not a doctor, and nothing here is medical advice. After five years of trying nearly every medication for Monica's bipolar II disorder, we tried something different: fecal microbiota transplantation (FMT). We're sharing the whole record, including the parts that didn't go to plan, because the story that gave us hope was someone else's willingness to share theirs. Monica has agreed to everything on this page.

## Meet Monica

Monica is a local artist, cat lover, Duke basketball fan, glitter scientist, color queen, and rainbow enthusiast.

## The condition: bipolar II disorder

Bipolar II disorder is a mood disorder marked by episodes of major depression and at least one episode of hypomania: a period of elevated or irritable mood and increased energy that is milder than the full mania of bipolar I. Most of the illness burden is depression. It is not a "milder" bipolar disorder: it carries a high risk of suicide and higher rates of metabolic syndrome and type 2 diabetes ([JAMA, 2023](https://jamanetwork.com/journals/jama/article-abstract/2810502)).

## How it started

Looking back, the first piece may have been in 2019, when Monica had three rounds of antibiotics for a recurring lung infection. In May 2020 she lost her hotel-industry job to COVID. That July we left Washington, D.C. for Colorado on short notice, a decision that in hindsight had some hypomania in it, and in September 2020 she was diagnosed with bipolar II disorder.

From 2020 to 2025 Monica tried most of the available medications, mainly atypical antipsychotics and mood stabilizers, one at a time and without lasting gains. Life went on around them: we formed a civil union in April 2021 and married in May 2022. In May 2023 she was diagnosed with type 2 diabetes, a known risk with some of these medications and with bipolar disorder itself. By December 2025 we were running out of options.

## Finding another path

In 2023 or 2024 I came across Jane Dudley, an Australian woman who treated her bipolar I disorder with FMT in 2016 and shares her story at [Microbiome in Mind](https://www.microbiomeinmind.com.au/). By late 2025, with little left to try, we decided to try it too.

I couldn't be Monica's donor: with type 1 diabetes, an autoimmune condition, there's a real risk of passing on what lives in my gut. In February 2026 we found an online provider of screened donor stool, delivered freeze-dried as capsules. Before starting, Monica took a home microbiome test as a baseline, and she logged her mood and sleep every day in the [eMoods app](https://emoodtracker.com/).

<div class="callout" role="note">
	<p><strong>This is not a how-to.</strong> FMT outside a clinical trial or a clinician's care carries real risks, including infection and transferring conditions from a donor. Donor screening matters enormously. Please talk with a qualified clinician before considering it, and don't stop psychiatric medication without medical supervision.</p>
</div>

## What we've tried

{% include treatment-log.html %}

## What the data shows

{% include mood-chart.html %}

**Before FMT,** Monica's depression was severe most days and she was in bed up to 20 hours a day.

**During and after the first course** (seven doses, February 4 to 28), depressed mood eased through March. After further doses on March 25 and April 22, Monica stopped all of her bipolar medications. From April through July her depressed mood was mostly "none". For those months, I had my wife back.

**It wasn't only good news.** Elevated mood also rose and stayed high, and her sleep fell to about five hours a night, sometimes less. On April 12 she logged psychotic symptoms. In bipolar disorder that pattern can be hypomania, so as a precaution we restarted one of her antipsychotic medications.

**In August, depression came back.** As her mood started to slip, Monica took the stool we had left from April (July 26, August 5 and August 11), but by August 9 her depressed mood was severe again and she was sleeping 11 to 20 hours a day. Stool stored since April may not have survived. We also think her gut slipped back toward dysbiosis: we didn't keep to the high-fiber diet that helps transplanted microbes take hold, and atypical antipsychotics may themselves disrupt the gut microbiome. On August 19 she started a new round with fresh stool. The data here ends August 14.

This is one person's self-reported data, with medication changes, diet, and life happening at the same time. It shows what happened to Monica, not what FMT does in general.

## Her microbiome, before and after

<figure class="story-figure">
	<img src="{{ '/images/story/microbiome-composition.png' | relative_url }}" alt="Stacked bar chart of gut bacteria by phylum. A typical healthy adult is about 72 percent Firmicutes and 20 percent Bacteroidetes. Monica before FMT was 22 percent Firmicutes, 66 percent Bacteroidetes, 8 percent Actinobacteria and 3 percent Proteobacteria. After the April round she was 48 percent Firmicutes, 35 percent Bacteroidetes, 12 percent Actinobacteria and 2 percent Proteobacteria, closer to the healthy-adult pattern." width="1460" height="880" loading="lazy" />
	<figcaption>Share of the major bacterial groups (phyla) in Monica's gut before FMT (Thorne) and after the April round (Jona), next to typical profiles by age group. Reference profiles from Scott C. Anderson, John F. Cryan and Ted Dinan, <cite>The Psychobiotic Revolution: Mood, Food, and the New Science of the Gut-Brain Connection</cite>.</figcaption>
</figure>

Monica took two home stool tests from different companies, so the scores aren't directly comparable, but the direction is clear:

- **Before FMT** (Thorne, January 2026): high scores for inflammation and gut-brain imbalance, a microbiome very unlike healthy adults' (97% beta-diversity dissimilarity), and very low levels of butyrate producers often linked with mood, including *Faecalibacterium prausnitzii*, *Coprococcus*, and *Roseburia*. The pathogen screen was normal.
- **After the April round** (Jona, April 28, 2026): above-average diversity (4.12, normal range 2.80 to 3.99), a Firmicutes-to-Bacteroidetes ratio of 1.37, and "excellent" ratings for most gut, metabolic, and inflammation categories. Brain health rated "fair", and two potential pathogens (*Bilophila wadsworthia* and *Bacteroides fragilis*) were flagged for follow-up.

### Which key bacteria moved into range

Most of the helpful, butyrate-producing bacteria that were low before FMT were in range or above it after the April round. *Faecalibacterium*, one of the most studied for mood, improved but was still below range. *Bilophila*, which thrives on high-fat diets, rose above range.

{% include key-bacteria.html %}

Thorne withdrew its test shortly after Monica's results, and each test cost about $400. We publish summaries here, not the original reports.

## The presentation

{% include story-presentation.html %}

## Records & reports

{% include story-documents.html %}

## The journey so far

{% include journey-timeline.html %}

## What we've learned

- **The gut-brain connection is real, and it's personal.** The biggest changes in Monica's mood came after changes to her gut, but so did a hypomania-like stretch. Watch for both directions.
- **Track everything.** Daily mood and sleep logs turned a blur of good and bad weeks into something we could see, share with her care team, and learn from.
- **Engraftment takes work.** Diet matters after FMT. More fiber and fermented foods, less sugar and animal fat. We're still learning what that means in recipes.
- **Medication and the microbiome interact.** We wonder whether restarting an atypical antipsychotic played a part in the August relapse. That's a question, not a finding.
- **You're not alone.** Find people who've been there in [Community]({{ '/community/' | relative_url }}).

<aside class="notice" role="note">
	<p><strong>One person's experience.</strong> This is a personal account, not medical advice. What helped (or didn't) here may not apply to anyone else. Talk with a qualified clinician about any treatment decision.</p>
</aside>
