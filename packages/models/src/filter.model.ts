import { z } from 'zod';
import { ProjectSchema } from './project.model';

const allowedSections = ['All', 'Today', 'Upcoming'] as const;

export type AllowedSection = (typeof allowedSections)[number];

const FitlerSectionSchema = z.object({
  type: z.literal('section'),
  value: z.enum(allowedSections),
});

const FilterProjectSchema = z.object({
  type: z.literal('project'),
  value: ProjectSchema.shape.id,
});

export const FilterSchema = z.union([FitlerSectionSchema, FilterProjectSchema]);

export type Filter = z.infer<typeof FilterSchema>;
