#!/usr/bin/env node

import path from 'path'
import { buildProject } from '../lib/transpile.js'

const args = process.argv.slice(2)
const getArg = (key: string, defaultVal: string) => {
  const idx = args.indexOf(`--${key}`)
  return idx !== -1
    ? path.resolve(process.cwd(), args[idx + 1])
    : path.resolve(process.cwd(), defaultVal)
}

const inputPath = getArg('input', 'src/pack')
const outputPath = getArg('output', 'dist')
const skipClean = args.includes('--no-clean')
const allowDangerousOutput = args.includes('--allow-dangerous-output')

buildProject({
  inputPath,
  outputPath,
  skipClean,
  allowDangerousOutput,
})
