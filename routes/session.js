const session = require('../src/api/controllers/session');

const sessionRoutes = (app) => {
  app.post('/api/signIn', session.session);
};

module.exports = sessionRoutes;