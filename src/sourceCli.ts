#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';
import { Command } from 'commander';
import { createSouthAfricanLegalSourcePacket, type SupportedSourceJurisdiction } from './sourceAssistant.js';

const program = new Command();

program
  .name('juris-draft-sources')
  .description('Generate non-scraping legal source-assist packets for public legal research.')
  .requiredOption('-j, --jurisdiction <jurisdiction>', 'Jurisdiction code. Currently supports ZA.')
  .requiredOption('-q, --query <query>', 'Legal research query.')
  .option('-o, --output <path>', 'Write Markdown output to a file.');

program.parse(process.argv);

const options = program.opts<{
  jurisdiction: string;
  query: string;
  output?: string;
}>();

const packet = createSouthAfricanLegalSourcePacket({
  jurisdiction: options.jurisdiction as SupportedSourceJurisdiction,
  query: options.query
});

if (options.output) {
  const outputPath = path.resolve(process.cwd(), options.output);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, packet.markdown, 'utf8');
  console.log(`Wrote source-assist packet to ${outputPath}`);
} else {
  console.log(packet.markdown);
}
