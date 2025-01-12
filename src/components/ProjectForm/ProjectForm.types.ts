import { Project } from "../Project/Project.types";

export interface ProjectFormProps {
  initialProject?: Project;
  onClose: () => void;
  onSave: (project: Project) => void;
}
