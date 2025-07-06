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

const priorityTexts: Record<number, string> = {
  1: 'Minor',
  2: 'Optional',
  3: 'Important',
  4: 'Critical',
} as const;

const getPriorityColor = (priority: number | undefined): string => priority ? priorityColors[priority] : colors.gray[500]

const getPriorityText = (priority: number | undefined): string | undefined => priority ? `${priorityTexts[priority]} (${priority}/4)` : 'Not set'

export { priorityColors, priorityTexts, getPriorityColor, getPriorityText }
