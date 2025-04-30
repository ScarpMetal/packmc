import fs from 'fs'
import path from 'path'
import * as babel from '@babel/parser'
import _traverse from '@babel/traverse'
import { resolveImport } from './import-resolver.js'
const traverse = _traverse.default

const visitedCache = new Set()

export function transpileFile(
  filepath: string,
  outputPath: string,
  lines: string[] = [],
): string[] {
  const resolvedPath = path.resolve(filepath)
  if (visitedCache.has(resolvedPath)) return lines
  visitedCache.add(resolvedPath)

  const code = fs.readFileSync(resolvedPath, 'utf-8')
  const ast = babel.parse(code, {
    sourceType: 'module',
    plugins: ['typescript'],
  })

  traverse(ast, {
    ImportDeclaration({ node }) {
      const importPath = node.source.value
      const fullImportPath = resolveImport(resolvedPath, importPath)
      transpileFile(fullImportPath, outputPath, lines)
    },
    ExpressionStatement({ node }) {
      if (
        node.expression.type === 'CallExpression' &&
        node.expression.callee.type === 'MemberExpression' &&
        node.expression.callee.object.type === 'Identifier' &&
        node.expression.callee.object.name === 'console' &&
        node.expression.callee.property.type === 'Identifier' &&
        node.expression.callee.property.name === 'log'
      ) {
        const arg = node.expression.arguments[0]
        if (arg.type === 'StringLiteral') {
          lines.push(`say ${arg.value}`)
        }
      }
    },
  })

  return lines
}
