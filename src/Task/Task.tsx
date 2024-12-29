import React, { Component } from "react";
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
  Transition,
} from "@mantine/core";
import formatDate from "../../lib/formatDate";
import {
  IconCalendarDot,
  IconFlagFilled,
  IconPencilBolt,
} from "@tabler/icons-react";
import { progressBadge, TaskProps, TaskState } from "./Task.types.ts";

const progressConfig = [
  { limit: 0, badgeColor: "gray" },
  { limit: 25, badgeColor: "yellow" },
  { limit: 50, badgeColor: "orange" },
  { limit: 75, badgeColor: "blue" },
  { limit: 100, badgeColor: "green" },
];

const getBadge = (progress: number | undefined): progressBadge => {
  const config = progressConfig.find(
    (cfg) => progress !== undefined && progress <= cfg.limit,
  );
  return config
    ? { ...config, badgeText: `${progress}%` }
    : { badgeColor: "gray", badgeText: "0%" };
};

const getFlagColor = (priority: number | undefined): string => {
  switch (priority) {
    case 1:
      return "green";
    case 2:
      return "yellow";
    case 3:
      return "orange";
    case 4:
      return "red";
    default:
      return "gray";
  }
};

class Task extends Component<TaskProps, TaskState> {
  constructor(props: TaskProps) {
    super(props);
    this.state = {
      mounted: true,
    };
  }

  handleDelete = () => {
    this.setState({ mounted: false });
    setTimeout(() => {
      this.props.onDelete(this.props.id);
    }, 300);
  };

  render() {
    const {
      project,
      title,
      deadline,
      progress,
      description,
      onEdit,
      priority,
    } = this.props;
    const { mounted } = this.state;
    const { badgeColor, badgeText } = getBadge(progress);
    const flagColor = getFlagColor(priority);

    return (
      <Transition
        mounted={mounted}
        transition="slide-right"
        duration={5000}
        timingFunction="ease"
      >
        {(styles) => (
          <Container mb={24} size="full" style={styles}>
            <Flex direction="column" mb={12}>
              <Group align="center" position="apart">
                <Group>
                  <Checkbox
                    radius="50%"
                    size="md"
                    onChange={this.handleDelete}
                  />
                  <Text size="md" weight={500}>
                    {title}
                  </Text>
                  <Badge variant="light" color={badgeColor as MantineColor}>
                    {badgeText}
                  </Badge>
                  {project && (
                    <Badge
                      color={project.color as MantineColor}
                      variant="light"
                    >
                      {project.emoji} {project.name}
                    </Badge>
                  )}
                  {priority && (
                    <ActionIcon
                      color={flagColor as MantineColor}
                      variant="transparent"
                      size="sm"
                    >
                      <IconFlagFilled
                        style={{ width: "100%", height: "100%" }}
                        stroke={1}
                      />
                    </ActionIcon>
                  )}
                </Group>
                <ActionIcon variant="transparent" onClick={onEdit}>
                  <IconPencilBolt stroke={1.5} size="1.2rem" />
                </ActionIcon>
              </Group>
              <Flex direction="column" ml="2.5rem">
                <Text mt={2} mb={2} size="sm" weight={100} color="dimmed">
                  {description}
                </Text>
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
              </Flex>
            </Flex>
            <Divider orientation="horizontal" />
          </Container>
        )}
      </Transition>
    );
  }
}

export default Task;
