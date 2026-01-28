import React, { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface NavItem {
  name: string
  url: string
  icon: LucideIcon
}

interface NavBarProps {
  items: NavItem[]
  className?: string
}

export function NavBar({ items, className }: NavBarProps) {
  const [activeTab, setActiveTab] = useState(items[0].name)
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

  return (
    <div
      className={cn(
        "fixed top-0 left-0 w-full z-[100] pt-8 px-4",
        className
      )}
    >
      {/* Login & Sign Up Buttons */}
      <div className="hidden lg:flex items-center gap-4 fixed top-6 right-6 z-[101]">
        <button className="px-7 py-3.5 text-base text-white underline underline-offset-4 hover:text-leadq-amber transition-colors rounded-lg focus:outline-none focus:ring-2 focus:ring-leadq-amber focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Login
        </button>

        <button className="px-8 py-3.5 text-base rounded-lg font-semibold text-white underline underline-offset-4 bg-gradient-to-br from-black via-neutral-900 to-amber-600 hover:to-amber-500 shadow-md shadow-amber-500/25 hover:shadow-lg hover:shadow-amber-500/45 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-black whitespace-nowrap">
          Sign Up
        </button>
      </div>

      <div className="max-w-7xl mx-auto flex items-center justify-center">
        {/* Navigation Items */}
        <div className="flex items-center gap-3 bg-black/40 border border-white/10 backdrop-blur-lg py-2 px-2 rounded-full shadow-lg transition-transform hover:scale-[1.02]">
          {items.map((item) => {
            const Icon = item.icon
            const isActive = activeTab === item.name

            return (
              <a
                key={item.name}
                href={item.url}
                onClick={() => setActiveTab(item.name)}
                className={cn(
                  "relative cursor-pointer text-base font-semibold px-6 py-3 rounded-full transition-colors whitespace-nowrap",
                  "text-gray-300 hover:text-leadq-amber",
                  isActive && "bg-white/5 text-leadq-amber"
                )}
              >
                <span className="hidden lg:inline">{item.name}</span>
                <span className="lg:hidden">
                  <Icon size={22} strokeWidth={2.5} />
                </span>

                {isActive && (
                  <motion.div
                    layoutId="lamp"
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
                )}
              </a>
            )
          })}
        </div>
      </div>
    </div>
  )
}
