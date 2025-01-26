import { Project, Task } from "@harbor-task/models";
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
} from "@mantine/core";
import { IconCalendarDot, IconFlagFilled, IconPencilBolt } from "@tabler/icons-react";
import React, { useEffect, useState } from "react";
import formatDate from "../../lib/formatDate";
import { getBadge, getFlagColor } from "../../lib/taskUtils";

interface TaskProps {
  task: Task;
  project?: Project;
  onEdit: () => void;
  onDelete: (id: string) => void;
  isLast: boolean;
}

const TaskItem: React.FC<TaskProps> = ({ task, project, onEdit, onDelete, isLast }) => {
  const [mounted, setMounted] = useState(true);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  const { title, deadline, progress, description, priority } = task;
  const { badgeColor, badgeText } = getBadge(progress);
  const flagColor = getFlagColor(task.priority);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const handleDelete = () => {
    setMounted(false);
    setTimeout(() => {
      onDelete(task.id);
    }, 300);
  };

  const toggleDescriptionExpansion = () => {
    setIsDescriptionExpanded((prev) => !prev);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Transition mounted={mounted} transition="slide-right" duration={500} timingFunction="ease">
      {(styles) => (
        <Container
          size="full"
          style={styles}
          className="group"
          p={isMobile ? 0 : 16}
          mb={isMobile ? 12 : 0}>
          <Flex direction="column" mb={12}>
            <Group align="flex-start" justify="space-between">
              <Group className="flex-1 min-w-0" align="flex-start">
                <Checkbox radius="50%" size="md" onChange={handleDelete} />
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
                  }`}>
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
                lineClamp={isDescriptionExpanded ? undefined : 3}>
                {description}
              </Text>
              <Group>
                {deadline && (
                  <Flex justify="flex-start" align="center">
                    <ActionIcon color="red" variant="transparent" size="sm">
                      <IconCalendarDot style={{ width: "100%", height: "100%" }} stroke={1} />
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
                  <Tooltip label={`${project.name}`} position="top">
                    <Badge color={project.color as MantineColor} variant="light" circle>
                      {project.emoji}
                    </Badge>
                  </Tooltip>
                )}
                {priority && (
                  <Tooltip label={`Priority level: ${priority}/4`}>
                    <ActionIcon color={flagColor as MantineColor} variant="transparent" size="sm">
                      <IconFlagFilled style={{ width: "100%", height: "100%" }} stroke={1} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            </Flex>
          </Flex>
          {!isLast && <Divider orientation="horizontal" />}
        </Container>
      )}
    </Transition>
  );
};

export default TaskItem;
