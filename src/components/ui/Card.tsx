"use client";

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    isHoverable?: boolean;
}

export function Card({ className, children, isHoverable = false, ...props }: CardProps) {
    return (
        <div
            className={cn(
                "rounded-none border border-light-300 bg-light-50 overflow-hidden", // Strict thin borders, no shadows
                isHoverable && "transition-colors hover:border-navy-300",
                className
            )}
            {...props}
        >
            {isHoverable ? (
                <motion.div whileHover={{ y: -2 }} transition={{ duration: 0.2 }}>
                    {children}
                </motion.div>
            ) : (
                children
            )}
        </div>
    );
}

export function CardHeader({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("px-6 py-4 border-b border-light-200", className)} {...props}>
            {children}
        </div>
    );
}

export function CardTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
    return (
        <h3 className={cn("text-xl font-bold text-navy-800", className)} {...props}>
            {children}
        </h3>
    );
}

export function CardContent({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("px-6 py-4", className)} {...props}>
            {children}
        </div>
    );
}

export function CardFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
    return (
        <div className={cn("px-6 py-4 border-t border-light-200 bg-light-100 flex items-center", className)} {...props}>
            {children}
        </div>
    );
}
