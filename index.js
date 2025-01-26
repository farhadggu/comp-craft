#!/usr/bin/env node

const os = require("os");
const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const { program } = require("commander");

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

program.parse();
