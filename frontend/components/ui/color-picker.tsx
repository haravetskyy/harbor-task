'use client';

import type { ButtonProps } from '@/components/ui/button';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useForwardedRef } from '@/lib/use-forwarded-ref';
import { cn } from '@/lib/utils';
import React, { forwardRef } from 'react';
import { HexColorPicker } from 'react-colorful';
import { Input } from './input';

interface ColorPickerProps {
  value: string;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorPicker = forwardRef<
  HTMLInputElement,
  Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorPickerProps
>(({ disabled, value, onChange, onBlur, name, className, ...props }, forwardedRef) => {
  const ref = useForwardedRef(forwardedRef);
  const [open, setOpen] = React.useState(false);

  const parsedValue = React.useMemo(() => {
    return value || '#FFFFFF';
  }, [value]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <div className="flex">
        <PopoverTrigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className={cn('block rounded-r-none border-r-0', className)}
            name={name}
            onClick={() => {
              setOpen(true);
            }}
            size="icon"
            style={{
              backgroundColor: parsedValue,
            }}
            variant="outline"
          />
        </PopoverTrigger>
        <Input
          maxLength={7}
          onFocus={e => {
            setOpen(true);
            e.preventDefault();
          }}
          onChange={e => {
            onChange(e?.currentTarget?.value);
          }}
          ref={ref}
          value={parsedValue}
          className="rounded-l-none"
        />
      </div>
      <PopoverContent className="w-[250px]">
        <HexColorPicker
          style={{ width: '100%' }}
          className="pb-2"
          color={parsedValue}
          onChange={onChange}
        />
      </PopoverContent>
    </Popover>
  );
});
ColorPicker.displayName = 'ColorPicker';

export { ColorPicker };
