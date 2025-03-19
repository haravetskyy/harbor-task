import { cn } from '@/lib/utils';
import * as React from 'react';
import TextareaAutosize from 'react-textarea-autosize';

interface TextareaProps extends React.ComponentProps<'textarea'> {
  autoSize?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, autoSize = false, value, onChange, style, ...props }, ref) => {
    const Textarea = autoSize ? TextareaAutosize : 'textarea';

    return (
      <Textarea
        className={cn(
          'flex min-h-[60px] w-full rounded-md border border-neutral-200 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-neutral-500 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-neutral-950 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm dark:border-neutral-800 dark:placeholder:text-neutral-400 dark:focus-visible:ring-neutral-300',
          className,
        )}
        ref={ref}
        style={
          style
            ? { height: typeof style.height === 'number' ? style.height : undefined }
            : undefined
        }
        {...props}
      />
    );
  },
);
Textarea.displayName = 'Textarea';

export { Textarea };
