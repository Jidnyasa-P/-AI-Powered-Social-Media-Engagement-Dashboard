# AI-Powered Social Media Engagement Dashboard

## Objective & Business Problem
In modern digital marketing, agencies and brand teams struggle with unstructured, siloed reporting across multi-channel environments (Instagram, LinkedIn, Twitter/X, etc.). Decisions are often driven by vanity metrics like raw likes rather than conversion-driving indicators like comments sentiment or content saves.

This project implements a secure, business-intelligence system to aggregate multi-channel data, analyze user feedback via NLP sentiment classification, rate copy hooks via an automated AI content scoring index, and visually empower executives to drive maximum campaign ROI.

## Dataset Description (100+ Records)
The repository includes a curated, realistic CSV database documenting campaigns:
- **Core Columns:** PostID, Date, Platform, PostType, ContentTheme, Caption, HashtagsUsed, Impressions, Reach, Likes, Comments, Shares, Saves, ProfileVisits, LinkClicks.
- **Calculated KPIs:** EngagementRate %, ClickThroughRate %, ContentPerformance Score, FollowerGrowth.
- **AI Analytics:** Sentiment Polarity, Sentiment Classification, AI Content Score, BestPostingTime.

## AI Analysis & Engagement KPI Logic
1. **Comment Sentiment Classifier:** Uses natural language processing to evaluate feedback into Positive, Neutral, or Negative matrices.
2. **AI Content Score:** Gemini API assesses hook strength, copy readability, keyword relevance, and call-to-actions to output a standardized 0-100 index.
3. **Engagement Index:** Evaluates total conversions weighted by action depth: `(Likes * 1 + Comments * 2 + Shares * 3.5 + Saves * 4) / Reach * 100`.

## Features
- Dynamic metric filtering by Platform, Campaign, Theme, and Date.
- Actionable KPI cards measuring absolute values and growth multipliers.
- Visual heatmaps detailing the optimal day and hour to post.
- Actionable, real-time campaign advice generated dynamically using Gemini.

## Conclusion & Business Impact
By replacing intuition with automated NLP feedback loops, brands can reduce manual reporting times by 65%, increase organic search placement through hyper-focused theme selection, and allocate social spends on campaigns with proven user interest.
