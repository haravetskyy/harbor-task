import { Project, Filter, Task } from "@harbor-task/models";
import { Button, Container, Group, List, Modal, Space, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";
import TaskForm from "./TaskForm";
import TaskItem from "./TaskItem";
import { useAddTask, useDeleteTask, useEditTask, useTasks } from "../hooks/useTasks";
import { useUser } from "../hooks/useUser";
import { useProjects } from "../hooks/useProjects";

export interface TaskListProps {
  selectedSection: Filter;
}

const TaskList: React.FC<TaskListProps> = ({ selectedSection }) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    task: Task | null;
  }>({
    isOpen: false,
    task: null,
  });

  const { data: user } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const { data: tasks = [] } = useTasks(user?.id);
  const addTaskMutation = useAddTask();
  const editTaskMutation = useEditTask();
  const deleteTaskMutation = useDeleteTask();

  const sectionTitle =
    selectedSection?.type === "section" ? selectedSection.value : selectedSection?.value?.name;

  const handleModalOpen = (task: Task | null = null) => {
    setModalState({ isOpen: true, task });
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, task: null });
  };

  const handleAddTask = (task: Omit<Task, "id">) => {
    if (!user?.id) return;
    addTaskMutation.mutate({ userId: user.id, task });
  };

  const handleEditTask = (updatedTask: Partial<Task>) => {
    if (!user?.id) return;
    editTaskMutation.mutate({ userId: user.id, task: updatedTask });
  };

  const handleDeleteTask = (taskId: string) => {
    if (!user?.id) return;
    deleteTaskMutation.mutate({ userId: user.id, taskId });
  };

  return (
    <Container size="full" className="pt-4 md:pt-16">
      <Group>
        <Title order={3} size="h2" mr={24}>
          {sectionTitle}
        </Title>
        <Button
          onClick={() => handleModalOpen()}
          variant="light"
          rightSection={<IconPlus size="0.8rem" stroke={1.5} />}>
          Add task
        </Button>
      </Group>
      <Space h={24} />

      <List icon={<></>}>
        {tasks.map((task, index) => {
          const project = projects.find((proj) => proj.id === task.projectId);
          return (
            <TaskItem
              key={task.id}
              task={task}
              project={project}
              onEdit={() => handleModalOpen(task)}
              onDelete={() => handleDeleteTask(task.id)}
              isLast={index === tasks.length - 1}
            />
          );
        })}
      </List>

      <Modal
        opened={modalState.isOpen}
        onClose={handleModalClose}
        title={modalState.task ? "Edit Task" : "Add Task"}>
        <TaskForm
          initialTask={modalState.task}
          onSave={modalState.task ? handleEditTask : handleAddTask}
          onClose={handleModalClose}
          projects={projects}
        />
      </Modal>
    </Container>
  );
};

export default TaskList;
