export * from './arg';
export * from './flag';

import { Arguments } from './arg';
import { Flags, Flag } from './flag';
import { Options } from './option';
import { Commands, Command } from './command';

export function Lets () {
  const binName = 'lets';
  const commands: Commands = {};
  return Object.freeze({
    getOptions: () => {
      const argv = process.argv.slice(2);
      return Options(argv).value;
    },
    addCommand: (name: string, options: Command) => {
      commands[name] = options;
    },
    startWithOptions (args: Arguments, flags: Flags) {
      const commandName = args.shift();
      const command = commandName
        ? commands[<string> commandName] 
        : undefined;
      if (command) {
        console.log('starting...', command);
        console.log(args);
        console.log(flags);
      } else if (commandName) {
        process.stdout.write(`${binName}: '${commandName}' is not a ${binName} command.\n`);
        process.stdout.write(`See '${binName} --help'\n`);
      } else {
        process.stdout.write(`show help\n`);
      }
    },
    start () {
      const { args, flags } = this.getOptions();
      return this.startWithOptions(args, flags);
    }
  });
}