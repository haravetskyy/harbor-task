import React, { Component } from "react";
import {
  ActionIcon,
  Badge,
  Flex,
  MantineColor,
  NavLink,
  Tooltip,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ProjectProps } from "./Project.types.ts";

class ProjectInstance extends Component<ProjectProps, {}> {
  handleEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { onEdit, project } = this.props;
    if (onEdit) onEdit(project);
  };

  handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    const { onDelete, project } = this.props;
    if (onDelete) onDelete(project.id);
  };

  handleClick = () => {
    const { onClick, project } = this.props;
    if (onClick) onClick(project);
  };

  render() {
    const { project } = this.props;

    return (
      <NavLink
        label={project.name}
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
          <Flex align="center" gap="sm">
            <Tooltip label="Edit Project">
              <ActionIcon variant="light" onClick={this.handleEdit}>
                <IconPencil size="1rem" />
              </ActionIcon>
            </Tooltip>
            <Tooltip label="Delete Project">
              <ActionIcon
                variant="light"
                color="red"
                onClick={this.handleDelete}
              >
                <IconTrash size="1rem" />
              </ActionIcon>
            </Tooltip>
          </Flex>
        }
        onClick={this.handleClick}
      ></NavLink>
    );
  }
}

export default ProjectInstance;