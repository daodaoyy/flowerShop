const path = require("path");

module.exports = appInfo => {
  const config = (exports = {});

  config.keys = appInfo.name + "secret-key";

  config.view = {
    defaultViewEngine: "nunjucks",
    root: [path.join(appInfo.baseDir, "app/public")].join(",")
  };
  //加载静态资源
  config.static = {
    prefix: "/"
  };

  config.logger = {
    dir: path.join(__dirname, `../logs/${appInfo.name.toLowerCase()}`),
    consoleLevel: "DEBUG", // NONE
    level: "DEBUG",
    appLogName: `${appInfo.name.toLowerCase()}.log`,
    coreLogName: `${appInfo.name.toLowerCase()}.core.log`,
    agentLogName: `${appInfo.name.toLowerCase()}.agent.log`,
    errorLogName: `${appInfo.name.toLowerCase()}.error.log`
  };

  config.logrotator = {
    filesRotateByHour: [], // list of files that will be rotated by hour
    filesRotateBySize: [], // list of files that will be rotated by size
    maxFileSize: 50 * 1024 * 1024, // Max file size to judge if any file need rotate
    maxFiles: 10, // pieces rotate by size
    rotateDuration: 60000, // time interval to judge if any file need rotate
    maxDays: 10 // keep max days log files, default is `31`. Set `0` to keep all logs
  };

  config.api = {
    url: "http://localhost:7001/"
  };

  config.cors = {
    origin: "*",
    allowMethods: ["GET", "POST", "HEAD", "PUT", "DELETE", "PATCH"]
  };
  config.security = {
    csrf: {
      useSession: true,
      enable: false
    }
  };

  //添加jwt配置
  config.jwt = {
    secret: "egg-api-jwt"
  };
  //注册中间件
  config.middleware = [];

  //连接数据库
  config.mysql = {
    // 数据库信息配置
    client: {
      // host
      host: "localhost",
      // 端口号
      port: "3306",
      // 用户名
      user: "root",
      // 密码
      password: "admin",
      // 数据库名
      database: "flowers"
    },
    // 加载到app上
    app: true,
    // 不加载到agent上
    agent: false
  };
  return config;
};
