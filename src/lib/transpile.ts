import fs from "fs";
import path from "path";
import * as babel from "@babel/parser";
import { getAllJsTsFiles } from "./fs-utils.js";
import _traverse from "@babel/traverse";
const traverse = _traverse.default;

const visitedCache = new Set();

function copyNonJsTsFiles(inputPath: string, outputPath: string) {
  const files = fs.readdirSync(inputPath, { withFileTypes: true });

  for (const file of files) {
    const sourcePath = path.join(inputPath, file.name);
    const relativePath = path.relative(inputPath, sourcePath);
    const destPath = path.join(outputPath, relativePath);

    if (file.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyNonJsTsFiles(sourcePath, outputPath);
    } else if (!file.name.endsWith(".js") && !file.name.endsWith(".ts")) {
      fs.mkdirSync(path.dirname(destPath), { recursive: true });
      fs.copyFileSync(sourcePath, destPath);
      console.log(
        `📄 ${relativePath} → ${path.relative(process.cwd(), destPath)}`
      );
    }
  }
}

export function buildProject(inputPath: string, outputPath: string) {
  if (!fs.existsSync(inputPath)) {
    console.error(
      `❌ [PackMC Error] Input path "${inputPath}" does not exist.`
    );
    process.exit(1);
  }

  // Copy non-JS/TS files first
  copyNonJsTsFiles(inputPath, outputPath);

  const entryFiles = getAllJsTsFiles(inputPath);

  if (entryFiles.length === 0) {
    console.error(
      `❌ [PackMC Error] No .js or .ts files found in "${inputPath}".`
    );
    process.exit(1);
  }

  entryFiles.forEach((entryFile) => {
    visitedCache.clear();

    const relative = path.relative(inputPath, entryFile);
    const outFile = path
      .join(outputPath, relative)
      .replace(/\.(js|ts)$/, ".mcfunction");

    const lines = transpileFile(entryFile, outputPath);

    fs.mkdirSync(path.dirname(outFile), { recursive: true });
    fs.writeFileSync(outFile, lines.join("\n"), "utf-8");
    console.log(`✅ ${relative} → ${path.relative(process.cwd(), outFile)}`);
  });
}

function transpileFile(
  filepath: string,
  outputPath: string,
  lines: string[] = []
): string[] {
  const resolvedPath = path.resolve(filepath);
  if (visitedCache.has(resolvedPath)) return lines;
  visitedCache.add(resolvedPath);

  const code = fs.readFileSync(resolvedPath, "utf-8");
  const ast = babel.parse(code, {
    sourceType: "module",
    plugins: ["typescript"],
  });

  traverse(ast, {
    ImportDeclaration({ node }) {
      const importPath = node.source.value;
      const fullImportPath = resolveImport(resolvedPath, importPath);
      transpileFile(fullImportPath, outputPath, lines);
    },
    ExpressionStatement({ node }) {
      if (
        node.expression.type === "CallExpression" &&
        node.expression.callee.type === "MemberExpression" &&
        node.expression.callee.object.type === "Identifier" &&
        node.expression.callee.object.name === "console" &&
        node.expression.callee.property.type === "Identifier" &&
        node.expression.callee.property.name === "log"
      ) {
        const arg = node.expression.arguments[0];
        if (arg.type === "StringLiteral") {
          lines.push(`say ${arg.value}`);
        }
      }
    },
  });

  return lines;
}

function resolveImport(currentFile: string, importPath: string) {
  let base = path.resolve(path.dirname(currentFile), importPath);
  if (!/\.(js|ts)$/.test(base)) {
    if (fs.existsSync(base + ".ts")) return base + ".ts";
    if (fs.existsSync(base + ".js")) return base + ".js";
  }
  return base;
}
