const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");

const configFilePath = path.join(require("os").homedir(), ".comp-craft", "config.json");

// Ensure config file exists and has a default editor path
if (!fs.existsSync(configFilePath)) {
  fs.writeFileSync(configFilePath, JSON.stringify({ editorPath: "" }, null, 2));
}

// Load the editor path from the config file
const getEditorPath = () => {
  const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
  return config.editorPath || "";
};

// Save the editor path to the config file
const setEditorPath = async () => {
  const { editorPath } = await inquirer.prompt([
    {
      type: "input",
      name: "editorPath",
      message: "Enter the full path to your code editor (e.g., C:\\Program Files\\Microsoft VS Code\\Code.exe):",
      validate: (input) => (input ? true : "Editor path is required."),
    },
  ]);
  const config = JSON.parse(fs.readFileSync(configFilePath, "utf8"));
  config.editorPath = editorPath;
  fs.writeFileSync(configFilePath, JSON.stringify(config, null, 2));
  console.log(chalk.green(`Editor path saved: ${editorPath}`));
  return editorPath;
};

const generateComponent = async (componentName, globalStorePath) => {
  // If componentName is not provided, prompt the user for it
  if (!componentName) {
    const { name } = await inquirer.prompt([
      {
        type: "input",
        name: "name",
        message: "Enter the component name:",
        validate: (input) => (input ? true : "Component name is required."),
      },
    ]);
    componentName = name;
  }

  // Ask the user whether they want to create a TypeScript or JavaScript component
  const { componentType } = await inquirer.prompt([
    {
      type: "list",
      name: "componentType",
      message: "Do you want to create a TypeScript (.tsx) or JavaScript (.jsx) component?",
      choices: [
        { name: "TypeScript (.tsx)", value: "tsx" },
        { name: "JavaScript (.jsx)", value: "jsx" },
      ],
    },
  ]);

  const fileExtension = componentType; // .tsx or .jsx
  const templatePath = path.join(globalStorePath, `${componentName}.${fileExtension}`);
  let componentCode;

  if (fs.existsSync(templatePath)) {
    componentCode = fs.readFileSync(templatePath, "utf8");
    console.log(chalk.green(`Using updated template for ${componentName}.`));
  } else {
    if (componentType === "tsx") {
      componentCode = `
import React from "react";

type ${componentName}Props = {
  children?: React.ReactNode;
}

const ${componentName}: React.FC<${componentName}Props> = ({ children }) => {
  return <div className="${componentName}">{children}</div>;
};

export default ${componentName};
      `;
    } else {
      componentCode = `
import React from "react";

const ${componentName} = () => {
  return <div className="${componentName}">Hello, ${componentName}!</div>;
};

export default ${componentName};
      `;
    }
  }

  // Save the component code globally in the templates folder
  fs.writeFileSync(templatePath, componentCode);
  console.log(chalk.green(`Component ${componentName} generated and saved in the global store.`));

  // Get or prompt for the editor path
  let editorPath = getEditorPath();
  if (!editorPath) {
    console.log(chalk.yellow("Editor path not set. Let's set it up now."));
    editorPath = await setEditorPath();
  }

  // Open the component in the preferred editor
  try {
    require("child_process").spawn(editorPath, [templatePath], { stdio: "inherit" });
    console.log(chalk.green(`Opened ${componentName} in your editor.`));
  } catch (error) {
    console.log(chalk.red("Failed to open the editor. Please ensure the editor path is correctly set."));
  }
};

module.exports = generateComponent;
