'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');

class UserService extends Service {
  async signJwt(user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      this.config.jwt.secret,
      { expiresIn: 3600 } // 秒
    );
    return token;
  }

  verifyJwt(token) {
    const ctx = this.ctx;
    try {
      const authUser = jwt.verify(
        token,
        this.config.jwt.secret
      );
      return authUser;
    } catch (error) {
      ctx.body = error;
      return null;
    }
  }
}

module.exports = UserService;
