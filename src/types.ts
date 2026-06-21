export interface Post {
  id: string;
  platform: 'Instagram' | 'Twitter/X' | 'LinkedIn' | 'Facebook' | 'YouTube';
  date: string;
  type: 'Reel' | 'Image' | 'Video' | 'Carousel' | 'Text' | 'Short';
  theme: 'Educational' | 'Promotional' | 'Behind the Scenes' | 'Inspirational' | 'Entertainment' | 'Industry Insights' | 'User-Generated';
  caption: string;
  hashtags: string[];
  impressions: number;
  reach: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  profileVisits: number;
  linkClicks: number;
  engagementRate: number; // (likes + comments + shares + saves) / impressions * 100
  followerGrowth: number;
  sentiment: 'Positive' | 'Neutral' | 'Negative';
  sentimentScore: number; // -1 to 1
  aiContentScore: number; // 0 to 100
  bestPostingTime: string; // e.g. "Wednesday 15:00"
  campaign: string;
}

export interface KPIStats {
  totalImpressions: number;
  totalReach: number;
  totalEngagements: number;
  avgEngagementRate: number;
  totalFollowerGrowth: number;
  avgAiContentScore: number;
  positiveSentimentPercent: number;
  ctrPercent: number;
}

export interface PlatformAnalytics {
  platform: string;
  posts: number;
  impressions: number;
  reach: number;
  engagements: number;
  avgEngagementRate: number;
  likes: number;
  comments: number;
  shares: number;
  saves: number;
}

export interface ThemeAnalytics {
  theme: string;
  posts: number;
  avgEngagementRate: number;
  avgAiScore: number;
  impressions: number;
}

export interface TypeAnalytics {
  type: string;
  posts: number;
  avgEngagementRate: number;
  shares: number;
  saves: number;
}

export interface SentimentDistribution {
  name: 'Positive' | 'Neutral' | 'Negative';
  value: number;
  color: string;
}

export interface HashtagMetric {
  hashtag: string;
  usageCount: number;
  avgEngagementRate: number;
}

export interface TimeMapEntry {
  day: string;
  hour: number;
  engagementRate: number;
}
