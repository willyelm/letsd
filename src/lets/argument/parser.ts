import { Argument, Arguments } from './index';
import { ArgumentType } from './type';

export class ArgumentParser {
  isFlag (value: string) {
    return new RegExp(/^(-{1,2})([^=]+)=?(.*)/, 'g').exec(value);
  }
  getValue (value: string) {
    let newValue: any = value;
    switch (value) {
      case 'true':
        newValue = true;
        break;
      case 'false':
        newValue = false;
        break;
    }
    return newValue;
  }
  getArgs (argv: string[]) {
    const args: Arguments = []
    argv.forEach((item: string, index: number, array: string[]) => {
      let isFlag = this.isFlag(item);
      let rawValue = item;
      let arg = new Argument();
      if (isFlag) {
        arg.id = isFlag[2];
        arg.type = ArgumentType.Flag;
        rawValue = isFlag[3];
        if (!rawValue && !this.isFlag(array[index + 1])) {
          rawValue = array.splice(index + 1, 1)[0];
        }
      } else {
        arg.id = args.filter(({ type }) => type === ArgumentType.Index).length;
        arg.type = ArgumentType.Index;
      }
      arg.value = this.getValue(rawValue);
      args.push(arg);
    });
    return args;
  }
}
