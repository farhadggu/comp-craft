#!/usr/bin/env node

const os = require("os");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const { program } = require("commander");

// * import module commands
const addComponent = require("./commands/addComponent");
const listComponents = require("./commands/listComponents");
const { setPreferredEditor } = require("./commands/setEditor");
const generateComponent = require("./commands/generateComponent");

// * global path
const globalStorePath = path.join(os.homedir(), ".react-component-cli", "templates");

if (!fs.existsSync(globalStorePath)) fs.mkdirSync(globalStorePath, { recursive: true });

const globalConfigPath = path.join(os.homedir(), ".react-component-cli", "config.json");

// * Ensure global config file exists
if (!fs.existsSync(globalConfigPath)) fs.writeFileSync(globalConfigPath, JSON.stringify({ editor: "code" }, null, 2)); // * Default to VS Code

// * Ensure global storage directory exists
fs.ensureDirSync(globalStorePath);

console.log(
  chalk.greenBright(`
    ██████╗ ██████╗ ███╗   ███╗██████╗        ██████╗██████╗  █████╗ ███████╗████████╗
    ██╔════╝██╔═══██╗████╗ ████║██╔══██╗      ██╔════╝██╔══██╗██╔══██╗██╔════╝╚══██╔══╝
    ██║     ██║   ██║██╔████╔██║██████╔╝█████╗██║     ██████╔╝███████║█████╗     ██║   
    ██║     ██║   ██║██║╚██╔╝██║██╔═══╝ ╚════╝██║     ██╔══██╗██╔══██║██╔══╝     ██║   
    ╚██████╗╚██████╔╝██║ ╚═╝ ██║██║           ╚██████╗██║  ██║██║  ██║██║        ██║   
     ╚═════╝ ╚═════╝ ╚═╝     ╚═╝╚═╝            ╚═════╝╚═╝  ╚═╝╚═╝  ╚═╝╚═╝        ╚═╝       
`)
);

program.name("comp-craft").description("CLI to generate React components").version("1.0.0");

// * Command to generate a new component in the global store
program
  .command("generate [componentName]")
  .description("Generate a new React component")
  .action((componentName) => generateComponent(componentName, globalStorePath));

// * Command to add an existing global component to the new project directory
program
  .command("add [componentName]")
  .description("Add an existing global component to the current project")
  .action((componentName) => addComponent(componentName, globalStorePath));

// * Command to set preferred editor
program
  .command("set-editor")
  .description("Set your preferred code editor")
  .action(() => setPreferredEditor(globalConfigPath));

// * Command to list all global templates
program
  .command("list")
  .description("List all global component templates")
  .action(() => listComponents(globalStorePath));

program.parse();
