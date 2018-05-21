import { Arguments } from './arg';
import { Flags } from './flag';

export interface Command {
  args: Arguments,
  flags: Flags,
  exec: () => void 
}

// export type Commands = Array<Command>;
export type Commands = {
  [key: string]: Command;
}