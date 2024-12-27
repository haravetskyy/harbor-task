import React, { Component } from "react";
import { Button, List, Modal, Title } from "@mantine/core";
import Task from "../Task/Task";
import TaskForm from "../TaskForm/TaskForm";
import { TaskListProps, TaskListState } from "./TaskList.types";

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
        : selectedSection?.value?.name || "Unknown Section";

    return (
      <>
        <Title order={3} size="h2">
          {sectionTitle}
        </Title>
        <Button onClick={() => this.handleOpenModal()}>Add Task</Button>
        <List>
          {tasks.map((task) => (
            <Task
              key={task.id}
              {...task}
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
      </>
    );
  }
}

export default TaskList;
