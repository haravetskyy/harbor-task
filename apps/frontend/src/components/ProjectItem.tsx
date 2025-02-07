import { useIsMobile } from "@/hooks/useIsMobile";
import { Project } from "@harbor-task/models";
import {
  ActionIcon,
  Badge,
  Flex,
  MantineColor,
  NavLink,
  Text,
  Tooltip,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import React, { useState } from "react";

interface ProjectProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onClick?: (project: Project) => void;
  activeItem: string;
  setActiveItem: (id: string) => void;
}

const ProjectItem: React.FC<ProjectProps> = ({
  project,
  onEdit,
  onDelete,
  onClick,
  activeItem,
  setActiveItem,
}) => {
  const [mounted, setMounted] = useState(true);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const isMobile = useIsMobile();

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    onEdit?.(project);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMounted(false);
    setTimeout(() => onDelete?.(project.id), 300);
  };

  const handleClick = () => {
    onClick?.(project);
    setActiveItem(project.id);
  };

  const isActive = activeItem === project.id;
  const backgroundColor = isActive
    ? colorScheme === "dark"
      ? "#24394b"
      : theme.colors.blue[0]
    : colorScheme === "dark"
      ? theme.colors.dark[6]
      : theme.colors.gray[0];

  return (
    <Transition mounted={mounted} transition="slide-right" duration={500} timingFunction="ease">
      {(styles) => (
        <NavLink
          style={styles}
          active={activeItem === project.id}
          label={
            <Text className="truncate" size="sm">
              {project.name}
            </Text>
          }
          className="group"
          leftSection={
            <Badge color={project.color as MantineColor} size="lg" variant="light" circle>
              {project.emoji}
            </Badge>
          }
          rightSection={
            <Flex
              align="center"
              gap="sm"
              className={
                isMobile
                  ? ""
                  : "pl-2 absolute right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
              }
              style={
                isMobile
                  ? {}
                  : {
                      backgroundColor: backgroundColor,
                    }
              }>
              <Tooltip label="Edit Project">
                <ActionIcon variant="light" onClick={handleEdit}>
                  <IconPencil size="1rem" />
                </ActionIcon>
              </Tooltip>
              <Tooltip label="Delete Project">
                <ActionIcon variant="light" color="red" onClick={handleDelete}>
                  <IconTrash size="1rem" />
                </ActionIcon>
              </Tooltip>
            </Flex>
          }
          onClick={handleClick}
        />
      )}
    </Transition>
  );
};

export default ProjectItem;
