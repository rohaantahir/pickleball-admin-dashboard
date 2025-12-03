import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { LineChart, Line, BarChart, Bar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { Trophy, TrendingUp, Target, Award, Plus } from "lucide-react";
import { playerInsights } from "@/data/mockData";

export default function Insights() {
  const topPlayers = [
    {
      rank: 1,
      name: "Ben Johns",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=ben",
      rating: 2850,
      wins: 48,
      losses: 5,
      winRate: 90.6,
      change: "+12",
    },
    {
      rank: 2,
      name: "Anna Leigh Waters",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=anna",
      rating: 2780,
      wins: 45,
      losses: 7,
      winRate: 86.5,
      change: "+8",
    },
    {
      rank: 3,
      name: "Tyson McGuffin",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=tyson",
      rating: 2720,
      wins: 42,
      losses: 9,
      winRate: 82.4,
      change: "+5",
    },
    {
      rank: 4,
      name: "Catherine Parenteau",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=catherine",
      rating: 2680,
      wins: 40,
      losses: 10,
      winRate: 80.0,
      change: "-2",
    },
    {
      rank: 5,
      name: "Riley Newman",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=riley",
      rating: 2650,
      wins: 38,
      losses: 12,
      winRate: 76.0,
      change: "+3",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Player Insights & Analytics</h1>
          <p className="text-muted-foreground">Track player performance, rankings, and statistics</p>
        </div>
        <Button className="gap-2">
          <Plus className="h-4 w-4" />
          Publish New Stats
        </Button>
      </div>

      {/* Key Metrics */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Players Tracked
            </CardTitle>
            <Trophy className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">247</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +18 this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Matches Analyzed
            </CardTitle>
            <Target className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,543</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +127 this week
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg Match Rating
            </CardTitle>
            <Award className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4.6/5</div>
            <p className="text-xs text-success flex items-center gap-1 mt-1">
              <TrendingUp className="h-3 w-3" />
              +0.2 improvement
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Published Reports
            </CardTitle>
            <Trophy className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground mt-1">
              Last published 2 hours ago
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Top Players Rankings */}
      <Card>
        <CardHeader>
          <CardTitle>Top Player Rankings</CardTitle>
          <CardDescription>Current season standings and performance metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-16">Rank</TableHead>
                  <TableHead>Player</TableHead>
                  <TableHead>Rating</TableHead>
                  <TableHead>Record</TableHead>
                  <TableHead>Win Rate</TableHead>
                  <TableHead>Rank Change</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {topPlayers.map((player) => (
                  <TableRow key={player.rank}>
                    <TableCell className="font-bold">#{player.rank}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={player.avatar} />
                          <AvatarFallback>{player.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{player.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold text-primary">{player.rating}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {player.wins}W - {player.losses}L
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/10">
                        {player.winRate}%
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <span className={player.change.startsWith('+') ? 'text-success' : 'text-destructive'}>
                        {player.change}
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Analytics Charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Performance Comparison */}
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Performance Comparison</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <RadarChart data={playerInsights.performanceComparison}>
                <PolarGrid stroke="hsl(var(--border))" />
                <PolarAngleAxis dataKey="stat" stroke="hsl(var(--muted-foreground))" />
                <PolarRadiusAxis stroke="hsl(var(--muted-foreground))" />
                <Radar 
                  name="Average" 
                  dataKey="value" 
                  stroke="hsl(var(--primary))" 
                  fill="hsl(var(--primary))" 
                  fillOpacity={0.3} 
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Match Win Trends */}
        <Card>
          <CardHeader>
            <CardTitle>Match Win Trends (Last 6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <BarChart data={playerInsights.winTrends}>
                <defs>
                  <linearGradient id="barWinGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="hsl(var(--success))" stopOpacity={1}/>
                    <stop offset="100%" stopColor="hsl(var(--success))" stopOpacity={0.6}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Bar dataKey="wins" fill="url(#barWinGradient)" radius={[8, 8, 0, 0]} name="Total Wins" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Player Rating Progression */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Rating Progression - Top Players</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={350}>
              <LineChart data={playerInsights.ratingProgression}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'hsl(var(--card))',
                    border: '1px solid hsl(var(--border))',
                    borderRadius: '8px',
                  }}
                />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="benJohns" 
                  stroke="hsl(var(--primary))" 
                  strokeWidth={2}
                  name="Ben Johns"
                  dot={{ fill: 'hsl(var(--primary))', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="annaLeigh" 
                  stroke="hsl(var(--accent))" 
                  strokeWidth={2}
                  name="Anna Leigh Waters"
                  dot={{ fill: 'hsl(var(--accent))', r: 3 }}
                />
                <Line 
                  type="monotone" 
                  dataKey="tyson" 
                  stroke="hsl(var(--success))" 
                  strokeWidth={2}
                  name="Tyson McGuffin"
                  dot={{ fill: 'hsl(var(--success))', r: 3 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
