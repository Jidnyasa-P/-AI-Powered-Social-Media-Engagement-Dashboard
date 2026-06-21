import React, { useState, useMemo } from 'react';
import { MOCK_POSTS } from '../mockData';
import { Post, KPIStats, PlatformAnalytics, ThemeAnalytics, TypeAnalytics, SentimentDistribution, HashtagMetric, TimeMapEntry } from '../types';
import { 
  ResponsiveContainer, AreaChart, Area, LineChart, Line, BarChart, Bar, 
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell, ScatterChart, Scatter
} from 'recharts';
import { 
  Filter, RotateCcw, TrendingUp, Users, Heart, Award, Eye, Link2, 
  CheckCircle2, AlertCircle, Info, LayoutTemplate, HelpCircle, Download, Search
} from 'lucide-react';

export default function DashboardView() {
  // Slicers/Filters State
  const [selectedPlatform, setSelectedPlatform] = useState<string>('All');
  const [selectedTheme, setSelectedTheme] = useState<string>('All');
  const [selectedType, setSelectedType] = useState<string>('All');
  const [selectedCampaign, setSelectedCampaign] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortKey, setSortKey] = useState<keyof Post>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Slicer lists
  const platformsList = ['All', 'Instagram', 'Twitter/X', 'LinkedIn', 'Facebook', 'YouTube'];
  const themesList = ['All', 'Educational', 'Promotional', 'Behind the Scenes', 'Inspirational', 'Entertainment', 'Industry Insights', 'User-Generated'];
  const typesList = ['All', 'Reel', 'Image', 'Video', 'Carousel', 'Text', 'Short'];
  const campaignsList = ['All', 'Summer Product Launch', 'Brand Growth Q2', 'EduSeries 2026', 'Customer Love Week', 'Weekly Fun', 'Tech Leadership 2026', 'Green Earth Initiative'];

  // Reset Filters
  const handleResetFilters = () => {
    setSelectedPlatform('All');
    setSelectedTheme('All');
    setSelectedType('All');
    setSelectedCampaign('All');
    setSearchQuery('');
  };

  // Filter Posts
  const filteredPosts = useMemo(() => {
    return MOCK_POSTS.filter(post => {
      const matchPlatform = selectedPlatform === 'All' || post.platform === selectedPlatform;
      const matchTheme = selectedTheme === 'All' || post.theme === selectedTheme;
      const matchType = selectedType === 'All' || post.type === selectedType;
      const matchCampaign = selectedCampaign === 'All' || post.campaign === selectedCampaign;
      const matchSearch = searchQuery === '' || 
        post.caption.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.hashtags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchPlatform && matchTheme && matchType && matchCampaign && matchSearch;
    });
  }, [selectedPlatform, selectedTheme, selectedType, selectedCampaign, searchQuery]);

  // Sorted and filtered posts for bottom table
  const sortedAndFilteredPosts = useMemo(() => {
    const sorted = [...filteredPosts];
    sorted.sort((a, b) => {
      const valA = a[sortKey];
      const valB = b[sortKey];

      if (typeof valA === 'number' && typeof valB === 'number') {
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }
      return sortOrder === 'asc' 
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
    return sorted;
  }, [filteredPosts, sortKey, sortOrder]);

  // Calculated KPI Stats
  const kpis = useMemo((): KPIStats => {
    if (filteredPosts.length === 0) {
      return {
        totalImpressions: 0,
        totalReach: 0,
        totalEngagements: 0,
        avgEngagementRate: 0,
        totalFollowerGrowth: 0,
        avgAiContentScore: 0,
        positiveSentimentPercent: 0,
        ctrPercent: 0
      };
    }

    let impressions = 0;
    let reach = 0;
    let likes = 0;
    let comments = 0;
    let shares = 0;
    let saves = 0;
    let linkClicks = 0;
    let followerGrowthVal = 0;
    let totalAiScore = 0;
    let positiveCount = 0;

    filteredPosts.forEach(post => {
      impressions += post.impressions;
      reach += post.reach;
      likes += post.likes;
      comments += post.comments;
      shares += post.shares;
      saves += post.saves;
      linkClicks += post.linkClicks;
      followerGrowthVal += post.followerGrowth;
      totalAiScore += post.aiContentScore;
      if (post.sentiment === 'Positive') positiveCount++;
    });

    const totalEng = likes + comments + shares + saves;
    const avgEr = (totalEng / impressions) * 100;

    return {
      totalImpressions: impressions,
      totalReach: reach,
      totalEngagements: totalEng,
      avgEngagementRate: Number(avgEr.toFixed(2)),
      totalFollowerGrowth: followerGrowthVal,
      avgAiContentScore: Math.round(totalAiScore / filteredPosts.length),
      positiveSentimentPercent: Math.round((positiveCount / filteredPosts.length) * 100),
      ctrPercent: Number(((linkClicks / impressions) * 100).toFixed(2))
    };
  }, [filteredPosts]);

  // Chart 1: Platform Performance
  const platformData = useMemo((): PlatformAnalytics[] => {
    const group: Record<string, any> = {};
    filteredPosts.forEach(post => {
      if (!group[post.platform]) {
        group[post.platform] = { platform: post.platform, posts: 0, impressions: 0, reach: 0, likes: 0, comments: 0, shares: 0, saves: 0 };
      }
      const g = group[post.platform];
      g.posts++;
      g.impressions += post.impressions;
      g.reach += post.reach;
      g.likes += post.likes;
      g.comments += post.comments;
      g.shares += post.shares;
      g.saves += post.saves;
    });

    return Object.values(group).map(p => {
      const totalEng = p.likes + p.comments + p.shares + p.saves;
      return {
        ...p,
        engagements: totalEng,
        avgEngagementRate: Number(((totalEng / p.impressions) * 100).toFixed(2))
      } as PlatformAnalytics;
    });
  }, [filteredPosts]);

  // Chart 2: Content Theme Performance
  const themeData = useMemo((): ThemeAnalytics[] => {
    const group: Record<string, any> = {};
    filteredPosts.forEach(post => {
      if (!group[post.theme]) {
        group[post.theme] = { theme: post.theme, posts: 0, totalEr: 0, totalAiScore: 0, impressions: 0 };
      }
      group[post.theme].posts++;
      group[post.theme].totalEr += post.engagementRate;
      group[post.theme].totalAiScore += post.aiContentScore;
      group[post.theme].impressions += post.impressions;
    });

    return Object.values(group).map(t => ({
      theme: t.theme,
      posts: t.posts,
      avgEngagementRate: Number((t.totalEr / t.posts).toFixed(2)),
      avgAiScore: Math.round(t.totalAiScore / t.posts),
      impressions: t.impressions
    }));
  }, [filteredPosts]);

  // Chart 3: Post Type Performance (Saves and Shares focus)
  const typeData = useMemo((): TypeAnalytics[] => {
    const group: Record<string, any> = {};
    filteredPosts.forEach(post => {
      if (!group[post.type]) {
        group[post.type] = { type: post.type, posts: 0, totalEr: 0, shares: 0, saves: 0 };
      }
      group[post.type].posts++;
      group[post.type].totalEr += post.engagementRate;
      group[post.type].shares += post.shares;
      group[post.type].saves += post.saves;
    });

    return Object.values(group).map(t => ({
      type: t.type,
      posts: t.posts,
      avgEngagementRate: Number((t.totalEr / t.posts).toFixed(2)),
      shares: t.shares,
      saves: t.saves
    }));
  }, [filteredPosts]);

  // Chart 4: Engagement Trend over Time
  const trendData = useMemo(() => {
    const group: Record<string, { date: string; sumEr: number; count: number; followerGrowth: number }> = {};
    filteredPosts.forEach(post => {
      if (!group[post.date]) {
        group[post.date] = { date: post.date, sumEr: 0, count: 0, followerGrowth: 0 };
      }
      group[post.date].sumEr += post.engagementRate;
      group[post.date].count++;
      group[post.date].followerGrowth += post.followerGrowth;
    });

    return Object.values(group)
      .map(d => ({
        date: d.date,
        avgEngagementRate: Number((d.sumEr / d.count).toFixed(2)),
        followerGrowth: d.followerGrowth
      }))
      .sort((a,b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  }, [filteredPosts]);

  // Chart 5: Sentiment Analysis Pie
  const sentimentData = useMemo((): SentimentDistribution[] => {
    let positive = 0;
    let neutral = 0;
    let negative = 0;

    filteredPosts.forEach(p => {
      if (p.sentiment === 'Positive') positive++;
      else if (p.sentiment === 'Negative') negative++;
      else neutral++;
    });

    return [
      { name: 'Positive', value: positive, color: '#10b981' }, // emerald-500
      { name: 'Neutral', value: neutral, color: '#64748b' },   // slate-500
      { name: 'Negative', value: negative, color: '#f43f5e' }  // rose-500
    ];
  }, [filteredPosts]);

  // Chart 6: AI Content Score vs Engagement Rate Scatter
  const scatterData = useMemo(() => {
    return filteredPosts.map(p => ({
      captionShort: p.caption.substring(0, 30) + '...',
      aiContentScore: p.aiContentScore,
      engagementRate: p.engagementRate,
      id: p.id,
      platform: p.platform
    }));
  }, [filteredPosts]);

  // Table 1: Top Hashtags Performance
  const hashtagMetrics = useMemo((): HashtagMetric[] => {
    const records: Record<string, { totalEr: number; count: number }> = {};
    filteredPosts.forEach(post => {
      post.hashtags.forEach(tag => {
        if (!records[tag]) {
          records[tag] = { totalEr: 0, count: 0 };
        }
        records[tag].totalEr += post.engagementRate;
        records[tag].count++;
      });
    });

    return Object.entries(records)
      .map(([hashtag, val]) => ({
        hashtag,
        usageCount: val.count,
        avgEngagementRate: Number((val.totalEr / val.count).toFixed(2))
      }))
      .sort((a, b) => b.avgEngagementRate - a.avgEngagementRate)
      .slice(0, 8); // Top 8 hashtags
  }, [filteredPosts]);

  // Table 2: Best Posting Time Matrix Map (Grid)
  const postingTimeData = useMemo(() => {
    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const hours = ['08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00'];

    // Initialize map
    const grid: Record<string, Record<string, { sumEr: number; count: number }>> = {};
    days.forEach(d => {
      grid[d] = {};
      hours.forEach(h => {
        grid[d][h] = { sumEr: 0, count: 0 };
      });
    });

    // Populate data
    filteredPosts.forEach(p => {
      // Parse time
      const parts = p.bestPostingTime.split(' ');
      if (parts.length === 2) {
        const d = parts[0];
        const h = parts[1];
        
        // Find nearest row/col
        const matchedDay = days.find(day => day === d);
        const matchedHour = hours.find(hour => {
          // Compare hour intervals
          const fileH = parseInt(h.split(':')[0]);
          const gridH = parseInt(hour.split(':')[0]);
          return Math.abs(fileH - gridH) <= 1;
        });

        if (matchedDay && matchedHour) {
          grid[matchedDay][matchedHour].sumEr += p.engagementRate;
          grid[matchedDay][matchedHour].count++;
        }
      }
    });

    // Transform to grid list
    const list: Array<{ day: string; hour: string; engagementRate: number }> = [];
    days.forEach(day => {
      hours.forEach(hour => {
        const cell = grid[day][hour];
        const avgEr = cell.count > 0 ? Number((cell.sumEr / cell.count).toFixed(2)) : 0;
        list.push({ day, hour, engagementRate: avgEr });
      });
    });

    return { list, days, hours };
  }, [filteredPosts]);

  // Export Filtered Dataset to CSV (Download function)
  const handleExportCSV = () => {
    const headers = 'Post ID,Platform,Post Date,Post Type,Content Theme,Impressions,Reach,Likes,Comments,Shares,Saves,Engagement Rate %,Follower Growth,Sentiment,AI Content Score\n';
    const rows = filteredPosts.map(p => 
      `"${p.id}","${p.platform}","${p.date}","${p.type}","${p.theme}",${p.impressions},${p.reach},${p.likes},${p.comments},${p.shares},${p.saves},${p.engagementRate},${p.followerGrowth},"${p.sentiment}",${p.aiContentScore}`
    ).join('\n');

    const blob = new Blob([headers + rows], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `social_media_engagement_data_${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Visual Blueprint Overlay Info */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex gap-3 text-xs text-slate-400 items-start">
        <LayoutTemplate className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-slate-200 uppercase tracking-wider text-[10px] bg-emerald-500/10 px-2 py-0.5 rounded inline-block mb-1.5">Architecture Blueprint</span>
          <p className="leading-relaxed">
            <strong>Professional Layout Framework:</strong> Structured around an industry standard digital marketing layout: Slicers/Filters on top, absolute KPI summaries immediately below, High-impact platform trend distributions in the center, and granular Sentiment evaluation blocks alongside optimal scheduling heatmaps at the bottom. Keep margins uniform for clean hierarchy.
          </p>
        </div>
      </div>

      {/* Slicers & Sorters bar */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl p-5 space-y-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-400" />
            <h2 className="text-sm font-bold text-slate-200">Interactive Slicers & Sorters</h2>
          </div>
          <button 
            onClick={handleResetFilters}
            className="text-slate-400 hover:text-slate-200 text-xs flex items-center gap-1.5 p-1 px-2.5 bg-slate-900 border border-slate-800 rounded-lg transition-all"
          >
            <RotateCcw className="w-3 h-3" /> Reset filters
          </button>
        </div>

        {/* Filter selectors row */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
          {/* Search caption */}
          <div className="col-span-2 md:col-span-1 space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Search Keywords</span>
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Caption or #hashtag..."
                className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2 pl-8 outline-none focus:border-emerald-500 transition-colors"
              />
              <Search className="w-3.5 h-3.5 text-slate-500 absolute left-2.5 top-2.5" />
            </div>
          </div>

          {/* Slicer: Platform */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Channel Platform</span>
            <select
              value={selectedPlatform}
              onChange={(e) => setSelectedPlatform(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2 outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {platformsList.map(platform => <option key={platform} value={platform}>{platform}</option>)}
            </select>
          </div>

          {/* Slicer: Theme */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Content Theme</span>
            <select
              value={selectedTheme}
              onChange={(e) => setSelectedTheme(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2 outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {themesList.map(theme => <option key={theme} value={theme}>{theme}</option>)}
            </select>
          </div>

          {/* Slicer: Post Type */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Format Post Type</span>
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2 outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {typesList.map(type => <option key={type} value={type}>{type}</option>)}
            </select>
          </div>

          {/* Slicer: Campaign */}
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Campaign Schedule</span>
            <select
              value={selectedCampaign}
              onChange={(e) => setSelectedCampaign(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 text-xs text-slate-300 rounded-lg p-2 outline-none focus:border-emerald-500 transition-colors cursor-pointer"
            >
              {campaignsList.map(camp => <option key={camp} value={camp}>{camp}</option>)}
            </select>
          </div>
        </div>

        {/* Counter & Action */}
        <div className="flex justify-between items-center pt-2 border-t border-slate-900 text-xs text-slate-400">
          <div>
            Showing <strong className="text-slate-100">{filteredPosts.length}</strong> posts out of 102 total records in Database.
          </div>
          <button
            onClick={handleExportCSV}
            className="text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1.5 transition-colors text-xs"
          >
            <Download className="w-3.5 h-3.5" /> Export Filtered CSV ({filteredPosts.length} rows)
          </button>
        </div>
      </div>

      {/* KPI Cards row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI: Reach */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-4">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Total Reach</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-sans text-slate-100 mt-1.5">{kpis.totalReach.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400 font-semibold mt-1 flex items-center gap-1">
            <span>Impressions:</span>
            <span className="text-slate-400">{kpis.totalImpressions.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI: Engagement Rate */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-4">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Avg Engagement Rate</span>
            <TrendingUp className="w-4 h-4 text-emerald-400 animate-pulse" />
          </div>
          <div className="text-xl font-bold font-sans text-slate-100 mt-1.5">{kpis.avgEngagementRate}%</div>
          <div className="text-[10px] text-indigo-400 font-semibold mt-1 flex items-center gap-1">
            <span>Conversions:</span>
            <span className="text-slate-400">{kpis.totalEngagements.toLocaleString()}</span>
          </div>
        </div>

        {/* KPI: Follower Growth */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-4">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">Follower Growth</span>
            <Heart className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-sans text-slate-100 mt-1.5">+{kpis.totalFollowerGrowth.toLocaleString()}</div>
          <div className="text-[10px] text-pink-400 font-semibold mt-1 flex items-center gap-1">
            <span>Click-Through (CTR):</span>
            <span className="text-slate-400">{kpis.ctrPercent}%</span>
          </div>
        </div>

        {/* KPI: AI Content Score & Sentiment */}
        <div className="bg-slate-950 border border-slate-900 rounded-xl p-4">
          <div className="flex justify-between items-start text-slate-400">
            <span className="text-[10px] uppercase font-bold tracking-wider">AI Content & Polarity</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-xl font-bold font-sans text-slate-100 mt-1.5">{kpis.avgAiContentScore} <span className="text-xs text-slate-500">/ 100</span></div>
          <div className="text-[10px] mt-1 flex items-center gap-1 font-semibold text-emerald-400">
            <span>Positive Feedback:</span>
            <span className="text-emerald-400 font-bold">{kpis.positiveSentimentPercent}%</span>
          </div>
        </div>
      </div>

      {/* Main Charts block 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Trend Over Time Area Chart */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 lg:col-span-2">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-200 text-sm">Engagement Rate & Follower Growth Trend</h3>
            <p className="text-[10px] text-slate-500">Weekly tracking of conversion indexes</p>
          </div>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={trendData}>
                <defs>
                  <linearGradient id="colorEr01" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.2}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="date" stroke="#64748b" fontSize={9} />
                <YAxis stroke="#64748b" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0b0d', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
                <Legend iconType="circle" />
                <Area type="monotone" dataKey="avgEngagementRate" stroke="#10b981" strokeWidth={2} name="Engagement %" fillOpacity={1} fill="url(#colorEr01)" />
                <Area type="monotone" dataKey="followerGrowth" stroke="#818cf8" strokeWidth={1.5} name="Followers Gain" fillOpacity={0} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sentiment Doughnut Chart */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4">
          <div className="mb-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-200 text-sm">Comment Sentiment Distribution</h3>
              <p className="text-[10px] text-slate-500">Qualitative NLP Classification</p>
            </div>
            <span className="text-[9px] uppercase font-bold text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">NLP Tagging</span>
          </div>
          <div className="h-48 relative flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sentimentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {sentimentData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0a0b0d', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute flex flex-col items-center">
              <span className="text-xl font-bold text-emerald-400">{kpis.positiveSentimentPercent}%</span>
              <span className="text-[8px] uppercase tracking-wider text-slate-500">Positive</span>
            </div>
          </div>
          {/* Custom legend */}
          <div className="flex justify-center gap-4 text-xs font-mono mt-2">
            {sentimentData.map((ent, i) => (
              <div key={i} className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full" style={{ backgroundColor: ent.color }} />
                <span className="text-slate-400">{ent.name}:</span>
                <span className="text-slate-200 font-bold">{ent.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Main Charts block 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Platform Engagement Rate Comparison bar chart */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-200 text-sm">Optimal Channels & Platform Performance</h3>
            <p className="text-[10px] text-slate-500">Comparing reach sizes and final engagement indices</p>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="platform" stroke="#64748b" fontSize={9} />
                <YAxis yAxisId="left" orientation="left" stroke="#10b981" fontSize={9} />
                <YAxis yAxisId="right" orientation="right" stroke="#c084fc" fontSize={9} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0b0d', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
                <Bar yAxisId="left" dataKey="avgEngagementRate" fill="#10b981" name="Avg Engagement Rate %" radius={[4, 4, 0, 0]} maxBarSize={30} />
                <Bar yAxisId="right" dataKey="engagements" fill="#c084fc" name="Raw Interactions" radius={[4, 4, 0, 0]} maxBarSize={30} fillOpacity={0.7} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Content Theme performance index */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-200 text-sm">Theme Performance Scorecard</h3>
            <p className="text-[10px] text-slate-500">Analyzing which creative frameworks generate target attention</p>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={themeData} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis type="number" stroke="#64748b" fontSize={9} />
                <YAxis dataKey="theme" type="category" stroke="#64748b" fontSize={9} width={90} />
                <Tooltip contentStyle={{ backgroundColor: '#0a0b0d', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
                <Bar dataKey="avgEngagementRate" fill="#38bdf8" name="Avg EngagementRate %" radius={[0, 4, 4, 0]} maxBarSize={20} />
                <Bar dataKey="avgAiScore" fill="#818cf8" name="Avg AI Score" radius={[0, 4, 4, 0]} maxBarSize={20} fillOpacity={0.5} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Charts block 3 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Ideal hours scheduling heatgrid */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4 lg:col-span-2">
          <div className="mb-3 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-slate-200 text-sm">Optimal Posting Hour Heatmap</h3>
              <p className="text-[10px] text-slate-500">Avg Engagement Rate by Day & Hour</p>
            </div>
            <span className="text-[9px] uppercase font-bold text-violet-400 bg-violet-500/10 px-2 py-0.5 rounded">Scheduling Engine</span>
          </div>

          {/* Heat map grid */}
          <div className="space-y-2 pt-2">
            <div className="grid grid-cols-8 gap-1.5 text-center text-[10px] font-mono text-slate-500">
              <div>Day / Hour</div>
              {postingTimeData.hours.map(h => <div key={h}>{h}</div>)}
            </div>

            {postingTimeData.days.map(day => (
              <div key={day} className="grid grid-cols-8 gap-1.5 items-center">
                <div className="text-[10px] font-medium text-slate-400 truncate">{day}</div>
                {postingTimeData.hours.map(hour => {
                  const cell = postingTimeData.list.find(x => x.day === day && x.hour === hour);
                  const er = cell ? cell.engagementRate : 0;
                  
                  // Color interpolation slate-950 to emerald-500
                  let colorClass = 'bg-slate-950 border-slate-900';
                  let textClass = 'text-slate-600';
                  
                  if (er > 8) {
                    colorClass = 'bg-emerald-500/80 border-emerald-400';
                    textClass = 'text-white font-bold';
                  } else if (er > 5) {
                    colorClass = 'bg-emerald-600/40 border-emerald-500/35';
                    textClass = 'text-emerald-300';
                  } else if (er > 3) {
                    colorClass = 'bg-slate-800 border-slate-700';
                    textClass = 'text-slate-300';
                  } else if (er > 0) {
                    colorClass = 'bg-slate-900/40 border-slate-900';
                    textClass = 'text-slate-500';
                  }

                  return (
                    <div 
                      key={hour} 
                      title={`${day} @ ${hour} -> Avg Engagement Rate: ${er}%`}
                      className={`h-9 border rounded flex flex-col items-center justify-center transition-all hover:scale-105 cursor-help ${colorClass}`}
                    >
                      <span className={`text-[10px] text-center ${textClass}`}>
                        {er > 0 ? `${er}%` : '-'}
                      </span>
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          <div className="flex justify-end gap-4 mt-3 text-[9px] font-mono text-slate-500">
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-slate-950 border border-slate-900 rounded" />
              <span>No posts</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-slate-800 rounded" />
              <span>Low (&lt;3%)</span>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 bg-emerald-600/40 rounded" />
              <span>Medium (3% - 6%)</span>
            </div>
            <div className="flex items-center gap-1 animate-pulse">
              <span className="w-2.5 h-2.5 bg-emerald-500/80 rounded" />
              <span>Optimal (&gt;6%)</span>
            </div>
          </div>
        </div>

        {/* AI Correlation Scatter Chart */}
        <div className="bg-slate-950 border border-slate-900 rounded-2xl p-4">
          <div className="mb-4">
            <h3 className="font-semibold text-slate-200 text-sm">AI Grade vs Engagement Rate</h3>
            <p className="text-[10px] text-slate-500">Discovering correlation trends</p>
          </div>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 10, right: 10, bottom: 10, left: -20 }}>
                <CartesianGrid stroke="#1e293b" strokeDasharray="3 3" />
                <XAxis type="number" dataKey="aiContentScore" name="AI Score" stroke="#64748b" fontSize={9} />
                <YAxis type="number" dataKey="engagementRate" name="Engagement %" stroke="#64748b" fontSize={9} />
                <Tooltip cursor={{ strokeDasharray: '3 3' }} contentStyle={{ backgroundColor: '#0a0b0d', borderColor: 'rgba(255,255,255,0.05)', borderRadius: '12px' }} />
                <Scatter name="Posts Correlation" data={scatterData} fill="#c084fc" shape="circle" />
              </ScatterChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Main Table Segment */}
      <div className="bg-slate-950 border border-slate-900 rounded-2xl overflow-hidden">
        <div className="p-4 bg-slate-900/50 border-b border-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="font-bold text-slate-200 text-sm">Top Performance Posts Database Ledger</h3>
            <p className="text-[10px] text-slate-500 font-mono">Real-world historical metrics</p>
          </div>
          <div className="flex items-center gap-2 self-stretch sm:self-auto text-xs text-slate-400">
            <span>Sort By:</span>
            <select
              value={sortKey}
              onChange={(e) => setSortKey(e.target.value as any)}
              className="bg-slate-950 border border-slate-800 text-slate-300 text-[11px] p-1.5 px-3 rounded-lg outline-none"
            >
              <option value="id">Post ID</option>
              <option value="date">Date</option>
              <option value="likes">Likes</option>
              <option value="comments">Comments</option>
              <option value="impressions">Impressions</option>
              <option value="engagementRate">Engagement Rate</option>
              <option value="aiContentScore">AI Content Score</option>
            </select>
            <button
              onClick={() => setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc')}
              className="p-1.5 bg-slate-950 border border-slate-800 rounded-lg hover:text-slate-100"
            >
              {sortOrder === 'asc' ? '▲' : '▼'}
            </button>
          </div>
        </div>

        {/* Database tabular records list */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-950/20 border-b border-slate-900 text-[9px] uppercase tracking-wider text-slate-500 font-semibold">
                <th className="py-2.5 px-4 font-mono">ID</th>
                <th className="py-2.5 px-4">Channel</th>
                <th className="py-2.5 px-4">Date</th>
                <th className="py-2.5 px-4">Post Type</th>
                <th className="py-2.5 px-4">Content Theme</th>
                <th className="py-2.5 px-4 text-right">Impressions</th>
                <th className="py-2.5 px-4 text-right">Reach</th>
                <th className="py-2.5 px-4 text-right">Likes</th>
                <th className="py-2.5 px-4 text-right">Saves</th>
                <th className="py-2.5 px-4 text-right font-bold text-emerald-400">ER %</th>
                <th className="py-2.5 px-4 text-right text-violet-400">AI Grade</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-905 text-xs text-slate-400">
              {sortedAndFilteredPosts.slice(0, 15).map((post) => (
                <tr key={post.id} className="hover:bg-slate-900/10 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-slate-200">{post.id}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${
                      post.platform === 'Instagram' ? 'bg-pink-500/10 text-pink-400' :
                      post.platform === 'Twitter/X' ? 'bg-slate-800 text-slate-300' :
                      post.platform === 'LinkedIn' ? 'bg-blue-600/10 text-blue-400' :
                      post.platform === 'YouTube' ? 'bg-red-500/10 text-red-400' :
                      'bg-slate-500/10 text-slate-400'
                    }`}>
                      {post.platform}
                    </span>
                  </td>
                  <td className="py-3 px-4 font-mono text-[10px]">{post.date}</td>
                  <td className="py-3 px-4 text-[10px]">{post.type}</td>
                  <td className="py-3 px-4 italic">{post.theme}</td>
                  <td className="py-3 px-4 text-right font-mono">{post.impressions.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono text-[11px]">{post.reach.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">{post.likes.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono">{post.saves.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-emerald-400">{post.engagementRate}%</td>
                  <td className="py-3 px-4 text-right font-mono font-bold text-violet-400">{post.aiContentScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
          {sortedAndFilteredPosts.length === 0 && (
            <div className="py-12 flex flex-col items-center justify-center text-slate-500 gap-2">
              <AlertCircle className="w-8 h-8 text-slate-600 animate-bounce" />
              <span className="text-xs">No records matched your slicer configurations. Try resetting filters.</span>
            </div>
          )}
        </div>
        <div className="p-3 bg-slate-900/20 border-t border-slate-900 text-[10px] text-slate-500 flex justify-between">
          <span>Displaying top 15 rows of filtered records only for responsive readability.</span>
          <span>Database ID: social-engagement-tracker-v1</span>
        </div>
      </div>
    </div>
  );
}
