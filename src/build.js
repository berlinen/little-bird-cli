import webpack from "webpack";

const config = require('./webpack.config.js');

let build = () => {
    webpack(config, (test1, test2) => {
        console.log(symbol.success, chalk.green('打包完成'));
    });
}

module.exports = build;

