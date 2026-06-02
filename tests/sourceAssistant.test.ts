import { describe, expect, it } from 'vitest';
import { createSiteSearchUrl, createSouthAfricanLegalSourcePacket, normaliseQuery } from '../src/sourceAssistant.js';

describe('sourceAssistant', () => {
  it('normalises legal research queries', () => {
    expect(normaliseQuery('  mora   interest   late payment  ')).toBe('mora interest late payment');
  });

  it('creates site-search URLs without scraping source websites', () => {
    const url = createSiteSearchUrl('saflii.org', 'mora interest');
    expect(url).toContain('duckduckgo.com');
    expect(decodeURIComponent(url)).toContain('site:saflii.org mora interest');
  });

  it('creates a South African legal source-assist packet', () => {
    const packet = createSouthAfricanLegalSourcePacket({
      jurisdiction: 'ZA',
      query: 'mora interest late payment demand letter'
    });

    expect(packet.jurisdiction).toBe('ZA');
    expect(packet.sources.map((source) => source.name)).toContain('SAFLII');
    expect(packet.sources.map((source) => source.name)).toContain('AfricanLII');
    expect(packet.sources.map((source) => source.name)).toContain('LawLibrary');
    expect(packet.markdown).toContain('South African Legal Source Assistant');
    expect(packet.markdown).toContain('Human review checklist');
    expect(packet.markdown).toContain('not legal advice');
  });

  it('throws for unsupported jurisdictions', () => {
    expect(() =>
      createSouthAfricanLegalSourcePacket({
        jurisdiction: 'UK' as 'ZA',
        query: 'contract interpretation'
      })
    ).toThrow(/Unsupported source-assistant jurisdiction/);
  });

  it('throws for empty queries', () => {
    expect(() =>
      createSouthAfricanLegalSourcePacket({
        jurisdiction: 'ZA',
        query: '   '
      })
    ).toThrow(/non-empty legal research query/);
  });
});
