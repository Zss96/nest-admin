export interface IConfig {
  /**
   * 后台管理jwt token密钥
   */
  jwt?: {
    secret: string;
  };

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
  redis?: {
    config: {
      url: string;
    };
  };
}
