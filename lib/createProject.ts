import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

export const createProject = (name: string, emoji: string, color: string) => ({
  id: uuid(),
  name,
  emoji: emoji || "📁",
  color: color || "#ffffff",
});
