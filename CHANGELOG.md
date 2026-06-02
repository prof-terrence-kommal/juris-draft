# Changelog

All notable changes to this project will be documented in this file.

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
