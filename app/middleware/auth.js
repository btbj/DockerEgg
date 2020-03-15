'use strict';

module.exports = () => {
  return async function auth(ctx, next) {
    if (!ctx.request.body.token) {
      ctx.body = {
        success: false,
        message: 'require token',
      };
      return;
    }
    const authUser = ctx.service.user.verifyJwt(ctx.request.body.token);
    if (!authUser) {
      ctx.body = {
        success: false,
        message: 'invalid token',
      };
      return;
    }
    ctx.request.body.authUser = authUser;
    await next();

  };
};
