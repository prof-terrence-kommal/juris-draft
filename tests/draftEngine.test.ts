import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { createDraft } from '../src/draftEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

describe('createDraft', () => {
  it('creates a markdown drafting packet with jurisdiction and tone controls', () => {
    const packet = createDraft({
      type: 'demand-letter',
      jurisdictionId: 'ZA',
      toneId: 'assertive',
      factsPath: 'examples/late-payment.za.json',
      rootDir
    });

    expect(packet.markdown).toContain('Late Payment Demand Letter');
    expect(packet.markdown).toContain('South Africa');
    expect(packet.markdown).toContain('Assertive');
    expect(packet.metadata.warnings.length).toBeGreaterThan(0);
  });

  it('throws for unsupported draft types', () => {
    expect(() => createDraft({
      type: 'unsupported-type',
      jurisdictionId: 'ZA',
      toneId: 'formal',
      factsPath: 'examples/late-payment.za.json',
      rootDir
    })).toThrow(/Unsupported draft type/);
  });
});
