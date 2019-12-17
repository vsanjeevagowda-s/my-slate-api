const todo = require('../src/api/controllers/todo');
const { authUser } = require('../lib');

const todoRoutes = (app) => {
  app.put('/api/todo', authUser, todo.create);
  app.get('/api/todos', authUser, todo.list);
  app.get('/api/todo/:date', authUser, todo.show);
};

module.exports = todoRoutes;
