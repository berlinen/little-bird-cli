'use strict';

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _logSymbols = require('log-symbols');

var _logSymbols2 = _interopRequireDefault(_logSymbols);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _inquirer = require('inquirer');

var _inquirer2 = _interopRequireDefault(_inquirer);

var _downloadGitRepo = require('download-git-repo');

var _downloadGitRepo2 = _interopRequireDefault(_downloadGitRepo);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

// 文件是否存在
let notExistFold = (() => {
    var _ref = _asyncToGenerator(function* (name) {
        return new Promise(function (resolve) {
            if (_fs2.default.existsSync(name)) {
                console.log(_logSymbols2.default.error, _chalk2.default.red('文件夹名已被占用，请更换名字重新创建'));
            } else {
                resolve();
            }
        });
    });

    return function notExistFold(_x) {
        return _ref.apply(this, arguments);
    };
})();

// 询问用户
let promptList = [{
    type: 'list',
    name: 'frame',
    message: 'please choose this project template',
    choices: ['vue', 'react']
}, {
    type: 'input',
    name: 'description',
    message: 'Please enter the project description: '
}, {
    type: 'input',
    name: 'author',
    message: 'Please enter the author name: '
}];

let prompt = () => {
    return new Promise(resolve => {
        _inquirer2.default.prompt(promptList).then(answer => {
            resolve(answer);
        });
    });
};

// 项目模板远程下载
let downloadTemplate = (() => {
    var _ref2 = _asyncToGenerator(function* (ProjectName, api) {
        return new Promise(function (resolve, reject) {
            (0, _downloadGitRepo2.default)(api, ProjectName, { clone: true }, function (err) {
                if (err) {
                    reject(err);
                } else {
                    resolve();
                }
            });
        });
    });

    return function downloadTemplate(_x2, _x3) {
        return _ref2.apply(this, arguments);
    };
})();

// 更新json配置文件
let updateJsonFile = (fileName, obj) => {

    return new Promise(resolve => {
        if (_fs2.default.existsSync(fileName)) {
            const data = _fs2.default.readFileSync(fileName).toString();
            let json = JSON.parse(data);
            Object.keys(obj).forEach(key => {
                json[key] = obj[key];
            });
            _fs2.default.writeFileSync(fileName, JSON.stringify(json, null, '\t'), 'utf-8');
            resolve();
        }
    });
};

module.exports = {
    notExistFold,
    prompt,
    downloadTemplate,
    updateJsonFile
};