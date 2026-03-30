---
"@cypress-design/css": breaking
---

Add `@cypress-design/css/tailwind` entry point for TailwindConfig and TailwindIconExtractor exports. These Node.js-only exports have been moved out of the main entry point so that browser bundlers (like Vite) no longer need to stub `process.env` and `tty` when consuming `@cypress-design/css`.

Consumers using `TailwindConfig` or `TailwindIconExtractor` should update their imports:

```diff
- const { TailwindConfig } = require('@cypress-design/css')
+ const { TailwindConfig } = require('@cypress-design/css/tailwind')
```
