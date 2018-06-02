#!/usr/bin/env node

import { Config } from './config';
import { Interface, Arg } from '../lets';

export class Lets {
  private config: Config = new Config();
  constructor (public name: string) {
    //
  }
  async run () {
    const config = await this.config.read();
    const inter = new Interface();
    const argv = Arg.get({
      debug: {

      }
    })
    // define args
    // const args = lets.args({
    //   debug: {
    //     type: ArgumentType.Flag,
    //     description: 'hello world',
    //     shortcut: 'd',
    //     value: null
    //   }
    // });
    // lets.validate();
    // lets.tasks({
    //   work: {
    //     args: ['debug'],
    //     command () {
    //       console.log('running here...');
    //     }
    //   }
    // });

    // lets.start('work');
    // lets.args;
    // console.log('config', config);
    console.log('lets', inter);
    console.log('args', args);
  }
}

const lets = new Lets('lets');
lets.run();