import React from 'react';
import { cn } from '../../lib/utils';

interface ShimmerButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  shimmerColor?: string;
  shimmerSize?: string;
  borderRadius?: string;
  shimmerDuration?: string;
  background?: string;
  className?: string;
  children: React.ReactNode;
}

export const ShimmerButton: React.FC<ShimmerButtonProps> = ({
  shimmerColor = '#60a5fa',
  shimmerSize = '0.08em',
  shimmerDuration = '2.5s',
  borderRadius = '0.75rem',
  background = '#0f2338',
  className,
  children,
  ...props
}) => {
  return (
    <button
      style={
        {
          '--spread': '90deg',
          '--shimmer-color': shimmerColor,
          '--radius': borderRadius,
          '--speed': shimmerDuration,
          '--cut': shimmerSize,
          '--bg': background,
        } as React.CSSProperties
      }
      className={cn(
        'group relative z-0 flex cursor-pointer items-center justify-center overflow-hidden whitespace-nowrap px-6 py-3 font-semibold text-white transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]',
        className
      )}
      {...props}
    >
      {/* Sparkle container */}
      <div className="absolute inset-0 overflow-visible [container-type:size]">
        {/* Glow */}
        <div className="absolute inset-0 h-[100cqh] animate-spin [animation-duration:3s] [background:conic-gradient(from_0deg_at_50%_50%,var(--shimmer-color)_0deg,transparent_60deg,transparent_300deg,var(--shimmer-color)_360deg)]" />
      </div>

      {/* Backdrop */}
      <div
        className="absolute inset-[1px] rounded-[calc(var(--radius)-1px)] bg-[#0c1c2e] transition-colors duration-200 group-hover:bg-[#11273f]"
      />

      {/* Content */}
      <span className="relative z-10 flex items-center gap-2 text-sm font-semibold text-white">
        {children}
      </span>
    </button>
  );
};
