module.exports = function(Instance) {
  require('./login.js')(Instance);
  require('./signup.js')(Instance);
  require('./dashboard.js')(Instance);

  // API
  require('./api/client')(Instance);
  require('./api/project')(Instance);
  require('./api/campaign')(Instance);
};
