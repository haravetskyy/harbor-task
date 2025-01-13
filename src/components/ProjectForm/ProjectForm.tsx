import React, { useState } from "react";
import { Button, ColorInput, Select, TextInput } from "@mantine/core";
import { ProjectFormProps } from "./ProjectForm.types";
import emojiOptions from "../../../lib/emojiOptions";
import { v4 as uuid } from "uuid";
import { Project } from "../Project/Project.types";
import colorOptions from "../../../lib/colorOptions";

const ProjectForm: React.FC<ProjectFormProps> = ({
  initialProject,
  onSave,
  onClose,
}) => {
  const [name, setName] = useState<string>(initialProject?.name || "");
  const [emoji, setEmoji] = useState<string>(initialProject?.emoji || "");
  const [color, setColor] = useState<string>(initialProject?.color || "");

  const handleSave = () => {
    const project: Project = {
      id: initialProject?.id || uuid(),
      name,
      emoji,
      color,
    };

    onSave(project);
    onClose();
  };

  return (
    <div>
      <TextInput
        label="Project Name"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Select
        label="Emoji"
        placeholder="Choose an emoji"
        mt="sm"
        data={emojiOptions}
        value={emoji}
        onChange={(value) => setEmoji(value || "")}
        checkIconPosition="right"
        allowDeselect
        clearable
        searchable
      />
      <ColorInput
        placeholder="Choose a color"
        label="Color"
        mt="sm"
        value={color}
        onChange={setColor}
        swatches={colorOptions}
      />
      <Button fullWidth mt="md" onClick={handleSave}>
        Save
      </Button>
    </div>
  );
};

export default ProjectForm;
