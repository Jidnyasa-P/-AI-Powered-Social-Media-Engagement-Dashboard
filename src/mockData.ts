import { Post } from './types';

// Let's create a template structure and generate exactly 102 items of realistic social media data.
const platforms: Array<'Instagram' | 'Twitter/X' | 'LinkedIn' | 'Facebook' | 'YouTube'> = [
  'Instagram', 'Twitter/X', 'LinkedIn', 'Facebook', 'YouTube'
];

const themes: Array<'Educational' | 'Promotional' | 'Behind the Scenes' | 'Inspirational' | 'Entertainment' | 'Industry Insights' | 'User-Generated'> = [
  'Educational', 'Promotional', 'Behind the Scenes', 'Inspirational', 'Entertainment', 'Industry Insights', 'User-Generated'
];

const postTypesMap: Record<string, Array<'Reel' | 'Image' | 'Video' | 'Carousel' | 'Text' | 'Short'>> = {
  'Instagram': ['Reel', 'Image', 'Carousel', 'Video'],
  'Twitter/X': ['Text', 'Image', 'Video'],
  'LinkedIn': ['Text', 'Image', 'Video'],
  'Facebook': ['Image', 'Video', 'Text'],
  'YouTube': ['Video', 'Short']
};

const campaignsByTheme = {
  'Educational': 'EduSeries 2026',
  'Promotional': 'Summer Product Launch',
  'Behind the Scenes': 'Brand Growth Q2',
  'Inspirational': 'Customer Love Week',
  'Entertainment': 'Weekly Fun',
  'Industry Insights': 'Tech Leadership 2026',
  'User-Generated': 'Green Earth Initiative'
};

const sampleCaptions: Record<string, string[]> = {
  'Educational': [
    "Did you know that 85% of users prefer video content? Here are 5 tips to scale your video engagement overnight!",
    "Understanding the marketing funnel is key to converting leads. Save this quick guide for your next planning session.",
    "Quick tutorial: How we use AI agents to automate social listening. Step-by-step instructions included inside.",
    "Struggling with organic reach? The algorithm rewards consistent keyword-rich bios. Here's exactly how to optimize yours.",
    "Demystifying attribution models: First-touch vs Last-touch. Which one should your agency actually use?"
  ],
  'Promotional': [
    "It's finally here! Get 40% off our brand-new Analytics Suite today. Maximize your digital marketing ROI with code ANALYTICS40.",
    "Ready to scale your business? Register for our exclusive workshop on June 30th. Seats are limited - reserve yours now!",
    "Introducing our premium social media planning tool. Automate scheduling, track real-time analytics, and generate reports in 1-click.",
    "The wait is over! Experience the future of brand collaboration. Download the full brochure from the link in our bio.",
    "Special Offer! Upgrade your marketing strategy with our bespoke consulting package. Contact our team today."
  ],
  'Behind the Scenes': [
    "Meet the team behind our latest dashboard release! Countless coffee cups and a lot of passion went into making this happen.",
    "How we brainstorm content ideas on Friday mornings. Spoiler alert: lots of whiteboard markers and sticky notes!",
    "A sneak peek into our new office space! Creating a collaborative environment to build better products for you.",
    "Raw, unedited moments from our latest photoshoot. Our digital marketing agency was full of laughter and creative energy today.",
    "From whiteboard sketch to a live interface. Here's a behind-the-scenes view of our design sprint process."
  ],
  'Inspirational': [
    "Consistent action leads to massive outcomes. Every single post you write is a step closer to building your brand authority.",
    "Failure is just data in disguise. Analyze what didn't work, refine your campaign strategy, and try again with more clarity.",
    "Your content has the power to inspire someone today. Share your story value honestly, and watch your community grow.",
    "Building a brand doesn't happen overnight. It is the compound interest of everyday dedication to your audience's needs.",
    "Empower your audience with values, not just features. True brand-loyalty starts with human-centric marketing."
  ],
  'Entertainment': [
    "That feeling when you check your social stats and the engagement rate is over 10%... 🎉 Repost if you can relate!",
    "My supervisor: 'Just make it go viral!' Me and the creative team staring at our calendars... 😭",
    "Expectation vs. Reality in digital marketing. Check out slide 3 for a good laugh!",
    "Rating popular social media marketing trends. Is anyone actually doing dance videos for enterprise software anymore?",
    "A typical Monday morning of a Social Media Manager summed up in one 10-second loop. Enjoy!"
  ],
  'Industry Insights': [
    "The shift toward hyper-personalized AI content is official. Key takeaway: authenticity will be the ultimate competitive moat.",
    "Quarterly Report: How B2B tech brands are leveraging LinkedIn in 2026. Micro-influencers are officially driving 70% of conversions.",
    "Major update! The latest algorithm changes deprioritize link-sharing in standard feeds. Focus on native rich-text and video instead.",
    "Why community-led growth is replacing traditional paid acquisition. Read our full analysis regarding customer acquisition cost.",
    "The state of social listening in 2026: Sentiment tracking is no longer optional for Fortune 500 brands."
  ],
  'User-Generated': [
    "We love seeing our customers smash their quarterly goals! Huge shoutout to the team at TechStart for this incredible feedback.",
    "A beautiful snapshot by one of our community members using our product live. Tag us in your workspace setups!",
    "Success Story: How this early-stage startup scaled their engagement by 200% in 30 days using our AI dashboard blueprints.",
    "Unboxing our newest limited-edition swag! We are sending these out to our top 50 brand advocates this week.",
    "Your weekly roundup of incredible tips shared by our members. This community's collective intelligence is unmatched!"
  ]
};

const sampleHashtags: Record<string, string[][]> = {
  'Instagram': [
    ['#DigitalMarketing', '#MarketingTips', '#SocialMedia', '#Branding', '#Analytics'],
    ['#Metaverse', '#MarketingStrategy', '#StartupLife', '#GrowthHacking', '#Business101'],
    ['#AnalyticsDashboard', '#AgencyLife', '#InstaGood', '#MarketingAgency', '#Metrics']
  ],
  'Twitter/X': [
    ['#DigitalMarketing', '#SMTips', '#MarketingAnalytics', '#AI', '#TechNews'],
    ['#GrowthMarketing', '#SaaS', '#BusinessOps', '#Strategy', '#Insight'],
    ['#SocialSelling', '#DataAnalytics', '#AIContent', '#ProductLaunch', '#Web3']
  ],
  'LinkedIn': [
    ['#ProfessionalDevelopment', '#DigitalMarketing', '#BusinessIntelligence', '#Strategy', '#Leadership'],
    ['#DataAnalytics', '#SocialMediaAnalytics', '#MarketingStrategy', '#Management', '#Innovation'],
    ['#B2BMarketing', '#BrandGrowth', '#AgencyOwner', '#Recruiting', '#CareerTips']
  ],
  'Facebook': [
    ['#MarketingStrategy', '#SocialMediaMarketing', '#BusinessTips', '#LocalBusiness', '#SmallBiz'],
    ['#MarketingAgency', '#TechTrends', '#CommunityFirst', '#DigitalBrand', '#Entrepreneur'],
    ['#CustomerSatisfaction', '#ProductLaunch', '#BehindTheScenes', '#SupportSmart', '#GreenEarth']
  ],
  'YouTube': [
    ['#HowToSocial', '#Education', '#AnalyticsTips', '#YouTubeShorts', '#Tutorial'],
    ['#DigitalSkills', '#MarketingCourse', '#SaaSProduct', '#AITool', '#InsightReports'],
    ['#StartupAdvice', '#VlogLife', '#CorporateCulture', '#InfluencerGrowth', '#MarketingHacks']
  ]
};

const hours = [
  '08:00', '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'
];

const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

// We generate high quality 102 entries
export const generateMockPosts = (): Post[] => {
  const posts: Post[] = [];
  const startDate = new Date('2026-05-01');

  for (let i = 1; i <= 102; i++) {
    // Deterministic generation to ensure standard and high-fidelity output
    const platform = platforms[i % platforms.length];
    const theme = themes[i % themes.length];
    
    // Select post type
    const availableTypes = postTypesMap[platform];
    const type = availableTypes[i % availableTypes.length];
    
    // Select caption
    const captionsForTheme = sampleCaptions[theme];
    let captionText = captionsForTheme[i % captionsForTheme.length];
    // Add variations so they don't look repetitive
    captionText += ` [#Post_${i} - Tracking success metrics in real-time]`;

    // Select hashtags
    const hList = sampleHashtags[platform];
    const hashtags = hList[i % hList.length];

    // Dates spread across May and June 2026
    const postDate = new Date(startDate);
    postDate.setDate(startDate.getDate() + Math.floor(i / 1.8));
    const dateStr = postDate.toISOString().split('T')[0];

    // Determine performance multipliers based on platform and theme
    // For instance, Reels on Instagram or Videos on YouTube have massive impressions
    let multiplier = 1.0;
    if (theme === 'Educational') multiplier *= 1.35;
    if (theme === 'Inspirational') multiplier *= 1.25;
    if (theme === 'Industry Insights') multiplier *= 1.15;
    
    if (platform === 'Instagram' && type === 'Reel') multiplier *= 1.8;
    if (platform === 'YouTube' && type === 'Short') multiplier *= 1.9;
    if (platform === 'LinkedIn') multiplier *= 1.2;

    const impressions = Math.floor((1200 + (i * 245) + (i % 7 * 600)) * multiplier);
    const reach = Math.floor(impressions * (0.65 + (i % 3) * 0.1));
    
    // Likes represent ~ 5-10% of impressions
    const likes = Math.floor(impressions * (0.04 + (i % 4) * 0.015) * multiplier);
    const comments = Math.floor(likes * (0.08 + (i % 5) * 0.03));
    const shares = Math.floor(likes * (0.05 + (i % 3) * 0.06));
    const saves = Math.floor(likes * (0.04 + (i % 4) * 0.04));
    
    const profileVisits = Math.floor(reach * (0.02 + (i % 5) * 0.008));
    const linkClicks = Math.floor(reach * (0.015 + (i % 4) * 0.01));

    // Engagement Rate = (Likes + Comments + Shares + Saves) / Impressions * 100
    const totalEng = likes + comments + shares + saves;
    const engagementRate = Number(((totalEng / impressions) * 100).toFixed(2));

    const followerGrowth = Math.floor(likes * (0.05 + (i % 6) * 0.02));

    // Sentiment Score and Text Classification
    let sentiment: 'Positive' | 'Neutral' | 'Negative' = 'Positive';
    let sentimentScore = 0.5 + (i % 5) * 0.1;

    if (theme === 'Promotional') {
      sentiment = i % 3 === 0 ? 'Neutral' : 'Positive';
      sentimentScore = i % 3 === 0 ? 0.05 : 0.45;
    } else if (theme === 'Entertainment') {
      sentiment = 'Positive';
      sentimentScore = 0.82;
    } else if (i % 11 === 0) {
      sentiment = 'Negative'; // Realistic occasional negative comments/feedback
      sentimentScore = -0.35 - (i % 3) * 0.1;
    } else if (i % 7 === 0) {
      sentiment = 'Neutral';
      sentimentScore = 0.0;
    }
    sentimentScore = Number(sentimentScore.toFixed(2));

    // AI Content Score based on key attributes: hook strength, hashtags selection, format sync with theme
    let aiContentScore = Math.floor(65 + (i % 30) + (theme === 'Educational' ? 8 : 0));
    if (aiContentScore > 100) aiContentScore = 100;

    // Best Posting Time selection
    const day = days[i % days.length];
    const hour = hours[i % hours.length];
    const bestPostingTime = `${day} ${hour}`;

    const campaign = campaignsByTheme[theme];

    posts.push({
      id: `P${String(i).padStart(3, '0')}`,
      platform,
      date: dateStr,
      type,
      theme,
      caption: captionText,
      hashtags,
      impressions,
      reach,
      likes,
      comments,
      shares,
      saves,
      profileVisits,
      linkClicks,
      engagementRate,
      followerGrowth,
      sentiment,
      sentimentScore,
      aiContentScore,
      bestPostingTime,
      campaign
    });
  }

  // Reverse list so that newest dates can appear first
  return posts.sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
};

export const MOCK_POSTS = generateMockPosts();
