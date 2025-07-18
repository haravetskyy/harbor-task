import { convertToRGBA, cn } from '@/lib';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const badgeVariants = cva(
  'inline-flex items-center rounded-md border border-neutral-200 px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-neutral-950 focus:ring-offset-2 dark:border-neutral-800 dark:focus:ring-neutral-300',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-neutral-900 text-neutral-50 shadow hover:bg-neutral-900/80 dark:bg-neutral-50 dark:text-neutral-900 dark:hover:bg-neutral-50/80',
        secondary:
          'border-transparent bg-neutral-100 text-neutral-900 hover:bg-neutral-100/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80',
        destructive:
          'border-transparent bg-red-500 text-neutral-50 shadow hover:bg-red-500/80 dark:bg-red-800 dark:text-neutral-50 dark:hover:bg-red-800/80',
        outline: 'text-neutral-950 dark:text-neutral-50',
        circle: 'rounded-[50%] px-1.5 py-1',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
  VariantProps<typeof badgeVariants> {
  color?: string;
}

const Badge = ({ className, variant, color, ...props }: BadgeProps) => {
  return (
    <div
      {...(color && { style: { backgroundColor: convertToRGBA(color, 0.2) } })}
      className={cn(badgeVariants({ variant }), className)}
      {...props}
    />
  );
}

export { Badge, badgeVariants };
