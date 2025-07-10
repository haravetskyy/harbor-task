'use client';

import { useProjects, useUser } from '@/hooks';
import { useFilter } from '@/providers';
import { Breadcrumb, Skeleton } from '@/components/ui';

const RecourcePath = () => {
  const { selectedFilter } = useFilter();
  const { data: user, isLoading: isUserLoading } = useUser();
  const { data: projects } = useProjects(user?.id);

  if (!user || isUserLoading || !projects) return <RecourcePathSkeleton />;

  if (selectedFilter.type === 'project') {
    const projectName = projects?.find(project => project.id === selectedFilter.value)?.name;

    return (
      <Breadcrumb>
        <Breadcrumb.List>
          <Breadcrumb.Item className="hidden md:block">
            <Breadcrumb.Link href="#">Projects</Breadcrumb.Link>
          </Breadcrumb.Item>
          <Breadcrumb.Separator className="hidden md:block" />
          <Breadcrumb.Item>
            <Breadcrumb.Page>{projectName}</Breadcrumb.Page>
          </Breadcrumb.Item>
        </Breadcrumb.List>
      </Breadcrumb>
    );
  }

  return (
    <Breadcrumb>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Page>{selectedFilter.value}</Breadcrumb.Page>
        </Breadcrumb.Item>
      </Breadcrumb.List>
    </Breadcrumb>
  );
};

const RecourcePathSkeleton = () => (
  <>
    <Skeleton className="h-4 w-24" />
    <Breadcrumb.Separator className="hidden md:block" />
    <Skeleton className="h-4 w-24" />
  </>
);

export { RecourcePath };
