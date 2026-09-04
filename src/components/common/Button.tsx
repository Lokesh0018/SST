import { type ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'outline' | 'ghost' | 'dark';
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  to?: string;
  onClick?: () => void;
  type?: 'button' | 'submit';
  disabled?: boolean;
  className?: string;
  icon?: ReactNode;
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  href,
  to,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
  icon,
}: ButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-semibold uppercase tracking-wide
    transition-all duration-300
    focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange
    disabled:opacity-50 disabled:cursor-not-allowed
    relative overflow-hidden group
  `;

  const variants = {
    primary: `
      bg-orange text-white
      hover:bg-orange-dark hover:shadow-[0_0_30px_rgba(241,90,36,0.3)]
      active:scale-[0.98]
    `,
    outline: `
      bg-transparent text-charcoal
      border-2 border-charcoal
      hover:bg-charcoal hover:text-ivory
      active:scale-[0.98]
    `,
    ghost: `
      bg-transparent text-charcoal
      hover:text-orange
      active:scale-[0.98]
    `,
    dark: `
      bg-charcoal text-ivory
      hover:bg-charcoal-light
      active:scale-[0.98]
    `,
  };

  const sizes = {
    sm: 'px-4 py-2 text-xs rounded-md',
    md: 'px-6 py-3 text-sm rounded-lg',
    lg: 'px-8 py-4 text-sm rounded-lg',
  };

  const classes = `${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`;

  const content = (
    <>
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon && <span className="transition-transform duration-300 group-hover:translate-x-1">{icon}</span>}
      </span>
      {variant === 'primary' && (
        <span className="absolute inset-0 bg-gradient-to-r from-orange-bright to-orange opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={classes}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} disabled={disabled} className={classes}>
      {content}
    </button>
  );
}
