import { IConfig } from './config.interface';
export const Config: IConfig = {
  database: {
    type: 'mysql', //数据库类型
    host: 'localhost', //数据库地址
    port: 3306, //数据库账号
    username: 'root', //用户名
    password: '199696', //密码
    database: 'admin', //数据库名称
    autoLoadModels: true, //模型自动加载，无需再配置处重复写实体
    synchronize: true, //自动加载的模型将被同步进数据库中，prod要关闭，否则可能会应为字段删除二导致数据丢失
    logging: false, //是否启用日记记录
  },
};
