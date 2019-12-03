const workspace = require('../src/api/controllers/workspace');

const workspaceRoutes = (app) => {
  app.put('/api/workspace', workspace.upsert);
  app.get('/api/workspaces', workspace.list);
  app.get('/api/workspace/:date', workspace.show);
};

module.exports = workspaceRoutes;
