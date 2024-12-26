import React, { Component } from "react";
import { Button, List, Modal } from "@mantine/core";
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
    const { tasks, onAddTask, onEditTask, onDeleteTask } = this.props;
    const { isModalOpen, currentTask } = this.state;

    return (
      <>
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
            projects={this.props.projects}
          />
        </Modal>
      </>
    );
  }
}

export default TaskList;
