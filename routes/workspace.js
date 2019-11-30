const workspace = require('../src/api/controllers/workspace');

const workspaceRoutes = (app) => {
  app.post('/api/workspace', workspace.create);
  app.get('/api/list', workspace.list);
};

module.exports = workspaceRoutes;
