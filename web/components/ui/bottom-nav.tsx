"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Home, Wrench, Activity, Clock, User } from "lucide-react"

export function BottomNav() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: Home },
    { name: "DTC", href: "/dtc", icon: Wrench },
    { name: "Live", href: "/live", icon: Activity },
    { name: "History", href: "/history", icon: Clock },
    { name: "Account", href: "/account", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 pb-4 px-4">
      <div className="mx-auto max-w-md rounded-2xl border bg-white/10 backdrop-blur-lg shadow-lg border-white/20">
        <div className="grid grid-cols-5 gap-1 p-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex flex-col items-center justify-center p-2 rounded-xl transition-all duration-200",
                  isActive
                    ? "bg-white/20 text-primary shadow-inner"
                    : "hover:bg-white/10 text-muted-foreground hover:text-foreground"
                )}
              >
                <item.icon
                  className={cn(
                    "h-5 w-5 mb-1 transition-all duration-200",
                    isActive ? "scale-110" : "scale-100"
                  )}
                />
                <span className="text-xs font-medium">{item.name}</span>
              </Link>
            )
          })}
        </div>
      </div>
    </nav>
  )
}
