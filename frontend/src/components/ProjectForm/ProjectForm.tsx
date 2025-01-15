import React, { useState } from "react";
import {
  Button,
  ColorInput,
  Group,
  Select,
  TextInput,
  Text,
} from "@mantine/core";
import { ProjectFormProps } from "./ProjectForm.types";
import emojiOptions from "../../../lib/emojiOptions";
import { v4 as uuid } from "uuid";
import { Project } from "../Project/Project.types";
import colorOptions from "../../../lib/colorOptions";

const MAX_NAME_LENGTH = 60;

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
      name: name.trim(),
      emoji,
      color,
    };

    onSave(project);
    onClose();
  };

  const nameLengthExceeded = name.length > MAX_NAME_LENGTH;

  return (
    <div>
      <TextInput
        label="Project Name"
        placeholder="Enter project name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <Group justify="start" className="w-full">
        <Text size="sm" c={nameLengthExceeded ? "red" : "dimmed"}>
          {name.length}/{MAX_NAME_LENGTH}
        </Text>
      </Group>
      <Select
        label="Emoji"
        placeholder="Choose an emoji"
        data={emojiOptions}
        value={emoji}
        onChange={(value) => setEmoji(value || "")}
        checkIconPosition="right"
        nothingFoundMessage="Nothing found..."
        maxDropdownHeight={200}
        searchable
        required
      />
      <ColorInput
        placeholder="Choose a color"
        label="Color"
        value={color}
        onChange={setColor}
        swatches={colorOptions}
        required
      />
      <Button
        fullWidth
        mt="md"
        onClick={handleSave}
        disabled={!name || !emoji || !color || nameLengthExceeded}
      >
        Save
      </Button>
    </div>
  );
};

export default ProjectForm;
