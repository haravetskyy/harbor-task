export type Project = {
  id: string;
  name: string;
  emoji?: string;
  color?: string;
};

export interface ProjectProps {
  project: Project;
  onEdit?: (project: Project) => void;
  onDelete?: (projectId: string) => void;
  onClick?: (project: Project) => void;
}

export interface ProjectState {
  isTruncated: boolean;
}
