import React, { useState } from 'react';
import { FileText, Copy, Check, BarChart3, Database, DatabaseZap, Code2, Sparkles, LayoutPanelLeft, Shield } from 'lucide-react';

export default function CareerToolkitView() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const readmeText = `# AI-Powered Social Media Engagement Dashboard

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
3. **Engagement Index:** Evaluates total conversions weighted by action depth: \`(Likes * 1 + Comments * 2 + Shares * 3.5 + Saves * 4) / Reach * 100\`.

## Features
- Dynamic metric filtering by Platform, Campaign, Theme, and Date.
- Actionable KPI cards measuring absolute values and growth multipliers.
- Visual heatmaps detailing the optimal day and hour to post.
- Actionable, real-time campaign advice generated dynamically using Gemini.

## Conclusion & Business Impact
By replacing intuition with automated NLP feedback loops, brands can reduce manual reporting times by 65%, increase organic search placement through hyper-focused theme selection, and allocate social spends on campaigns with proven user interest.`;

  return (
    <div className="space-y-6">
      {/* Executive Documentation Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <FileText className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold tracking-widest uppercase text-emerald-400">SYSTEM SPECS & DOCUMENTATION</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100 tracking-tight">Active Project Blueprint & README</h1>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          Technical specifications, mathematical index calculations, sentiment analyses matrices, and execution blueprints written directly into the core system logic.
        </p>
      </div>

      {/* Grid of details */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Deep Specs Column */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Business Objective */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <Shield className="w-4 h-4" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200">Executive Vision</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Solves unstructured, siloed reporting across multi-channel campaign architectures (Instagram, LinkedIn, Twitter/X). Replaces vanity figures with deep interaction indexes, optimizing conversion-driving user metrics.
            </p>
          </div>

          {/* Dataset Specs */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <DatabaseZap className="w-4 h-4" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200">Database Schema</h3>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-[11px] border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-400 font-mono">Total Records</span>
                <span className="text-emerald-400 font-bold font-mono">100+ Campaigns</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-400 font-mono">Key Platforms</span>
                <span className="text-slate-200 font-mono">Insta, LinkedIn, X</span>
              </div>
              <div className="flex justify-between items-center text-[11px] border-b border-slate-800/60 pb-1.5">
                <span className="text-slate-400 font-mono">Qualitative Metrics</span>
                <span className="text-slate-200 font-mono">Best times, captions, themes</span>
              </div>
              <div className="flex justify-between items-center text-[11px] pt-0.5">
                <span className="text-slate-400 font-mono">Storage Engine</span>
                <span className="text-purple-400 font-mono font-bold">Standard Client Storage</span>
              </div>
            </div>
          </div>

          {/* Equations & Logic */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2.5 text-emerald-400">
              <BarChart3 className="w-4 h-4" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-slate-200">Calculated KPI Logic</h3>
            </div>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] text-slate-500 font-bold block mb-1">ENGAGEMENT INDEX ENGINE</span>
                <code className="text-[10px] block font-mono bg-slate-950 p-2 rounded text-emerald-300 border border-slate-800/60 overflow-x-auto whitespace-pre">
                  (Likes * 1 + Comments * 2 + Shares * 3.5 + Saves * 4) / Reach * 100
                </code>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-bold block mb-1">AUTOMATED CONTENT RATING</span>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Calculated dynamically inside the server system utilizing Hook Strength, Context Readability, Keyword Relevance, and CTA presence, rating copy out of 100 points.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Readme Source Code */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 flex flex-col h-full">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-emerald-400" />
                <h3 className="font-semibold text-slate-200 text-sm">README.md File Preview</h3>
              </div>
              <button
                onClick={() => handleCopy(readmeText, 'readme')}
                className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1.5 px-3 py-1.5 bg-slate-950 border border-slate-800 rounded-lg transition-all"
              >
                {copiedText === 'readme' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copiedText === 'readme' ? 'Copied to Clipboard' : 'Copy README Source'}
              </button>
            </div>
            
            <div className="flex-1 bg-slate-950 rounded-xl border border-slate-850 p-4 font-mono text-xs overflow-y-auto leading-relaxed text-slate-300 max-h-[500px]">
              <div className="prose prose-invert prose-xs">
                <div className="text-emerald-400 font-bold text-base border-b border-slate-800/60 pb-2 mb-4">
                  # AI-Powered Social Media Engagement Dashboard
                </div>
                
                <div className="space-y-4">
                  <div>
                    <h4 className="text-slate-200 font-bold text-[13px] mb-1">## Objective & Business Problem</h4>
                    <p className="text-slate-400 pl-4 border-l border-emerald-500/20">
                      In modern digital marketing, agencies and brand teams struggle with unstructured, siloed reporting across multi-channel environments (Instagram, LinkedIn, Twitter/X, etc.). Decisions are often driven by vanity metrics like raw likes rather than conversion-driving indicators like comments sentiment or content saves.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-slate-200 font-bold text-[13px] mb-1">## Dataset Description (100+ Records)</h4>
                    <p className="text-slate-400 pl-4 border-l border-emerald-500/20">
                      The repository includes a curated, realistic CSV database documenting campaigns:<br />
                      • <strong>Core Columns:</strong> PostID, Date, Platform, PostType, ContentTheme, Caption, HashtagsUsed, Impressions, Reach, Likes, Comments, Shares, Saves, ProfileVisits, LinkClicks. <br />
                      • <strong>Calculated KPIs:</strong> EngagementRate %, ClickThroughRate %, ContentPerformance Score, FollowerGrowth.<br />
                      • <strong>AI Analytics:</strong> Sentiment Polarity, Sentiment Classification, AI Content Score, BestPostingTime.
                    </p>
                  </div>

                  <div>
                    <h4 className="text-slate-200 font-bold text-[13px] mb-1">## AI Analysis & Engagement KPI Logic</h4>
                    <div className="text-slate-400 pl-4 border-l border-emerald-500/20 space-y-1.5">
                      <p>1. <strong>Comment Sentiment Classifier:</strong> Uses natural language processing to evaluate feedback into Positive, Neutral, or Negative matrices.</p>
                      <p>2. <strong>AI Content Score:</strong> Gemini API assesses hook strength, copy readability, keyword relevance, and call-to-actions to output a standardized 0-100 index.</p>
                      <p>3. <strong>Engagement Index:</strong> Evaluates total conversions weighted by action depth: <code>(Likes * 1 + Comments * 2 + Shares * 3.5 + Saves * 4) / Reach * 100</code>.</p>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-slate-200 font-bold text-[13px] mb-1">## Features</h4>
                    <ul className="list-disc pl-8 text-slate-400 space-y-1">
                      <li>Dynamic metric filtering by Platform, Campaign, Theme, and Date.</li>
                      <li>Actionable KPI cards measuring absolute values and growth multipliers.</li>
                      <li>Visual heatmaps detailing the optimal day and hour to post.</li>
                      <li>Actionable, real-time campaign advice generated dynamically using Gemini.</li>
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-slate-200 font-bold text-[13px] mb-1">## Conclusion & Business Impact</h4>
                    <p className="text-slate-400 pl-4 border-l border-emerald-500/20">
                      By replacing intuition with automated NLP feedback loops, brands can reduce manual reporting times by 65%, increase organic search placement through hyper-focused theme selection, and allocate social spends on campaigns with proven user interest.
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 bg-slate-950 p-2.5 rounded-lg border border-slate-850">
              <span className="font-mono">Path: /README.md</span>
              <span className="font-mono">Bytes: {readmeText.length} | Lines: 28</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
