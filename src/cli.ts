#!/usr/bin/env node
import { Command } from 'commander';
import { createDraft } from './draftEngine.js';
import { listProfileIds } from './profileLoader.js';

const program = new Command();

program
  .name('juris-draft')
  .description('Model-agnostic legal drafting packets with jurisdiction and tone controls.')
  .version('0.1.0');

program.command('create')
  .description('Create a jurisdiction-aware legal drafting packet.')
  .requiredOption('-t, --type <type>', 'Draft type, matching a recipe filename without .md')
  .requiredOption('-j, --jurisdiction <id>', 'Jurisdiction profile id, for example ZA or UK-EW')
  .requiredOption('--tone <id>', 'Tone profile id, for example formal or plain-english')
  .requiredOption('-f, --facts <path>', 'Path to a JSON facts file')
  .option('-o, --output <path>', 'Write markdown output to a file')
  .action((options) => {
    try {
      const packet = createDraft({
        type: options.type,
        jurisdictionId: options.jurisdiction,
        toneId: options.tone,
        factsPath: options.facts,
        outputPath: options.output
      });

      if (options.output) {
        console.log(`Created draft packet: ${options.output}`);
      } else {
        console.log(packet.markdown);
      }

      if (packet.metadata.warnings.length) {
        console.error('\nReview warnings:');
        for (const warning of packet.metadata.warnings) {
          console.error(`- ${warning}`);
        }
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      console.error(`juris-draft error: ${message}`);
      process.exit(1);
    }
  });

program.command('list')
  .description('List available jurisdictions, tones, or recipes.')
  .argument('<kind>', 'jurisdictions | tones')
  .action((kind) => {
    if (kind !== 'jurisdictions' && kind !== 'tones') {
      console.error('Expected kind to be jurisdictions or tones.');
      process.exit(1);
    }
    for (const id of listProfileIds(kind)) {
      console.log(id);
    }
  });

program.parse();
