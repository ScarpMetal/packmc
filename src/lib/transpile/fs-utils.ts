import fs from 'fs'
import path from 'path'

export function clearOutputDirectory(outputPath: string) {
  if (fs.existsSync(outputPath)) {
    // Remove all files and directories in the output path
    const files = fs.readdirSync(outputPath)
    for (const file of files) {
      const filePath = path.join(outputPath, file)
      if (fs.lstatSync(filePath).isDirectory()) {
        fs.rmSync(filePath, { recursive: true, force: true })
      } else {
        fs.unlinkSync(filePath)
      }
    }
    console.log(`🧹 Cleared output directory: ${outputPath}`)
  }
}

export function copyNonJsTsFiles(inputPath: string, outputPath: string) {
  const files = fs.readdirSync(inputPath, { withFileTypes: true })

  for (const file of files) {
    const sourcePath = path.join(inputPath, file.name)
    const relativePath = path.relative(inputPath, sourcePath)
    const destPath = path.join(outputPath, relativePath)

    if (file.isDirectory()) {
      // Create the directory in the output path
      fs.mkdirSync(destPath, { recursive: true })
      // Recursively process the directory
      copyNonJsTsFiles(sourcePath, path.join(outputPath, file.name))
    } else if (!file.name.endsWith('.js') && !file.name.endsWith('.ts')) {
      // Ensure the parent directory exists
      fs.mkdirSync(path.dirname(destPath), { recursive: true })
      // Copy the file
      fs.copyFileSync(sourcePath, destPath)
      console.log(
        `📄 ${relativePath} → ${path.relative(process.cwd(), destPath)}`,
      )
    }
  }
}

export function getAllJsTsFiles(
  dir: string,
  fileList: string[] = [],
): string[] {
  const files = fs.readdirSync(dir)

  for (const file of files) {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      getAllJsTsFiles(fullPath, fileList)
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.ts')) {
      fileList.push(fullPath)
    }
  }

  return fileList
}
