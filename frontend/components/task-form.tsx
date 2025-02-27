'use client';

import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Label } from '@radix-ui/react-dropdown-menu';
import { IconPlus } from '@tabler/icons-react';
import { addDays, format } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import * as React from 'react';
import { Input, NumberInput } from './ui/input';
import { Textarea } from './ui/textarea';

import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { cn } from '@/lib/utils';

export function TaskForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="link" className="mr-0 mt-2 w-min group">
          <IconPlus className="group-hover:bg-black group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-black rounded-[50%] transition-all duration-300 " />
          Add task
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add task</DialogTitle>
        </DialogHeader>
        <Label>Title</Label>
        <Input type="text" />

        <Label>Description</Label>
        <Textarea />

        <Label>Deadline</Label>
        <DatePickerWithPresets />

        <Label>Priority</Label>
        <NumberInput stepper={1} min={1} max={4} />

        <Label>Progress</Label>
        <NumberInput stepper={25} min={0} max={100} suffix="%" />

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function DatePickerWithPresets() {
  const [date, setDate] = React.useState<Date>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left font-normal',
            !date && 'text-muted-foreground',
          )}>
          <CalendarIcon />
          {date ? format(date, 'PPP') : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <PopoverContent align="start" className="flex w-auto flex-col space-y-2 p-2">
        <Select onValueChange={value => setDate(addDays(new Date(), parseInt(value)))}>
          <SelectTrigger>
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent position="popper">
            <SelectItem value="0">Today</SelectItem>
            <SelectItem value="1">Tomorrow</SelectItem>
            <SelectItem value="3">In 3 days</SelectItem>
            <SelectItem value="7">In a week</SelectItem>
          </SelectContent>
        </Select>
        <div className="rounded-md border">
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </PopoverContent>
    </Popover>
  );
}
