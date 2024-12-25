import { Component } from "react";
import { Badge, Button, Group, List, MantineColor, Text } from "@mantine/core";
import formatDate from "../../lib/formatDate";

const getBadge = (progress: number): { color: string; text: string } => {
  if (progress === 0) return { color: "gray", text: "Not started" };
  if (progress <= 25) return { color: "yellow", text: "In progress" };
  if (progress <= 50) return { color: "orange", text: "Halfway" };
  if (progress <= 75) return { color: "blue", text: "Almost done" };
  return { color: "green", text: "Completed" };
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
