# Maintenance Workflows

Juris Draft is maintained as a public, model-agnostic LegalTech project with transparent issues, pull requests, releases, and review practices.

## Issue triage

Issues should be reviewed for scope, legal-safety impact, example safety, and whether the work belongs in a recipe, jurisdiction profile, tone profile, CLI feature, or documentation update.

## Pull request review

Pull requests should be reviewed for focused scope, passing tests, dependency hygiene, fictional examples, model-agnostic design, human-review warnings, and documentation updates.

## Recipe review

Drafting recipe contributions should be checked for clear document purpose, fictional examples, no legal-advice claims, visible human-review warnings, and consistent Markdown output.

## Jurisdiction profile review

Jurisdiction profiles should include clear identifiers, appropriately scoped terminology, limitations, human-review warnings, and safe contribution notes.

## Release workflow

Before a release:

1. Review merged changes since the previous tag.
2. Run `npm test`.
3. Run `npm run build`.
4. Run `npm audit`.
5. Update `CHANGELOG.md`.
6. Confirm README examples still work.
7. Tag the release.
8. Publish GitHub release notes.

## AI-assisted maintenance

AI coding tools may be used for tests, documentation drafts, issue triage summaries, changelog drafts, release-note drafts, small refactors, and dependency review support.

AI-generated changes must still be reviewed by a human maintainer before merging.
