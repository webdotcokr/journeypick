import * as React from 'react';
import { cn } from '@/lib/utils';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          'flex h-10 w-full rounded px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:cursor-not-allowed disabled:opacity-50',
          className
        )}
        style={{
          border: '1px solid #DDDDDD',
          borderRadius: '8px',
          backgroundColor: 'white',
          color: '#222222'
        }}
        onFocus={(e) => {
          e.target.style.borderColor = '#FF5B00';
          e.target.style.boxShadow = '0 0 0 2px rgba(255, 91, 0, 0.1)';
        }}
        onBlur={(e) => {
          e.target.style.borderColor = '#DDDDDD';
          e.target.style.boxShadow = 'none';
        }}
        ref={ref}
        {...props}
      />
    );
  }
);
Input.displayName = 'Input';

export { Input };