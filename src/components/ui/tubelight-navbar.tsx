import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon, Sparkles, Briefcase, ScanLine, UserPlus, LayoutDashboard, Calendar, PenLine, Bot, DollarSign, HelpCircle, Mail } from "lucide-react"
import { cn } from "@/lib/utils"
import { Menu, MenuItem, MenuLink, MenuSection } from "./navbar-menu"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

// Group definitions for dropdown menus
const menuGroups = {
  platform: {
    label: "Platform",
    icon: Sparkles,
    items: [
      { name: "Features", url: "#features", icon: Sparkles },
    ]
  },
  solutions: {
    label: "Solutions",
    icon: Briefcase,
    items: [
      { name: "Use Cases", url: "#use-cases", icon: Briefcase },
      { name: "Lead Capture", url: "#lead-capture", icon: ScanLine },
      { name: "Enrichment", url: "#profile-enrichment", icon: UserPlus },
      { name: "Dashboard", url: "#dashboard", icon: LayoutDashboard },
      { name: "Bookings", url: "#bookings-meeting", icon: Calendar },
      { name: "Email Draft", url: "#email-draft", icon: PenLine },
      { name: "AI Agents", url: "#agents", icon: Bot },
    ]
  }
}

// Direct links (not in dropdowns)
const directLinks = [
  { name: "Pricing", url: "#pricing", icon: DollarSign },
  { name: "FAQ", url: "#faq", icon: HelpCircle },
  { name: "Contact", url: "#contact", icon: Mail },
]

// Determine which nav element is currently active based on activeTab
type ActiveNavElement = "Platform" | "Solutions" | "Pricing" | "FAQ" | "Contact" | null

function getActiveNavElement(activeTab: string): ActiveNavElement {
  // Check if activeTab is in Platform group
  if (menuGroups.platform.items.some(item => item.name === activeTab)) {
    return "Platform"
  }
  // Check if activeTab is in Solutions group
  if (menuGroups.solutions.items.some(item => item.name === activeTab)) {
    return "Solutions"
  }
  // Check direct links
  if (directLinks.some(item => item.name === activeTab)) {
    return activeTab as ActiveNavElement
  }
  return null
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0]?.name || "")
  const [activeMenu, setActiveMenu] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Intersection Observer to update active tab on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const sectionId = entry.target.id
            const matchingItem = items.find(
              (item) => item.url === `#${sectionId}`
            )
            if (matchingItem) {
              setActiveTab(matchingItem.name)
            }
          }
        })
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    )

    items.forEach((item) => {
      const sectionId = item.url.replace("#", "")
      const section = document.getElementById(sectionId)
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [items])

  // Handle link click
  const handleLinkClick = (name: string) => {
    setActiveTab(name)
    setActiveMenu(null)
  }

  const activeNavElement = getActiveNavElement(activeTab)

  // Lamp effect component
  const LampEffect = () => (
    <motion.div
      layoutId="navbar-lamp"
      className="absolute inset-0 w-full bg-leadq-amber/5 rounded-full -z-10"
      initial={false}
      transition={{
        type: "spring",
        stiffness: 300,
        damping: 30,
      }}
    >
      <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-leadq-amber rounded-t-full">
        <div className="absolute w-12 h-6 bg-leadq-amber/30 rounded-full blur-md -top-2 -left-2" />
        <div className="absolute w-8 h-6 bg-leadq-amber/30 rounded-full blur-md -top-1" />
        <div className="absolute w-4 h-4 bg-leadq-amber/30 rounded-full blur-sm top-0 left-2" />
      </div>
    </motion.div>
  )

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-[100] pt-6 px-4",
        className
      )}
    >
      {/* Login & Sign Up Buttons */}
      <div className="hidden lg:flex items-center gap-3 fixed top-4 right-4 z-[101]">
        <button className="px-5 py-2.5 text-sm text-white underline underline-offset-4 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Login
        </button>

        <button className="px-6 py-2.5 text-sm rounded-lg font-semibold text-white bg-gradient-to-br from-leadq-amber to-amber-600 hover:from-amber-400 hover:to-amber-500 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/45 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Sign Up
        </button>
      </div>

      <div className="max-w-4xl mx-auto flex items-center justify-center">
        {/* Navigation Items */}
        <div className="flex items-center bg-black/60 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-lg">
          <Menu setActive={setActiveMenu}>
            {/* Platform Dropdown */}
            <div className="relative">
              <MenuItem
                setActive={setActiveMenu}
                active={activeMenu}
                item="Platform"
                icon={menuGroups.platform.icon}
              >
                <MenuSection>
                  {menuGroups.platform.items.map((item) => (
                    <MenuLink
                      key={item.name}
                      href={item.url}
                      icon={item.icon}
                      onClick={() => handleLinkClick(item.name)}
                    >
                      {item.name}
                    </MenuLink>
                  ))}
                </MenuSection>
              </MenuItem>
              {activeNavElement === "Platform" && <LampEffect />}
            </div>

            {/* Solutions Dropdown */}
            <div className="relative">
              <MenuItem
                setActive={setActiveMenu}
                active={activeMenu}
                item="Solutions"
                icon={menuGroups.solutions.icon}
              >
                <div className="flex gap-6">
                  <div className="w-[160px]">
                    <MenuSection>
                      {menuGroups.solutions.items.slice(0, 4).map((item) => (
                        <MenuLink
                          key={item.name}
                          href={item.url}
                          icon={item.icon}
                          onClick={() => handleLinkClick(item.name)}
                        >
                          {item.name}
                        </MenuLink>
                      ))}
                    </MenuSection>
                  </div>
                  <div className="w-[160px]">
                    <MenuSection>
                      {menuGroups.solutions.items.slice(4).map((item) => (
                        <MenuLink
                          key={item.name}
                          href={item.url}
                          icon={item.icon}
                          onClick={() => handleLinkClick(item.name)}
                        >
                          {item.name}
                        </MenuLink>
                      ))}
                    </MenuSection>
                  </div>
                </div>
              </MenuItem>
              {activeNavElement === "Solutions" && <LampEffect />}
            </div>

            {/* Direct Links */}
            {directLinks.map((item) => {
              const Icon = item.icon
              const isActive = activeNavElement === item.name

              return (
                <a
                  key={item.name}
                  href={item.url}
                  onClick={() => handleLinkClick(item.name)}
                  className={cn(
                    "relative cursor-pointer text-sm font-semibold px-4 py-2 rounded-full transition-colors whitespace-nowrap flex items-center gap-2",
                    "text-gray-300 hover:text-leadq-amber",
                    isActive && "text-leadq-amber"
                  )}
                >
                  <Icon size={18} strokeWidth={2} className="hidden md:block" />
                  <span>{item.name}</span>
                  {isActive && <LampEffect />}
                </a>
              )
            })}
          </Menu>
        </div>
      </div>
    </div>
  )
}
