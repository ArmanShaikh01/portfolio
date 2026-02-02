import React from 'react';

interface CardProps {
    children: React.ReactNode;
    className?: string;
}

export function Card({ children, className = '' }: CardProps) {
    return (
        <div className={`bg-white rounded-lg border border-neutral-200 shadow-sm ${className}`}>
            {children}
        </div>
    );
}

export function CardHeader({ children, className = '' }: CardProps) {
    return <div className={`px-6 py-4 border-b border-neutral-200 ${className}`}>{children}</div>;
}

export function CardContent({ children, className = '' }: CardProps) {
    return <div className={`px-6 py-4 ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }: CardProps) {
    return <div className={`px-6 py-4 border-t border-neutral-200 ${className}`}>{children}</div>;
}
