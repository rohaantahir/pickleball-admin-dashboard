"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  Users,
  UserCog,
  CreditCard,
  Video,
  FileVideo,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface SidebarProps {
  collapsed: boolean
  onToggle: () => void
}

const menuItems = [
  { icon: LayoutDashboard, label: "Overview", href: "/admin" },
  { icon: Users, label: "Members", href: "/admin/members" },
  { icon: UserCog, label: "Team", href: "/admin/team" },
  { icon: CreditCard, label: "Membership", href: "/admin/membership" },
  { icon: Video, label: "Live Matches", href: "/admin/content/matches" },
  { icon: FileVideo, label: "Game Recaps", href: "/admin/content/recaps" },
  { icon: BarChart3, label: "Insights", href: "/admin/insights" },
]

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const pathname = usePathname()

  return (
    <div
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-card border-r transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between px-4 border-b">
        {!collapsed && <h2 className="text-lg font-bold">Admin Hub</h2>}
        <Button variant="ghost" size="icon" onClick={onToggle} className={cn(!collapsed && "ml-auto")}>
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <nav className="space-y-1 p-2">
        {menuItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <Link key={item.href} href={item.href}>
              <div
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground",
                  collapsed && "justify-center",
                )}
              >
                <item.icon className="h-5 w-5 flex-shrink-0" />
                {!collapsed && <span>{item.label}</span>}
              </div>
            </Link>
          )
        })}
      </nav>
    </div>
  )
}
