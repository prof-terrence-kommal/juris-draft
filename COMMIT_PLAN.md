# Suggested Commit Plan

Use real commits that correspond to real project improvements. This plan avoids a single large dump and creates a maintainable project history.

```text
chore: scaffold project metadata and repository docs
feat: add profile schemas and drafting engine
feat: add jurisdiction and tone profiles
feat: add legal drafting recipes and examples
test: add drafting and profile loader coverage
ci: add GitHub Actions test workflow
docs: add polished README and visual assets
docs: add generated sample outputs and roadmap
```

## Recommended public follow-up issues

Create these as GitHub issues after the first push:

1. `feat: add DOCX export for drafting packets`
2. `jurisdiction: add Kenya profile`
3. `jurisdiction: improve South Africa profile review checklist`
4. `recipe: add board resolution drafting recipe`
5. `recipe: add privacy notice outline`
6. `test: add validation for incomplete facts files`
7. `docs: add maintainer guide for reviewing jurisdiction profiles`
8. `feat: add provider adapter interface without default API dependency`

## Maintenance notes

Keep all examples fictional. Do not commit confidential client facts or live matter documents. Add legal-review warnings whenever a new jurisdiction profile or recipe could be mistaken for legal advice.
