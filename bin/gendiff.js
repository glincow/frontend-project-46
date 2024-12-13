#!/usr/bin/env node
import { Command } from 'commander';
import compare from '../src/compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument('<filepath1>')
  .argument('<filepath2>')
  .option('-f, --format [type]', 'output format', 'stylish')
  .action((path1, path2, options) => {
    console.log(compare(path1, path2, options.format));
  });

program.parse();
