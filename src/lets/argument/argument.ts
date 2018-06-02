import { ArgumentType } from './type';

export class Argument {
  public id: string | number;
  public type: ArgumentType;
  public value: any;
}

export type Arguments = Array<Argument>;
