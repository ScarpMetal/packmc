# PackMC

PackMC is a tool that transpiles JavaScript/TypeScript files to Minecraft `.mcfunction` files, making it easier to create and maintain Minecraft datapacks with modern programming features.

## Features

- Write Minecraft functions using JavaScript/TypeScript
- Modern development experience with TypeScript support
- Automatic transpilation to `.mcfunction` files
- Configurable build process
- Clean and maintainable code structure

## Installation

```bash
# Install globally
npm install -g packmc

# Or install as a dev dependency in your project
npm install --save-dev packmc
```

## Setup

1. Create a new directory for your datapack project
2. Initialize a new npm project (if you haven't already):
   ```bash
   npm init -y
   ```
3. Create a `packmc.config.js` file in your project root
4. Set up your project structure (see Project Structure section)

## Configuration

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

### Configuration Options

- `inputPath` (string): Path to your input pack directory containing your JS/TS files. Defaults to 'src/pack'
- `outputPath` (string): Path where the compiled pack will be output. Defaults to 'dist'
- `skipClean` (boolean): Skip cleaning the output directory before building. Defaults to false
- `allowDangerousOutput` (boolean): Allow output to project root or src directory. Defaults to false

You can customize these values based on your project's needs. The configuration file is optional - if not provided, PackMC will use the default values.

## Project Structure

```
your-project/
├── packmc.config.js
├── package.json
└── src/
    └── pack/
        ├── data/
        │   └── your_namespace/
        │       └── functions/
        │           └── your_function.js
        └── pack.mcmeta
```

## Usage

1. Write your Minecraft functions in JavaScript/TypeScript files
2. Run the build command:
   ```bash
   npx packmc build
   ```
3. The compiled `.mcfunction` files will be output to your specified `outputPath`

## Development

For development, you can use the watch mode:

```bash
npx packmc dev
```

This will watch for changes in your source files and automatically rebuild when changes are detected.

## Example

Check out the `example` directory in this repository for a complete example of how to use PackMC.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

[MIT](LICENSE)
