#!/usr/bin/env node
import { Command } from 'commander';
import parse from '../src/parse.js';
import compare from '../src/compare.js';
import getFormatter from '../formatters/index.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((path1, path2, options) => {
    const json1 = parse(path1);
    const json2 = parse(path2);
    const formatter = getFormatter(options.format);
    console.log(compare(json1, json2, formatter));
  });

program.parse();
