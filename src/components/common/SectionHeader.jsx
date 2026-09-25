import React from 'react';

export default function SectionHeader({
  title,
  subtitle,
  icon: Icon,
  badge,
  actions,
  className = '',
}) {
  return (
    <div className={`flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 ${className}`}>
      <div>
        <div className="flex items-center gap-2">
          {Icon && <Icon className="w-5 h-5 text-brand" />}
          <h2 className="text-lg md:text-xl font-semibold text-content-primary tracking-tight">
            {title}
          </h2>
          {badge && <span>{badge}</span>}
        </div>
        {subtitle && (
          <p className="text-xs md:text-sm text-content-secondary mt-0.5">{subtitle}</p>
        )}
      </div>

      {actions && (
        <div className="flex items-center gap-2 flex-wrap sm:flex-nowrap">
          {actions}
        </div>
      )}
    </div>
  );
}
