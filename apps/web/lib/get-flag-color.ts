import tailwindConfig from "@/tailwind.config";
import resolveConfig from "tailwindcss/resolveConfig";

const config = resolveConfig(tailwindConfig);
const colors = config.theme.colors;

const priorityColors: Record<number, string> = {
  1: colors.green[500],
  2: colors.yellow[500],
  3: colors.amber[500],
  4: colors.red[700],
} as const;

const getFlagColor = (priority: number | undefined): string => {
  if (priority === undefined) {
    return colors.gray[500];
  }

  return priorityColors[priority];
};

export { priorityColors, getFlagColor }
