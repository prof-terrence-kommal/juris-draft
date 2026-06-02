import fs from 'node:fs';
import path from 'node:path';
import { type DraftFacts, type JurisdictionProfile } from './schemas.js';

export function validateRecipe(type: string, rootDir = process.cwd()): string {
  const recipePath = path.join(rootDir, 'recipes', `${type}.md`);
  if (!fs.existsSync(recipePath)) {
    throw new Error(`Unsupported draft type "${type}". Add recipes/${type}.md to support it.`);
  }
  return recipePath;
}

export function collectWarnings(profile: JurisdictionProfile, facts: DraftFacts): string[] {
  const warnings: string[] = [];

  if (profile.status !== 'complete') {
    warnings.push(`Jurisdiction profile ${profile.id} is marked ${profile.status}; human legal review is required.`);
  }

  if (facts.parties.length < 2) {
    warnings.push('Facts include fewer than two parties; many legal documents require clearer party identification.');
  }

  if (!facts.requestedOutcome) {
    warnings.push('No requestedOutcome provided; the draft may need a clearer remedy or next step.');
  }

  warnings.push(...profile.draftingPreferences.riskFlags);
  return warnings;
}
