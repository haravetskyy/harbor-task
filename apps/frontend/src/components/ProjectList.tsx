import { useFilter } from "@/components/FilterContext";
import ProjectForm from "@/components/ProjectForm";
import ProjectItem from "@/components/ProjectItem";
import { useAddProject, useDeleteProject, useEditProject, useProjects } from "@/hooks/useProjects";
import { useUser } from "@/hooks/useUser";
import { Project } from "@harbor-task/models";
import { Button, Modal, NavLink } from "@mantine/core";
import { IconPlus } from "@tabler/icons-react";
import { useState } from "react";

export const ProjectList: React.FC = () => {
  const { data: user } = useUser();
  const { data: projects = [] } = useProjects(user?.id);
  const { setSelectedFilter } = useFilter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projectToEdit, setProjectToEdit] = useState<Project | undefined>(undefined);
  const deleteProjectMutation = useDeleteProject();
  const addProjectMutation = useAddProject();
  const editProjectMutation = useEditProject();

  const toggleModal = (isOpen: boolean, project: Project | undefined = undefined) => {
    setIsModalOpen(isOpen);
    setProjectToEdit(project);
  };

  const handleDeleteProject = (projectId: string) => {
    deleteProjectMutation.mutate({ userId: user?.id, projectId });
  };

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

  return (
    <>
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
            onClick={() => setSelectedFilter({ type: "project", value: project.id })}
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
    </>
  );
};
