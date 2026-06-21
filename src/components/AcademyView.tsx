import React, { useState } from 'react';
import { BookOpen, HelpCircle, Code, Settings, PieChart, Shield, Award, Sparkles, TrendingUp, Cpu, Bookmark } from 'lucide-react';

export default function AcademyView() {
  const [activeTab, setActiveTab] = useState<'concepts' | 'steps' | 'metrics'>('concepts');

  const concepts = [
    {
      title: "What this Project is",
      description: "An enterprise-grade social media intelligence dashboard integrating multivariable content metrics (likes, Comments, shares, saves, impressions, reach) with natural language sentiment evaluation. It provides marketing directors and growth squads with clear feedback, trend forecasting, and recommendations, acting as a unified operating system for social proof.",
      icon: <Award className="w-5 h-5 text-emerald-400" />
    },
    {
      title: "Importance of Engagement Analytics",
      description: "Raw follower counts are a vanity metric. True brand valuation lies in engagement depth—how actively users comment, save, and share copy. Retaining high shares and saves proves direct relevance, boosting organic search placement and maximizing marketing budget efficiency.",
      icon: <TrendingUp className="w-5 h-5 text-blue-400" />
    },
    {
      title: "Role of AI in Smart Content Strategy",
      description: "Rather than looking at static reports in hindsight, AI classifies audience feedback sentiment proactively. By assigning logical weights to qualitative text (captions/comments), algorithms measure attention hooks, forecast optimal release windows, and propose real-time copywriting optimization options.",
      icon: <Cpu className="w-5 h-5 text-violet-400" />
    },
    {
      title: "Target Professional Roles",
      description: "Designed for: Digital Marketing Analysts, Social Media Directors, Brand Growth Strategists, Product Marketing Managers, and Business Intelligence Developers needing to build and explain data-driven systems during live reviews.",
      icon: <Settings className="w-5 h-5 text-amber-400" />
    },
  ];

  const steps = [
    {
      name: "1. Business Problem Definition",
      desc: "Marketing projects often fail due to unstructured reporting. We specify exact success parameters (target CTR > 2.5%, engagement rate > 4%) across distinct platforms (Instagram, LinkedIn, etc.) to target campaign alignment with quantitative business outcomes."
    },
    {
      name: "2. Data Collection & Pipelines",
      desc: "Aggregating bulk social outputs (CSV imports or native graph APIs). Columns must track reach, impressions, profileVisits, linkClicks, saves, and distinct text lists (captions and user comments)."
    },
    {
      name: "3. Data Cleaning & Normalization",
      desc: "Pruning missing values, correcting schema types (converting textual dates to ISO formats), enforcing numeric types on counts, and establishing calculated variables such as Engagement Rate %.",
      formula: "Engagement Rate % = (Likes + Comments + Shares + Saves) / Impressions * 100"
    },
    {
      name: "4. Sentiment Identification (NLP)",
      desc: "Running text commentary through Natural Language Processing libraries (e.g., Python TextBlob/VADER or OpenAI/Gemini Embeddings) to map qualitative replies into categorizations (Positive, Neutral, Negative) and continuous polarity scores (-1.0 to +1.0).",
      code: `from textblob import TextBlob
import pandas as pd

def get_sentiment(text):
    polarity = TextBlob(str(text)).sentiment.polarity
    if polarity > 0.1: return "Positive"
    elif polarity < -0.1: return "Negative"
    else: return "Neutral"`
    },
    {
      name: "5. Multi-variable KPI Calculation",
      desc: "Consolidating cumulative reach indices, follower growth vectors, click-through rates (CTR), and dynamic Content Performance Scores (calculated as weighted engagement ratios relative to unique audience impressions)."
    },
    {
      name: "6. Platform & Content Theme Analysis",
      desc: "Aggregating metrics by category to isolate what speaks to your segment. For example, comparing 'Educational' Reels against 'Promotional' Carousels to determine optimal creative allocation."
    },
    {
      name: "7. Predictive Forecasting",
      desc: "Using native moving averages, exponential smoothing formulas (e.g., FORECAST.ETS in Excel), or machine learning frameworks (e.g., Prophe/ARIMA) to map upcoming seasonality trends based on historical values."
    },
    {
      name: "8. Insight & Automation Setup",
      desc: "Establishing automated updates (e.g., Excel Power Query, scheduled Cron triggers, or Python Airflow pipes) to seamlessly ingest fresh weekly exports into interactive dashboards without manual reconstruction."
    }
  ];

  const metrics = [
    { name: "Impressions", formula: "Total times content is displayed on screen", group: "Reach" },
    { name: "Reach", formula: "Number of unique accounts who saw the content", group: "Reach" },
    { name: "Likes", formula: "Primary standard of positive reaction", group: "Engagement" },
    { name: "Comments", formula: "Direct qualitative engagement indicator representing dialogue", group: "Engagement" },
    { name: "Shares", formula: "Strongest indicator of referral marketing potential", group: "Engagement" },
    { name: "Saves", formula: "Utility indicator—proves long-term resource value of content", group: "Engagement" },
    { name: "Engagement Rate %", formula: "((Likes + Comments + Shares + Saves) / Impressions) * 100", group: "Performance" },
    { name: "Click-Through Rate (CTR) %", formula: "(Link Clicks / Impressions) * 100", group: "Performance" },
    { name: "Content Performance Score", formula: "(Likes * 1 + Comments * 2 + Shares * 3.5 + Saves * 4) / Reach * 100", group: "AI/Weighted" },
    { name: "Sentiment Score", formula: "-1.0 (Highly Critical) to +1.0 (Highly Supportive)", group: "AI/Weighted" },
    { name: "AI Content Score", formula: "0 to 100 evaluated by Gemini API grading hook, readability, CTA, and value", group: "AI/Weighted" },
    { name: "Follower Growth", formula: "Net account follower fluctuation attributed directly to post activity", group: "Growth" }
  ];

  return (
    <div className="space-y-6">
      {/* Academy Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
            <BookOpen className="w-6 h-6" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-emerald-400">Education Portal</span>
        </div>
        <h1 className="text-2xl font-bold font-sans text-slate-100 tracking-tight">Marketing Academy & Core Methodology</h1>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          Learn the industry-standard foundations of AI-driven digital marketing analysis. Perfect for preparing for technical interviews and explaining your dashboard logic to stakeholders.
        </p>

        {/* Sub Navigation */}
        <div className="flex border-b border-slate-800 mt-6 gap-6">
          <button
            onClick={() => setActiveTab('concepts')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'concepts' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Core Business Concepts
          </button>
          <button
            onClick={() => setActiveTab('steps')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'steps' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Step-by-Step Methodology
          </button>
          <button
            onClick={() => setActiveTab('metrics')}
            className={`pb-3 text-sm font-medium transition-all relative ${
              activeTab === 'metrics' ? 'text-emerald-400 border-b-2 border-emerald-400' : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Metrics Blueprint
          </button>
        </div>
      </div>

      {/* Tab Contents */}
      {activeTab === 'concepts' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {concepts.map((concept, index) => (
            <div key={index} className="bg-slate-950 border border-slate-900 rounded-xl p-5 hover:border-slate-800 transition-all flex gap-4">
              <div className="p-3 bg-slate-900 rounded-lg text-slate-300 shrink-0 h-11 w-11 flex items-center justify-center">
                {concept.icon}
              </div>
              <div>
                <h3 className="font-semibold text-slate-200 mb-1.5">{concept.title}</h3>
                <p className="text-xs text-slate-400 leading-relaxed">{concept.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'steps' && (
        <div className="space-y-4">
          {steps.map((step, idx) => (
            <div key={idx} className="bg-slate-950 border border-slate-900 rounded-xl p-5">
              <h3 className="text-sm font-bold text-slate-200 flex items-center gap-2 mb-2">
                <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full" />
                {step.name}
              </h3>
              <p className="text-xs text-slate-400 mb-3 ml-3.5 leading-relaxed">{step.desc}</p>
              
              {step.formula && (
                <div className="bg-slate-900/60 rounded-lg p-2.5 ml-3.5 border border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded">Formula</span>
                    <code className="text-xs text-slate-300 font-mono">{step.formula}</code>
                  </div>
                </div>
              )}

              {step.code && (
                <div className="bg-slate-900 rounded-lg p-3 ml-3.5 border border-slate-800">
                  <div className="flex justify-between items-center mb-1.5">
                    <span className="text-[10px] font-mono text-slate-500">python / sentiment_analysis.py</span>
                    <span className="text-[10px] font-mono text-emerald-500">TextBlob NLP Library</span>
                  </div>
                  <pre className="text-xs text-slate-300 font-mono overflow-x-auto whitespace-pre p-2 bg-slate-950 rounded">
                    {step.code}
                  </pre>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === 'metrics' && (
        <div className="bg-slate-950 border border-slate-900 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-900/50 border-b border-slate-800 text-[10px] font-semibold text-slate-400 uppercase tracking-wider">
                  <th className="py-3 px-5">Metric Name</th>
                  <th className="py-3 px-5">Category / Group</th>
                  <th className="py-3 px-5">Definition & Calculation Formula</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-905">
                {metrics.map((metric, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/20 transition-colors">
                    <td className="py-3.5 px-5 font-medium text-slate-200 text-sm">{metric.name}</td>
                    <td className="py-3.5 px-5">
                      <span className={`text-[10px] font-medium px-2 py-0.5 rounded-full ${
                        metric.group === 'AI/Weighted' ? 'text-violet-400 bg-violet-400/10' :
                        metric.group === 'Performance' ? 'text-emerald-400 bg-emerald-500/10' :
                        metric.group === 'Reach' ? 'text-blue-400 bg-blue-500/10' :
                        metric.group === 'Growth' ? 'text-pink-400 bg-pink-500/10' :
                        'text-slate-400 bg-slate-500/10'
                      }`}>
                        {metric.group}
                      </span>
                    </td>
                    <td className="py-3.5 px-5 text-xs text-slate-400 font-mono">{metric.formula}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
