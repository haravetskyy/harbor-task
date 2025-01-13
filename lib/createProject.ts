import { v4 as uuid } from "uuid";

export const createProject = (name: string, emoji: string, color: string) => ({
  id: uuid(),
  name,
  emoji: emoji || "📁",
  color: color || "#ffffff",
});
