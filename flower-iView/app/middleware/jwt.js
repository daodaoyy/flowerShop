// const JWT = require("jsonwebtoken");

// module.exports = () => {
//   return async function(ctx, next) {
//     // 获取请求头authorization字段
//     const authorization = ctx.request.header.authorization;
//     // 如果authorization字段是空 返回401 前端设有response拦截 重定向到登录页
//     if (authorization === "") {
//       ctx.throw(401, 'no token detected in http header "Authorization"');
//     }else{
//       const token = authorization.split(" ")[1];
//       let tokenContent;
//       try {
//         // 解密token
//         tokenContent = await JWT.verify(token, "ld");
//         // 将解密后的token数据传递给控制层
//         ctx.state.token = tokenContent;
//       } catch (err) {
//         ctx.throw(401, "invalid token");
//       }
//       await next();
//     }
//   };
// };
