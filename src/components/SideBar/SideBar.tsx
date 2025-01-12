
import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Modal,
  NavLink,
  TextInput,
  Title,
} from "@mantine/core";
import React, { useState } from "react";
import { SideBarProps } from "./SideBar.types";
import ProjectForm from "../ProjectForm/ProjectForm";
import {
  IconCalendarDot,
  IconChevronRight,
  IconGauge,
  IconHome2,
  IconPlus,
  IconSearch,
} from "@tabler/icons-react";
import ProjectInstance from "../Project/ProjectInstance";
import { Project } from "../Project/Project.types";

const SideBar: React.FC<SideBarProps> = ({
  userName,
  userProfileImg,
  projects,
  onSectionChange,
  onAddProject,
  onEditProject,
  onDeleteProject,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);

  const toggleModal = (isOpen: boolean) => {
    setIsModalOpen(isOpen);
    if (!isOpen) setProjectToEdit(null);
  };

  const handleSectionClick = (sectionName: string) => {
    onSectionChange({ type: "section", value: sectionName });
  };

  const handleProjectClick = (project: Project) => {
    onSectionChange({ type: "project", value: project });
  };

  const handleEditProject = (project: Project) => {
    setIsModalOpen(true);
    setProjectToEdit(project);
  };

  const handleSaveProject = (project: Project) => {
    if (projectToEdit) {
      onEditProject(project);
    } else {
      onAddProject(project.name, project.emoji, project.color);
    }
    setProjectToEdit(null);
    setIsModalOpen(false);
  };

  return (
    <Container className="w-full">
      <Flex
        mb="md"
        mt="sm"
        className="w-full"
        justify="space-between"
        align="center"
      >
        <Group gap={16}>
          <Avatar src={userProfileImg} alt="User Profile" />
          <Title order={6}>{userName}</Title>
        </Group>
      </Flex>

      <TextInput
        placeholder="Search"
        leftSection={<IconSearch size="0.8rem" stroke={1.5} />}
        mb="md"
      />

      <NavLink
        href="#"
        label="All"
        onClick={() => handleSectionClick("All")}
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
        onClick={() => handleSectionClick("Today")}
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
        onClick={() => handleSectionClick("Upcoming")}
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
        onClick={() => toggleModal(true)}
        rightSection={
          <IconPlus
            size="0.8rem"
            stroke={1.5}
            onClick={() => toggleModal(true)}
          />
        }
      >
        Add project
      </Button>

      <NavLink label="Projects" defaultOpened>
        {projects.map((project) => (
          <ProjectInstance
            key={project.id}
            project={project}
            onEdit={handleEditProject}
            onDelete={onDeleteProject}
            onClick={() => handleProjectClick(project)}
          />
        ))}
      </NavLink>

      <Modal
        opened={isModalOpen}
        onClose={() => toggleModal(false)}
        title={projectToEdit ? "Edit Project" : "Add New Project"}
      >
        <ProjectForm
          onClose={() => toggleModal(false)}
          onSave={handleSaveProject}
          initialProject={projectToEdit}
        />
      </Modal>
    </Container>
  );
};

export default SideBar;
