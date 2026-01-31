import React from 'react';
import { cn } from '@/lib/utils';

interface GlassButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    size?: 'sm' | 'default' | 'lg' | 'icon';
    contentClassName?: string;
}

export const GlassButton: React.FC<GlassButtonProps> = ({
    children,
    size = 'default',
    className,
    contentClassName,
    ...props
}) => {
    const sizeClasses = {
        sm: 'px-4 py-2 text-sm',
        default: 'px-6 py-3 text-base',
        lg: 'px-8 py-4 text-lg',
        icon: 'p-3',
    };

    return (
        <button
            className={cn(
                // Base styles
                'group relative cursor-pointer overflow-hidden rounded-xl',
                'transition-all duration-300 ease-out',
                // Border and background
                'border border-white/20',
                'bg-white/5 backdrop-blur-xl',
                // Shadow
                'shadow-[0_8px_32px_rgba(0,0,0,0.3)]',
                // Hover effects
                'hover:border-amber-500/40 hover:bg-white/10',
                'hover:shadow-[0_8px_32px_rgba(217,119,6,0.2),0_0_20px_rgba(217,119,6,0.15)]',
                'hover:scale-[1.02]',
                // Active state
                'active:scale-[0.98]',
                // Focus
                'focus:outline-none focus:ring-2 focus:ring-amber-500/50 focus:ring-offset-2 focus:ring-offset-transparent',
                className
            )}
            {...props}
        >
            {/* Glass shine effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/10 via-transparent to-transparent opacity-50" />

            {/* Top highlight */}
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent" />

            {/* Hover glow overlay */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/5 to-amber-500/0 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

            {/* Content */}
            <div
                className={cn(
                    'relative z-10 font-medium text-white',
                    'transition-transform duration-300 group-hover:translate-x-0.5',
                    sizeClasses[size],
                    contentClassName
                )}
            >
                {children}
            </div>
        </button>
    );
};

export default GlassButton;
