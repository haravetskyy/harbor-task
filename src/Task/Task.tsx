import { Component } from "react";
import { Badge, Button, Group, List, MantineColor, Text } from "@mantine/core";
import formatDate from "../../lib/formatDate";

const progressConfig = [
  { limit: 0, color: "gray", text: "Not started" },
  { limit: 25, color: "yellow", text: "In progress" },
  { limit: 50, color: "orange", text: "Halfway" },
  { limit: 75, color: "blue", text: "Almost done" },
  { limit: 100, color: "green", text: "Completed" },
];

const getBadge = (progress) => {
  return progressConfig.find((cfg) => progress <= cfg.limit);
};

class Task extends Component<Task, {}> {
  render() {
    const { id, title, deadline, progress, onEdit, onDelete } = this.props;
    const { color, text } = getBadge(progress);

    return (
      <List.Item>
        <Group position="apart" mt="md" mb="xs">
          <Text weight={500}>{title}</Text>
          <Text size="sm">Deadline: {formatDate(deadline)}</Text>
          <Badge color={color as MantineColor}>{text}</Badge>
        </Group>
        <Group position="right" mt="md">
          <Button size="xs" onClick={onEdit}>
            Edit
          </Button>
          <Button size="xs" color="red" onClick={onDelete}>
            Delete
          </Button>
        </Group>
      </List.Item>
    );
  }
}

export default Task;
