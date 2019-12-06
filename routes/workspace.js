const { upsert, list, show } = require('../src/api/controllers/workspace');
const { authUser } = require('../lib');

const workspaceRoutes = (app) => {
  app.put('/api/workspace', authUser, upsert);
  app.get('/api/workspaces', authUser,  list);
  app.get('/api/workspace/:date', authUser, show);
};

module.exports = workspaceRoutes;
