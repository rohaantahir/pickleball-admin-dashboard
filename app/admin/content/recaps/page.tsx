"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit2, Trash2, Eye, Clock } from "lucide-react"
import { mockGameRecaps, type GameRecap } from "@/lib/data/mockData"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const recapSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters"),
  thumbnail: z.string().url("Must be a valid URL"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
})

type RecapFormValues = z.infer<typeof recapSchema>

export default function ContentRecapsPage() {
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedRecap, setSelectedRecap] = useState<GameRecap | null>(null)

  const form = useForm<RecapFormValues>({
    resolver: zodResolver(recapSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      duration: "",
      description: "",
    },
  })

  const handleEdit = (recap: GameRecap) => {
    setSelectedRecap(recap)
    form.reset({
      title: recap.title,
      thumbnail: recap.thumbnail,
      duration: recap.duration,
      description: recap.description,
    })
    setEditDialogOpen(true)
  }

  const handleAdd = () => {
    setSelectedRecap(null)
    form.reset()
    setEditDialogOpen(true)
  }

  const handleDeleteClick = (recap: GameRecap) => {
    setSelectedRecap(recap)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (selectedRecap) {
      toast.success(`"${selectedRecap.title}" has been deleted`)
      setDeleteDialogOpen(false)
      setSelectedRecap(null)
    }
  }

  const onSubmit = (data: RecapFormValues) => {
    console.log(selectedRecap ? "Updated recap:" : "New recap:", data)
    toast.success(selectedRecap ? "Recap updated successfully!" : "Recap uploaded successfully!")
    setEditDialogOpen(false)
    form.reset()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Game Recaps</h1>
          <p className="text-muted-foreground">Manage highlight videos and match recaps</p>
        </div>
        <Button className="gap-2" onClick={handleAdd}>
          <Plus className="h-4 w-4" />
          Add New Recap
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Game Recaps</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {mockGameRecaps.map((recap) => (
              <Card key={recap.id} className="overflow-hidden transition-all hover:shadow-purple">
                <div className="relative aspect-video bg-muted">
                  <img
                    src={recap.thumbnail || "/placeholder.svg"}
                    alt={recap.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-xs font-medium flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {recap.duration}
                  </div>
                </div>
                <CardHeader className="space-y-2">
                  <CardTitle className="text-base line-clamp-2">{recap.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{recap.description}</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Eye className="h-4 w-4" />
                      <span>{recap.views.toLocaleString()} views</span>
                    </div>
                    <Badge variant="secondary">{recap.uploadDate}</Badge>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 bg-transparent"
                      onClick={() => handleEdit(recap)}
                    >
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="text-destructive hover:text-destructive bg-transparent"
                      onClick={() => handleDeleteClick(recap)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Recaps</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{mockGameRecaps.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockGameRecaps.reduce((sum, recap) => sum + recap.views, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Average Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {Math.round(
                mockGameRecaps.reduce((sum, recap) => sum + recap.views, 0) / mockGameRecaps.length,
              ).toLocaleString()}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Edit/Add Recap Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{selectedRecap ? "Edit" : "Add New"} Game Recap</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recap Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Incredible Rally at Championship" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="thumbnail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Thumbnail URL</FormLabel>
                    <FormControl>
                      <Input placeholder="https://..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="duration"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Duration</FormLabel>
                    <FormControl>
                      <Input placeholder="10:34" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea placeholder="Brief description of the recap..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setEditDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">{selectedRecap ? "Save Changes" : "Upload Recap"}</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Recap</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-semibold">"{selectedRecap?.title}"</span>? This
              action cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Recap
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
