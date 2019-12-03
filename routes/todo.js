const todo = require('../src/api/controllers/todo');

const todoRoutes = (app) => {
  app.put('/api/todo', todo.upsert);
  app.get('/api/todos', todo.list);
  app.get('/api/todo/:date', todo.show);
};

module.exports = todoRoutes;
