import React, { Component } from "react";
import {
  Button,
  Container,
  Group,
  List,
  Modal,
  Space,
  Title,
} from "@mantine/core";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import { TaskListProps, TaskListState } from "./TaskList.types";
import { IconPlus } from "@tabler/icons-react";

class TaskList extends Component<TaskListProps, TaskListState> {
  state: TaskListState = {
    isModalOpen: false,
    currentTask: null,
  };

  handleOpenModal = (task = null) => {
    this.setState({ isModalOpen: true, currentTask: task });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false, currentTask: null });
  };

  render() {
    const {
      tasks,
      projects,
      onAddTask,
      onEditTask,
      onDeleteTask,
      selectedSection,
    } = this.props;
    const { isModalOpen, currentTask } = this.state;

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
            onClick={() => this.handleOpenModal()}
            variant="light"
            rightSection={<IconPlus size="0.8rem" stroke={1.5} />}
          >
            Add task
          </Button>
        </Group>
        <Space h={24} />

        <List icon={<></>}>
          {tasks.map((task) => (
            <Task
              key={task.id}
              task={task}
              project={
                projects.find((project) => project.id === task.projectId) ||
                undefined
              }
              onEdit={() => this.handleOpenModal(task)}
              onDelete={() => onDeleteTask(task.id)}
            />
          ))}
        </List>
        <Modal
          opened={isModalOpen}
          onClose={this.handleCloseModal}
          title={currentTask ? "Edit Task" : "Add Task"}
        >
          <TaskForm
            initialTask={currentTask}
            onSave={currentTask ? onEditTask : onAddTask}
            onClose={this.handleCloseModal}
            projects={projects}
          />
        </Modal>
      </Container>
    );
  }
}

export default TaskList;
