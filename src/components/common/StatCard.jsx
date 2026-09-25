import React from 'react';
import { ArrowUpRight, ArrowDownRight, Minus } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line } from 'recharts';

export default function StatCard({
  icon: Icon,
  iconColor = 'brand', // 'brand' | 'warning' | 'danger' | 'info' | 'success'
  label,
  value,
  trend,
  trendDirection, // 'up' | 'down' | 'neutral'
  trendPositive = true, // is 'up' considered good or bad? e.g. waste down is good
  sparklineData,
  sparklineKey = 'waste',
  subtitle,
  onClick,
  badge,
  className = '',
}) {
  const iconBgStyles = {
    brand: 'bg-brand-light text-brand',
    warning: 'bg-warning-light text-warning',
    danger: 'bg-danger-light text-danger',
    info: 'bg-info-light text-info',
    success: 'bg-success-light text-success',
  };

  const isClickable = Boolean(onClick);

  // Determine trend color
  let trendColor = 'text-content-secondary bg-slate-100';
  if (trendDirection === 'up') {
    trendColor = trendPositive ? 'text-success bg-success-light' : 'text-danger bg-danger-light';
  } else if (trendDirection === 'down') {
    trendColor = trendPositive ? 'text-success bg-success-light' : 'text-danger bg-danger-light';
  }

  return (
    <div
      onClick={onClick}
      className={`bg-surface rounded-card p-5 shadow-soft border border-divider/60 transition-all duration-200 ${
        isClickable ? 'cursor-pointer hover:shadow-soft-lg hover:border-brand/40 hover:-translate-y-0.5' : ''
      } ${className}`}
    >
      <div className="flex items-start justify-between">
        <div className={`w-11 h-11 rounded-full flex items-center justify-center ${iconBgStyles[iconColor] || iconBgStyles.brand}`}>
          {Icon && <Icon className="w-5 h-5" />}
        </div>
        
        {badge && (
          <div>{badge}</div>
        )}

        {trend && !badge && (
          <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full ${trendColor}`}>
            {trendDirection === 'up' && <ArrowUpRight className="w-3.5 h-3.5" />}
            {trendDirection === 'down' && <ArrowDownRight className="w-3.5 h-3.5" />}
            {trendDirection === 'neutral' && <Minus className="w-3.5 h-3.5" />}
            <span>{trend}</span>
          </div>
        )}
      </div>

      <div className="mt-4">
        <p className="text-xs font-medium text-content-secondary uppercase tracking-wider">{label}</p>
        <div className="flex items-baseline justify-between mt-1">
          <h3 className="text-2xl md:text-3xl font-bold text-content-primary tracking-tight">{value}</h3>
        </div>
        {subtitle && (
          <p className="text-xs text-content-secondary mt-1">{subtitle}</p>
        )}
      </div>

      {sparklineData && sparklineData.length > 0 && (
        <div className="mt-3 h-10 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={sparklineData}>
              <Line
                type="monotone"
                dataKey={sparklineKey}
                stroke="#2E6F5E"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  );
}
