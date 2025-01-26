import { z } from 'zod';
import { ProjectSchema } from './project.model';

const allowedSections = ['All', 'Today', 'Upcoming'] as const;

const RegularSectionSchema = z.object({
  type: z.literal('section'),
  value: z.enum(allowedSections),
});

const ProjectSectionSchema = z.object({
  type: z.literal('project'),
  value: ProjectSchema.shape.id,
});

export const SectionSchema = z.union([
  RegularSectionSchema,
  ProjectSectionSchema,
]);

export type Section = z.infer<typeof SectionSchema>;
