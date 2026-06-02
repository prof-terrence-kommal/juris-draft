import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { listProfileIds, loadJurisdictionProfile, loadToneProfile } from '../src/profileLoader.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

describe('profiles', () => {
  it('loads jurisdiction profiles', () => {
    const profile = loadJurisdictionProfile('ZA', rootDir);
    expect(profile.name).toBe('South Africa');
    expect(profile.draftingPreferences.riskFlags.length).toBeGreaterThan(0);
  });

  it('loads tone profiles', () => {
    const tone = loadToneProfile('plain-english', rootDir);
    expect(tone.name).toBe('Plain English');
  });

  it('lists available profiles', () => {
    expect(listProfileIds('jurisdictions', rootDir)).toContain('ZA');
    expect(listProfileIds('tones', rootDir)).toContain('formal');
  });
});
