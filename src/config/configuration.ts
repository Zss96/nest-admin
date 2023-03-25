import { IConfig } from './config.interface';
export default () => {
  try {
    let envConfig: IConfig = {};
    envConfig = require(`./${process.env.NODE_ENV}`).Config;
    return envConfig;
  } catch (error) {
    console.log(error);
  }
};
