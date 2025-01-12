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
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ProjectProps } from "./Project.types";

const ProjectInstance: React.FC<ProjectProps> = ({
  project,
  onEdit,
  onDelete,
  onClick,
}) => {
  const [mounted, setMounted] = useState(true);
  const [isTruncated, setIsTruncated] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const textRef = useRef<HTMLDivElement>(null);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  const checkIfTruncated = () => {
    const textElement = textRef.current;
    if (textElement) {
      setIsTruncated(textElement.scrollWidth > textElement.clientWidth);
    }
  };

  const handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit) onEdit(project);
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    setMounted(false);
    setTimeout(() => {
      if (onDelete) onDelete(project.id);
    }, 300);
  };

  const handleClick = () => {
    if (onClick) onClick(project);
  };

  useEffect(() => {
    checkIfTruncated();
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [project.name]);

  return (
    <Transition
      mounted={mounted}
      transition="slide-right"
      duration={500}
      timingFunction="ease"
    >
      {(styles) => (
        <NavLink
          style={styles}
          label={
            <Tooltip
              label={project.name}
              disabled={!isTruncated}
              position="right"
            >
              <Text
                size="sm"
                ref={textRef}
                className="overflow-hidden whitespace-nowrap text-ellipsis"
              >
                {project.name}
              </Text>
            </Tooltip>
          }
          className="group"
          leftSection={
            <Badge
              color={project.color as MantineColor}
              size="lg"
              variant="light"
            >
              {project.emoji}
            </Badge>
          }
          rightSection={
            <Flex
              align="center"
              gap="sm"
              className={`transition-opacity duration-200 ${
                isMobile ? "" : "opacity-0 group-hover:opacity-100"
              }`}
            >
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
