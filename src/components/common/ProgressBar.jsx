import React from 'react';

export default function ProgressBar({
  value = 0,
  max = 100,
  color = 'brand', // 'brand' | 'warning' | 'danger' | 'success' | 'info'
  size = 'md', // 'sm' | 'md' | 'lg'
  showLabel = false,
  labelLeft,
  labelRight,
  className = '',
}) {
  const percentage = Math.min(Math.max(Math.round((value / max) * 100), 0), 100);

  const colorStyles = {
    brand: 'bg-brand',
    warning: 'bg-warning',
    danger: 'bg-danger',
    success: 'bg-success',
    info: 'bg-info',
  };

  const trackBg = {
    brand: 'bg-brand-light',
    warning: 'bg-warning-light',
    danger: 'bg-danger-light',
    success: 'bg-success-light',
    info: 'bg-info-light',
  };

  const heightStyles = {
    sm: 'h-1.5',
    md: 'h-2.5',
    lg: 'h-4',
  };

  return (
    <div className={`w-full ${className}`}>
      {(showLabel || labelLeft || labelRight) && (
        <div className="flex items-center justify-between text-xs font-medium text-content-secondary mb-1.5">
          <span>{labelLeft || (showLabel ? `${percentage}%` : '')}</span>
          <span>{labelRight || (showLabel ? `${value} / ${max}` : '')}</span>
        </div>
      )}
      <div className={`w-full rounded-full overflow-hidden ${trackBg[color] || 'bg-slate-100'} ${heightStyles[size] || heightStyles.md}`}>
        <div
          className={`${heightStyles[size] || heightStyles.md} rounded-full transition-all duration-500 ease-out ${
            colorStyles[color] || colorStyles.brand
          }`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
