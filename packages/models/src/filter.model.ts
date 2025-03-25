import { z } from 'zod';
import { projectSchema } from './project.model';

const allowedSections = ['All', 'Today', 'Upcoming'] as const;

export type AllowedSection = (typeof allowedSections)[number];

const filterSectionSchema = z.object({
  type: z.literal('section'),
  value: z.enum(allowedSections),
});

const filterProjectSchema = z.object({
  type: z.literal('project'),
  value: projectSchema.shape.id,
});

export const filterSchema = z.union([filterSectionSchema, filterProjectSchema]);

export type Filter = z.infer<typeof filterSchema>;
