import { MantineColor } from "@mantine/core";

type progressBadge = {
  badgeColor: string;
  badgeText: string;
};

const progressConfig = [
  { limit: 0, badgeColor: "gray" },
  { limit: 25, badgeColor: "yellow" },
  { limit: 50, badgeColor: "orange" },
  { limit: 75, badgeColor: "blue" },
  { limit: 100, badgeColor: "green" },
];

export const getBadge = (progress: number | undefined): progressBadge => {
  const config = progressConfig.find(
    (cfg) => progress !== undefined && progress <= cfg.limit
  );
  return config
    ? { ...config, badgeText: `${progress}%` }
    : { badgeColor: "gray", badgeText: "0%" };
};

export const getFlagColor = (priority: number | undefined): string => {
  const priorityColors: Record<number, MantineColor> = {
    1: "green",
    2: "yellow",
    3: "orange",
    4: "red",
  };
  return priority ? priorityColors[priority] : "gray";
};
