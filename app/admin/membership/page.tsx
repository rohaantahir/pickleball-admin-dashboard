"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Edit2, Check, DollarSign, Users, TrendingUp, Plus, X } from "lucide-react"
import { mockMembershipTiers, type MembershipTier } from "@/lib/data/mockData"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const tierSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  price: z.number().min(0, "Price must be positive"),
  features: z.array(z.string()).min(1, "At least one feature is required"),
  active: z.boolean(),
})

type TierFormValues = z.infer<typeof tierSchema>

export default function MembershipTiersPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedTier, setSelectedTier] = useState<MembershipTier | null>(null)
  const [features, setFeatures] = useState<string[]>([])
  const [newFeature, setNewFeature] = useState("")

  const form = useForm<TierFormValues>({
    resolver: zodResolver(tierSchema),
    defaultValues: {
      name: "",
      price: 0,
      features: [],
      active: true,
    },
  })

  const handleEdit = (tier: MembershipTier) => {
    setSelectedTier(tier)
    setFeatures(tier.features)
    setNewFeature("")
    form.reset({
      name: tier.name,
      price: tier.price,
      features: tier.features,
      active: tier.active,
    })
    setEditDialogOpen(true)
  }

  const handleCloseDialog = () => {
    setEditDialogOpen(false)
    setTimeout(() => {
      form.reset()
      setFeatures([])
      setNewFeature("")
      setSelectedTier(null)
    }, 0)
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      setFeatures([...features, newFeature.trim()])
      setNewFeature("")
    }
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const onSubmit = (data: TierFormValues) => {
    const updatedTier = {
      ...selectedTier,
      ...data,
      features, // Use features from state, not form
    }
    console.log("Updated tier:", updatedTier)
    toast.success(`Membership tier "${data.name}" updated successfully!`)
    handleCloseDialog()
  }

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
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Subscribers</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Monthly Revenue</CardTitle>
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
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Revenue Per User</CardTitle>
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
              index === 1 ? "border-2 border-primary shadow-purple" : ""
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
                  <Switch checked={tier.active} />
                </div>
              </div>

              <Button className="w-full" variant={index === 1 ? "default" : "outline"} onClick={() => handleEdit(tier)}>
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
              const totalRevenue = mockMembershipTiers.reduce((sum, t) => sum + t.monthlyRevenue, 0)
              const percentage = (tier.monthlyRevenue / totalRevenue) * 100

              return (
                <div key={tier.id} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{tier.name}</span>
                    <span className="text-muted-foreground">
                      ${tier.monthlyRevenue.toFixed(2)} ({percentage.toFixed(1)}%)
                    </span>
                  </div>
                  <div className="h-3 bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-primary to-accent transition-all"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Edit Tier Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={handleCloseDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Edit Membership Tier - {selectedTier?.name}</DialogTitle>
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
                      <Input placeholder="Enter tier name" {...field} />
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
                    <FormLabel>Monthly Price ($)</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        step="0.01"
                        placeholder="9.99"
                        {...field}
                        onChange={(e) => field.onChange(Number.parseFloat(e.target.value))}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="space-y-2">
                <Label>Features</Label>
                <div className="space-y-2 max-h-[200px] overflow-y-auto">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <Input value={feature} disabled className="flex-1 bg-muted" />
                      <Button type="button" variant="ghost" size="icon" onClick={() => removeFeature(index)}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
                <div className="flex gap-2 pt-2 border-t">
                  <Input
                    placeholder="Add new feature"
                    value={newFeature}
                    onChange={(e) => setNewFeature(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault()
                        addFeature()
                      }
                    }}
                  />
                  <Button type="button" variant="outline" onClick={addFeature}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <FormField
                control={form.control}
                name="active"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between border-t pt-4">
                    <FormLabel>Active Status</FormLabel>
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={handleCloseDialog}>
                  Cancel
                </Button>
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
