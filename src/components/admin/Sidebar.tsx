import { NavLink } from "@/components/NavLink";
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  Video, 
  UserCog,
  ChevronDown,
  Menu,
  X,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

export function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [contentOpen, setContentOpen] = useState(true);
  const [membersOpen, setMembersOpen] = useState(true);

  const navItems = [
    { 
      to: "/admin", 
      icon: LayoutDashboard, 
      label: "Dashboard",
      end: true
    },
  ];

  const membersSubItems = [
    { to: "/admin/members", label: "All Members" },
    { to: "/admin/membership", label: "Membership Tiers" },
  ];

  const contentSubItems = [
    { to: "/admin/content/matches", label: "Live Matches" },
    { to: "/admin/content/recaps", label: "Game Recaps" },
  ];

  return (
    <aside 
      className={cn(
        "fixed left-0 top-0 z-40 h-screen bg-primary text-primary-foreground transition-all duration-300 flex flex-col",
        collapsed ? "w-16" : "w-64"
      )}
    >
      <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
        {!collapsed && (
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-primary text-lg">
              P
            </div>
            <span className="font-bold text-lg">Pickleball</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="icon"
          onClick={onToggle}
          className="text-primary-foreground hover:bg-sidebar-accent ml-auto"
        >
          {collapsed ? <Menu className="h-5 w-5" /> : <X className="h-5 w-5" />}
        </Button>
      </div>

      <nav className="flex-1 overflow-y-auto p-3 space-y-1">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end={item.end}
            className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              collapsed && "justify-center"
            )}
            activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
          >
            <item.icon className="h-5 w-5 flex-shrink-0" />
            {!collapsed && <span>{item.label}</span>}
          </NavLink>
        ))}

        {/* Members Management Section */}
        <div>
          <button
            onClick={() => setMembersOpen(!membersOpen)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              collapsed && "justify-center"
            )}
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Members</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  membersOpen && "rotate-180"
                )} />
              </>
            )}
          </button>
          {!collapsed && membersOpen && (
            <div className="ml-8 mt-1 space-y-1">
              {membersSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                  activeClassName="text-sidebar-foreground bg-sidebar-accent font-medium"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        {/* Content Management Section */}
        <div>
          <button
            onClick={() => setContentOpen(!contentOpen)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
              collapsed && "justify-center"
            )}
          >
            <Video className="h-5 w-5 flex-shrink-0" />
            {!collapsed && (
              <>
                <span className="flex-1 text-left">Content</span>
                <ChevronDown className={cn(
                  "h-4 w-4 transition-transform",
                  contentOpen && "rotate-180"
                )} />
              </>
            )}
          </button>
          {!collapsed && contentOpen && (
            <div className="ml-8 mt-1 space-y-1">
              {contentSubItems.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className="block px-3 py-2 text-sm text-sidebar-foreground/80 hover:text-sidebar-foreground hover:bg-sidebar-accent rounded-lg transition-colors"
                  activeClassName="text-sidebar-foreground bg-sidebar-accent font-medium"
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          )}
        </div>

        <NavLink
          to="/admin/insights"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center"
          )}
          activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
        >
          <TrendingUp className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Player Insights</span>}
        </NavLink>

        <NavLink
          to="/admin/team"
          className={cn(
            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors",
            collapsed && "justify-center"
          )}
          activeClassName="bg-sidebar-primary text-sidebar-primary-foreground font-medium"
        >
          <UserCog className="h-5 w-5 flex-shrink-0" />
          {!collapsed && <span>Team & Roles</span>}
        </NavLink>
      </nav>
    </aside>
  );
}
