import fs from 'fs'
import path from 'path'
import {
  clearOutputDirectory,
  copyNonJsTsFiles,
  getAllJsTsFiles,
} from './transpile/fs-utils.js'
import { BuildOptions, validateBuildOptions } from './transpile/build-config.js'
import { transpileFile } from './transpile/transpiler.js'

export function buildProject(options: BuildOptions) {
  const { inputPath, outputPath, skipClean = false } = options

  validateBuildOptions(options)

  // Clear the output directory before starting unless skipClean is true
  if (!skipClean) {
    clearOutputDirectory(outputPath)
  }

  // Copy non-JS/TS files first
  copyNonJsTsFiles(inputPath, outputPath)

  const entryFiles = getAllJsTsFiles(inputPath)

  if (entryFiles.length === 0) {
    console.error(
      `❌ [PackMC Error] No .js or .ts files found in "${inputPath}".`,
    )
    process.exit(1)
  }

  entryFiles.forEach((entryFile) => {
    const relative = path.relative(inputPath, entryFile)
    const outFile = path
      .join(outputPath, relative)
      .replace(/\.(js|ts)$/, '.mcfunction')

    const lines = transpileFile(entryFile, outputPath)

    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, lines.join('\n'), 'utf-8')
    console.log(`✅ ${relative} → ${path.relative(process.cwd(), outFile)}`)
  })
}
