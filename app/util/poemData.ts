import { z } from "zod";

export const PoemDataSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  justifyDirection: z.enum(['START', 'CENTER', 'END']),
  date: z.union([
    z.string(),
    z.date()
  ]).pipe(z.coerce.date()),
  published: z.union([
    z.boolean(),
    z.string().toLowerCase().transform(x => JSON.parse(x)).pipe(z.boolean())
  ]),
  precedence: z.coerce.number().int(),
  deletedOn: z.date().optional()
});

export type PoemData = {
  title: string;
  content: string;
  justifyDirection: 'START' | 'CENTER' | 'END';
  date: Date;
  published: boolean;
  precedence: number;
  deletedOn?: Date;
};
