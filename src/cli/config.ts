import { readFile, existsSync } from 'fs';
import { join } from 'path';

interface ConfigData {
  tasks: any,
  args: any
}

export class Config {
  public file = 'lets';
  public extensions = ['yml', 'json'];
  public target = process.cwd();
  constructor () {
  
  }
  getData (filePath: string): Promise<string> {
    return new Promise((resolve, reject) => {
      readFile(filePath, (err: Error, data: Buffer) => {
        if (err) throw err;
        resolve(data.toString());
      });
    });
  }
  read (): Promise<ConfigData> {
    return new Promise((resolve, reject) => {
      this.extensions.forEach(async (ext: string) => {
        const filePath = join(this.target, `${this.file}.${ext}`);
        if (existsSync(filePath)) {
          const content = await this.getData(filePath);
          const data = <ConfigData> {
            tasks: {},
            args: []
          };
          switch (ext) {
            case 'yml':
              const { parse } = require('yamljs');
              Object.assign(data, parse(content));
              break;
            case 'json':
              Object.assign(data, JSON.parse(content));
              break;  
          }
          return resolve(data);
        }
      });
    })
  }
}