import Project from "../Project/ProjectInstance.tsx";

export interface ProjectFormProps {
  initialProject?: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}

export interface ProjectFormState {
  name: string;
  emoji: string;
  color: string;
}
