import { useFilter } from "@/components/FilterContext";
import TaskForm from "@/components/TaskForm";
import TaskItem from "@/components/TaskItem";
import { useProjects } from "@/hooks/useProjects";
import { useAddTask, useDeleteTask, useEditTask, useTasks } from "@/hooks/useTasks";
import { useUser } from "@/hooks/useUser";
import { Task } from "@harbor-task/models";
import { Button, Container, Group, List, Modal, Space, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import React, { useState } from "react";

const TaskList: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    task: Task | null;
  }>({
    isOpen: false,
    task: null,
  });

  const { selectedFilter } = useFilter();
  const { data: user } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const { data: tasks = [] } = useTasks(user?.id, selectedFilter.value);

  const filterValue =
    selectedFilter.type === "project"
      ? projects.find((project) => project.id === selectedFilter.value)?.name || "Unknown Project"
      : selectedFilter.value;

  const addTaskMutation = useAddTask();
  const editTaskMutation = useEditTask();
  const deleteTaskMutation = useDeleteTask();

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
    <Container size="full" className="pt-4 md:pt-16 w-full md:w-3/4">
      <Group>
        <Title order={3} size="h2" mr={24}>
          {filterValue}
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
