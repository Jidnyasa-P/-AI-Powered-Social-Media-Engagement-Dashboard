import React, { useState } from 'react';
import { Sparkles, MessageSquare, Copy, Check, Info, RefreshCw, BarChart2, Heart, Award, ArrowRight } from 'lucide-react';

interface GeminiResponse {
  aiContentScore: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentExplanation: string;
  hookStrength: number;
  hookExplanation: string;
  brandVoiceSync: number;
  brandExplanation: string;
  suggestedHashtags: string[];
  improvedCaptionOption: string;
}

export default function AiPlaygroundView() {
  const [caption, setCaption] = useState<string>(
    "Are you tired of tracking vanity metrics that don't increase your sales? Our brand new analytics platform solves this in 1-click! Grab our Summer discount code ANALYTICS40 to maximize your organic growth today."
  );
  const [platform, setPlatform] = useState<string>('Instagram');
  const [theme, setTheme] = useState<string>('Promotional');
  const [loading, setLoading] = useState<boolean>(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [errorBanner, setErrorBanner] = useState<string | null>(null);
  
  // High fidelity default fallback results to show on initial load and if the API key isn't provided
  const [results, setResults] = useState<GeminiResponse>({
    aiContentScore: 82,
    sentiment: 'Positive',
    sentimentExplanation: 'Audience reactions are highly supportive. The summer discount creates strong utility-based engagement indicators.',
    hookStrength: 8,
    hookExplanation: 'The rhetorical question handles the scrolling crowd excellently by directly highlighting common customer workflow pains.',
    brandVoiceSync: 7,
    brandExplanation: 'Tone fits standard promotional schedules perfectly, but can include better whitespace breaks and bullet points for Instagram organic viewing.',
    suggestedHashtags: ['#MarketingROI', '#SaaSAnalytics', '#CampaignOptimization', '#GrowthMarketing', '#DigitalAgency'],
    improvedCaptionOption: `📈 Tired of tracking vanity metrics that don't boost sales?

Our brand new analytics platform simplifies your reporting in 1-click! 

🔥 Special Offer: Use code **ANALYTICS40** for 40% off our complete suite. 
Optimize your campaigns and scale lead generation organic-style.

👉 Register today via the link in our bio! #MarketingROI #SaaSAnalytics #GrowthMarketing`
  });

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2000);
  };

  const handleAnalyze = async () => {
    setLoading(true);
    setErrorBanner(null);
    try {
      const response = await fetch('/api/gemini/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ caption, platform, theme })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.details || errorData.error || 'Server error');
      }

      const data = await response.json();
      setResults(data);
    } catch (err: any) {
      console.warn("API Error. Falling back to local high-fidelity mock analyzer.", err);
      setErrorBanner(
        "GEMINI_API_KEY is not configured or server failed. Activating local mock analyzer so you can try the layout! (Configure the key in Secrets to get real-time dynamic AI generation.)"
      );
      
      // Calculate realistic scores based on user choices locally
      const baseScore = Math.floor(60 + Math.random() * 25);
      const hookRate = Math.floor(6 + Math.random() * 4);
      const simulatedTags = [
        `#${theme}Growth`, 
        `#${platform}Tips`, 
        `#DigitalStrategy`, 
        '#MarketingStrategy', 
        '#SocialEngagement'
      ];
      
      setResults({
        aiContentScore: Math.min(baseScore + (caption.length > 100 ? 5 : -5), 100),
        sentiment: caption.toLowerCase().includes('struggle') || caption.toLowerCase().includes('tired') ? 'Positive' : 'Neutral',
        sentimentExplanation: `Calculated from your keywords. evades negative feedback through a direct business values focus.`,
        hookStrength: hookRate,
        hookExplanation: caption.length < 50 ? 'The attention hook is extremely short. Consider adding a strong question or statistics in your first 3 lines.' : 'Contains standard rhetorical elements. Formatting look stable.',
        brandVoiceSync: Math.floor(6 + Math.random() * 4),
        brandExplanation: `Your formatting meets standard ${platform} trends. Highlight key terms with brackets or line gaps.`,
        suggestedHashtags: simulatedTags,
        improvedCaptionOption: `💡 [STRENGTHENED HOOK]

${caption}

---
Connect with our experts today!
#DigitalStrategy #${platform}Tips #MarketingROI`
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Overview Block */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden">
        <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-violet-500/10 rounded-lg text-violet-400">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>
          <span className="text-xs font-semibold tracking-wider uppercase text-violet-400">AI Engagement Coach</span>
        </div>
        <h1 className="text-2xl font-bold font-sans text-slate-100 tracking-tight">AI Content Scoring & Copy Coach</h1>
        <p className="text-sm text-slate-400 max-w-2xl mt-1">
          Input your caption text, specify your marketing target, and let the Google Gemini AI proxy evaluate hooks, readability, sentiment, and provide a revised high-engagement copy mockup instantly.
        </p>

        {errorBanner && (
          <div className="mt-4 p-3.5 bg-amber-500/10 border border-amber-500/20 text-amber-300 text-xs rounded-xl flex gap-2.5 items-start">
            <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-400" />
            <span>{errorBanner}</span>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Editor side */}
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-4">
            <h3 className="font-semibold text-slate-200 text-sm">Campaign Input parameters</h3>
            
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Target Channel</label>
              <select
                value={platform}
                onChange={(e) => setPlatform(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2.5 outline-none focus:border-violet-500 transition-colors"
              >
                <option value="Instagram">Instagram (Reel/Carousel)</option>
                <option value="LinkedIn">LinkedIn (Professional Post)</option>
                <option value="Twitter/X">Twitter/X (Micro-blogging Thread)</option>
                <option value="Facebook">Facebook (Community Update)</option>
                <option value="YouTube">YouTube (Video Shorts description)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Content Theme Class</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2.5 outline-none focus:border-violet-500 transition-colors"
              >
                <option value="Educational">Educational (Guides/Tutorials)</option>
                <option value="Promotional">Promotional (Offers/Conversions)</option>
                <option value="Inspirational">Inspirational (Behind are values)</option>
                <option value="Industry Insights">Industry Insights (Expert reports)</option>
                <option value="Entertainment">Entertainment (Meme/Weekly Fun)</option>
              </select>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Caption Text</label>
              <textarea
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                className="w-full h-36 bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-3 outline-none focus:border-violet-500 transition-colors font-sans resize-none leading-relaxed"
                placeholder="Draft your promotional copy or caption details..."
              />
            </div>

            <button
              onClick={handleAnalyze}
              disabled={loading || !caption}
              className="w-full py-2.5 bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-medium text-xs rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-950/20 disabled:opacity-50"
            >
              {loading ? (
                <>
                  <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                  <span>Evaluating copywriting hooks...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Execute AI Engagement Check</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Analytics side */}
        <div className="lg:col-span-3 space-y-4">
          <div className="bg-slate-950 border border-slate-900 rounded-xl p-5 space-y-5">
            <h3 className="font-semibold text-slate-200 text-sm flex justify-between items-center">
              <span>Performance Potential Scorecard</span>
              <span className="text-[10px] font-mono text-slate-500">Evaluated in real-time</span>
            </h3>

            {/* Core ratings ring & numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-slate-900 pb-5">
              {/* Radial metric */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col items-center justify-center text-center">
                <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold mb-2">AI Effectiveness</span>
                
                <div className="relative w-20 h-20 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle cx="40" cy="40" r="32" stroke="rgba(30, 41, 59, 0.5)" strokeWidth="6" fill="transparent" />
                    <circle 
                      cx="40" cy="40" r="32" 
                      stroke="url(#grad2)" strokeWidth="6" fill="transparent"
                      strokeDasharray="201"
                      strokeDashoffset={201 - (201 * results.aiContentScore) / 100}
                      strokeLinecap="round"
                    />
                    <defs>
                      <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#c084fc" />
                        <stop offset="100%" stopColor="#818cf8" />
                      </linearGradient>
                    </defs>
                  </svg>
                  <div className="absolute flex flex-col items-center">
                    <span className="text-xl font-bold text-slate-100">{results.aiContentScore}</span>
                    <span className="text-[8px] text-slate-500">/ 100</span>
                  </div>
                </div>
              </div>

              {/* Hook metric state */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Hook Strength</span>
                  <div className="text-xl font-bold text-slate-200 mt-1">{results.hookStrength} <span className="text-xs text-slate-500 font-normal">/ 10</span></div>
                </div>
                <div className="w-full bg-slate-800 h-1.5 rounded-full mt-3 overflow-hidden">
                  <div className="bg-violet-400 h-full rounded-full" style={{ width: `${results.hookStrength * 10}%` }} />
                </div>
              </div>

              {/* Sentiment classification */}
              <div className="bg-slate-900/40 border border-slate-900 rounded-xl p-4 flex flex-col justify-between">
                <div>
                  <span className="text-[9px] uppercase tracking-wider text-slate-500 font-semibold">Reader Sentiment</span>
                  <div className="mt-1">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full inline-block ${
                      results.sentiment === 'Positive' ? 'text-emerald-400 bg-emerald-400/10' :
                      results.sentiment === 'Negative' ? 'text-red-400 bg-red-400/10' :
                      'text-slate-400 bg-slate-500/10'
                    }`}>
                      {results.sentiment}
                    </span>
                  </div>
                </div>
                <p className="text-[9px] text-slate-400 italic leading-snug mt-2 line-clamp-2">{results.sentimentExplanation}</p>
              </div>
            </div>

            {/* Critique sections */}
            <div className="space-y-3">
              <div>
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                  <Sparkles className="w-3.5 h-3.5 text-violet-400" />
                  Hook Evaluation critique
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/30 p-2.5 rounded border border-slate-900">{results.hookExplanation}</p>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-200 flex items-center gap-1.5 mb-1">
                  <BarChart2 className="w-3.5 h-3.5 text-indigo-400" />
                  Readability & Branding sync
                </h4>
                <p className="text-[11px] text-slate-400 leading-relaxed bg-slate-900/30 p-2.5 rounded border border-slate-900">{results.brandExplanation}</p>
              </div>
            </div>

            {/* Tags & Recommendations */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="space-y-1.5">
                <span className="text-[10px] uppercase font-semibold text-slate-500">AI Suggested Tags</span>
                <div className="flex flex-wrap gap-1.5">
                  {results.suggestedHashtags.map((tag, i) => (
                    <span key={i} className="text-[10px] font-mono text-indigo-400 bg-indigo-500/10 px-2.5 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="space-y-1.5 bg-slate-900/40 p-3 rounded-lg border border-slate-900">
                <span className="text-[9px] uppercase font-bold text-violet-400 tracking-wider flex items-center gap-1">
                  <Award className="w-3 h-3" /> Brand growth tip
                </span>
                <p className="text-[10px] text-slate-400 leading-relaxed italic">
                  Posting during high interest hours (e.g. Wednesday afternoons or Monday mornings) could increase impressions by over 25%!
                </p>
              </div>
            </div>

            {/* Rewritten options */}
            <div className="bg-slate-900/60 p-4 rounded-xl border border-slate-800 space-y-2 relative">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 animate-pulse" /> Revised Copy Mockup
                </span>
                <button
                  onClick={() => handleCopy(results.improvedCaptionOption, 'revisedCopy')}
                  className="text-[10px] text-slate-400 hover:text-slate-200 flex items-center gap-1 bg-slate-950 border border-slate-800 p-1 px-2.5 rounded transition-all"
                >
                  {copiedSection === 'revisedCopy' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  {copiedSection === 'revisedCopy' ? 'Copied' : 'Copy revised'}
                </button>
              </div>
              <pre className="text-[11px] text-slate-300 font-sans whitespace-pre-wrap leading-relaxed">
                {results.improvedCaptionOption}
              </pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
