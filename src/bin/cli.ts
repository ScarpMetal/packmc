#!/usr/bin/env node

import { buildProject } from '../lib/index.js'
import { loadConfig } from '../lib/config.js'

const config = loadConfig(process.argv.slice(2))

buildProject(config)
