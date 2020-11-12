// Initializes the `top-visited-clients` service on path `/top-visited-clients`
const { TopVisitedClients } = require('./top-visited-clients.class');
const createModel = require('../../models/top-visited-clients.model');
const hooks = require('./top-visited-clients.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/top-visited-clients', new TopVisitedClients(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('top-visited-clients');

  service.hooks(hooks);
};
