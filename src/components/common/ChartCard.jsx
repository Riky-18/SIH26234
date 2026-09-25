import React from 'react';
import SectionHeader from './SectionHeader';

export default function ChartCard({
  title,
  subtitle,
  icon,
  badge,
  actions,
  children,
  className = '',
  headerClassName = '',
}) {
  return (
    <div className={`bg-surface rounded-card p-5 md:p-6 shadow-soft border border-divider/60 ${className}`}>
      {(title || actions) && (
        <SectionHeader
          title={title}
          subtitle={subtitle}
          icon={icon}
          badge={badge}
          actions={actions}
          className={`mb-4 md:mb-6 ${headerClassName}`}
        />
      )}
      <div className="w-full">
        {children}
      </div>
    </div>
  );
}
