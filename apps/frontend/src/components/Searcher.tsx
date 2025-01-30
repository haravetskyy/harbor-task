import { useState } from "react";
import { Badge, MantineColor, rem, ThemeIcon } from "@mantine/core";
import {
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
  createSpotlight,
} from "@mantine/spotlight";
import { getFlagColor } from "../../lib/taskUtils";
import { IconFlagFilled, IconSearch } from "@tabler/icons-react";
import { useProjects } from "../hooks/useProjects";
import { useTasks } from "../hooks/useTasks";

export const [searcherStore, searcherSpotlight] = createSpotlight();

export const Searcher = ({ userId }: { userId: string | undefined }) => {
  const [query, setQuery] = useState("");

  const { data: projects, isLoading: loadingProjects } = useProjects(userId, query);
  const { data: tasks, isLoading: loadingTasks } = useTasks(userId, query);

  const safeProjects = Array.isArray(projects) ? projects : [];
  const safeTasks = Array.isArray(tasks) ? tasks : [];

  const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    {
      group: "Projects",
      actions:
        safeProjects?.map((project) => ({
          id: project.id,
          label: project.name,
          leftSection: (
            <Badge color={project.color as MantineColor} size="lg" variant="light" circle>
              {project.emoji}
            </Badge>
          ),
        })) || [],
    },
    {
      group: "Tasks",
      actions:
        safeTasks?.map((task) => ({
          id: task.id,
          label: task.title,
          description: task.description || "",
          leftSection: (
            <ThemeIcon
              color={getFlagColor(task.priority) as MantineColor}
              variant="transparent"
              size="sm">
              <IconFlagFilled stroke={1} />
            </ThemeIcon>
          ),
        })) || [],
    },
  ];
  return (
    <Spotlight
      store={searcherStore}
      actions={actions}
      shortcut="mod+k"
      closeOnActionTrigger
      scrollable
      highlightQuery
      maxHeight={350}
      onQueryChange={setQuery}
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: "Search...",
      }}
    />
  );
};
