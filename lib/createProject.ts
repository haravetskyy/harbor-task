import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";

export const createProject = (name: string, emoji: string) => ({
  id: uuid(),
  name,
  emoji: emoji || "📁",
});
