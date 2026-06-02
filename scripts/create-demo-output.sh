#!/usr/bin/env bash
set -euo pipefail

npm run draft -- --type demand-letter --jurisdiction ZA --tone assertive --facts examples/late-payment.za.json --output outputs/late-payment.za.md
npm run draft -- --type nda-outline --jurisdiction UK-EW --tone plain-english --facts examples/nda.basic.json --output outputs/nda.basic.md
