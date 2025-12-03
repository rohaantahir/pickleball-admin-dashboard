import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Edit2, Check, DollarSign, Users, TrendingUp, Plus, Trash2 } from "lucide-react";
import { mockMembershipTiers, type MembershipTier } from "@/data/mockData";
import { toast } from "sonner";

const tierSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name must be less than 50 characters"),
  price: z.coerce.number().min(0, "Price must be positive"),
  features: z.string().min(1, "At least one feature is required"),
  active: z.boolean(),
});

type TierFormData = z.infer<typeof tierSchema>;

export default function MembershipTiers() {
  const [tiers, setTiers] = useState<MembershipTier[]>(mockMembershipTiers);
  const [editingTier, setEditingTier] = useState<MembershipTier | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const form = useForm<TierFormData>({
    resolver: zodResolver(tierSchema),
    defaultValues: {
      name: "",
      price: 0,
      features: "",
      active: true,
    },
  });

  const handleEdit = (tier: MembershipTier) => {
    setEditingTier(tier);
    form.reset({
      name: tier.name,
      price: tier.price,
      features: tier.features.join("\n"),
      active: tier.active,
    });
    setIsDialogOpen(true);
  };

  const handleToggleActive = (tierId: string) => {
    setTiers(tiers.map(tier => 
      tier.id === tierId ? { ...tier, active: !tier.active } : tier
    ));
    toast.success("Tier status updated");
  };

  const onSubmit = (data: TierFormData) => {
    if (editingTier) {
      setTiers(tiers.map(tier =>
        tier.id === editingTier.id
          ? {
              ...tier,
              name: data.name,
              price: data.price,
              features: data.features.split("\n").filter(f => f.trim()),
              active: data.active,
            }
          : tier
      ));
      toast.success("Tier updated successfully");
    }
    setIsDialogOpen(false);
    setEditingTier(null);
    form.reset();
  };

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
              {tiers.reduce((sum, tier) => sum + tier.subscriberCount, 0)}
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
              ${tiers.reduce((sum, tier) => sum + tier.monthlyRevenue, 0).toFixed(2)}
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
                tiers.reduce((sum, tier) => sum + tier.monthlyRevenue, 0) /
                tiers.reduce((sum, tier) => sum + tier.subscriberCount, 0)
              ).toFixed(2)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tier Cards */}
      <div className="grid gap-6 lg:grid-cols-3">
        {tiers.map((tier, index) => (
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
                <Button variant="ghost" size="icon" onClick={() => handleEdit(tier)}>
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
                  <Switch 
                    checked={tier.active} 
                    onCheckedChange={() => handleToggleActive(tier.id)}
                  />
                </div>
              </div>

              <Button 
                className="w-full" 
                variant={index === 1 ? 'default' : 'outline'}
                onClick={() => handleEdit(tier)}
              >
                Edit Tier Details
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Revenue Distribution Chart */}
      <Card>
        <CardHeader>
          <CardTitle>Revenue Distribution by Tier</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {tiers.map((tier) => {
              const totalRevenue = tiers.reduce((sum, t) => sum + t.monthlyRevenue, 0);
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

      {/* Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Edit Membership Tier</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tier Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Rally Pass" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($/month)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="9.99" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="features"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Features (one per line)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Access to live match streams&#10;Basic match highlights&#10;Community forum access"
                        rows={5}
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-lg border p-3">
                    <FormLabel className="cursor-pointer">Active</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Save Changes
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
