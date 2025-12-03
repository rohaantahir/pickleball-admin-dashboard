import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit2, Trash2, Circle } from "lucide-react";
import { mockLiveMatches, type LiveMatch } from "@/data/mockData";

export default function ContentMatches() {
  const getStatusColor = (status: LiveMatch['status']) => {
    switch (status) {
      case 'Live': return 'bg-destructive text-destructive-foreground hover:bg-destructive';
      case 'Upcoming': return 'bg-primary/10 text-primary hover:bg-primary/10';
      case 'Completed': return 'bg-muted text-muted-foreground hover:bg-muted';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Live Matches</h1>
          <p className="text-muted-foreground">Manage live and scheduled match broadcasts</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              Add New Match
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Match</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="title">Match Title</Label>
                <Input id="title" placeholder="Championship Finals" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="player1">Player 1</Label>
                  <Input id="player1" placeholder="Player name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="player2">Player 2</Label>
                  <Input id="player2" placeholder="Player name" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="court">Court</Label>
                <Input id="court" placeholder="Center Court" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Scheduled Time</Label>
                <Input id="time" type="datetime-local" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue="Upcoming">
                  <SelectTrigger id="status">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Live">Live</SelectItem>
                    <SelectItem value="Upcoming">Upcoming</SelectItem>
                    <SelectItem value="Completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Create Match</Button>
            </div>
          </DialogContent>
        </Dialog>
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
                        {match.status === 'Live' && <Circle className="h-2 w-2 fill-current animate-pulse" />}
                        {match.status}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">
                      {new Date(match.scheduledTime).toLocaleString()}
                    </TableCell>
                    <TableCell>{match.court}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
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
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Live Matches
            </CardTitle>
            <Circle className="h-4 w-4 text-destructive fill-current animate-pulse" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockLiveMatches.filter(m => m.status === 'Live').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Upcoming Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockLiveMatches.filter(m => m.status === 'Upcoming').length}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Completed Matches
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {mockLiveMatches.filter(m => m.status === 'Completed').length}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
