'use client';

import { Searcher } from '@/components/searcher';
import { Collapsible, Sidebar } from '@/components/ui';
import { useFilter } from '@/providers';
import { Calendar1, CalendarDays, House } from 'lucide-react';

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

const AppSidebarMain = () => {
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
};

export { AppSidebarMain };
