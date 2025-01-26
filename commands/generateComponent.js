const fs = require("fs-extra");
const path = require("path");
const chalk = require("chalk");
const inquirer = require("inquirer");

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
      // TypeScript template
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
      // JavaScript template
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

  // Open the component in the preferred editor
  const editor = "C:\\Users\\Farhad\\AppData\\Local\\Programs\\Microsoft VS Code\\Code.exe"; // Adjust based on your installation
  try {
    require("child_process").spawn(editor, [templatePath], { stdio: "inherit" });
    console.log(chalk.green(`Opened ${componentName} in your editor.`));
  } catch (error) {
    console.log(
      chalk.red("Failed to open the editor. Please ensure the editor is correctly installed and available in the PATH.")
    );
  }
};

module.exports = generateComponent;
