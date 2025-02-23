import { useProjects } from "@/hooks/useProjects";
import { useTasks } from "@/hooks/useTasks";
import { useUser } from "@/hooks/useUser";
import { getFlagColor } from "@/lib/taskUtils";
import { Badge, MantineColor, rem, ThemeIcon } from "@mantine/core";
import {
  createSpotlight,
  Spotlight,
  SpotlightActionData,
  SpotlightActionGroupData,
} from "@mantine/spotlight";
import { IconFlagFilled, IconSearch } from "@tabler/icons-react";
import { useState } from "react";

export const [searcherStore, searcherSpotlight] = createSpotlight();

const Searcher = () => {
  const [query, setQuery] = useState("");
  const { data: user } = useUser();

  const { data: projects } = useProjects(user?.id, query);
  const { data: tasks } = useTasks(user?.id, query);

  const actions: (SpotlightActionGroupData | SpotlightActionData)[] = [
    {
      group: "Projects",
      actions:
        projects?.map((project) => ({
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
        tasks?.map((task) => ({
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
      onQueryChange={setQuery}
      searchProps={{
        leftSection: <IconSearch style={{ width: rem(20), height: rem(20) }} stroke={1.5} />,
        placeholder: "Search...",
      }}
    />
  );
};

export default Searcher;
