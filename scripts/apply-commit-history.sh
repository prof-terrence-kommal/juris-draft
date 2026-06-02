#!/usr/bin/env bash
set -euo pipefail

if [ -d .git ]; then
  echo "This directory is already a git repository. Aborting to avoid rewriting your history."
  exit 1
fi

git init
git branch -M main

git add package.json tsconfig.json .gitignore LICENSE SECURITY.md CODE_OF_CONDUCT.md CONTRIBUTING.md ROADMAP.md COMMIT_PLAN.md
git commit -m "chore: scaffold project metadata and repository docs"

git add src
git commit -m "feat: add profile schemas and drafting engine"

git add jurisdictions tones
git commit -m "feat: add jurisdiction and tone profiles"

git add recipes examples
git commit -m "feat: add legal drafting recipes and examples"

git add tests
git commit -m "test: add drafting and profile loader coverage"

git add .github
git commit -m "ci: add GitHub Actions and issue templates"

git add README.md docs/assets
git commit -m "docs: add polished README and visual assets"

git add outputs
git commit -m "docs: add generated sample drafting outputs"

echo "Commit history created. Add your GitHub remote and push:"
echo "  git remote add origin <your-repo-url>"
echo "  git push -u origin main"
