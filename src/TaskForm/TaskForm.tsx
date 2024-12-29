import React, { Component } from "react";
import { Button, NumberInput, Select, TextInput } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { TaskFormProps, TaskFormState } from "./TaskForm.types";

class TaskForm extends Component<TaskFormProps, TaskFormState> {
  state: TaskFormState = {
    title: this.props.initialTask?.title || "",
    description: this.props.initialTask?.description || "",
    deadline: this.props.initialTask?.deadline || new Date(),
    priority: this.props.initialTask?.priority || 1,
    progress: this.props.initialTask?.progress || 0,
    projectId: this.props.initialTask?.projectId || "",
  };

  handleChange = (field: keyof TaskFormState, value: string | number) => {
    this.setState({ [field]: value } as Pick<
      TaskFormState,
      keyof TaskFormState
    >);
  };

  handleSave = () => {
    const { onSave, onClose } = this.props;
    const { title, description, deadline, priority, progress, projectId } =
      this.state;

    const newTask = {
      id: this.props.initialTask?.id || Date.now().toString(),
      title,
      description,
      deadline,
      priority,
      progress,
      projectId: projectId || null,
    };

    onSave(newTask);

    onClose();
  };

  render() {
    const { title, description, deadline, priority, progress, projectId } =
      this.state;
    const { projects, onClose } = this.props;

    return (
      <>
        <TextInput
          label="Title"
          value={title}
          onChange={(e) => this.handleChange("title", e.target.value)}
          required
        />
        <TextInput
          label="Description"
          value={description}
          onChange={(e) => this.handleChange("description", e.target.value)}
        />
        <DateTimePicker
          label="Deadline"
          value={deadline}
          onChange={(value) => this.handleChange("deadline", value)}
        />
        <NumberInput
          label="Priority"
          value={priority}
          onChange={(value) => this.handleChange("priority", value)}
          min={1}
          max={4}
        />
        <NumberInput
          label="Progress"
          suffix="%"
          value={progress}
          onChange={(value) => this.handleChange("progress", value)}
          min={0}
          max={100}
          step={25}
        />
        {projects && projects.length > 0 && (
          <Select
            label="Project"
            placeholder="Select a project"
            value={projectId || null}
            onChange={(value) => this.handleChange("projectId", value)}
            data={projects.map((project) => ({
              value: project.id,
              label: `${project.name}  ${project.emoji || ""}`,
            }))}
            checkIconPosition="right"
            clearable
            allowDeselect
            searchable
          />
        )}

        <Button mt="sm" onClick={this.handleSave}>
          Save
        </Button>
        <Button mt="sm" variant="subtle" onClick={onClose}>
          Cancel
        </Button>
      </>
    );
  }
}

export default TaskForm;
