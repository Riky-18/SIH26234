import React from 'react';

export default function AlertCard({
  accentColor = 'brand', // 'brand' | 'warning' | 'danger' | 'info' | 'success'
  title,
  subtitle,
  meta = [],
  badge,
  actions = [],
  children,
  className = '',
}) {
  const accentBorderMap = {
    brand: 'border-l-brand',
    warning: 'border-l-warning',
    danger: 'border-l-danger',
    info: 'border-l-info',
    success: 'border-l-success',
  };

  const accentBgTint = {
    brand: 'hover:bg-brand-light/30',
    warning: 'hover:bg-warning-light/30',
    danger: 'hover:bg-danger-light/30',
    info: 'hover:bg-info-light/30',
    success: 'hover:bg-success-light/30',
  };

  return (
    <div
      className={`bg-surface rounded-card p-5 shadow-soft border border-divider/60 border-l-[5px] ${
        accentBorderMap[accentColor] || accentBorderMap.brand
      } transition-all duration-200 ${accentBgTint[accentColor] || ''} ${className}`}
    >
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 flex-wrap">
            <h4 className="font-semibold text-content-primary text-base">{title}</h4>
            {badge && <span>{badge}</span>}
          </div>
          
          {subtitle && (
            <p className="text-sm text-content-secondary mt-1">{subtitle}</p>
          )}

          {meta.length > 0 && (
            <div className="flex flex-wrap items-center gap-y-1.5 gap-x-4 mt-2.5 text-xs text-content-secondary">
              {meta.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5 font-medium">
                  {item.icon && <item.icon className="w-3.5 h-3.5 text-content-muted" />}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          )}

          {children && <div className="mt-3">{children}</div>}
        </div>

        {actions.length > 0 && (
          <div className="flex items-center gap-2 mt-2 sm:mt-0 flex-shrink-0">
            {actions}
          </div>
        )}
      </div>
    </div>
  );
}
