import React, { useState } from "react";
import {
  Button,
  Container,
  Group,
  List,
  Modal,
  Space,
  Title,
} from "@mantine/core";
import TaskForm from "../TaskForm/TaskForm";
import { TaskListProps } from "./TaskList.types";
import { IconPlus } from "@tabler/icons-react";
import { Task } from "../Task/Task.types";
import TaskInstance from "../Task/TaskInstance";

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  projects,
  onAddTask,
  onEditTask,
  onDeleteTask,
  selectedSection,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [currentTask, setCurrentTask] = useState<Task | null>(null);

  const handleOpenModal = (task: Task | null = null) => {
    setIsModalOpen(true);
    setCurrentTask(task);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setCurrentTask(null);
  };

  const sectionTitle =
    selectedSection?.type === "section"
      ? selectedSection.value
      : selectedSection?.value?.name;

  return (
    <Container size="full" className="pt-4 md:pt-16">
      <Group>
        <Title order={3} size="h2" mr={24}>
          {sectionTitle}
        </Title>
        <Button
          onClick={() => handleOpenModal()}
          variant="light"
          rightSection={<IconPlus size="0.8rem" stroke={1.5} />}
        >
          Add task
        </Button>
      </Group>
      <Space h={24} />

      <List icon={<></>}>
        {tasks.map((task) => (
          <TaskInstance
            key={task.id}
            task={task}
            project={
              projects.find((project) => project.id === task.projectId) ||
              undefined
            }
            onEdit={() => handleOpenModal(task)}
            onDelete={() => onDeleteTask(task.id)}
          />
        ))}
      </List>
      <Modal
        opened={isModalOpen}
        onClose={handleCloseModal}
        title={currentTask ? "Edit Task" : "Add Task"}
      >
        <TaskForm
          initialTask={currentTask}
          onSave={currentTask ? onEditTask : onAddTask}
          onClose={handleCloseModal}
          projects={projects}
        />
      </Modal>
    </Container>
  );
};

export default TaskList;
