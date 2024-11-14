#!/usr/bin/env node
import { Command } from 'commander';
import { parse } from '../src/parse.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument("<filepath1>")
  .argument("<filepath2>")
  .option('-f, --format [type]', 'output format')
  .action((path1, path2) => {
    parse(path1);
    parse(path2);
  });

program.parse();
