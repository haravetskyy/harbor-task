import React, { Component } from "react";
import { TaskListProps } from "./TaskList.types";
import { Button, List, Modal, NumberInput, TextInput } from "@mantine/core";
import Task from "../Task/Task";
import { DateInput } from "@mantine/dates";

class TaskList extends Component<TaskListProps, {}> {
  state = {
    isModalOpen: false,
    currentTask: null,
    title: "",
    description: "",
    deadline: "",
    progress: 0,
    priority: 1,
  };

  handleOpenModal = (task = null) => {
    this.setState({
      isModalOpen: true,
      currentTask: task,
      title: task?.title || "",
      description: task?.description || "",
      deadline: task?.deadline || "",
      progress: task?.progress || 0,
      priority: task?.priority || 1,
    });
  };

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
  };

  handleSave = () => {
    const { currentTask, title, description, deadline, progress, priority } =
      this.state;

    const taskData = {
      id: currentTask?.id || Date.now().toString(),
      title,
      description,
      deadline,
      progress,
      priority,
    };

    if (currentTask) {
      this.props.onEditTask(taskData);
    } else {
      this.props.onAddTask(taskData);
    }

    this.handleCloseModal();
  };

  render() {
    const { tasks, onDeleteTask } = this.props;
    const { isModalOpen, title, description, deadline, progress, priority } =
      this.state;

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
          title="Task"
        >
          <TextInput
            label="Title"
            value={title}
            onChange={(e) => this.setState({ title: e.target.value })}
          />
          <TextInput
            label="Description"
            value={description}
            onChange={(e) => this.setState({ description: e.target.value })}
          />
          <DateInput
            label="Deadline"
            value={deadline}
            onChange={(value) => this.setState({ deadline: value })}
          />
          <NumberInput
            label="Priority"
            value={priority}
            onChange={(value) => this.setState({ priority: value })}
            min={1}
            max={4}
          />
          <NumberInput
            label="Progress"
            suffix="%"
            value={this.state.progress || 0}
            step={25}
            allowNegative={false}
            allowDecimal={false}
            onChange={(value) => this.setState({ progress: value })}
            clampBehavior="strict"
            min={0}
            max={100}
          />
          <Button mt="sm" onClick={this.handleSave}>
            Save
          </Button>
        </Modal>
      </>
    );
  }
}

export default TaskList;
