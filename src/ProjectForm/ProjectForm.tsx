import React, { Component } from "react";
import { Button, Select, TextInput } from "@mantine/core";
import { ProjectFormProps, ProjectFormState } from "./ProjectForm.types";
import { emojiOptions } from "../SideBar/emojiOptions.ts";

class ProjectForm extends Component<ProjectFormProps, ProjectFormState> {
  state: ProjectFormState = {
    name: "",
    emoji: "",
  };

  handleChange = (field: keyof ProjectFormState, value: string) => {
    this.setState({ [field]: value } as Pick<
      ProjectFormState,
      keyof ProjectFormState
    >);
  };

  handleSave = () => {
    const { onSave, onClose } = this.props;
    const { name, emoji } = this.state;

    if (!name) {
      alert("Project name is required!");
      return;
    }

    onSave({ id: Date.now().toString(), name, emoji: emoji || "📁" });
    onClose();
  };

  render() {
    const { name, emoji } = this.state;
    const { onClose } = this.props;

    return (
      <div>
        <TextInput
          label="Project Name"
          placeholder="Enter project name"
          value={name}
          onChange={(e) => this.handleChange("name", e.target.value)}
        />
        <Select
          label="Emoji (optional)"
          placeholder="Choose an emoji"
          mt="sm"
          data={emojiOptions}
          value={emoji}
          onChange={(value) => this.handleChange("emoji", value)}
        />
        <Button fullWidth mt="md" onClick={this.handleSave}>
          Save
        </Button>
      </div>
    );
  }
}

export default ProjectForm;
