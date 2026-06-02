# Juris Draft

**Model-agnostic legal drafting infrastructure for jurisdiction-aware, tone-controlled first drafts.**

Juris Draft helps lawyers, legal technologists, law students, and access-to-justice builders create structured drafting packets using explicit jurisdiction, tone, document type, and human-review controls.

> Juris Draft is not a lawyer and does not provide legal advice. It produces structured first drafts and drafting packets for human review by qualified professionals.

![Terminal demo](docs/assets/terminal-demo.svg)

## Why model-agnostic?

Most legal drafting tools are thin wrappers around a single AI provider. Juris Draft keeps the core drafting structure separate from any model. The framework works with profiles, recipes, and facts first. Model providers can be added later as optional adapters, without making the project dependent on one API or vendor.

## Features

| Feature | Status |
| --- | --- |
| CLI draft generation | MVP |
| Jurisdiction profiles | MVP |
| Tone profiles | MVP |
| Markdown recipe templates | MVP |
| JSON fact inputs | MVP |
| Markdown outputs | MVP |
| Human-review warnings | MVP |
| Tests and GitHub Actions | MVP |
| DOCX export | Planned |
| Optional model adapters | Planned |

## Quick start

```bash
npm install
npm run build
npm run draft -- --type demand-letter --jurisdiction ZA --tone assertive --facts examples/late-payment.za.json --output outputs/late-payment.za.md
```

List available profiles:

```bash
npm run dev -- list jurisdictions
npm run dev -- list tones
```

## Example command

```bash
npm run draft -- \
  --type demand-letter \
  --jurisdiction ZA \
  --tone assertive \
  --facts examples/late-payment.za.json \
  --output outputs/late-payment.za.md
```

## Architecture

![Architecture](docs/assets/architecture.svg)

Juris Draft combines four inputs:

1. **Facts**: matter-specific inputs in JSON.
2. **Jurisdiction profile**: terminology, drafting conventions, risk flags, and disclaimers.
3. **Tone profile**: voice rules and language to avoid.
4. **Recipe**: document-specific drafting structure.

The output is a Markdown drafting packet with warnings and review notes.

## Supported MVP profiles

### Jurisdictions

- `ZA` — South Africa, experimental
- `UK-EW` — England and Wales, experimental
- `GENERIC-COMMON-LAW` — generic fallback, stub

### Tones

- `formal`
- `plain-english`
- `assertive`
- `conciliatory`
- `client-friendly`

### Recipes

- `demand-letter`
- `nda-outline`
- `settlement-proposal`
- `clause-redraft`

## Example facts file

```json
{
  "title": "Late Payment Demand Letter - ExampleCo v Sample Retail",
  "parties": [
    { "name": "ExampleCo (Pty) Ltd", "role": "Creditor / service provider" },
    { "name": "Sample Retail CC", "role": "Debtor / customer" }
  ],
  "background": "ExampleCo supplied software implementation services to Sample Retail under a signed statement of work.",
  "objectives": ["Request payment", "Preserve the relationship"],
  "requestedOutcome": "Payment within seven calendar days."
}
```

## Project structure

```text
juris-draft/
  src/                 # CLI, profile loader, validation, draft engine
  jurisdictions/       # Jurisdiction YAML profiles
  tones/               # Tone YAML profiles
  recipes/             # Drafting recipe Markdown files
  examples/            # Fictional sample facts
  outputs/             # Generated examples
  tests/               # Vitest tests
  docs/assets/         # README images and diagrams
```

## Legal and safety position

Juris Draft is drafting infrastructure. It is designed to make assumptions visible, keep jurisdiction and tone choices explicit, and route outputs toward human review. It does not verify legal accuracy, check current law, or replace professional judgement.

## Contributing

Contributions are welcome, especially:

- new jurisdiction profiles with conservative review warnings;
- improved drafting recipes;
- fictional sample facts;
- validation rules;
- export formats;
- documentation improvements.

See [CONTRIBUTING.md](CONTRIBUTING.md) and [ROADMAP.md](ROADMAP.md).

## License

MIT
