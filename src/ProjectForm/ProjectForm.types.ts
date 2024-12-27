export interface Project {
  id: string;
  name: string;
  emoji: string;
}

export interface ProjectFormProps {
  initialProject?: { id: string; name: string; emoji: string };
  onClose: () => void;
  onSave: (project: { id: string; name: string; emoji: string }) => void;
}

export interface ProjectFormState {
  name: string;
  emoji: string;
}
