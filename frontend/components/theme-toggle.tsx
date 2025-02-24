'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

import { Button } from '@/components/ui/button';

const ThemeToggle = () => {
  const { setTheme, theme } = useTheme();
  const [icon, setIcon] = React.useState(theme);

  const toggleTheme = () => {
    if (theme === 'light') {
      setTheme('dark');
      setIcon('dark');
    }
    if (theme === 'dark') {
      setTheme('light');
      setIcon('light');
    }
  };

  return (
    <Button variant="outline" size="icon" onClick={toggleTheme}>
      {icon === 'light' ? (
        <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      ) : (
        <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      )}
    </Button>
  );
};

export default ThemeToggle;
