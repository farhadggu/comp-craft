const fs = require("fs-extra");
const chalk = require("chalk");

const listTemplates = (globalStorePath) => {
  const templates = fs.readdirSync(globalStorePath);
  if (templates.length > 0) {
    console.log(chalk.green("Available templates:"));
    templates.forEach((template) => console.log(chalk.blue(template)));
  } else {
    console.log(chalk.yellow("No templates found."));
  }
};

module.exports = listTemplates;
