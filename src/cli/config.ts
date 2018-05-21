import { readFile, existsSync } from 'fs';
import { join } from 'path';
import { Arguments } from '../lets/arg';
import { Flags } from '../lets/flag';

interface ConfigData {
  commands: any,
  args: Arguments,
  flags: Flags
}

export function getConfigFile (
  filePath: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    readFile(filePath, (err: Error, data: Buffer) => {
      if (err) throw err;
      resolve(data.toString());
    });
  });
}

export function getConfigData (
  file: string,
  exts: string[],
  pwd: string
): Promise<ConfigData> {
  return new Promise((resolve, reject) => {
    exts.forEach(async (ext: string) => {
      const filePath = join(pwd, `${file}.${ext}`);
      if (existsSync(filePath)) {
        const content = await getConfigFile(filePath);
        const data = <ConfigData> {
          commands: {},
          args: [],
          flags: {}
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

export function Config () {
  const targetFile = 'lets';
  const targetExtensions = [ 'yml', 'json' ];
  const targetPath = process.cwd();
  return Object.freeze({
    get: () => getConfigData(
      targetFile, 
      targetExtensions, 
      targetPath
    )
  });
}