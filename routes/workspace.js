const workspace = require('../src/api/controllers/workspace');
const { authUser } = require('../lib');

const workspaceRoutes = (app) => {
  app.put('/api/workspace', authUser, workspace.create);
  app.get('/api/workspaces', authUser,  workspace.list);
  app.get('/api/workspace/:date', authUser, workspace.show);
  app.get('/api/workspace/:date/versions', authUser, workspace.versions);
};

module.exports = workspaceRoutes;
