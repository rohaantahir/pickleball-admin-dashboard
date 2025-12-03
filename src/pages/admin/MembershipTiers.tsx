import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Edit2, Check, DollarSign, Users, TrendingUp } from "lucide-react";
import { mockMembershipTiers } from "@/data/mockData";

export default function MembershipTiers() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Membership Tiers</h1>
          <p className="text-muted-foreground">Manage pricing and features for each membership level</p>
        </div>
      </div>

      {/* Revenue Summary */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Subscribers
            </CardTitle>
            <Users className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockMembershipTiers.reduce((sum, tier) => sum + tier.subscriberCount, 0)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Monthly Revenue
            </CardTitle>
            <DollarSign className="h-4 w-4 text-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${mockMembershipTiers.reduce((sum, tier) => sum + tier.monthlyRevenue, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Revenue Per User
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {(
                mockMembershipTiers.reduce((sum, tier) => sum + tier.monthlyRevenue, 0) /
                mockMembershipTiers.reduce((sum, tier) => sum + tier.subscriberCount, 0)
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {mockMembershipTiers.map((tier, index) => (
          <Card 
            key={tier.id} 
            className={`relative transition-all hover:shadow-purple ${
              index === 1 ? 'border-2 border-primary shadow-purple' : ''
            }`}
          >
            {index === 1 && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                <Badge className="bg-primary text-primary-foreground">Most Popular</Badge>
              </div>
            )}
            <CardHeader className="space-y-4">
              <div className="flex items-center justify-between">
                <CardTitle>{tier.name}</CardTitle>
                <Button variant="ghost" size="icon">
                  <Edit2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-4xl font-bold">${tier.price}</span>
                  <span className="text-muted-foreground">/month</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Subscribers</span>
                  <Badge variant="secondary">{tier.subscriberCount}</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Monthly Revenue</span>
                  <span className="font-semibold">${tier.monthlyRevenue.toFixed(2)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Active</span>
                  <Switch checked={tier.active} />
                </div>
              </div>

              <Button className="w-full" variant={index === 1 ? 'default' : 'outline'}>
                Edit Tier Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Tier Performance Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Distribution by Tier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockMembershipTiers.map((tier) => {
              const totalRevenue = mockMembershipTiers.reduce((sum, t) => sum + t.monthlyRevenue, 0);
              const percentage = (tier.monthlyRevenue / totalRevenue) * 100;
              
              return (
                <div key={tier.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{tier.name}</span>
                    <span className="text-muted-foreground">${tier.monthlyRevenue.toFixed(2)} ({percentage.toFixed(1)}%)</span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
