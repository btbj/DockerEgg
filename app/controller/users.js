'use strict';

const Controller = require('egg').Controller;

const toInt = str => {
  if (!str) return str;
  return parseInt(str, 10) || 0;
};

class UserController extends Controller {
  async register() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const hashPwd = await ctx.service.user.hashPwd(password);
    // const user = await ctx.model.User.create({ username, password });
    const user = await ctx.model.User.create(
      {
        username,
        password: hashPwd,
      }
    );
    ctx.status = 201;
    ctx.body = user;
  }

  async info() {
    const ctx = this.ctx;
    const id = toInt(ctx.request.body.id);
    const authUser = ctx.request.body.authUser;
    if (id !== authUser.id) {
      ctx.status = 404;
      return;
    }
    const user = await ctx.model.User.findByPk(id);
    if (!user) {
      ctx.status = 404;
      return;
    }
    ctx.body = user;
  }

  async login() {
    const ctx = this.ctx;
    const { username, password } = ctx.request.body;
    const existsUser = await ctx.model.User.findOne({
      where: { username },
    });
    if (!existsUser) {
      ctx.body = {
        success: false,
        message: 'no user',
      };
      return;
    }
    const isRightPwd = await ctx.service.user.comparePwd(password, existsUser.password);
    // const isRightPwd = existsUser.password === password;
    if (!isRightPwd) {
      ctx.body = {
        success: false,
        message: 'password error',
      };
      return;
    }
    const token = this.service.user.signJwt(existsUser);
    ctx.body = {
      success: true,
      data: {
        token,
        user: existsUser,
      },
    };
  }
}

module.exports = UserController;
