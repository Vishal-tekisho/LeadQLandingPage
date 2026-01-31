import { useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { LucideIcon, Sparkles, Briefcase, ScanLine, UserPlus, LayoutDashboard, Calendar, PenLine, Bot, DollarSign, HelpCircle, Mail, Menu as MenuIcon, X } from "lucide-react"
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
  solutions: {
    label: "Solutions",
    icon: Briefcase,
    items: [
      { name: "Features", url: "#features", icon: Sparkles },
      { name: "Use Cases", url: "#use-cases", icon: Briefcase },
      { name: "Lead Capture", url: "#lead-capture", icon: ScanLine },
      { name: "Research", url: "#profile-research", icon: UserPlus },
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
type ActiveNavElement = "Solutions" | "Pricing" | "FAQ" | "Contact" | null

function getActiveNavElement(activeTab: string): ActiveNavElement {
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
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

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
    setMobileMenuOpen(false)
  }

  // Toggle mobile menu
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileMenuOpen])

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

  // All navigation items combined for mobile
  const allNavItems = [
    ...menuGroups.solutions.items,
    ...directLinks
  ]

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-[100] pt-4 md:pt-6 px-4",
        className
      )}
    >
      {/* Login & Sign Up Buttons - Desktop */}
      <div className="hidden lg:flex items-center gap-3 fixed top-4 right-4 z-[101]">
        <button className="px-5 py-2.5 text-sm text-white underline underline-offset-4 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Login
        </button>

        <button className="px-6 py-2.5 text-sm rounded-lg font-semibold bg-gradient-to-r from-black to-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:shadow-[0_0_30px_rgba(217,119,6,0.7)] hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Sign Up
        </button>
      </div>

      {/* Mobile Header with Hamburger */}
      <div className="md:hidden flex items-center justify-between">
        <a href="#" className="text-xl font-display font-bold">
          <span className="text-white">Lead</span>
          <span className="text-leadq-amber">Q</span>
          <span className="text-white">.AI</span>
        </a>
        <button
          onClick={toggleMobileMenu}
          className="p-3 text-white hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber"
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 top-16 bg-black/95 backdrop-blur-xl z-[99] overflow-y-auto"
          >
            <div className="px-4 py-6 space-y-2">
              {/* All Navigation Items */}
              {allNavItems.map((item) => {
                const Icon = item.icon
                const isActive = activeTab === item.name
                return (
                  <a
                    key={item.name}
                    href={item.url}
                    onClick={() => handleLinkClick(item.name)}
                    className={cn(
                      "flex items-center gap-4 px-4 py-4 rounded-xl transition-all",
                      isActive
                        ? "bg-leadq-amber/10 text-leadq-amber border border-leadq-amber/30"
                        : "text-gray-300 hover:bg-white/5 hover:text-white"
                    )}
                  >
                    <div className={cn(
                      "w-10 h-10 rounded-lg flex items-center justify-center",
                      isActive ? "bg-leadq-amber/20" : "bg-white/10"
                    )}>
                      <Icon size={20} strokeWidth={2} />
                    </div>
                    <span className="text-base font-medium">{item.name}</span>
                  </a>
                )
              })}

              {/* Mobile Login & Sign Up */}
              <div className="pt-6 mt-6 border-t border-white/10 space-y-3">
                <button className="w-full px-4 py-4 text-white hover:text-leadq-amber hover:bg-white/5 rounded-xl transition-colors text-base font-medium">
                  Login
                </button>
                <button className="w-full px-4 py-4 rounded-xl font-semibold bg-gradient-to-r from-black to-amber-600 text-white shadow-[0_0_20px_rgba(217,119,6,0.5)] hover:shadow-[0_0_30px_rgba(217,119,6,0.7)] hover:scale-105 transition-all text-base">
                  Sign Up
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Desktop Navigation */}
      <div className="hidden md:flex max-w-4xl mx-auto items-center justify-center">
        {/* Navigation Items */}
        <div className="flex items-center bg-black/60 border border-white/10 backdrop-blur-xl py-1.5 px-2 rounded-full shadow-lg">
          <Menu setActive={setActiveMenu}>


            {/* Solutions Dropdown */}
            <div className="relative">
              <MenuItem
                setActive={setActiveMenu}
                active={activeMenu}
                item="Solutions"
                icon={menuGroups.solutions.icon}
                wideDropdown={true}
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
