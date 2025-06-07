'use client';

import { Collapsible, CollapsibleTrigger } from '@/components/ui/collapsible';
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';
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

export function NavMain() {
  const { setSelectedFilter } = useFilter();

  return (
    <SidebarGroup>
      <SidebarMenu>
        <Searcher />
        {items.map(item => (
          <Collapsible key={item.title} asChild className="group/collapsible">
            <SidebarMenuItem>
              <CollapsibleTrigger asChild>
                <SidebarMenuButton
                  tooltip={item.title}
                  onClick={() => {
                    setSelectedFilter({ type: 'section', value: item.title });
                  }}>
                  {item.icon && <item.icon />}
                  <span>{item.title}</span>
                </SidebarMenuButton>
              </CollapsibleTrigger>
            </SidebarMenuItem>
          </Collapsible>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
