export interface Project {
  id: string;
  name: string;
  emoji?: string;
  color?: string;
}

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
