import React, { Component, createRef } from "react";
import {
  ActionIcon,
  Badge,
  Flex,
  MantineColor,
  NavLink,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";
import { ProjectProps, ProjectState } from "./Project.types.ts";

class ProjectInstance extends Component<ProjectProps, ProjectState> {
  textRef = createRef<HTMLDivElement>();

  constructor(props: ProjectProps) {
    super(props);
    this.state = {
      isTruncated: false,
    };
  }

  componentDidMount() {
    this.checkIfTruncated();
  }

  componentDidUpdate(prevProps: ProjectProps) {
    if (prevProps.project.name !== this.props.project.name) {
      this.checkIfTruncated();
    }
  }

  checkIfTruncated = () => {
    const textElement = this.textRef.current;
    if (textElement) {
      const isOverflowing = textElement.scrollWidth > textElement.clientWidth;
      this.setState({ isTruncated: isOverflowing });
    }
  };

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
        label={
          <Tooltip
            label={project.name}
            disabled={!this.state.isTruncated}
            position="right"
          >
            <Text
              size="sm"
              ref={this.textRef}
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
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
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
