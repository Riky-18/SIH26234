import React from 'react';

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  className = '',
  disabled = false,
  onClick,
  ...props
}) {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-1 select-none disabled:opacity-50 disabled:cursor-not-allowed';
  
  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 rounded-lg gap-1.5',
    md: 'text-sm px-4 py-2.5 rounded-xl gap-2',
    lg: 'text-base px-5 py-3 rounded-xl gap-2.5',
  };

  const variantStyles = {
    primary: 'bg-brand hover:bg-brand-dark text-white shadow-sm hover:shadow focus:ring-brand/40',
    secondary: 'bg-white hover:bg-brand-light text-brand border border-divider hover:border-brand/30 shadow-sm focus:ring-brand/30',
    ghost: 'bg-transparent hover:bg-slate-100 text-content-secondary hover:text-content-primary focus:ring-slate-300',
    danger: 'bg-danger-light hover:bg-danger text-danger hover:text-white border border-danger/20 focus:ring-danger/40',
    success: 'bg-success-light hover:bg-success text-success hover:text-white border border-success/20 focus:ring-success/40',
    info: 'bg-info-light hover:bg-info text-info hover:text-white border border-info/20 focus:ring-info/40',
  };

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size] || sizeStyles.md} ${variantStyles[variant] || variantStyles.primary} ${className}`}
      {...props}
    >
      {Icon && <Icon className={size === 'sm' ? 'w-3.5 h-3.5' : size === 'lg' ? 'w-5 h-5' : 'w-4 h-4'} />}
      {children}
    </button>
  );
}
