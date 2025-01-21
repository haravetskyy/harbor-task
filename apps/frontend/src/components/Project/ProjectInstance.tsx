import React, { useEffect, useRef, useState } from "react";
import {
  ActionIcon,
  Badge,
  Flex,
  MantineColor,
  NavLink,
  Text,
  Tooltip,
  Transition,
  useMantineTheme,
} from "@mantine/core";
import { useResizeObserver, useMediaQuery } from "@mantine/hooks";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { Project } from "@harbor-task/models";

interface ProjectProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onClick?: (project: Project) => void;
}

const ProjectInstance: React.FC<ProjectProps> = ({ project, onEdit, onDelete, onClick }) => {
  const theme = useMantineTheme();
  const textRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false);
  const isMobile = useMediaQuery(`(max-width: ${theme.breakpoints.sm}px)`);

  useResizeObserver(textRef, (entry) => {
    const textElement = entry.target as HTMLDivElement;
    setIsTruncated(textElement.scrollWidth > textElement.clientWidth);
  });

  const calculateTruncation = () => {
    if (textRef.current) {
      setIsTruncated(textRef.current.scrollWidth > textRef.current.clientWidth);
    }
  };

  useEffect(() => {
    calculateTruncation();
  }, []);

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
  };

  return (
    <Transition mounted={mounted} transition="slide-right" duration={500} timingFunction="ease">
      {(styles) => (
        <NavLink
          style={styles}
          label={
            <Tooltip label={project.name} disabled={!isTruncated} position="right">
              <Text
                size="sm"
                ref={textRef}
                className="overflow-hidden whitespace-nowrap text-ellipsis">
                {project.name}
              </Text>
            </Tooltip>
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
              className={`transition-opacity duration-200 ${
                isMobile ? "" : "opacity-0 group-hover:opacity-100"
              }`}>
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

export default ProjectInstance;
