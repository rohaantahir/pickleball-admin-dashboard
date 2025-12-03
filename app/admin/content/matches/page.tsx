"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Edit2, Trash2, Circle } from "lucide-react"
import { mockLiveMatches, type LiveMatch } from "@/lib/data/mockData"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const matchSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  player1: z.string().min(2, "Player 1 name is required"),
  player2: z.string().min(2, "Player 2 name is required"),
  court: z.string().min(1, "Court is required"),
  scheduledTime: z.string().min(1, "Scheduled time is required"),
  status: z.enum(["Live", "Upcoming", "Completed"]),
})

type MatchFormValues = z.infer<typeof matchSchema>

export default function ContentMatchesPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [selectedMatch, setSelectedMatch] = useState<LiveMatch | null>(null)

  const form = useForm<MatchFormValues>({
    resolver: zodResolver(matchSchema),
    defaultValues: {
      title: "",
      player1: "",
      player2: "",
      court: "",
      scheduledTime: "",
      status: "Upcoming",
    },
  })

  const handleEdit = (match: LiveMatch) => {
    setSelectedMatch(match)
    form.reset({
      title: match.title,
      player1: match.player1,
      player2: match.player2,
      court: match.court,
      scheduledTime: match.scheduledTime.slice(0, 16),
      status: match.status,
    })
    setEditDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedMatch(null)
    form.reset()
    setEditDialogOpen(true)
  }

  const onSubmit = (data: MatchFormValues) => {
    console.log(selectedMatch ? "Updated match:" : "New match:", data)
    toast.success(selectedMatch ? "Match updated successfully!" : "Match created successfully!")
    setEditDialogOpen(false)
    form.reset()
  }

  const getStatusColor = (status: LiveMatch["status"]) => {
    switch (status) {
      case "Live":
        return "bg-destructive text-destructive-foreground hover:bg-destructive"
      case "Upcoming":
        return "bg-primary/10 text-primary hover:bg-primary/10"
      case "Completed":
        return "bg-muted text-muted-foreground hover:bg-muted"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Matches</h1>
          <p className="text-muted-foreground">Manage live and scheduled match broadcasts</p>
        </div>
        <Button className="gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Add New Match
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Matches</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Match Name</TableHead>
                  <TableHead>Players</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Scheduled Time</TableHead>
                  <TableHead>Court</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockLiveMatches.map((match) => (
                  <TableRow key={match.id}>
                    <TableCell className="font-medium">{match.title}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="text-sm">{match.player1}</div>
                        <div className="text-xs text-muted-foreground">vs</div>
                        <div className="text-sm">{match.player2}</div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={`gap-1 ${getStatusColor(match.status)}`}>
                        {match.status === "Live" && <Circle className="h-2 w-2 fill-current animate-pulse" />}
                        {match.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(match.scheduledTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{match.court}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(match)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Live Matches</CardTitle>
            <Circle className="h-4 w-4 text-destructive fill-current animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLiveMatches.filter((m) => m.status === "Live").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Upcoming Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLiveMatches.filter((m) => m.status === "Upcoming").length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completed Matches</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockLiveMatches.filter((m) => m.status === "Completed").length}</div>
          </CardContent>
        </Card>
      </div>

      {/* Edit/Add Match Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedMatch ? "Edit" : "Add New"} Match</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Match Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Championship Finals" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="player1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player 1</FormLabel>
                      <FormControl>
                        <Input placeholder="Player name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="player2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Player 2</FormLabel>
                      <FormControl>
                        <Input placeholder="Player name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="court"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Court</FormLabel>
                    <FormControl>
                      <Input placeholder="Center Court" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="scheduledTime"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Scheduled Time</FormLabel>
                    <FormControl>
                      <Input type="datetime-local" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Live">Live</SelectItem>
                        <SelectItem value="Upcoming">Upcoming</SelectItem>
                        <SelectItem value="Completed">Completed</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{selectedMatch ? "Save Changes" : "Create Match"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
