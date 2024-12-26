export interface Project {
  id: string;
  name: string;
  emoji: string;
}

export interface ProjectFormProps {
  onClose: () => void;
  onSave: (project: Project) => void;
}

export interface ProjectFormState {
  name: string;
  emoji: string;
}
