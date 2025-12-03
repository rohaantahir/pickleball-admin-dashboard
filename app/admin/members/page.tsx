"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Switch } from "@/components/ui/switch"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Search, Download, Eye, Edit2, Trash2 } from "lucide-react"
import { mockMembers, type Member } from "@/lib/data/mockData"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { toast } from "sonner"

const memberSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  membershipTier: z.enum(["Rally Pass", "Match Point", "Tour Insider"]),
  region: z.enum(["North", "South", "East", "West", "Central"]),
  status: z.enum(["Active", "Inactive"]),
})

type MemberFormValues = z.infer<typeof memberSchema>

export default function MembersPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [tierFilter, setTierFilter] = useState("all")
  const [statusFilter, setStatusFilter] = useState("all")
  const [regionFilter, setRegionFilter] = useState("all")
  const [currentPage, setCurrentPage] = useState(1)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [selectedMember, setSelectedMember] = useState<Member | null>(null)
  const itemsPerPage = 10

  const form = useForm<MemberFormValues>({
    resolver: zodResolver(memberSchema),
    defaultValues: {
      name: "",
      email: "",
      membershipTier: "Rally Pass",
      region: "North",
      status: "Active",
    },
  })

  const handleEdit = (member: Member) => {
    setSelectedMember(member)
    form.reset({
      name: member.name,
      email: member.email,
      membershipTier: member.membershipTier,
      region: member.region,
      status: member.status,
    })
    setEditDialogOpen(true)
  }

  const handleView = (member: Member) => {
    setSelectedMember(member)
    setViewDialogOpen(true)
  }

  const handleDeleteClick = (member: Member) => {
    setSelectedMember(member)
    setDeleteDialogOpen(true)
  }

  const handleDelete = () => {
    if (selectedMember) {
      toast.success(`${selectedMember.name} has been deleted`)
      setDeleteDialogOpen(false)
      setSelectedMember(null)
    }
  }

  const onSubmit = (data: MemberFormValues) => {
    console.log("Updated member:", { ...selectedMember, ...data })
    toast.success("Member updated successfully!")
    setEditDialogOpen(false)
    form.reset()
  }

  const filteredMembers = mockMembers.filter((member) => {
    const matchesSearch =
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesTier = tierFilter === "all" || member.membershipTier === tierFilter
    const matchesStatus = statusFilter === "all" || member.status === statusFilter
    const matchesRegion = regionFilter === "all" || member.region === regionFilter

    return matchesSearch && matchesTier && matchesStatus && matchesRegion
  })

  const totalPages = Math.ceil(filteredMembers.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedMembers = filteredMembers.slice(startIndex, startIndex + itemsPerPage)

  const getTierColor = (tier: Member["membershipTier"]) => {
    switch (tier) {
      case "Rally Pass":
        return "bg-blue-100 text-blue-800 hover:bg-blue-100"
      case "Match Point":
        return "bg-primary/10 text-primary hover:bg-primary/10"
      case "Tour Insider":
        return "bg-accent/10 text-accent hover:bg-accent/10"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Members Management</h1>
          <p className="text-muted-foreground">Manage all website users and their memberships</p>
        </div>
        <Button className="gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Members ({filteredMembers.length})</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Filters */}
          <div className="flex flex-wrap gap-4">
            <div className="relative flex-1 min-w-[250px]">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Membership Tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="Rally Pass">Rally Pass</SelectItem>
                <SelectItem value="Match Point">Match Point</SelectItem>
                <SelectItem value="Tour Insider">Tour Insider</SelectItem>
              </SelectContent>
            </Select>
            <Select value={regionFilter} onValueChange={setRegionFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Region" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Regions</SelectItem>
                <SelectItem value="North">North</SelectItem>
                <SelectItem value="South">South</SelectItem>
                <SelectItem value="East">East</SelectItem>
                <SelectItem value="West">West</SelectItem>
                <SelectItem value="Central">Central</SelectItem>
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Member</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Membership Tier</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Region</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedMembers.map((member) => (
                  <TableRow key={member.id}>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="h-9 w-9">
                          <AvatarImage src={member.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{member.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">{member.name}</span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.email}</TableCell>
                    <TableCell>
                      <Badge variant="secondary" className={getTierColor(member.membershipTier)}>
                        {member.membershipTier}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-muted-foreground">{member.joinDate}</TableCell>
                    <TableCell>{member.region}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Switch checked={member.status === "Active"} />
                        <span className={member.status === "Active" ? "text-success" : "text-muted-foreground"}>
                          {member.status}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="ghost" size="icon" onClick={() => handleView(member)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button variant="ghost" size="icon" onClick={() => handleEdit(member)}>
                          <Edit2 className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => handleDeleteClick(member)}
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

          {/* Pagination */}
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredMembers.length)} of{" "}
              {filteredMembers.length} members
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* View Member Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Member Details</DialogTitle>
          </DialogHeader>
          {selectedMember && (
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <Avatar className="h-16 w-16">
                  <AvatarImage src={selectedMember.avatar || "/placeholder.svg"} />
                  <AvatarFallback>{selectedMember.name[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="text-lg font-semibold">{selectedMember.name}</h3>
                  <p className="text-sm text-muted-foreground">{selectedMember.email}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Membership Tier</p>
                  <Badge className={getTierColor(selectedMember.membershipTier)}>{selectedMember.membershipTier}</Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <Badge variant={selectedMember.status === "Active" ? "default" : "secondary"}>
                    {selectedMember.status}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Region</p>
                  <p className="font-medium">{selectedMember.region}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Join Date</p>
                  <p className="font-medium">{selectedMember.joinDate}</p>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setViewDialogOpen(false)}>
                  Close
                </Button>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Member Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Edit Member</DialogTitle>
          </DialogHeader>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="membershipTier"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Membership Tier</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select tier" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Rally Pass">Rally Pass</SelectItem>
                        <SelectItem value="Match Point">Match Point</SelectItem>
                        <SelectItem value="Tour Insider">Tour Insider</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="region"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Region</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select region" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="North">North</SelectItem>
                        <SelectItem value="South">South</SelectItem>
                        <SelectItem value="East">East</SelectItem>
                        <SelectItem value="West">West</SelectItem>
                        <SelectItem value="Central">Central</SelectItem>
                      </SelectContent>
                    </Select>
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
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Active">Active</SelectItem>
                        <SelectItem value="Inactive">Inactive</SelectItem>
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
                <Button type="submit">Save Changes</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Member</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete <span className="font-semibold">{selectedMember?.name}</span>? This action
              cannot be undone.
            </p>
            <DialogFooter>
              <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                Delete Member
              </Button>
            </DialogFooter>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
