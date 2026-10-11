import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export const Card: React.FC<CardProps> = ({ 
  children, 
  className = '', 
  hover = false 
}) => {
  return (
    <div className={`
      bg-white rounded-2xl border-2 border-slate-900 shadow-brutal p-6 transition-all duration-200
      ${hover ? 'hover:-translate-y-1 hover:shadow-brutal-lg cursor-pointer' : ''}
      ${className}
    `}>
      {children}
    </div>
  );
};