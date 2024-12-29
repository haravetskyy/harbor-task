import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  MantineColor,
  Modal,
  NavLink,
  TextInput,
  Title,
} from "@mantine/core";
import React, { Component } from "react";
import { SideBarProps, SideBarState } from "./SideBar.types.ts";
import ProjectForm from "../ProjectForm/ProjectForm.tsx";
import {
  IconBackspace,
  IconCalendarDot,
  IconChevronRight,
  IconGauge,
  IconHome2,
  IconPencilBolt,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import { Project } from "../ProjectForm/ProjectForm.types.ts";

class SideBar extends Component<SideBarProps, SideBarState> {
  state = {
    isModalOpen: false,
    projectToEdit: null,
  };

  toggleModal = (isOpen: boolean) => {
    this.setState((prevState) => ({
      ...prevState,
      isModalOpen: isOpen,
    }));
  };

  handleSectionClick = (sectionName: string) => {
    this.props.onSectionChange({ type: "section", value: sectionName });
  };

  handleProjectClick = (project: Project) => {
    this.props.onSectionChange({ type: "project", value: project });
  };

  handleEditProject = (project) => {
    this.setState({
      isModalOpen: true,
      projectToEdit: project,
    });
  };

  handleSaveProject = (project) => {
    console.log("Project to save:", project); // Debugging

    if (this.state.projectToEdit) {
      this.props.onEditProject(project);
    } else {
      this.props.onAddProject(project.name, project.emoji, project.color);
    }
    this.setState((prevState) => ({ ...prevState, projectToEdit: null }));
  };

  render() {
    const { userName, userProfileImg, projects } = this.props;
    const { isModalOpen, projectToEdit } = this.state;

    return (
      <Container className="w-full">
        <Flex
          position="apart"
          mb="md"
          mt="sm"
          className="w-full"
          justify="space-between"
          align="center"
        >
          <Group>
            <Avatar src={userProfileImg} alt="User Profile" />
            <Title order={6}>{userName}</Title>
          </Group>
        </Flex>

        <TextInput
          placeholder="Search"
          value=""
          leftSection={<IconSearch size="0.8rem" stroke={1.5} />}
          mb="md"
        />

        <NavLink
          href="#"
          label="All"
          onClick={() => this.handleSectionClick("All")}
          leftSection={<IconHome2 size="1rem" stroke={1.5} />}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
        <NavLink
          href="#"
          label="Today"
          onClick={() => this.handleSectionClick("Today")}
          leftSection={<IconCalendarDot size="1rem" stroke={1.5} />}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />

        <NavLink
          href="#"
          label="Upcoming"
          onClick={() => this.handleSectionClick("Upcoming")}
          leftSection={<IconGauge size="1rem" stroke={1.5} />}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />

        <Divider mt="sm" />

        <Button
          size="sm"
          justify="center"
          variant="light"
          fullWidth
          mt="xs"
          onClick={() => this.toggleModal(true)}
          rightSection={
            <IconPlus
              size="0.8rem"
              stroke={1.5}
              onClick={() => this.toggleModal(true)}
            />
          }
        >
          Add project
        </Button>
        <NavLink label="Projects" defaultOpened>
          {projects.map((project) => (
            <NavLink
              key={project.id}
              label={project.name}
              leftSection={
                <Badge
                  size="lg"
                  variant="light"
                  color={project?.color as MantineColor}
                >
                  {project.emoji}
                </Badge>
              }
              onClick={() => this.handleProjectClick(project)}
              rightSection={
                <Flex align="center" gap="sm">
                  <ActionIcon
                    size="xs"
                    variant="subtle"
                    onClick={() => this.handleEditProject(project)}
                  >
                    <IconPencilBolt size="1rem" stroke={1.5} />
                  </ActionIcon>
                  <ActionIcon
                    size="xs"
                    color="red"
                    variant="subtle"
                    onClick={(e) => {
                      e.stopPropagation();
                      this.props.onDeleteProject(project.id);
                    }}
                  >
                    <IconBackspace size="1rem" stroke={1.5} />
                  </ActionIcon>
                </Flex>
              }
            />
          ))}
        </NavLink>

        <Modal
          opened={isModalOpen}
          onClose={() => this.toggleModal(false)}
          title={projectToEdit ? "Edit Project" : "Add New Project"}
        >
          <ProjectForm
            onClose={() => this.toggleModal(false)}
            onSave={this.handleSaveProject}
            initialProject={projectToEdit}
          />
        </Modal>
      </Container>
    );
  }
}

export default SideBar;
