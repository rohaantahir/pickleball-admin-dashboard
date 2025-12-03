export interface Member {
  id: string;
  name: string;
  email: string;
  avatar: string;
  membershipTier: 'Rally Pass' | 'Match Point' | 'Tour Insider';
  joinDate: string;
  region: 'North' | 'South' | 'East' | 'West' | 'Central';
  status: 'Active' | 'Inactive';
  lastActive: string;
}

export interface TeamMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'Super Admin' | 'Admin' | 'Content Manager' | 'Moderator';
  lastActive: string;
}

export interface MembershipTier {
  id: string;
  name: string;
  price: number;
  features: string[];
  subscriberCount: number;
  monthlyRevenue: number;
  active: boolean;
}

export interface LiveMatch {
  id: string;
  title: string;
  player1: string;
  player2: string;
  status: 'Live' | 'Upcoming' | 'Completed';
  scheduledTime: string;
  court: string;
}

export interface GameRecap {
  id: string;
  title: string;
  thumbnail: string;
  duration: string;
  views: number;
  uploadDate: string;
  description: string;
}

export const mockMembers: Member[] = Array.from({ length: 52 }, (_, i) => ({
  id: `member-${i + 1}`,
  name: [
    'Sarah Johnson', 'Michael Chen', 'Emily Rodriguez', 'James Wilson', 'Amanda Lee',
    'David Brown', 'Jessica Taylor', 'Christopher Martinez', 'Lauren Anderson', 'Daniel Kim',
    'Rachel White', 'Matthew Garcia', 'Ashley Thompson', 'Ryan Moore', 'Jennifer Martin',
    'Kevin Jackson', 'Michelle Lee', 'Brandon Hall', 'Stephanie Allen', 'Justin Young',
    'Nicole Wright', 'Eric Lopez', 'Megan Hill', 'Andrew Scott', 'Samantha Green',
    'Joshua Adams', 'Christina Baker', 'Tyler Nelson', 'Rebecca Carter', 'Jonathan Mitchell',
    'Melissa Perez', 'Nicholas Roberts', 'Brittany Turner', 'Alexander Phillips', 'Amber Campbell',
    'Patrick Parker', 'Danielle Evans', 'Steven Edwards', 'Heather Collins', 'Timothy Stewart',
    'Kimberly Sanchez', 'Brian Morris', 'Angela Rogers', 'Jacob Reed', 'Kelly Cook',
    'Nathan Morgan', 'Laura Bell', 'Aaron Murphy', 'Maria Bailey', 'Kyle Rivera',
    'Hannah Cooper', 'Zachary Richardson'
  ][i % 52],
  email: `user${i + 1}@example.com`,
  avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`,
  membershipTier: ['Rally Pass', 'Match Point', 'Tour Insider'][i % 3] as any,
  joinDate: new Date(2024, Math.floor(i / 10), (i % 28) + 1).toISOString().split('T')[0],
  region: ['North', 'South', 'East', 'West', 'Central'][i % 5] as any,
  status: i % 7 === 0 ? 'Inactive' : 'Active',
  lastActive: new Date(2024, 11, (i % 30) + 1).toISOString().split('T')[0],
}));

export const mockTeamMembers: TeamMember[] = [
  {
    id: 'team-1',
    name: 'Admin User',
    email: 'admin@pickleball.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=admin',
    role: 'Super Admin',
    lastActive: '2024-12-01',
  },
  {
    id: 'team-2',
    name: 'Jane Cooper',
    email: 'jane.cooper@pickleball.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=jane',
    role: 'Admin',
    lastActive: '2024-12-01',
  },
  {
    id: 'team-3',
    name: 'Mark Stevens',
    email: 'mark.stevens@pickleball.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=mark',
    role: 'Content Manager',
    lastActive: '2024-11-30',
  },
  {
    id: 'team-4',
    name: 'Lisa Anderson',
    email: 'lisa.anderson@pickleball.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=lisa',
    role: 'Moderator',
    lastActive: '2024-11-29',
  },
  {
    id: 'team-5',
    name: 'Tom Harris',
    email: 'tom.harris@pickleball.com',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=tom',
    role: 'Admin',
    lastActive: '2024-11-30',
  },
];

export const mockMembershipTiers: MembershipTier[] = [
  {
    id: 'tier-1',
    name: 'Rally Pass',
    price: 9.99,
    features: [
      'Access to live match streams',
      'Basic match highlights',
      'Community forum access',
      'Monthly newsletter',
    ],
    subscriberCount: 245,
    monthlyRevenue: 2447.55,
    active: true,
  },
  {
    id: 'tier-2',
    name: 'Match Point',
    price: 19.99,
    features: [
      'All Rally Pass features',
      'HD quality streams',
      'Full match replays',
      'Exclusive player interviews',
      'Priority support',
      'Member-only events',
    ],
    subscriberCount: 182,
    monthlyRevenue: 3638.18,
    active: true,
  },
  {
    id: 'tier-3',
    name: 'Tour Insider',
    price: 34.99,
    features: [
      'All Match Point features',
      '4K ultra HD streams',
      'Behind-the-scenes content',
      'Early access to tickets',
      'Exclusive merchandise discounts',
      'Meet & greet opportunities',
      'VIP tournament access',
    ],
    subscriberCount: 98,
    monthlyRevenue: 3429.02,
    active: true,
  },
];

export const mockLiveMatches: LiveMatch[] = [
  {
    id: 'match-1',
    title: 'Championship Finals',
    player1: 'Ben Johns',
    player2: 'Tyson McGuffin',
    status: 'Live',
    scheduledTime: '2024-12-01T14:00:00',
    court: 'Center Court',
  },
  {
    id: 'match-2',
    title: 'Women\'s Semi-Finals',
    player1: 'Anna Leigh Waters',
    player2: 'Catherine Parenteau',
    status: 'Upcoming',
    scheduledTime: '2024-12-01T16:00:00',
    court: 'Court 1',
  },
  {
    id: 'match-3',
    title: 'Mixed Doubles Final',
    player1: 'Riley Newman',
    player2: 'Matt Wright',
    status: 'Upcoming',
    scheduledTime: '2024-12-01T18:00:00',
    court: 'Center Court',
  },
];

export const mockGameRecaps: GameRecap[] = [
  {
    id: 'recap-1',
    title: 'Incredible Rally at Championship',
    thumbnail: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=400&h=300&fit=crop',
    duration: '10:34',
    views: 15234,
    uploadDate: '2024-11-28',
    description: 'Watch the most intense rally of the tournament',
  },
  {
    id: 'recap-2',
    title: 'Women\'s Doubles Highlights',
    thumbnail: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?w=400&h=300&fit=crop',
    duration: '8:22',
    views: 12891,
    uploadDate: '2024-11-27',
    description: 'Best moments from the women\'s doubles match',
  },
  {
    id: 'recap-3',
    title: 'Underdog Victory Story',
    thumbnail: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=400&h=300&fit=crop',
    duration: '12:15',
    views: 18456,
    uploadDate: '2024-11-26',
    description: 'An inspiring comeback victory',
  },
];

export const analyticsData = {
  userGrowth: [
    { month: 'Jun', users: 120 },
    { month: 'Jul', users: 180 },
    { month: 'Aug', users: 240 },
    { month: 'Sep', users: 320 },
    { month: 'Oct', users: 410 },
    { month: 'Nov', users: 525 },
  ],
  revenueTrend: [
    { month: 'Jun', revenue: 3850 },
    { month: 'Jul', revenue: 5240 },
    { month: 'Aug', revenue: 6820 },
    { month: 'Sep', revenue: 7950 },
    { month: 'Oct', revenue: 8730 },
    { month: 'Nov', revenue: 9514 },
  ],
  tierDistribution: [
    { name: 'Rally Pass', value: 245, color: 'hsl(var(--chart-1))' },
    { name: 'Match Point', value: 182, color: 'hsl(var(--chart-2))' },
    { name: 'Tour Insider', value: 98, color: 'hsl(var(--chart-3))' },
  ],
  regionData: [
    { region: 'North', members: 125 },
    { region: 'South', members: 98 },
    { region: 'East', members: 142 },
    { region: 'West', members: 89 },
    { region: 'Central', members: 71 },
  ],
};

export const playerInsights = {
  performanceComparison: [
    { stat: 'Power', value: 85 },
    { stat: 'Accuracy', value: 92 },
    { stat: 'Speed', value: 78 },
    { stat: 'Defense', value: 88 },
    { stat: 'Endurance', value: 82 },
    { stat: 'Strategy', value: 90 },
  ],
  winTrends: [
    { month: 'Jun', wins: 142 },
    { month: 'Jul', wins: 165 },
    { month: 'Aug', wins: 178 },
    { month: 'Sep', wins: 195 },
    { month: 'Oct', wins: 210 },
    { month: 'Nov', wins: 228 },
  ],
  ratingProgression: [
    { month: 'Jun', benJohns: 2720, annaLeigh: 2650, tyson: 2580 },
    { month: 'Jul', benJohns: 2745, annaLeigh: 2680, tyson: 2605 },
    { month: 'Aug', benJohns: 2770, annaLeigh: 2710, tyson: 2635 },
    { month: 'Sep', benJohns: 2800, annaLeigh: 2735, tyson: 2665 },
    { month: 'Oct', benJohns: 2825, annaLeigh: 2760, tyson: 2695 },
    { month: 'Nov', benJohns: 2850, annaLeigh: 2780, tyson: 2720 },
  ],
};
