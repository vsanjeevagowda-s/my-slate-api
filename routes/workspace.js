const workspace = require('../src/api/controllers/workspace');

const workspaceRoutes = (app) => {
  app.post('/api/workspace', workspace.create);
};

module.exports = workspaceRoutes;
