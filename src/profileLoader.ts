import fs from 'node:fs';
import path from 'node:path';
import yaml from 'js-yaml';
import {
  JurisdictionProfileSchema,
  ToneProfileSchema,
  type JurisdictionProfile,
  type ToneProfile
} from './schemas.js';

export function readYamlFile<T>(filePath: string): T {
  if (!fs.existsSync(filePath)) {
    throw new Error(`Profile not found: ${filePath}`);
  }

  const raw = fs.readFileSync(filePath, 'utf8');
  return yaml.load(raw) as T;
}

export function loadJurisdictionProfile(id: string, rootDir = process.cwd()): JurisdictionProfile {
  const filePath = path.join(rootDir, 'jurisdictions', `${id}.yml`);

  if (!fs.existsSync(filePath)) {
    throw new Error(
      `Unsupported jurisdiction profile "${id}". Add jurisdictions/${id}.yml to support it.`
    );
  }

  return JurisdictionProfileSchema.parse(readYamlFile(filePath));
}

export function loadToneProfile(id: string, rootDir = process.cwd()): ToneProfile {
  const filePath = path.join(rootDir, 'tones', `${id}.yml`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`Unsupported tone profile "${id}". Add tones/${id}.yml to support it.`);
  }

  return ToneProfileSchema.parse(readYamlFile(filePath));
}

export function listProfileIds(folder: 'jurisdictions' | 'tones', rootDir = process.cwd()): string[] {
  const dir = path.join(rootDir, folder);

  if (!fs.existsSync(dir)) return [];

  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith('.yml'))
    .map((file) => file.replace(/\.yml$/, ''))
    .sort();
}