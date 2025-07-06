'use client';

import { Button, ButtonProps } from '@/components/ui/button';
import { Popover } from '@/components/ui/popover';
import React from 'react';
import { HexColorPicker } from 'react-colorful';
import { Input } from './input';

type ColorInputProps = {
  value: string;
  ref?: React.Ref<HTMLInputElement>;
  onChange: (value: string) => void;
  onBlur?: () => void;
}

const ColorInput = ({
  disabled,
  value,
  onChange,
  onBlur,
  name,
  className,
  ref,
  ...props
}: Omit<ButtonProps, 'value' | 'onChange' | 'onBlur'> & ColorInputProps) => {
  const [open, setOpen] = React.useState(false);

  const parsedValue = React.useMemo(() => {
    return value || '#FFFFFF';
  }, [value]);

  return (
    <Popover onOpenChange={setOpen} open={open}>
      <div className="flex">
        <Popover.Trigger asChild disabled={disabled} onBlur={onBlur}>
          <Button
            {...props}
            className="block rounded-r-none border-r-0"
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
        </Popover.Trigger>
        <Input
          maxLength={7}
          onFocus={e => {
            setOpen(true);
          }}
          onChange={e => {
            onChange(e?.currentTarget?.value);
          }}
          ref={ref}
          value={parsedValue}
          className="rounded-l-none"
        />
      </div>
      <Popover.Content className="w-[250px]">
        <HexColorPicker
          style={{ width: '100%' }}
          className="pb-2"
          color={parsedValue}
          onChange={onChange}
        />
      </Popover.Content>
    </Popover>
  );
};

ColorInput.displayName = 'ColorInput';

export { ColorInput, type ColorInputProps };
