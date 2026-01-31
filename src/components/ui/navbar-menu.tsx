"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { LucideIcon } from "lucide-react";

const transition = {
    type: "spring" as const,
    mass: 0.5,
    damping: 11.5,
    stiffness: 100,
    restDelta: 0.001,
    restSpeed: 0.001,
};

export const MenuItem = ({
    setActive,
    active,
    item,
    icon: Icon,
    children,
    wideDropdown = false,
}: {
    setActive: (item: string | null) => void;
    active: string | null;
    item: string;
    icon?: LucideIcon;
    children?: React.ReactNode;
    wideDropdown?: boolean;
}) => {
    return (
        <div
            onMouseEnter={() => setActive(item)}
            onMouseLeave={() => setActive(null)}
            className="relative"
        >
            <motion.div
                transition={{ duration: 0.3 }}
                className="cursor-pointer text-gray-300 hover:text-leadq-amber flex items-center gap-2 px-4 py-2 text-sm font-semibold"
            >
                {Icon && <Icon size={18} strokeWidth={2} />}
                <span>{item}</span>
            </motion.div>
            <AnimatePresence>
                {active === item && children && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        transition={transition}
                        className={`absolute top-[calc(100%_+_0.5rem)] z-50 ${wideDropdown
                            ? "left-0"
                            : "left-1/2 transform -translate-x-1/2"
                            }`}
                    >
                        <div className="bg-black backdrop-blur-xl rounded-2xl border border-white/10 shadow-2xl shadow-black/50 p-4">
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export const Menu = ({
    setActive,
    children,
}: {
    setActive: (item: string | null) => void;
    children: React.ReactNode;
}) => {
    return (
        <nav
            onMouseLeave={() => setActive(null)}
            className="relative flex items-center"
        >
            {children}
        </nav>
    );
};

export const MenuLink = ({
    href,
    icon: Icon,
    children,
    onClick,
}: {
    href: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    onClick?: () => void;
}) => {
    return (
        <a
            href={href}
            onClick={onClick}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-300 hover:text-white hover:bg-white/10 transition-all group"
        >
            {Icon && (
                <div className="w-7 h-7 rounded-md bg-leadq-amber/10 flex items-center justify-center group-hover:bg-leadq-amber/20 transition-colors flex-shrink-0">
                    <Icon size={14} className="text-leadq-amber" />
                </div>
            )}
            <span className="text-sm font-medium">{children}</span>
        </a>
    );
};

export const MenuSection = ({
    title,
    children,
}: {
    title?: string;
    children: React.ReactNode;
}) => {
    return (
        <div>
            {title && (
                <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2 px-3">
                    {title}
                </p>
            )}
            <div className="flex flex-col gap-0.5">{children}</div>
        </div>
    );
};
