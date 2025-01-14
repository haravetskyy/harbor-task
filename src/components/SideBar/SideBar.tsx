import React, { useState } from "react";
import {
  Avatar,
  Button,
  Container,
  Divider,
  Flex,
  Group,
  Modal,
  NavLink,
  Title,
} from "@mantine/core";
import {
  IconCalendarDot,
  IconChevronRight,
  IconGauge,
  IconHome2,
  IconPlus,
} from "@tabler/icons-react";
import { SideBarProps } from "./SideBar.types";
import ProjectForm from "../ProjectForm/ProjectForm";
import ProjectInstance from "../Project/ProjectInstance";
import { Project } from "../Project/Project.types";

const SECTIONS = [
  { label: "All", icon: <IconHome2 size="1rem" stroke={1.5} /> },
  { label: "Today", icon: <IconCalendarDot size="1rem" stroke={1.5} /> },
  { label: "Upcoming", icon: <IconGauge size="1rem" stroke={1.5} /> },
];

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

  const toggleModal = (isOpen: boolean, project: Project | null = null) => {
    setIsModalOpen(isOpen);
    setProjectToEdit(project);
  };

  const handleSectionClick = (sectionName: string) => {
    onSectionChange({ type: "section", value: sectionName });
  };

  const handleProjectSave = (project: Project) => {
    projectToEdit
      ? onEditProject(project)
      : onAddProject(project.name, project.emoji, project.color);
    toggleModal(false);
  };

  return (
    <Container className="w-full">
      <Flex mb="md" mt="sm" justify="space-between" align="center">
        <Group gap={16}>
          <Avatar src={userProfileImg} alt="User Profile" />
          <Title order={6}>{userName}</Title>
        </Group>
      </Flex>

      {SECTIONS.map(({ label, icon }) => (
        <NavLink
          key={label}
          label={label}
          href="#"
          onClick={() => handleSectionClick(label)}
          leftSection={icon}
          rightSection={
            <IconChevronRight
              size="0.8rem"
              stroke={1.5}
              className="mantine-rotate-rtl"
            />
          }
        />
      ))}

      <Divider mt="sm" />

      <Button
        size="sm"
        variant="light"
        fullWidth
        mt="xs"
        onClick={() => toggleModal(true)}
        rightSection={<IconPlus size="0.8rem" stroke={1.5} />}
      >
        Add project
      </Button>

      <NavLink label="Projects" defaultOpened>
        {projects.map((project) => (
          <ProjectInstance
            key={project.id}
            project={project}
            onEdit={() => toggleModal(true, project)}
            onDelete={onDeleteProject}
            onClick={() => onSectionChange({ type: "project", value: project })}
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
          onSave={handleProjectSave}
          initialProject={projectToEdit}
        />
      </Modal>
    </Container>
  );
};

export default SideBar;
