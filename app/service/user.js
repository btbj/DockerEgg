'use strict';

const Service = require('egg').Service;
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

class UserService extends Service {
  signJwt(user) {
    const token = jwt.sign(
      { id: user.id, username: user.username },
      this.config.jwt.secret,
      { expiresIn: 3600 } // 秒
    );
    return token;
  }

  verifyJwt(token) {
    try {
      const authUser = jwt.verify(
        token,
        this.config.jwt.secret
      );
      return authUser;
    } catch (error) {
      return null;
    }
  }

  async hashPwd(password) {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  }

  async comparePwd(password, hash) {
    try {
      return await bcrypt.compare(password, hash);
    } catch (error) {
      return false;
    }
  }
}

module.exports = UserService;
