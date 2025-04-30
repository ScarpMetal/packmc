import fs from 'fs'
import path from 'path'

export function resolveImport(currentFile: string, importPath: string): string {
  const base = path.resolve(path.dirname(currentFile), importPath)
  if (!/\.(js|ts)$/.test(base)) {
    if (fs.existsSync(base + '.ts')) return base + '.ts'
    if (fs.existsSync(base + '.js')) return base + '.js'
  }
  return base
}
