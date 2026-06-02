import fs from 'node:fs';
import path from 'node:path';
import { DraftFactsSchema, type DraftFacts, type DraftPacket, type JurisdictionProfile, type ToneProfile } from './schemas.js';
import { collectWarnings, validateRecipe } from './validators.js';
import { loadJurisdictionProfile, loadToneProfile } from './profileLoader.js';

function renderList(items: string[]): string {
  if (!items.length) return '- Not specified';
  return items.map((item) => `- ${item}`).join('\n');
}

function renderParties(facts: DraftFacts): string {
  if (!facts.parties.length) return '- Not specified';
  return facts.parties.map((party) => `- **${party.name}** — ${party.role}`).join('\n');
}

function renderDates(facts: DraftFacts): string {
  if (!facts.keyDates.length) return '- Not specified';
  return facts.keyDates.map((item) => `- **${item.label}:** ${item.date}`).join('\n');
}

export function loadFacts(factsPath: string): DraftFacts {
  if (!fs.existsSync(factsPath)) {
    throw new Error(`Facts file not found: ${factsPath}`);
  }
  const raw = JSON.parse(fs.readFileSync(factsPath, 'utf8'));
  return DraftFactsSchema.parse(raw);
}

export function renderDraftPacket(params: {
  type: string;
  jurisdiction: JurisdictionProfile;
  tone: ToneProfile;
  facts: DraftFacts;
  recipeText: string;
}): DraftPacket {
  const warnings = collectWarnings(params.jurisdiction, params.facts);
  const markdown = `# ${params.facts.title}

> Draft type: **${params.type}**  
> Jurisdiction: **${params.jurisdiction.name}**  
> Tone: **${params.tone.name}**  
> Generated: ${new Date().toISOString()}

## Human Review Notice

${params.jurisdiction.disclaimer}

## Drafting Tone

${params.tone.description}

**Voice rules**
${renderList(params.tone.voiceRules)}

**Avoid**
${renderList(params.tone.avoid)}

## Parties

${renderParties(params.facts)}

## Background

${params.facts.background}

## Objectives

${renderList(params.facts.objectives)}

## Key Dates

${renderDates(params.facts)}

## Requested Outcome

${params.facts.requestedOutcome ?? 'Not specified'}

## Drafting Recipe

${params.recipeText.trim()}

## Jurisdiction Notes

- Legal system: ${params.jurisdiction.legalSystem}
- Citation style: ${params.jurisdiction.draftingPreferences.citationStyle}
- Spelling: ${params.jurisdiction.draftingPreferences.spelling}
- Date format: ${params.jurisdiction.draftingPreferences.dateFormat}

## Custom Clauses or Instructions

${renderList(params.facts.customClauses)}

## Risk Flags

${renderList(warnings)}
`;

  return {
    markdown,
    metadata: {
      type: params.type,
      jurisdiction: params.jurisdiction.id,
      tone: params.tone.id,
      generatedAt: new Date().toISOString(),
      warnings
    }
  };
}

export function createDraft(options: {
  type: string;
  jurisdictionId: string;
  toneId: string;
  factsPath: string;
  outputPath?: string;
  rootDir?: string;
}): DraftPacket {
  const rootDir = options.rootDir ?? process.cwd();
  const recipePath = validateRecipe(options.type, rootDir);
  const jurisdiction = loadJurisdictionProfile(options.jurisdictionId, rootDir);
  const tone = loadToneProfile(options.toneId, rootDir);
  const facts = loadFacts(path.resolve(rootDir, options.factsPath));
  const recipeText = fs.readFileSync(recipePath, 'utf8');
  const packet = renderDraftPacket({ type: options.type, jurisdiction, tone, facts, recipeText });

  if (options.outputPath) {
    const destination = path.resolve(rootDir, options.outputPath);
    fs.mkdirSync(path.dirname(destination), { recursive: true });
    fs.writeFileSync(destination, packet.markdown, 'utf8');
  }

  return packet;
}
