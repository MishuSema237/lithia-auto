"use client";

import React from 'react';
import { cn } from '@/lib/utils'; // We'll create a simple tailwind merge utility next
import { motion } from 'framer-motion';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'navy' | 'gold';
    size?: 'sm' | 'md' | 'lg';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'md', isLoading, children, disabled, ...props }, ref) => {

        const baseStyles = "inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-none";

        const variants = {
            primary: "bg-navy-600 text-light-50 hover:bg-navy-700 focus:ring-navy-600 border border-navy-700",
            secondary: "bg-gold-500 text-light-50 hover:bg-gold-600 focus:ring-gold-500 border border-gold-600",
            outline: "bg-transparent text-navy-600 border border-navy-600 hover:bg-navy-50 focus:ring-navy-600",
            ghost: "bg-transparent text-navy-600 hover:bg-light-200 focus:ring-navy-600 border border-transparent",
            danger: "bg-darkred-600 text-light-50 hover:bg-darkred-700 focus:ring-darkred-600 border border-darkred-700",
            navy: "bg-navy-900 text-gold-400 hover:bg-navy-800 focus:ring-navy-900 border border-navy-900",
            gold: "bg-gold-500 text-navy-900 hover:bg-gold-600 focus:ring-gold-500 border border-gold-600",
        };

        const sizes = {
            sm: "h-9 px-3 text-sm",
            md: "h-11 px-6 text-base",
            lg: "h-14 px-8 text-lg",
        };

        return (
            <button
                ref={ref}
                className={cn(baseStyles, variants[variant], sizes[size], className)}
                disabled={disabled || isLoading}
                {...props}
            >
                {isLoading ? (
                    <span className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                ) : null}
                {children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
