import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserPlus, Edit2, Trash2 } from "lucide-react";
import { mockTeamMembers, type TeamMember } from "@/data/mockData";

export default function Team() {
  const [roleFilter, setRoleFilter] = useState("all");
  const [teamMembers] = useState(mockTeamMembers);

  const filteredTeam = teamMembers.filter(member => 
    roleFilter === "all" || member.role === roleFilter
  );

  const getRoleColor = (role: TeamMember['role']) => {
    switch (role) {
      case 'Super Admin': return 'bg-destructive/10 text-destructive hover:bg-destructive/10';
      case 'Admin': return 'bg-primary/10 text-primary hover:bg-primary/10';
      case 'Content Manager': return 'bg-accent/10 text-accent hover:bg-accent/10';
      case 'Moderator': return 'bg-success/10 text-success hover:bg-success/10';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Team & Roles</h1>
          <p className="text-muted-foreground">Manage internal admin users and their permissions</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <UserPlus className="h-4 w-4" />
              Add Team Member
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Team Member</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" placeholder="Enter full name" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" type="email" placeholder="email@pickleball.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Select defaultValue="Moderator">
                  <SelectTrigger id="role">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Super Admin">Super Admin</SelectItem>
                    <SelectItem value="Admin">Admin</SelectItem>
                    <SelectItem value="Content Manager">Content Manager</SelectItem>
                    <SelectItem value="Moderator">Moderator</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <Button className="w-full">Add Team Member</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Team Members ({filteredTeam.length})</CardTitle>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Filter by role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                <SelectItem value="Super Admin">Super Admin</SelectItem>
                <SelectItem value="Admin">Admin</SelectItem>
                <SelectItem value="Content Manager">Content Manager</SelectItem>
                <SelectItem value="Moderator">Moderator</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Team Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTeam.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10">
                          <AvatarImage src={member.avatar} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getRoleColor(member.role)}>
                        {member.role}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.lastActive}</TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon">
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive"
                          disabled={member.role === 'Super Admin'}
                        >
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

      {/* Role Descriptions */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[
          {
            role: 'Super Admin',
            description: 'Full access to all features and settings',
            permissions: ['All permissions', 'User management', 'System settings'],
            color: 'border-destructive/50',
          },
          {
            role: 'Admin',
            description: 'Manage members, content, and reports',
            permissions: ['Member management', 'Content editing', 'View analytics'],
            color: 'border-primary/50',
          },
          {
            role: 'Content Manager',
            description: 'Create and edit content',
            permissions: ['Add/edit matches', 'Upload recaps', 'Moderate content'],
            color: 'border-accent/50',
          },
          {
            role: 'Moderator',
            description: 'Monitor and moderate user activity',
            permissions: ['View members', 'Moderate comments', 'Basic reports'],
            color: 'border-success/50',
          },
        ].map((item) => (
          <Card key={item.role} className={`border-2 ${item.color}`}>
            <CardHeader>
              <CardTitle className="text-base">{item.role}</CardTitle>
              <p className="text-sm text-muted-foreground">{item.description}</p>
            </CardHeader>
            <CardContent>
              <div className="space-y-1">
                {item.permissions.map((perm, i) => (
                  <div key={i} className="text-sm flex items-center gap-2">
                    <div className="h-1.5 w-1.5 rounded-full bg-primary" />
                    {perm}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
