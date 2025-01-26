const fs = require("fs-extra");
const chalk = require("chalk");
const inquirer = require("inquirer");
const { exec } = require("child_process");

const getPreferredEditor = (globalConfigPath) => {
  const config = JSON.parse(fs.readFileSync(globalConfigPath, "utf8"));
  return config.editor || "code"; // Default to "code" for VS Code
};

const setPreferredEditor = async (globalConfigPath) => {
  const { editorPath } = await inquirer.prompt([
    {
      type: "input",
      name: "editorPath",
      message: "Enter the full path to your preferred editor executable:",
      validate: (input) => (input ? true : "Editor path is required."),
    },
  ]);

  // Test the provided editor path by attempting to execute it
  console.log(chalk.blue("Validating the provided editor path..."));

  exec(`"${editorPath}"`, (error) => {
    if (error) {
      console.log(
        chalk.red(
          `The provided editor command/path "${editorPath}" is not valid or returned an error. Please try again.`
        )
      );
    } else {
      const editor = editorPath.includes("Code.exe") ? "code" : path.basename(editorPath);
      const config = { editor, editorPath };

      // Save both `editor` and `editorPath` to config.json
      fs.writeFileSync(globalConfigPath, JSON.stringify(config, null, 2));
      console.log(chalk.green(`Preferred editor set to: ${editor} (${editorPath})`));
    }
  });
};

module.exports = { getPreferredEditor, setPreferredEditor };
