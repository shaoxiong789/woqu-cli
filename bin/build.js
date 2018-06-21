#! /usr/bin/env node
const fs = require('fs');

const program = require('commander');
const inquirer = require('inquirer');
const download = require('download-git-repo');
const chalk = require('chalk');
const ora = require('ora');
const Package = require('../package.json')


program.version(Package.version)
.option('i, init', '初始化项目')

program
.parse(process.argv);

const nameQuestion = {
  type: 'input',
  message: `项目名称`,
  name: 'name',
  default: 'woqu-build'
}

const versionQuestion = {
  type: 'input',
  message: `初始版本：`,
  name: 'version',
  default: '0.0.1'
}

const portQuestion = {
  type: 'input',
  message: `server端口: `,
  name: 'port',
  default: '8090'
};

const powerQuestion = {
  type: 'input',
  message: `权限代码：`,
  name: 'powerId',
  default: ''
}

// const templateQuestion = {
//   type: 'confirm',
//   message: `使用pug(jade)模版引擎? `,
//   name: 'template',
//   default: true
// };

// const remQuestion = {
//   type: 'confirm',
//   message: `使用px2rem布局? `,
//   name: 'rem',
//   default: true
// };



if (program.init) {
  inquirer.prompt([
    nameQuestion,
    versionQuestion,
    portQuestion,
    powerQuestion,
    // templateQuestion,
    // remQuestion
  ]).then(function (answers) {
    const spinner = ora('开始创建喔趣前端项目').start();
    download('shaoxiong789/woqu', answers.name, function (err) {
      if (!err) {
        spinner.clear()
        console.info('');
        console.info(chalk.green('-----------------------------------------------------'));
        console.info('');
        spinner.succeed(['喔趣前端工程创建成功,请继续进行以下操作:'])
        console.info('');
        console.info(chalk.cyan(` -  cd ${answers.name}`));
        console.info(chalk.cyan(` -  npm install / yarn`));
        console.info(chalk.cyan(` -  npm run dev`));
        console.info('');
        console.info(chalk.green('-----------------------------------------------------'));
        console.info('');

        // if (answers.template === true) {
        //   fs.unlinkSync(`${process.cwd()}/${answers.name}/src/index.html`);
        // } else {
        //   fs.unlinkSync(`${process.cwd()}/${answers.name}/src/index.pug`);
        // }

        fs.readFile(`${process.cwd()}/${answers.name}/package.json`, (err, data) => {
          if (err) throw err;
          let _data = JSON.parse(data.toString())
          _data.name = answers.name
          _data.version = answers.version
          _data.port = answers.port
          _data.powerId = answers.powerId
          // _data.template = answers.template ? "pug" : "html"
          _data.rem = answers.rem
          let str = JSON.stringify(_data, null, 4);
          fs.writeFile(`${process.cwd()}/${answers.name}/package.json`, str, function (err) {
            if (err) throw err;
            process.exit()
          })
        });
      } else {
        // spinner.warn(['发生错误，请在https://github.com/codexu，Issues留言'])
        process.exit()
      }
    })
  });
}