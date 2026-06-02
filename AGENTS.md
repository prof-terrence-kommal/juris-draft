# AGENTS.md

Guidance for AI coding agents and contributors working on Juris Draft.

## Project purpose

Juris Draft is a model-agnostic LegalTech framework for jurisdiction-aware, tone-controlled legal drafting workflows.

The project generates structured drafting packets and workflow infrastructure. It does not provide legal advice and does not replace review by a qualified legal professional.

## Before making changes

Run these checks before opening a pull request:

- `npm test`
- `npm run build`
- `npm audit`

## Core principles

Agents and contributors must preserve these principles:

- keep the project model-agnostic and provider-neutral;
- do not introduce hard dependencies on a specific AI provider;
- keep examples fictional or clearly anonymised;
- do not add real client data, privileged legal facts, personal information, or confidential documents;
- preserve human-review warnings and legal-advice disclaimers;
- keep jurisdiction-specific content appropriately scoped;
- prefer small, focused pull requests;
- update tests and documentation when changing behavior.

## Safe contribution areas

Good areas for agent-assisted work include:

- tests and validation coverage;
- documentation improvements;
- issue triage summaries;
- release-note drafts;
- recipe formatting improvements;
- fictional examples;
- CLI usability improvements;
- dependency hygiene;
- GitHub Actions maintenance.

## High-risk areas

Use extra caution with:

- jurisdiction-specific legal content;
- claims about legal accuracy;
- privacy or confidentiality handling;
- generated outputs that could be mistaken for legal advice;
- provider integrations that send user content to external APIs.

## Pull request checklist

Before proposing a change, confirm:

- [ ] Tests pass.
- [ ] Build passes.
- [ ] `npm audit` returns no known vulnerabilities.
- [ ] Examples are fictional or anonymised.
- [ ] Human-review warnings remain visible.
- [ ] Documentation is updated where relevant.
- [ ] The project remains model-agnostic.
