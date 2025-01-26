const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");

const removeComponent = async (componentName, globalStorePath) => {
  const templates = fs.readdirSync(globalStorePath).filter((file) => file.endsWith(".tsx") || file.endsWith(".jsx"));

  if (templates.length === 0) {
    console.log(chalk.yellow("No components found in the global store."));
    return;
  }

  // If componentName is not provided, list all components and prompt the user to select one
  if (!componentName) {
    const { selectedComponent } = await inquirer.prompt([
      {
        type: "list",
        name: "selectedComponent",
        message: "Select a component to remove:",
        choices: templates.map((template) => path.basename(template, path.extname(template))),
      },
    ]);
    componentName = selectedComponent;
  }

  // Check if the component exists
  const templatePath = path.join(globalStorePath, `${componentName}.tsx`);
  const jsxPath = path.join(globalStorePath, `${componentName}.jsx`);
  const componentPath = fs.existsSync(templatePath) ? templatePath : jsxPath;

  if (!fs.existsSync(componentPath)) {
    console.log(chalk.red(`Component ${componentName} not found in the global store.`));
    return;
  }

  // Ask for confirmation before removing the component
  const { confirm } = await inquirer.prompt([
    {
      type: "confirm",
      name: "confirm",
      message: `Are you sure you want to remove the component "${componentName}"?`,
      default: false,
    },
  ]);

  if (confirm) {
    fs.removeSync(componentPath);
    console.log(chalk.green(`Component ${componentName} has been removed.`));
  } else {
    console.log(chalk.yellow(`Component ${componentName} was not removed.`));
  }
};

module.exports = removeComponent;
