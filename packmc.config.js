/** @type {import('./src/lib/config').PackMCConfig} */
export default {
  // Path to your input pack directory
  inputPath: 'example/pack',

  // Path where the compiled pack will be output
  outputPath: 'dist/pack',

  // Skip cleaning the output directory before building
  skipClean: false,

  // Allow output to project root or src directory (not recommended)
  allowDangerousOutput: false,
}; 