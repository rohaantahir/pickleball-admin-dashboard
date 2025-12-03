import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import { Plus, Edit2, Trash2, Eye, Clock } from "lucide-react";
import { mockGameRecaps, type GameRecap } from "@/data/mockData";
import { toast } from "sonner";

const recapSchema = z.object({
  title: z.string().min(1, "Title is required").max(100, "Title must be less than 100 characters"),
  thumbnail: z.string().url("Must be a valid URL"),
  duration: z.string().min(1, "Duration is required"),
  description: z.string().min(1, "Description is required").max(500, "Description must be less than 500 characters"),
});

type RecapFormData = z.infer<typeof recapSchema>;

export default function ContentRecaps() {
  const [recaps, setRecaps] = useState<GameRecap[]>(mockGameRecaps);
  const [editingRecap, setEditingRecap] = useState<GameRecap | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAddMode, setIsAddMode] = useState(false);
  const [deleteRecap, setDeleteRecap] = useState<GameRecap | null>(null);

  const form = useForm<RecapFormData>({
    resolver: zodResolver(recapSchema),
    defaultValues: {
      title: "",
      thumbnail: "",
      duration: "",
      description: "",
    },
  });

  const handleAdd = () => {
    setIsAddMode(true);
    setEditingRecap(null);
    form.reset({
      title: "",
      thumbnail: "",
      duration: "",
      description: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (recap: GameRecap) => {
    setIsAddMode(false);
    setEditingRecap(recap);
    form.reset({
      title: recap.title,
      thumbnail: recap.thumbnail,
      duration: recap.duration,
      description: recap.description,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (recap: GameRecap) => {
    setDeleteRecap(recap);
  };

  const confirmDelete = () => {
    if (deleteRecap) {
      setRecaps(recaps.filter(r => r.id !== deleteRecap.id));
      toast.success("Recap deleted successfully");
      setDeleteRecap(null);
    }
  };

  const onSubmit = (data: RecapFormData) => {
    if (isAddMode) {
      const newRecap: GameRecap = {
        id: `recap-${Date.now()}`,
        title: data.title,
        thumbnail: data.thumbnail,
        duration: data.duration,
        description: data.description,
        views: 0,
        uploadDate: new Date().toISOString().split('T')[0],
      };
      setRecaps([newRecap, ...recaps]);
      toast.success("Recap added successfully");
    } else if (editingRecap) {
      setRecaps(recaps.map(recap =>
        recap.id === editingRecap.id
          ? { ...recap, ...data }
          : recap
      ));
      toast.success("Recap updated successfully");
    }
    setIsDialogOpen(false);
    setEditingRecap(null);
    form.reset();
  };

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
            {recaps.map((recap) => (
              <Card key={recap.id} className="overflow-hidden transition-all hover:shadow-purple">
                <div className="relative aspect-video bg-muted">
                  <img 
                    src={recap.thumbnail} 
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
                  <p className="text-sm text-muted-foreground line-clamp-2">
                    {recap.description}
                  </p>
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
                    <Button variant="outline" size="sm" className="flex-1" onClick={() => handleEdit(recap)}>
                      <Edit2 className="h-4 w-4 mr-2" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-destructive hover:text-destructive"
                      onClick={() => handleDelete(recap)}
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
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Recaps
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recaps.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Views
            </CardTitle>
            <Eye className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recaps.reduce((sum, recap) => sum + recap.views, 0).toLocaleString()}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Views
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {recaps.length > 0 
                ? Math.round(recaps.reduce((sum, recap) => sum + recap.views, 0) / recaps.length).toLocaleString()
                : 0}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{isAddMode ? "Add New Game Recap" : "Edit Game Recap"}</DialogTitle>
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
                      <Textarea placeholder="Brief description of the recap..." rows={3} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="flex gap-2 pt-4">
                <Button type="button" variant="outline" className="flex-1" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  {isAddMode ? "Add Recap" : "Save Changes"}
                </Button>
              </div>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <AlertDialog open={!!deleteRecap} onOpenChange={() => setDeleteRecap(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Game Recap</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteRecap?.title}"? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
