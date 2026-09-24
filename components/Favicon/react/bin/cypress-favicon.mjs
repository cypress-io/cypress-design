#!/usr/bin/env node
// Package managers only expose commands from packages installed directly, so
// this re-exposes @cypress-design/favicon's copy command from the component
// package -- installing the component is then the only install a site needs.
import '@cypress-design/favicon/cli'
