# Changelog

All notable changes to this project will be documented in this file.

## v0.1.2 - Maintainer workflow and governance polish

### Added

- Added `AGENTS.md` with guidance for AI coding agents and contributors.
- Added a pull request template with checks for tests, build, audit, fictional examples, human-review warnings, and model-agnostic design.
- Added a dependency audit GitHub Actions workflow.
- Added maintenance workflow documentation covering issue triage, pull request review, recipe review, jurisdiction profile review, release workflow, and AI-assisted maintenance.
- Added release process documentation.
- Added `CITATION.cff` for academic and professional citation metadata.
- Added a one-command demo script.
- Added generated demo output at `outputs/demo-late-payment.za.md`.

### Improved

- Improved repository governance and contributor orientation.
- Improved maintainer workflow visibility for testing, audit reporting, release discipline, and AI-assisted maintenance.
- Strengthened the repository’s model-agnostic and human-review-first positioning.

## v0.1.1 - Validation and usability improvements

### Added

- Added invalid-input test coverage for incomplete fact files, unsupported jurisdiction profiles, and unsupported tone profiles.

### Improved

- Improved unsupported profile error messages so users receive clearer guidance when a jurisdiction or tone profile is missing.

## v0.1.0 - Model-agnostic MVP

### Added

- Initial TypeScript CLI for generating structured legal drafting packets.
- Jurisdiction profiles for South Africa, England and Wales, and a generic common-law fallback.
- Tone profiles for formal, plain English, assertive, conciliatory, and client-friendly drafting.
- Drafting recipes for demand letters, NDA outlines, settlement proposals, and clause redrafts.
- Sample inputs and generated Markdown outputs.
- Validation, tests, GitHub Actions CI, contribution guide, roadmap, code of conduct, and security policy.
