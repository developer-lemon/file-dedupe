#!/usr/bin/env node

const argv = require("yargs")
  .scriptName("dedupe")
  .usage("Usage: $0 -d [search dir] -r[remove file] -o[output file]")
  .version(require("./package.json").version)
  .alias("v", "version")
  .help("h")
  .alias("h", "help")
  .option("d", {
    alias: "dir",
    describe: "搜索目录",
    type: "string",
    demandOption: "搜索目录为必填项",
  })
  .option("r", {
    alias: "remove",
    default: false,
    type: "boolean",
    describe: "是否删除重复文件",
  })
  .option("o", {
    alias: "output",
    type: "string",
    describe: "输出结果文件,默认在控制输出结果",
  })
  .epilog(" @nvae/file-dedupe 2022 ").argv;

require("./script")(argv);
