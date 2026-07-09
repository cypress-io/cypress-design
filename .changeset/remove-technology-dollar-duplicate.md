---
"@cypress-design/icon-registry": major
"@cypress-design/react-icon": major
"@cypress-design/vue-icon": major
---

**Breaking:** remove `technology-dollar` (`IconTechnologyDollar`) — it was a duplicate of `currency-usd` (`IconCurrencyUsd`), the correctly-named icon in the currency family (`currency-eur`, `currency-gbp`, `currency-inr`, `currency-rub`). `currency-usd` now ships at 24px in addition to 16px. Consumers of `IconTechnologyDollar` should switch to `IconCurrencyUsd`.
