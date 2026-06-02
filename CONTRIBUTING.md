# Contributing to Juris Draft

Thanks for helping improve jurisdiction-aware legal drafting infrastructure.

## Good first contributions

- Add or improve a tone profile.
- Add a sample facts file using fictional data.
- Improve a drafting recipe.
- Add validation tests.
- Draft a jurisdiction profile with clear review warnings.

## Jurisdiction profile rules

Jurisdiction profiles must be conservative. They should describe drafting preferences, terminology, formatting, and risk flags. They should not claim to be complete statements of law.

## Development

```bash
npm install
npm run build
npm test
npm run draft -- --type demand-letter --jurisdiction ZA --tone assertive --facts examples/late-payment.za.json --output outputs/late-payment.za.md
```

## Pull request checklist

- Uses fictional example data only.
- Adds tests when behaviour changes.
- Keeps legal review warnings visible.
- Avoids unverified claims of enforceability or legal correctness.
