import { Component } from "react";
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
} from "@mantine/core";
import formatDate from "../../lib/formatDate";
import {
  IconCalendarDot,
  IconFlagFilled,
  IconPencilBolt,
} from "@tabler/icons-react";

const progressConfig = [
  { limit: 0, badgeColor: "gray" },
  { limit: 25, badgeColor: "yellow" },
  { limit: 50, badgeColor: "orange" },
  { limit: 75, badgeColor: "blue" },
  { limit: 100, badgeColor: "green" },
];

const getBadge = (progress) => {
  const config = progressConfig.find((cfg) => progress <= cfg.limit);

  if (config) {
    return {
      ...config,
      badgeText: `${progress}%`,
    };
  }

  console.log(new Date());
};

const getFlagColor = (priority): string => {
  switch (priority) {
    case 1:
      return "green";
    case 2:
      return "yellow";
    case 3:
      return "orange";
    case 4:
      return "red";
  }
};

class Task extends Component<Task, {}> {
  render() {
    const {
      title,
      deadline,
      progress,
      description,
      onEdit,
      onDelete,
      priority,
    } = this.props;
    const { badgeColor, badgeText } = getBadge(progress);
    const flagColor = getFlagColor(priority);

    return (
      <Container mb={24} size="full">
        <Flex direction="column" mb={12}>
          <Group align="center">
            <Group position="apart">
              <Checkbox
                radius="50%"
                size="md"
                // onClick={onDelete}
              />
              <Text size="md" weight={500}>
                {title}
              </Text>
              <Badge variant="light" color={badgeColor as MantineColor}>
                {badgeText}
              </Badge>
              {priority ? (
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
              ) : null}
            </Group>
            <Group position="right">
              <IconPencilBolt
                stroke={1.5}
                size="1.2rem"
                height="xs"
                onClick={onEdit}
              />
            </Group>
          </Group>
          <Flex direction="column" ml="2.5rem">
            <Text mt={2} mb={2} size="sm" weight={100} c="dimmed">
              {description}
            </Text>
            {deadline ? (
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
            ) : null}
          </Flex>
        </Flex>
        <Divider orientation="horizontal" />
      </Container>
    );
  }
}

export default Task;
