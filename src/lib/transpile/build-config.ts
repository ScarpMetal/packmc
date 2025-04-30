import fs from 'fs'
import path from 'path'

export interface BuildOptions {
  inputPath: string
  outputPath: string
  skipClean?: boolean
  allowDangerousOutput?: boolean
}

export function validateBuildOptions(options: BuildOptions) {
  const { inputPath, outputPath, allowDangerousOutput = false } = options

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ [PackMC Error] Input path "${inputPath}" does not exist.`)
    process.exit(1)
  }

  // Prevent using project root or src directory as output path unless explicitly allowed
  if (!allowDangerousOutput) {
    const projectRoot = process.cwd()
    const normalizedOutputPath = path.resolve(outputPath)
    const normalizedProjectRoot = path.resolve(projectRoot)
    const normalizedSrcPath = path.resolve(projectRoot, 'src')

    if (normalizedOutputPath === normalizedProjectRoot) {
      throw new Error(
        'Output path cannot be the project root directory. Use --allow-dangerous-output to override this safety check.',
      )
    }

    if (normalizedOutputPath === normalizedSrcPath) {
      throw new Error(
        'Output path cannot be the src directory. Use --allow-dangerous-output to override this safety check.',
      )
    }
  }
}
