import { createZodDto } from '@abitia/zod-dto';

import { z } from 'zod';

export const SearchSchema = z.object({
  query: z.string().optional(),
});

export class SearchDto extends createZodDto(SearchSchema) {}
