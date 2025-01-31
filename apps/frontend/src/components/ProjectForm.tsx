import colorOptions from "@/lib/colorOptions";
import emojiOptions from "@/lib/emojiOptions";
import { MAX_PROJECT_NAME_LENGTH, Project } from "@harbor-task/models";
import { Button, ColorInput, Group, Select, Text, TextInput } from "@mantine/core";
import React, { useState } from "react";
import { v4 as uuid } from "uuid";

interface ProjectFormProps {
  initialProject?: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}

const ProjectForm: React.FC<ProjectFormProps> = ({ initialProject, onSave, onClose }) => {
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

  const nameLengthExceeded = name.length > MAX_PROJECT_NAME_LENGTH;

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
          {name.length}/{MAX_PROJECT_NAME_LENGTH}
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
        disabled={!name || !emoji || !color || nameLengthExceeded}>
        Save
      </Button>
    </div>
  );
};

export default ProjectForm;
