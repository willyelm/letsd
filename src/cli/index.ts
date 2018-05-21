#!/usr/bin/env node
import { Config } from './config';
import { Lets } from '../lets';

const conf = Config();
const lets = Lets();

export async function Cli () {
  const data = await conf.get();
  // const { args, flags } = lets.getOptions();
  // register commands
  const commandNames = Object.keys(data.commands);
  commandNames.forEach((name: string) => {
    let command = data.commands[name]; 
    lets.addCommand(name, {
      args: command.args,
      flags: command.flags,
      exec: () => {
        console.log('running...');
      }
    })
  });

  lets.start();
}

Cli();

// function text (title: string) {
//   console.log(`${title}`);
// }

// function padLeft (targetString: string, targetLength: number, padString?: string) {
//   const pad = (padString || ' ').repeat(targetLength);
//   return (pad + targetString).slice(-pad.length);
// }

// function padRight (targetString: string, targetLength: number, padString?: string) {
//   const pad = (padString || ' ').repeat(targetLength);
//   return (targetString + pad).substring(0, pad.length);
// }

// function list (items: any) {
//   items.forEach(({ title, description }: any) => {
//     console.log(padRight(`  ${title}`, 15), description);
//   });
// }

// text('\nUsage:   lets COMMAND');

// text('\nOptions:');
// list([{
//   title: '--help', 
//   description: 'Show this message'
// }]);

// text('\nCommands:');
// list([{
//   title: 'develop', 
//   description: 'Do something else'
// }]);

// text(`\nRun 'lets COMMAND --help' for more information on a command.`);


// console.log(process.cwd());
// console.log(args, flags);