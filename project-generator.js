const inquirer = require('inquirer');
const isGitUrl = require('is-git-url');
const jsGenerator = require('./jsGenerator');
const htmlGenerator = require('./htmlGenerator');

// const projectName = process.argv[2];
// const repoUrl = process.argv[3];

const questions = [
  {
    type: 'input',
    name: 'projectName',
    message: 'What would you like to name your project?',
    default: 'newProject'
  },
  {
    type: 'input',
    name: 'repoUrl',
    message: 'What is the URL of your desired GitHub repo?',
    validate: input => {
      let pass = isGitUrl(input);
      if (pass) return true;
      return 'Please enter a valid URL';
    }
  },
  {
    type: 'list',
    name: 'projectType',
    message: 'What type of project is this?',
    choices: ['JavaScript', 'HTML']
  }
];

inquirer.prompt(questions).then(answers => {
  const projectName = answers.projectName.replace(' ', '-');
  const repoUrl = answers.repoUrl;
  const projectType = answers.projectType;

  if (projectType === 'JavaScript') {
    jsGenerator(projectName, repoUrl);
  } else if (projectType === 'HTML') {
    htmlGenerator(projectName, repoUrl);
  }
});

