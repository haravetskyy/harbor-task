import React, { useState } from "react";
import { Button, Group, NumberInput, Select, Textarea, TextInput, Text } from "@mantine/core";
import { DateTimePicker } from "@mantine/dates";
import {
  MAX_TASK_DESCRIPTION_LENGTH,
  MAX_TASK_TITLE_LENGTH,
  Project,
  Task,
} from "@harbor-task/models";

export interface TaskFormProps {
  initialTask?: Task | null;
  onSave: (task: Task) => void;
  onClose: () => void;
  projects: Project[];
}

const TaskForm: React.FC<TaskFormProps> = ({ initialTask, projects, onSave, onClose }) => {
  const [title, setTitle] = useState(initialTask?.title || "");
  const [description, setDescription] = useState(initialTask?.description || "");
  const [deadline, setDeadline] = useState(
    initialTask?.deadline ? new Date(initialTask.deadline) : new Date(),
  );
  const [priority, setPriority] = useState(initialTask?.priority || 1);
  const [progress, setProgress] = useState(initialTask?.progress || 0);
  const [projectId, setProjectId] = useState(initialTask?.projectId || "");

  const handleSave = () => {
    const newTask: Task = {
      id: initialTask?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      deadline,
      priority,
      progress,
      projectId: projectId || null,
    };

    onSave(newTask);
    onClose();
  };

  const titleLengthExceeded = title.length > MAX_TASK_TITLE_LENGTH;
  const descriptionLengthExceeded = description.length > MAX_TASK_DESCRIPTION_LENGTH;

  return (
    <>
      <TextInput label="Title" value={title} onChange={(e) => setTitle(e.target.value)} required />
      <Group justify="start" className="w-full">
        <Text size="sm" c={titleLengthExceeded ? "red" : "dimmed"}>
          {title.length}/{MAX_TASK_TITLE_LENGTH}
        </Text>
      </Group>
      <Textarea
        label="Description"
        value={description}
        autosize
        minRows={2}
        maxRows={4}
        onChange={(e) => setDescription(e.target.value)}
      />
      <Group justify="start" className="w-full">
        <Text size="sm" c={descriptionLengthExceeded ? "red" : "dimmed"}>
          {description.length}/{MAX_TASK_DESCRIPTION_LENGTH}
        </Text>
      </Group>
      <DateTimePicker label="Deadline" value={deadline} onChange={setDeadline} />
      <NumberInput label="Priority" value={priority} onChange={setPriority} min={1} max={4} />
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

      <Button
        mt="sm"
        onClick={handleSave}
        disabled={!title || titleLengthExceeded || descriptionLengthExceeded}
        fullWidth>
        Save
      </Button>
    </>
  );
};

export default TaskForm;
