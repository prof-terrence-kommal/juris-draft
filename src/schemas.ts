import { z } from 'zod';

export const JurisdictionProfileSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  legalSystem: z.string().min(2),
  status: z.enum(['complete', 'experimental', 'stub']).default('experimental'),
  disclaimer: z.string().min(10),
  terminology: z.record(z.string()).default({}),
  draftingPreferences: z.object({
    spelling: z.string().default('en'),
    dateFormat: z.string().default('YYYY-MM-DD'),
    citationStyle: z.string().default('plain'),
    riskFlags: z.array(z.string()).default([])
  })
});

export const ToneProfileSchema = z.object({
  id: z.string().min(2),
  name: z.string().min(2),
  description: z.string().min(10),
  voiceRules: z.array(z.string()).default([]),
  avoid: z.array(z.string()).default([])
});

export const DraftFactsSchema = z.object({
  title: z.string().min(3),
  parties: z.array(z.object({
    name: z.string().min(1),
    role: z.string().min(1)
  })).default([]),
  background: z.string().min(1),
  objectives: z.array(z.string()).default([]),
  keyDates: z.array(z.object({ label: z.string(), date: z.string() })).default([]),
  requestedOutcome: z.string().optional(),
  customClauses: z.array(z.string()).default([])
});

export type JurisdictionProfile = z.infer<typeof JurisdictionProfileSchema>;
export type ToneProfile = z.infer<typeof ToneProfileSchema>;
export type DraftFacts = z.infer<typeof DraftFactsSchema>;

export interface DraftRequest {
  type: string;
  jurisdiction: string;
  tone: string;
  factsPath: string;
  outputPath?: string;
}

export interface DraftPacket {
  markdown: string;
  metadata: {
    type: string;
    jurisdiction: string;
    tone: string;
    generatedAt: string;
    warnings: string[];
  };
}
