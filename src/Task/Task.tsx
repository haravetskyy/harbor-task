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
  Tooltip,
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
      isDescriptionExpanded: false,
      isMobile: window.innerWidth <= 768,
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.handleResize);
  }

  handleResize = () => {
    this.setState((prevState) => ({
      ...prevState,
      isMobile: window.innerWidth <= 768,
    }));
  };

  handleDelete = () => {
    this.setState((prevState) => ({ ...prevState, mounted: false }));
    setTimeout(() => {
      this.props.onDelete(this.props.task.id);
    }, 300);
  };

  toggleDescriptionExpansion = () => {
    this.setState((prevState) => ({
      ...prevState,
      isDescriptionExpanded: !prevState.isDescriptionExpanded,
    }));
  };

  render() {
    const { task, project, onEdit } = this.props;
    const { title, deadline, progress, description, priority } = task;
    const { mounted, isMobile, isDescriptionExpanded } = this.state;
    const { badgeColor, badgeText } = getBadge(progress);
    const flagColor = getFlagColor(task.priority);

    return (
      <Transition
        mounted={mounted}
        transition="slide-right"
        duration={5000}
        timingFunction="ease"
      >
        {(styles) => (
          <Container
            mb={24}
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
                    onChange={this.handleDelete}
                  />
                  <Text size="md" weight={500} className="flex-1 min-w-0 ">
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
                  onClick={this.toggleDescriptionExpansion}
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
                      lineClamp={1}
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
  }
}

export default Task;
