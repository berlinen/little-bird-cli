import webpack from "webpack";

const config = require('./webpack.config.js');

let build = () => {
    webpack(config, (test1, test2) => {
        console.log(test1, test2)
    });
}

module.exports = build;

