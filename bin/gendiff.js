#!/usr/bin/env node
import { Command } from 'commander';
import { parse } from '../src/parse.js';
import { compare } from '../src/compare.js';

const program = new Command();

program
  .name('gendiff')
  .description('Compares two configuration files and shows a difference.')
  .version('1.0.0')
  .argument("<filepath1>")
  .argument("<filepath2>")
  .option('-f, --format [type]', 'output format')
  .action((path1, path2) => {
    const json1 = parse(path1);
    const json2 = parse(path2);
    console.log(compare(json1, json2));
  });

program.parse();
