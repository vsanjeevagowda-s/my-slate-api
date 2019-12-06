const helper = require('../src/api/controllers/helper');

const helperRoutes = (app) => {
  app.get('/api/connectionCheck', helper.connectionCheck);
};

module.exports = helperRoutes;
