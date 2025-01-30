import { Filter, Project } from "@harbor-task/models";
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
import React, { useState } from "react";
import getInitials from "../../lib/getInitials";
import { useAddProject, useDeleteProject, useEditProject, useProjects } from "../hooks/useProjects";
import { useUser } from "../hooks/useUser";
import ProjectForm from "./ProjectForm";
import ProjectItem from "./ProjectItem";

const SECTIONS = [
  { label: "All", icon: <IconHome2 size="1rem" stroke={1.5} /> },
  { label: "Today", icon: <IconCalendarDot size="1rem" stroke={1.5} /> },
  { label: "Upcoming", icon: <IconGauge size="1rem" stroke={1.5} /> },
];

type SideBarProps = {
  onSectionChange: (section: Filter) => void;
};

const SideBar: React.FC<SideBarProps> = ({ onSectionChange }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | null>(null);
  const { data: user } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const addProjectMutation = useAddProject();
  const editProjectMutation = useEditProject();
  const deleteProjectMutation = useDeleteProject();

  const userFullName = `${user?.firstName} ${user?.lastName}`;

  const handleProjectSave = (project: Project) => {
    if (projectToEdit) {
      editProjectMutation.mutate({ userId: user?.id, project });
    } else {
      addProjectMutation.mutate({
        userId: user?.id,
        project: {
          name: project.name,
          emoji: project.emoji,
          color: project.color,
          userId: user?.id,
        },
      });
    }
    toggleModal(false);
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProjectMutation.mutate({ userId: user?.id, projectId });
  };

  const toggleModal = (isOpen: boolean, project: Project | null = null) => {
    setIsModalOpen(isOpen);
    setProjectToEdit(project);
  };

  const handleSectionClick = (sectionName: "All" | "Upcoming" | "Today") => {
    onSectionChange({ type: "section", value: sectionName });
  };

  return (
    <Container className="w-full">
      <Flex mb="md" mt="sm" justify="space-between" align="center">
        <Group gap={16}>
          <Avatar src={user?.avatarUrl} alt={userFullName} color="initials">
            {getInitials(userFullName)}
          </Avatar>
          <Title order={6}>{userFullName}</Title>
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
            <IconChevronRight size="0.8rem" stroke={1.5} className="mantine-rotate-rtl" />
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
        rightSection={<IconPlus size="0.8rem" stroke={1.5} />}>
        Add project
      </Button>

      <NavLink label="Projects" defaultOpened>
        {projects.map((project) => (
          <ProjectItem
            key={project.id}
            project={project}
            onEdit={() => toggleModal(true, project)}
            onDelete={handleDeleteProject}
            onClick={() => onSectionChange({ type: "project", value: project })}
          />
        ))}
      </NavLink>

      <Modal
        opened={isModalOpen}
        onClose={() => toggleModal(false)}
        title={projectToEdit ? "Edit Project" : "Add New Project"}>
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
