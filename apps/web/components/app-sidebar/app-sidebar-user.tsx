'use client';

import { Avatar, DropdownMenu, Sidebar, Skeleton, useSidebar } from '@/components/ui';
import { magichutApi } from '@/config';
import { useUser } from '@/hooks';
import { getInitials } from '@/lib';
import { ChevronsUpDown, LogOut, User } from 'lucide-react';
import { useRouter } from 'next/navigation';

const AppSidebarUser = () => {
  const { isMobile } = useSidebar();
  const { data: user, isLoading } = useUser();

  const router = useRouter();

  const handleSignOut = async () => {
    const response = await magichutApi.post('/auth/signout', {}, {});

    if (response.status >= 200 && response.status < 300) {
      router.push(`${process.env.NEXT_PUBLIC_MAGIC_HUT_URL}/sign-in`);
    }
  };

  if (!user || isLoading) return <AppSidebarUserSkeleton />;

  return (
    <Sidebar.Menu>
      <Sidebar.MenuItem>
        <DropdownMenu>
          <DropdownMenu.Trigger asChild>
            <Sidebar.MenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <Avatar className="h-8 w-8 rounded-lg">
                <Avatar.Image src={user.image} alt={user.name} />
                <Avatar.Fallback className="rounded-lg">{getInitials(user.name)}</Avatar.Fallback>
              </Avatar>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">{user.name}</span>
                <span className="truncate text-xs">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </Sidebar.MenuButton>
          </DropdownMenu.Trigger>
          <DropdownMenu.Content
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? 'bottom' : 'right'}
            align="end"
            sideOffset={4}>
            <DropdownMenu.Label className="p-0 font-normal">
              <div
                className={`${isMobile && 'hidden'
                  } flex items-center gap-2 px-1 py-1.5 text-left text-sm`}>
                <Avatar className="h-8 w-8 rounded-lg">
                  <Avatar.Image src={user.image} alt={user.name} />
                  <Avatar.Fallback className="rounded-lg">{getInitials(user.name)}</Avatar.Fallback>
                </Avatar>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">{user.name}</span>
                  <span className="truncate text-xs">{user.email}</span>
                </div>
              </div>
            </DropdownMenu.Label>
            <DropdownMenu.Separator className={isMobile ? 'hidden' : ''} />
            <DropdownMenu.Group>
              <DropdownMenu.Item>
                <User />
                Account
              </DropdownMenu.Item>
              <DropdownMenu.Item onClick={handleSignOut}>
                <LogOut />
                Sign out
              </DropdownMenu.Item>
            </DropdownMenu.Group>
          </DropdownMenu.Content>
        </DropdownMenu>
      </Sidebar.MenuItem>
    </Sidebar.Menu>
  );
};

const AppSidebarUserSkeleton = () => (
  <div className="flex gap-2 p-2">
    <div>
      <Skeleton className="h-8 w-8 rounded-lg" />
    </div>
    <div className="flex w-full flex-col gap-2">
      <Skeleton className="h-3 w-2/3" />
      <Skeleton className="h-3 w-11/12" />
    </div>
  </div>
);

export { AppSidebarUser };
