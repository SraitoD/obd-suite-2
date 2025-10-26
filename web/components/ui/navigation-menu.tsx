"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import {
  HomeIcon,
  WrenchScrewdriverIcon,
  SignalIcon,
  ClockIcon,
  UserIcon
} from "@heroicons/react/24/outline"

export function MobileNavigationMenu() {
  const pathname = usePathname()

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: HomeIcon },
    { name: "DTC", href: "/dtc", icon: WrenchScrewdriverIcon },
    { name: "Live", href: "/live", icon: SignalIcon },
    { name: "History", href: "/history", icon: ClockIcon },
    { name: "Account", href: "/account", icon: UserIcon },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center flex-1 h-full py-1",
              pathname === item.href ? "text-primary" : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="h-6 w-6" />
            <span className="text-xs">{item.name}</span>
          </Link>
        ))}
      </div>
    </nav>
  )
}
