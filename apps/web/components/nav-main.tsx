'use client';

import { Collapsible } from '@/components/ui/collapsible';
import { Sidebar } from '@/components/ui/sidebar';
import { Calendar1, CalendarDays, House } from 'lucide-react';
import { useFilter } from './contexts/filter-context';
import { Searcher } from './searcher';

const items = [
  {
    title: 'All',
    url: '#',
    icon: House,
  },
  {
    title: 'Today',
    url: '#',
    icon: Calendar1,
  },
  {
    title: 'Upcoming',
    url: '#',
    icon: CalendarDays,
  },
] as const;

const NavMain = () => {
  const { setSelectedFilter } = useFilter();

  return (
    <Sidebar.Group>
      <Sidebar.Menu>
        <Searcher />
        {items.map(item => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <Sidebar.MenuItem>
              <Collapsible.Trigger asChild>
                <Sidebar.MenuButton
                  tooltip={item.title}
                  onClick={() => {
                    setSelectedFilter({ type: 'section', value: item.title });
                  }}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </Sidebar.MenuButton>
              </Collapsible.Trigger>
            </Sidebar.MenuItem>
          </Collapsible>
        ))}
      </Sidebar.Menu>
    </Sidebar.Group>
  );
}

export { NavMain }
