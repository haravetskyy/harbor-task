import React, { useState } from "react";
import {
  Button,
  NumberInput,
  Select,
  Textarea,
  TextInput,
} from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import { TaskFormProps } from "./TaskForm.types";
import { Task } from "../Task/Task.types";

const TaskForm: React.FC<TaskFormProps> = ({
  initialTask,
  projects,
  onSave,
  onClose,
}) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(
    initialTask?.description || ""
  );
  const [deadline, setDeadline] = useState(initialTask?.deadline || new Date());
  const [priority, setPriority] = useState(initialTask?.priority || 1);
  const [progress, setProgress] = useState(initialTask?.progress || 0);
  const [projectId, setProjectId] = useState(initialTask?.projectId || "");

  const handleSave = () => {
    const newTask: Task = {
      id: initialTask?.id || Date.now().toString(),
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

  return (
    <>
      <TextInput
        label="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />
      <Textarea
        label="Description"
        value={description}
        autosize
        minRows={2}
        maxRows={4}
        onChange={(e) => setDescription(e.target.value)}
      />
      <DateTimePicker
        label="Deadline"
        value={deadline}
        onChange={setDeadline}
      />
      <NumberInput
        label="Priority"
        value={priority}
        onChange={setPriority}
        min={1}
        max={4}
      />
      <NumberInput
        label="Progress"
        suffix="%"
        value={progress}
        onChange={setProgress}
        min={0}
        max={100}
        step={25}
      />
      {projects && projects.length > 0 && (
        <Select
          label="Project"
          placeholder="Select a project"
          value={projectId || null}
          onChange={(value) => setProjectId(value || "")}
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

      <Button mt="sm" onClick={handleSave}>
        Save
      </Button>
      <Button mt="sm" variant="subtle" onClick={onClose}>
        Cancel
      </Button>
    </>
  );
};

export default TaskForm;
