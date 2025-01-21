import React, { useState } from "react";
import { Button, Container, Group, List, Modal, Space, Title } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import TaskForm from "../TaskForm/TaskForm";
import TaskItem from "../Task/TaskItem";
import { Project, Section, Task } from "@harbor-task/models";

export interface TaskListProps {
  tasks: Task[];
  projects: Project[];
  onAddTask: (task: Task) => void;
  onEditTask: (task: Task) => void;
  onDeleteTask: (id: string) => void;
  selectedSection: Section;
}

const TaskList: React.FC<TaskListProps> = ({
  tasks,
  projects,
  onAddTask,
  onEditTask,
  onDeleteTask,
  selectedSection,
}) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    task: Task | null;
  }>({
    isOpen: false,
    task: null,
  });

  const sectionTitle =
    selectedSection?.type === "section" ? selectedSection.value : selectedSection?.value?.name;

  const handleModalOpen = (task: Task | null = null) => {
    setModalState({ isOpen: true, task });
  };

  const handleModalClose = () => {
    setModalState({ isOpen: false, task: null });
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
              onDelete={() => onDeleteTask(task.id)}
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
          onSave={modalState.task ? onEditTask : onAddTask}
          onClose={handleModalClose}
          projects={projects}
        />
      </Modal>
    </Container>
  );
};

export default TaskList;
