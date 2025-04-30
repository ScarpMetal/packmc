#!/usr/bin/env node

import { buildProject } from '../lib/transpile.js'
import { loadConfig } from '../lib/config.js'

const config = loadConfig(process.argv.slice(2))

buildProject(config)
