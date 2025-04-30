import fs from 'fs'
import path from 'path'

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
