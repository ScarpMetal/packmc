# PackMC

PackMC is a tool that transpiles JavaScript/TypeScript files to Minecraft `.mcfunction` files, making it easier to create and maintain Minecraft datapacks with modern programming features.

## Features

- Write Minecraft functions using JavaScript/TypeScript
- Modern development experience with TypeScript support
- Automatic transpilation to `.mcfunction` files
- Configurable build process
- Clean and maintainable code structure

## Getting Started

1. Create a new directory for your datapack project and initialize npm:

   ```bash
   mkdir my-datapack
   cd my-datapack
   npm init -y
   ```

2. Install PackMC:

   ```bash
   # Install globally
   npm install -g packmc

   # Or install as a dev dependency in your project
   npm install --save-dev packmc
   ```

3. Create a `packmc.config.js` file in your project root (optional)
4. Add a script to your package.json `"build": "packmc"`
5. Create a build by running `npm run build`
6. Your datapack will be found in the `dist` folder by default

## Configuration

You can configure PackMC with either a config file or CLI Flags

### Config File

Create a `packmc.config.js` file in your project root. Here's an example configuration with default values:

```javascript
/** @type {import('packmc').PackMCConfig} */
export default {
  inputPath: 'src/pack',
  outputPath: 'dist',
  skipClean: false,
  allowDangerousOutput: false,
}
```

If you don't provide a config file, PackMC will use the default values shown above. You can still override them using CLI flags.

### CLI Flags

- `--inputPath` (string): Path to your input pack directory containing your JS/TS files. Defaults to 'src/pack'
- `--outputPath` (string): Path where the compiled pack will be output. Defaults to 'dist'
- `--skipClean` (solo flag): Skip cleaning the output directory before building. Defaults to false
- `--allowDangerousOutput` (solo flag): Allow output to project root or src directory. Defaults to false

Example: `packmc --input src/pack --output dist --no-clean`

## Development

For development, can build the example pack:

```bash
npm run example
```

## License

[MIT](LICENSE)
