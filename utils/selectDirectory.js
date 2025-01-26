const path = require("path");
const chalk = require("chalk");
const fs = require("fs-extra");
const inquirer = require("inquirer");

const selectDirectory = async (startDir) => {
  let currentDir = startDir;

  while (true) {
    const dirs = fs.readdirSync(currentDir).filter((file) => fs.statSync(path.join(currentDir, file)).isDirectory());

    if (dirs.length === 0) {
      console.log(chalk.yellow("No directories available to navigate."));
      break;
    }

    const answers = await inquirer.prompt([
      {
        type: "list",
        name: "selectedDir",
        message: "Select a directory to place your component in:",
        choices: [...dirs, new inquirer.Separator(), "Leave this directory"],
      },
    ]);

    if (answers.selectedDir === "Leave this directory") break;
    currentDir = path.join(currentDir, answers.selectedDir);
  }
  return currentDir;
};

module.exports = { selectDirectory };
