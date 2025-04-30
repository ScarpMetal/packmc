import path from 'path'
import fs from 'fs'
import { createRequire } from 'module'

export interface PackMCConfig {
  inputPath: string
  outputPath: string
  skipClean?: boolean
  allowDangerousOutput?: boolean
}

export function loadConfig(args: string[]): PackMCConfig {
  // First try to load from config file
  const configPath = path.resolve(process.cwd(), 'packmc.config.js')
  let config: Partial<PackMCConfig> = {}

  if (fs.existsSync(configPath)) {
    try {
      // Use the current file's directory as the base for require
      const require = createRequire(path.resolve(process.cwd(), 'package.json'))
      const loadedConfig = require(configPath)
      config = loadedConfig.default || loadedConfig
    } catch (error) {
      console.warn('Failed to load packmc.config.js:', error)
    }
  }

  // Override with command line arguments
  const getArg = (key: string, defaultVal: string) => {
    const idx = args.indexOf(`--${key}`)
    return idx !== -1
      ? path.resolve(process.cwd(), args[idx + 1])
      : path.resolve(process.cwd(), defaultVal)
  }

  return {
    inputPath: getArg('input', config.inputPath || 'src/pack'),
    outputPath: getArg('output', config.outputPath || 'dist'),
    skipClean: args.includes('--no-clean') || Boolean(config.skipClean),
    allowDangerousOutput:
      args.includes('--allow-dangerous-output') ||
      Boolean(config.allowDangerousOutput),
  }
}
