import React from 'react';

export default function StatusPill({
  text,
  level = 'neutral',
  size = 'md',
  dot = false,
  className = '',
}) {
  const levelStyles = {
    success: 'bg-success-light text-success border border-success/20',
    warning: 'bg-warning-light text-warning border border-warning/25',
    danger: 'bg-danger-light text-danger border border-danger/25',
    info: 'bg-info-light text-info border border-info/20',
    neutral: 'bg-slate-100 text-content-secondary border border-slate-200',
    brand: 'bg-brand-light text-brand border border-brand/20',
  };

  const dotColors = {
    success: 'bg-success',
    warning: 'bg-warning',
    danger: 'bg-danger',
    info: 'bg-info',
    neutral: 'bg-content-muted',
    brand: 'bg-brand',
  };

  const sizeStyles = {
    sm: 'text-[11px] px-2 py-0.5 font-medium',
    md: 'text-xs px-2.5 py-1 font-medium',
    lg: 'text-sm px-3.5 py-1.5 font-semibold',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full ${sizeStyles[size] || sizeStyles.md} ${levelStyles[level] || levelStyles.neutral} ${className}`}
    >
      {dot && <span className={`w-1.5 h-1.5 rounded-full ${dotColors[level] || 'bg-current'}`} />}
      {text}
    </span>
  );
}
