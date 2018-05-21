import { Arguments } from './arg';
import { Flag, Flags } from './flag';

function addFlag (
  flags: Flags,
  name: string,
  value: Flag
) {
  let item = flags[name];
  if (item) {
    if (!Array.isArray(item)) {
      flags[name] = <Flag> [ item ];
    } else {
      (<string[]> flags[name])
        .push(<any> value);
    }
  } else {
    flags[name] = <Flag> value;
  }
}

function getFlagValue (text: string, defaultValue: Flag): Flag {
  let value: Flag;
  switch (text) {
    case 'true':
      value = true;
      break;
    case 'false':
      value = false;
      break;
    default:
      value = text || defaultValue;
  }
  return value;
}

function isArgumentFlag (
  text: string
) {
  return RegExp('^(-{1,2})([^=]+)=?(.*)', 'g')
    .exec(text);
}

export function Options (argv: string[]) {
  const args: Arguments = [];
  const flags: Flags = {};
  argv.forEach((item: string, index: number, array: string[]) => {
    let isFlag = isArgumentFlag(item);
      if (isFlag) {
        let name = isFlag[2];
        let value = isFlag[3];
        if (!value && !isArgumentFlag(array[index + 1])) {
          value = array.splice(index + 1, 1)[0];
        }
        addFlag(flags, name, getFlagValue(value, true));
      } else {
        args.push(item);
      }
  });
  return Object.freeze({
    value: {
      args,
      flags
    }
  });
}