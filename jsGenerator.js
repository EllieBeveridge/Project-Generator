const fs = require('fs');
const { exec } = require('child_process');
const eslintConfig = {
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "module",
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "env": {
    "node": true,
    "mocha": true,
    "browser": true,
    "es6": true
  },
  "extends": ["eslint:recommended"],
  "plugins": [
  ],
  "rules": {
    "no-console": 0,
    "space-before-blocks": 1,
    "arrow-spacing": 1,
    "keyword-spacing": 1,
    "space-infix-ops": 1,
    "space-in-parens": 1,
    "spaced-comment": 1,
    "semi": 1,
    "no-multiple-empty-lines": 1
  }
};

const jsGenerator = (projectName, repoUrl) => {
  fs.mkdir(`${projectName}`, function (err) {
    if (err) console.log(err);
    else console.log('Main Folder Created');

    exec(`cd ${projectName}; git init`, err => {
      if (err) console.log(err);
      else console.log('git init success');
      exec(`cd ${projectName}; git remote add origin ${repoUrl}`, err => {
        if (err) console.log(err);
        else console.log('git remote add success');

        fs.mkdir(`${projectName}/spec`, function (err) {
          if (err) console.log(err);
          else console.log('spec Folder Created');
          fs.writeFile(`${projectName}/spec/index.spec.js`, '', (err) => {
            if (err) console.log(err);
            else console.log('index.spec.js created');
          });
        });

        fs.writeFile(`${projectName}/index.js`, '', (err) => {
          if (err) console.log(err);
          else console.log('index.js created');
        });

        const gitIgnoreContents = 'node_modules\n.eslintrc';
        fs.writeFile(`${projectName}/.gitignore`, gitIgnoreContents, function (err) {
          if (err) console.log(err);
          else console.log('.gitIgnore Created');
        });

        fs.writeFile(`${projectName}/README.MD`, '', (err) => {
          if (err) console.log(err);
          else console.log('README created');
          exec(`cd ${projectName}; git add README.MD; git commit -m "first commit of README to repo"`, '', (err) => {
            if (err) console.log(err);
            else console.log('Commited README');
          });
        });

        exec(`cd ${projectName}; npm init -y`, err => {
          if (err) console.log(err);
          else console.log('npm init success');
          exec(`cd ${projectName}; npm install`, err => {
            if (err) console.log(err);
            else console.log('npm install success');
          });
        });

        fs.writeFile(`${projectName}/.eslintrc`, JSON.stringify(eslintConfig, null, 2), err => {
          if (err) console.log(err);
          else console.log('eslint init success');
        });

        setTimeout(() => {
          exec(`cd ${projectName}; git push origin master`, err => {
            if (err) console.log(err);
            else console.log('Pushed README to remote');
          });
        }, 3000);
      });
    });
  });
};

module.exports = jsGenerator;