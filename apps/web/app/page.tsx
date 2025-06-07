import { AppSidebar } from '@/components/app-sidebar';
import ThemeToggle from '@/components/theme-toggle';
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { Separator } from '@radix-ui/react-separator';
import { RecourcePath } from '../components/recource-path';
import TaskList from '../components/task-list';

export default function Home() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 px-4 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />

            <Separator orientation="vertical" className="mr-2 h-4" />

            <RecourcePath />
          </div>
          <ThemeToggle />
        </header>
        <main className="flex flex-col items-center px-4 pb-4">
          <TaskList />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
