const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");

const getPreferredEditor = (globalConfigPath) => {
  const config = JSON.parse(fs.readFileSync(globalConfigPath, "utf8"));
  return config.editor || "code"; // Default to VS Code
};

const setPreferredEditor = async (globalConfigPath) => {
  const { editor } = await inquirer.prompt([
    {
      type: "input",
      name: "editor",
      message: "Enter your preferred editor command (default is 'code' for VS Code):",
      default: getPreferredEditor(globalConfigPath),
    },
  ]);
  fs.writeFileSync(globalConfigPath, JSON.stringify({ editor }, null, 2));
  console.log(chalk.green(`Preferred editor set to: ${editor}`));
};

module.exports = { getPreferredEditor, setPreferredEditor };
