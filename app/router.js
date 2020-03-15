'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const authCheck = app.middleware.auth();

  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.post('/register', controller.users.register);
  router.post('/login', controller.users.login);
  router.post('/users/info', authCheck, controller.users.info);
};
