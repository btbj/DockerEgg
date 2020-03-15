'use strict';

const { assert, app } = require('egg-mock/bootstrap');

describe('test/app/controller/users.test.js', () => {
  // describe('GET /users', () => {
  //   it('should work', async () => {
  //     // 通过 factory-girl 快速创建 user 对象到数据库中
  //     await app.factory.createMany('user', 3);
  //     let res = await app.httpRequest().get('/users?limit=2');
  //     assert(res.status === 200);
  //     assert(res.body.length === 2);
  //     assert(res.body[0].name);
  //     assert(res.body[0].age);
  //     res = await app.httpRequest().get('/users?limit=aaa');
  //     assert(res.status === 200);
  //   });
  // });

  // describe('GET /users/:id', () => {
  //   it('should work', async () => {
  //     const user = await app.factory.create('user');
  //     const res = await app.httpRequest().get(`/users/${user.id}`);
  //     assert(res.status === 200);
  //     assert(res.body.age === user.age);
  //   });
  // });

  // describe('POST /users', () => {
  //   it('should work', async () => {
  //     app.mockCsrf();
  //     let res = await app.httpRequest().post('/users')
  //       .send({
  //         age: 10,
  //         name: 'name',
  //       });
  //     assert(res.status === 201);
  //     assert(res.body.id);

  //     res = await app.httpRequest().get(`/users/${res.body.id}`);
  //     assert(res.status === 200);
  //     assert(res.body.name === 'name');
  //   });
  // });
  describe('POST /register', () => {
    it('should work', async () => {
      app.mockCsrf();
      const res = await app.httpRequest().post('/register')
        .send({
          username: 'testuser',
          password: 'password',
        });
      assert(res.status === 201);
      assert(res.body.id);

      app.mockCsrf();
      const infoRes = await app.httpRequest().post('/users/info')
        .send({ id: res.body.id });
      assert(infoRes.status === 200);
      assert(infoRes.body.id === res.body.id);
    });
  });

  // describe('POST /users/:id', () => {
  //   it('should work', async () => {
  //     app.mockCsrf();
  //     let res = await app.httpRequest().put('/users/12345');
  //     assert(res.status === 404);

  //     app.mockCsrf();
  //     res = await app.httpRequest().post('/users')
  //       .send({
  //         age: 10,
  //         name: 'name',
  //       });
  //     assert(res.status === 201);
  //     assert(res.body.id);

  //     app.mockCsrf();
  //     res = await app.httpRequest().put(`/users/${res.body.id}`)
  //       .send({
  //         age: 22,
  //         name: 'name-updated',
  //       });
  //     assert(res.status === 200);
  //     assert(res.body.id);

  //     res = await app.httpRequest().get(`/users/${res.body.id}`);
  //     assert(res.status === 200);
  //     assert(res.body.name === 'name-updated');
  //   });
  // });

  // describe('DELETE /users/:id', () => {
  //   it('should work', async () => {
  //     const user = await app.factory.create('user');

  //     app.mockCsrf();
  //     const res = await app.httpRequest().delete(`/users/${user.id}`);
  //     assert(res.status === 200);

  //     app.mockCsrf();
  //     const res2 = await app.httpRequest().delete(`/users/${user.id}`);
  //     assert(res2.status === 404);
  //   });
  // });
});
