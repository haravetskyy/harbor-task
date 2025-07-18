'use client';

import { cn } from '@/lib';
import * as TooltipPrimitive from '@radix-ui/react-tooltip';
import * as React from 'react';

interface TooltipComponent
  extends React.ForwardRefExoticComponent<
    React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Root> &
    React.RefAttributes<HTMLDivElement>
  > {
  Provider: typeof TooltipProvider;
  Trigger: typeof TooltipTrigger;
  Content: typeof TooltipContent;
}

const TooltipProvider = TooltipPrimitive.Provider;

const Tooltip = TooltipPrimitive.Root as TooltipComponent;

const TooltipTrigger = TooltipPrimitive.Trigger;

const TooltipContent = React.forwardRef<
  React.ElementRef<typeof TooltipPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TooltipPrimitive.Content>
>(({ className, sideOffset = 4, ...props }, ref) => (
  <TooltipPrimitive.Portal>
    <TooltipPrimitive.Content
      ref={ref}
      sideOffset={sideOffset}
      className={cn(
        'animate-in fade-in-0 zoom-in-95 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 z-50 overflow-hidden rounded-md bg-neutral-900 px-3 py-1.5 text-xs text-neutral-50 dark:bg-neutral-50 dark:text-neutral-900',
        className,
      )}
      {...props}
    />
  </TooltipPrimitive.Portal>
));
TooltipContent.displayName = TooltipPrimitive.Content.displayName;

Tooltip.Provider = TooltipProvider;
Tooltip.Trigger = TooltipTrigger;
Tooltip.Content = TooltipContent;

export { Tooltip, TooltipProvider, type TooltipComponent };
