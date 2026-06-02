export type SupportedSourceJurisdiction = 'ZA';

export type LegalSourceLink = {
  name: string;
  description: string;
  homepageUrl: string;
  researchUrl: string;
  reviewNote: string;
};

export type SourceAssistantInput = {
  jurisdiction: SupportedSourceJurisdiction;
  query: string;
};

export type SourceAssistantPacket = {
  jurisdiction: SupportedSourceJurisdiction;
  query: string;
  generatedAt: string;
  sources: LegalSourceLink[];
  reviewChecklist: string[];
  markdown: string;
};

const SOUTH_AFRICAN_SOURCE_SITES = [
  {
    name: 'SAFLII',
    domain: 'saflii.org',
    homepageUrl: 'https://www.saflii.org/',
    description: 'Free public access to South African legal information, including case law and related legal materials.',
    reviewNote: 'Check court, date, citation, and whether the judgment is still good law.'
  },
  {
    name: 'AfricanLII',
    domain: 'africanlii.org',
    homepageUrl: 'https://africanlii.org/',
    description: 'Open access African legal information platform with legislation, judgments, and legal resources across jurisdictions.',
    reviewNote: 'Confirm jurisdiction, source collection, document date, and whether the result is primary or secondary material.'
  },
  {
    name: 'LawLibrary',
    domain: 'lawlibrary.org.za',
    homepageUrl: 'https://lawlibrary.org.za/',
    description: 'Public legal information platform with South African judgments and legal research materials.',
    reviewNote: 'Verify the court, neutral citation, judgment date, and any subsequent treatment before relying on a result.'
  }
] as const;

export function normaliseQuery(query: string): string {
  return query.trim().replace(/\s+/g, ' ');
}

export function createSiteSearchUrl(domain: string, query: string): string {
  const normalisedQuery = normaliseQuery(query);
  const searchQuery = `site:${domain} ${normalisedQuery}`;
  return `https://duckduckgo.com/?q=${encodeURIComponent(searchQuery)}`;
}

export function createSouthAfricanLegalSourcePacket(input: SourceAssistantInput): SourceAssistantPacket {
  if (input.jurisdiction !== 'ZA') {
    throw new Error(`Unsupported source-assistant jurisdiction "${input.jurisdiction}". Only ZA is currently supported.`);
  }

  const query = normaliseQuery(input.query);

  if (!query) {
    throw new Error('A non-empty legal research query is required.');
  }

  const sources = SOUTH_AFRICAN_SOURCE_SITES.map((source) => ({
    name: source.name,
    description: source.description,
    homepageUrl: source.homepageUrl,
    researchUrl: createSiteSearchUrl(source.domain, query),
    reviewNote: source.reviewNote
  }));

  const reviewChecklist = [
    'Confirm the source is public and appropriate for legal research.',
    'Check the court, tribunal, authority level, and jurisdiction.',
    'Check the judgment, legislation, or document date.',
    'Confirm whether the source is binding, persuasive, historical, amended, repealed, or otherwise limited.',
    'Check for later cases, amendments, appeals, or contrary authority.',
    'Do not treat generated drafting text or source links as legal advice.',
    'Have a qualified legal professional review any legal conclusion before use.'
  ];

  const generatedAt = new Date().toISOString();

  const markdown = renderSourceAssistantMarkdown({
    jurisdiction: input.jurisdiction,
    query,
    generatedAt,
    sources,
    reviewChecklist
  });

  return {
    jurisdiction: input.jurisdiction,
    query,
    generatedAt,
    sources,
    reviewChecklist,
    markdown
  };
}

export function renderSourceAssistantMarkdown(packet: Omit<SourceAssistantPacket, 'markdown'>): string {
  const sourceSections = packet.sources
    .map(
      (source) => `### ${source.name}

${source.description}

- Homepage: ${source.homepageUrl}
- Research link: ${source.researchUrl}
- Review note: ${source.reviewNote}`
    )
    .join('\n\n');

  const checklist = packet.reviewChecklist.map((item) => `- [ ] ${item}`).join('\n');

  return `# South African Legal Source Assistant

## Jurisdiction

${packet.jurisdiction}

## Research query

${packet.query}

## Purpose

This packet provides non-scraping public legal research links and human-review checks for South African legal research. It does not fetch, summarise, or verify legal authorities automatically.

## Suggested public research sources

${sourceSections}

## Human review checklist

${checklist}

## Responsible use note

This source-assist packet is not legal advice. It is a research starting point for a human reviewer. Always verify the currentness, authority, and legal relevance of any source before relying on it.
`;
}
