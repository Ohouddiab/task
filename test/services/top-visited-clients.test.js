const app = require('../../src/app');

describe('\'top-visited-clients\' service', () => {
  it('registered the service', () => {
    const service = app.service('top-visited-clients');
    expect(service).toBeTruthy();
  });
});
