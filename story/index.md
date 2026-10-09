---
title: Our Story
lede: Monica's experience with bipolar II disorder, the fecal microbiota transplants she tried, and what the data has shown so far, good and bad.
scripts:
  - /assets/js/mood-chart.js
---

<!--
  Written in Markdown. The chart reads _data/mood.csv, _data/fmt-doses.yml and
  _data/mood-summary.yml. See docs/ADDING-CONTENT.md.
-->

<div class="story-intro" markdown="1">
<figure class="story-portrait">
	<img src="{{ '/images/story/monica-and-ryan.jpg' | relative_url }}" alt="Monica and Ryan smiling together in a selfie outdoors, in front of a painted utility box. Monica wears rainbow-jeweled glasses and a pink bow." width="900" height="1200" loading="lazy" />
	<figcaption>Monica and Ryan</figcaption>
</figure>

This hub is maintained by Ryan, Monica's husband, a data scientist with type 1 diabetes. He is not a doctor, and nothing here is medical advice.

After five years of trying nearly every medication for Monica's bipolar II disorder, she expressed concern that her life was passing her by and she was too sick to live it. Ryan had seen the story of Jane Dudley's miraculous treatment of her own bipolar disorder, which seemed like a cure. Having engaged with the open-source spirit of the #WeAreNotWaiting movement in the type 1 diabetes community, they ultimately took the leap to try fecal microbiota transplantation (FMT). The results allowed Monica to experience life in a way she hadn't in half a decade. Knowing they wouldn't have started down this path without the bravery of Jane's public sharing, Monica has agreed to share everything on this page, including the parts that didn't go to plan, to spread awareness and to consolidate the emerging research on FMT and other treatments targeting the gut-brain axis.

## Meet Monica

Monica is a local artist, cat lover, Duke basketball fan, glitter scientist, color queen, and rainbow enthusiast. She lives in Colorado with her husband, Ryan, and their two cats, Smudge and Angel.

</div>

## The condition: bipolar II disorder

Bipolar II disorder is a mood disorder marked by episodes of major depression and at least one episode of hypomania: a period of elevated or irritable mood and increased energy that is milder than the full mania of bipolar I. Most of the illness burden is depression. It is not a "milder" bipolar disorder: it carries a high risk of suicide and higher rates of metabolic syndrome and type 2 diabetes ([JAMA, 2023](https://jamanetwork.com/journals/jama/article-abstract/2810502)).

## How it started

The main pattern that aligned Monica's experience with Jane's was antibiotic use in the period before her bipolar diagnosis. In 2019, Monica had three rounds of antibiotics for a recurring lung infection. In May 2020 she lost her hotel-industry job to COVID. For the first few years afterward, that stressful event was seen as the catalyst for her diagnosis, before the relevance of the antibiotics was recognized. That July she and Ryan moved from Washington, D.C. to Colorado on a whim, a decision that in hindsight was fueled by hypomania, and in September 2020 she was diagnosed with bipolar II disorder.

From 2020 to 2025 Monica tried most of the available medications, mainly atypical antipsychotics and mood stabilizers, one at a time and without lasting gains. Life went on around them: Monica and Ryan formed a civil union in April 2021 and married in May 2022. In May 2023 she was diagnosed with type 2 diabetes, a known risk with some of these medications and with bipolar disorder itself. By December 2025 they were running out of options.

## Finding another path

Jane Dudley, an Australian woman who treated her bipolar I disorder with FMT in 2016, shared her story in an [ABC News segment](https://www.abc.net.au/news/2025-07-28/gut-instinct-jane-dudley/105583270), documents her journey on her website, [Microbiome in Mind](https://www.microbiomeinmind.com.au/), and worked with Professor Gordon Parker, who published *A Gut Mood Solution* in 2025. With few options left, Ryan began skeptically researching FMT in 2026, and what he found was a growing body of research, now compiled on this hub for others to consider.

They tried a ketogenic diet and saw some symptom relief within 48 hours. At that point Monica gave the green light to invest in FMT, and she took a stool sample for shotgun whole metagenomic sequencing, a snapshot of her gut before starting treatment. Accurate data on her symptoms and downstream metrics was clearly going to be critical to trialing any extreme treatment, so at the start of 2026 Monica began recording her daily mood and sleep in the [eMoods app](https://emoodtracker.com/), along with exercise and sleep tracking on wearables like Fitbit and Aura.

One challenge they faced that Jane had not was that they couldn't safely source stool donations from within their home. Type 1 diabetes is an autoimmune condition, and 70 to 80% of the immune system lives in the gut, so Ryan couldn't be a donor without risking inducing type 1 diabetes in Monica. *It is these safety concerns that continue, necessarily, to dominate conversations about FMT, and any provider or facilitator must follow an extremely strict screening regimen to reduce the risk of disease transmission when considering providing FMT material.* In February 2026 they found a provider of screened donor stool, delivered freeze-dried as capsules.

<div class="callout" role="note">
	<p><strong>This is not a how-to.</strong> FMT outside a clinical trial or a clinician's care carries real risks, including infection and transferring conditions from a donor. Donor screening matters enormously. Please talk with a qualified clinician before considering it, and don't stop psychiatric medication without medical supervision.</p>
</div>

## What the data shows

{% include mood-chart.html %}

**Before FMT,** Monica's depression was severe most days and she was in bed up to 20 hours a day.

**During and after the first course** (seven doses, February 4 to 28), depressed mood eased through March. After further doses on March 25 and April 22, Monica stopped all of her bipolar medications. From April through July her depressed mood was mostly "none". For those months, Ryan had his wife back.

**It wasn't only good news.** Elevated mood also rose and stayed high, and her sleep fell to about five hours a night, sometimes less. On April 12 she logged psychotic symptoms. In bipolar disorder that pattern can be hypomania, so as a precaution she restarted one of her antipsychotic medications.

**In August, depression came back.** As her mood started to slip, Monica took the stool left over from April (July 26, August 5 and August 11), but by August 9 her depressed mood was severe again and she was sleeping 11 to 20 hours a day. Stool stored since April may not have survived. Ryan and Monica also think her gut slipped back toward dysbiosis: they didn't keep to the high-fiber diet that helps transplanted microbes take hold, and atypical antipsychotics may themselves disrupt the gut microbiome. On August 19 she started a new round with fresh stool. The data here ends August 14.

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

Thorne withdrew its test shortly after Monica's results, and each test cost about $400. This page shows summaries, not the original reports.

## The presentation

{% include story-presentation.html %}

## Records & reports

{% include story-documents.html %}

## Lessons Learned

- **The gut-brain connection is real, and it's personal.** The biggest changes in Monica's mood came after changes to her gut, but so did a hypomania-like stretch. Watch for both directions.
- **Track everything.** Daily mood and sleep logs turned a blur of good and bad weeks into something they could see, share with her care team, and learn from.
- **Engraftment takes work.** Diet matters after FMT. More fiber and fermented foods, less sugar and animal fat. They're still learning what that means in recipes.
- **Medication and the microbiome interact.** They wonder whether restarting an atypical antipsychotic played a part in the August relapse. That's a question, not a finding.
- **You're not alone.** Find people who've been there on our [Connect]({{ '/connect/' | relative_url }}) page.

<aside class="notice" role="note">
	<p><strong>One person's experience.</strong> This is a personal account, not medical advice. What helped (or didn't) here may not apply to anyone else. Talk with a qualified clinician about any treatment decision.</p>
</aside>
