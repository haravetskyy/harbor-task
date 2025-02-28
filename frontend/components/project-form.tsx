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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Label } from '@radix-ui/react-dropdown-menu';
import { Plus } from 'lucide-react';
import React from 'react';
import { ColorInput } from './ui/color-input';
import { Input } from './ui/input';

export function ProjectForm() {
  const [color, setColor] = React.useState('#0f0f0f');

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Plus />
          Add project
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add project</DialogTitle>
        </DialogHeader>
        <Label>Name</Label>
        <Input type="text" />

        <Label>Emoji</Label>
        <Select>
          <SelectTrigger>
            <SelectValue placeholder="Select emoji" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="tools">Tools 🛠️</SelectItem>
              <SelectItem value="laptop">Laptop 💻</SelectItem>
              <SelectItem value="camera">Camera 📷</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Label>Color</Label>
        <ColorInput
          onChange={value => {
            setColor(value);
          }}
          value={color}
        />

        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
