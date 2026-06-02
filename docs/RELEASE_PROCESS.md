# Release Process

This document describes the lightweight release process for Juris Draft.

## Release types

- Patch release: documentation updates, test coverage, small fixes, and maintenance improvements.
- Minor release: new recipes, profiles, CLI options, validation features, or provider adapter interfaces.
- Major release: breaking changes to CLI behavior, schemas, output structure, or public APIs.

## Pre-release checklist

- [ ] All intended pull requests are merged.
- [ ] `npm test` passes.
- [ ] `npm run build` passes.
- [ ] `npm audit` passes.
- [ ] `CHANGELOG.md` is updated.
- [ ] README examples remain accurate.
- [ ] Generated sample outputs are safe and fictional.
- [ ] Human-review warnings remain visible.

## Creating a release

```bash
git checkout main
git pull
npm test
npm run build
npm audit
git tag v0.1.2
git push origin v0.1.2
gh release create v0.1.2 --title "v0.1.2 - Release title" --notes "Release notes."
