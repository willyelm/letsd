import { exec } from 'child_process';
import { Argument, ArgumentType, Arguments, ArgumentParser } from './argument';

const parser = new ArgumentParser();
// Remove first (0: node binary path, 1: lets binary path)
const argv: string[] = process.argv.slice(2);
// Get arguments list 

// const args: Arguments = parser.getArgs(argv);
// export class Args {
//   public value = args;
//   getArg (type: ArgumentType, id: string | number) {
//     return this.value.find(
//       (arg: Argument) => {
//         return arg.type === ArgumentType.Index 
//           && arg.id === id;
//       }
//     );
//   }
//   getIndex (id: number) {
//     return this.getArg(ArgumentType.Index, id);
//   }
//   getFlag (id: string) {
//     return this.getArg(ArgumentType.Flag, id);
//   }
// }

export interface ArgsConfig {
  [key: string]: {
    type: ArgumentType,
    description: string,
    shortcut: string,
    value: any
  }
}

export interface TasksConfig {
  [key: string]: {
    args: string[],
    command: Function
  }
}

export const Arg = {
  get (config: ArgsConfig) {
    const values = {};
    Object.keys(config).forEach((name: string) => {
      const value = config[name];
      console.log('value', value);
    });
    return values;
  }
}

export class Interface {
  tasks (config: TasksConfig) {
    const values = {};
    Object.keys(config).forEach((name: string) => {
      const value = config[name];
    });
    return values;
  }
  start (commandName: string) {

  }
}