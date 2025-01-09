export type TaskStatus = 'BACKLOG' | 'TODO' | 'IN_PROGRESS' | 'DONE';

export type Column = {
  id: TaskStatus;
  title: string;
  color: string;
  icon: React.ComponentType<{ className?: string }>;
};