import { Task } from '@harbor-task/models';

interface TaskGroup {
  label: string;
  tasks: Task[];
}

const normalizeDate = (date: Date): Date => {
  const normalized = new Date(date);
  normalized.setHours(0, 0, 0, 0);
  return normalized;
};

const isSameDay = (date1: Date, date2: Date): boolean => {
  return (
    date1.getFullYear() === date2.getFullYear() &&
    date1.getMonth() === date2.getMonth() &&
    date1.getDate() === date2.getDate()
  );
};

const isBefore = (date1: Date, date2: Date): boolean => {
  return date1.getTime() < date2.getTime();
};

const createFixedGroups = (): TaskGroup[] => [
  { label: 'Overdue', tasks: [] },
  { label: 'Today', tasks: [] },
  { label: 'Tomorrow', tasks: [] },
  { label: 'This Week', tasks: [] },
  { label: 'Next Week', tasks: [] },
  { label: 'No Deadline', tasks: [] },
];

interface DateBoundaries {
  today: Date;
  tomorrow: Date;
  endOfWeek: Date;
  endOfNextWeek: Date;
}

const getDateBoundaries = (currentDate: Date = new Date()): DateBoundaries => {
  const today = normalizeDate(currentDate);
  const tomorrow = new Date(today);
  tomorrow.setDate(today.getDate() + 1);
  const endOfWeek = new Date(today);
  endOfWeek.setDate(today.getDate() + (7 - today.getDay()));
  const endOfNextWeek = new Date(endOfWeek);
  endOfNextWeek.setDate(endOfWeek.getDate() + 7);

  return { today, tomorrow, endOfWeek, endOfNextWeek };
};

const assignTaskToGroup = (
  task: Task,
  groups: TaskGroup[],
  monthlyGroups: { [key: string]: Task[] },
  boundaries: DateBoundaries,
): void => {
  if (!task.deadline) {
    groups[5].tasks.push(task);
    return;
  }

  const deadline = normalizeDate(new Date(task.deadline));

  if (isBefore(deadline, boundaries.today)) {
    groups[0].tasks.push(task);
  } else if (isSameDay(deadline, boundaries.today)) {
    groups[1].tasks.push(task);
  } else if (isSameDay(deadline, boundaries.tomorrow)) {
    groups[2].tasks.push(task);
  } else if (
    isBefore(deadline, boundaries.endOfWeek) ||
    isSameDay(deadline, boundaries.endOfWeek)
  ) {
    groups[3].tasks.push(task);
  } else if (
    isBefore(deadline, boundaries.endOfNextWeek) ||
    isSameDay(deadline, boundaries.endOfNextWeek)
  ) {
    groups[4].tasks.push(task);
  } else {
    const monthYear = deadline.toLocaleString('en-US', { month: 'long', year: 'numeric' });
    if (!monthlyGroups[monthYear]) {
      monthlyGroups[monthYear] = [];
    }
    monthlyGroups[monthYear].push(task);
  }
};

const sortGroups = (groups: TaskGroup[], monthlyGroups: { [key: string]: Task[] }): TaskGroup[] => {
  groups.forEach(group => {
    group.tasks.sort((a, b) => {
      const dateA = a.deadline ? new Date(a.deadline).getTime() : Infinity;
      const dateB = b.deadline ? new Date(b.deadline).getTime() : Infinity;
      return dateA - dateB;
    });
  });

  const monthlyGroupList: TaskGroup[] = Object.keys(monthlyGroups)
    .map(monthYear => ({
      label: monthYear,
      tasks: monthlyGroups[monthYear].sort((a, b) => {
        const dateA = new Date(a.deadline!).getTime();
        const dateB = new Date(b.deadline!).getTime();
        return dateA - dateB;
      }),
    }))
    .sort((a, b) => {
      const dateA = new Date(a.label).getTime();
      const dateB = new Date(b.label).getTime();
      return dateA - dateB;
    });

  return [...groups, ...monthlyGroupList].filter(group => group.tasks.length > 0);
};

export const groupTasksByDeadline = (tasks: Task[]): TaskGroup[] => {
  const groups = createFixedGroups();
  const monthlyGroups: { [key: string]: Task[] } = {};
  const boundaries = getDateBoundaries();

  tasks.forEach(task => assignTaskToGroup(task, groups, monthlyGroups, boundaries));

  return sortGroups(groups, monthlyGroups);
};
