const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { selectDirectory } = require("./selectDirectory");

const addComponent = async (componentName, globalStorePath) => {
  const templates = fs.readdirSync(globalStorePath).filter((file) => file.endsWith(".tsx") || file.endsWith(".jsx"));

  if (templates.length === 0) {
    console.log(chalk.yellow("No components found in the global store."));
    return;
  }

  // If componentName is not provided, prompt the user to select one
  if (!componentName) {
    const answer = await inquirer.prompt([
      {
        type: "list",
        name: "selectedComponent",
        message: "Select a component to add:",
        choices: templates.map((template) => path.basename(template, path.extname(template))),
      },
    ]);
    componentName = answer.selectedComponent;
  }

  // Check if the component exists
  const templatePath = path.join(globalStorePath, `${componentName}.tsx`);
  if (!fs.existsSync(templatePath)) {
    console.log(chalk.red(`Component ${componentName} not found in the global store.`));
    return;
  }

  // Prompt the user to select a directory
  const selectedDir = await selectDirectory(process.cwd());

  // Copy the component to the selected directory
  const targetPath = path.join(selectedDir, `${componentName}.tsx`);
  fs.copyFileSync(templatePath, targetPath);
  console.log(chalk.green(`Component ${componentName} added to ${targetPath}.`));
};

module.exports = addComponent;
