import React, { useState } from "react";
import {
  ActionIcon,
  Badge,
  Checkbox,
  Container,
  Divider,
  Flex,
  Group,
  MantineColor,
  Space,
  Text,
  Tooltip,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import {
  IconCalendarDot,
  IconFlagFilled,
  IconPencilBolt,
} from "@tabler/icons-react";
import { progressBadge, TaskProps } from "./Task.types";
import formatDate from "../../../lib/formatDate";

const progressConfig = [
  { limit: 0, badgeColor: "gray" },
  { limit: 25, badgeColor: "yellow" },
  { limit: 50, badgeColor: "orange" },
  { limit: 75, badgeColor: "blue" },
  { limit: 100, badgeColor: "green" },
];

const getBadge = (progress: number | undefined): progressBadge => {
  const config = progressConfig.find(
    (cfg) => progress !== undefined && progress <= cfg.limit
  );
  return config
    ? { ...config, badgeText: `${progress}%` }
    : { badgeColor: "gray", badgeText: "0%" };
};

const getFlagColor = (priority: number | undefined): string => {
  const priorityColors: Record<number, MantineColor> = {
    1: "green",
    2: "yellow",
    3: "orange",
    4: "red",
  };
  return priority ? priorityColors[priority] : "gray";
};

const TaskInstance: React.FC<TaskProps> = ({
  task,
  project,
  onEdit,
  onDelete,
}) => {
  const [mounted, setMounted] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const theme = useMantineTheme();
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  const { title, deadline, progress, description, priority } = task;
  const { badgeColor, badgeText } = getBadge(progress);
  const flagColor = getFlagColor(priority);

  const handleDelete = () => {
    setMounted(false);
    setTimeout(() => onDelete(task.id), 300);
  };

  const toggleDescriptionExpansion = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  return (
    <Transition
      mounted={mounted}
      transition="slide-right"
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <Container
          size="full"
          style={styles}
          className="group"
          p={isMobile ? 0 : 16}
        >
          <Flex direction="column" mb={12}>
            <Group align="flex-start" justify="space-between">
              <Group className="flex-1 min-w-0" align="flex-start">
                <Checkbox
                  radius="50%"
                  size="md"
                  onChange={handleDelete}
                  aria-label={`Mark task "${title}" as complete`}
                />
                <Text size="md" weight={500} className="flex-1 min-w-0">
                  {title}
                </Text>
              </Group>
              <Tooltip label="Edit task">
                <ActionIcon
                  variant="light"
                  onClick={onEdit}
                  className={`transition-opacity duration-200 ${
                    isMobile ? "" : "opacity-0 group-hover:opacity-100"
                  }`}
                  aria-label="Edit task"
                >
                  <IconPencilBolt stroke={1.5} size="1.2rem" />
                </ActionIcon>
              </Tooltip>
            </Group>

            <Flex direction="column" ml="2.5rem">
              <Text
                mt={2}
                mb={6}
                size="sm"
                weight={100}
                c="dimmed"
                className="w-11/12"
                onClick={toggleDescriptionExpansion}
                lineClamp={isDescriptionExpanded ? undefined : 3}
              >
                {description}
              </Text>
              <Group>
                {deadline && (
                  <Flex justify="flex-start" align="center">
                    <ActionIcon color="red" variant="transparent" size="sm">
                      <IconCalendarDot
                        style={{ width: "100%", height: "100%" }}
                        stroke={1}
                      />
                    </ActionIcon>
                    <Space w="xs" />
                    <Text weight={100} c="red" size="xs">
                      {formatDate(deadline)}
                    </Text>
                  </Flex>
                )}
                <Badge variant="light" color={badgeColor as MantineColor}>
                  {badgeText}
                </Badge>
                {project && (
                  <Badge
                    color={project.color as MantineColor}
                    variant="light"
                    className="max-w-36"
                  >
                    {project.emoji} {project.name}
                  </Badge>
                )}
                {priority && (
                  <Tooltip label={`Priority level: ${priority}/4`}>
                    <ActionIcon
                      color={flagColor as MantineColor}
                      variant="transparent"
                      size="sm"
                      aria-label={`Priority level ${priority}`}
                    >
                      <IconFlagFilled
                        style={{ width: "100%", height: "100%" }}
                        stroke={1}
                      />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            </Flex>
          </Flex>
          <Divider orientation="horizontal" />
        </Container>
      )}
    </Transition>
  );
};

export default TaskInstance;
