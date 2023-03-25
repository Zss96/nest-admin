export interface IConfig {
  /**
   * 数据库配置
   */
  database?: {
    type?: string;
    host?: string;
    port?: number | string;
    username?: string;
    password?: string;
    database?: string;
    autoLoadModels: boolean;
    synchronize?: boolean;
    logging?: any;
  };
}
