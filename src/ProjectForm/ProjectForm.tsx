import React, { Component } from "react";
import { Button, ColorInput, Select, TextInput } from "@mantine/core";
import { ProjectFormProps, ProjectFormState } from "./ProjectForm.types";
import { emojiOptions } from "../SideBar/emojiOptions.ts";
import { uuid } from "@supabase/supabase-js/dist/main/lib/helpers";
import { Project } from "../Project/Project.types.ts";

class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  state: ProjectFormState = {
    name: this.props.initialProject?.name || "",
    emoji: this.props.initialProject?.emoji || "",
    color: this.props.initialProject?.color || "",
  };

  handleChange = (field: keyof ProjectFormState, value: string) => {
    this.setState({ [field]: value } as Pick<
      ProjectFormState,
      keyof ProjectFormState
    >);
  };

  handleSave = () => {
    const { onSave, onClose, initialProject } = this.props;
    const { name, emoji, color } = this.state;

    const project: Project = {
      id: initialProject?.id || uuid(),
      name,
      emoji,
      color,
    };

    onSave(project);
    onClose();
  };

  render() {
    const { name, emoji, color } = this.state;
    return (
      <div>
        <TextInput
          label="Project Name"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => this.handleChange("name", e.target.value)}
          required
        />
        <Select
          label="Emoji"
          placeholder="Choose an emoji"
          mt="sm"
          data={emojiOptions}
          value={emoji}
          onChange={(value) => this.handleChange("emoji", value)}
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
          onChange={(value) => this.handleChange("color", value)}
          swatches={[
            "#2e2e2e",
            "#868e96",
            "#fa5252",
            "#e64980",
            "#be4bdb",
            "#7950f2",
            "#4c6ef5",
            "#228be6",
            "#15aabf",
            "#12b886",
            "#40c057",
            "#82c91e",
            "#fab005",
            "#fd7e14",
          ]}
        />
        <Button fullWidth mt="md" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }
}

export default ProjectForm;
