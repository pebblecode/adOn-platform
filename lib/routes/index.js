module.exports = function(Instance) {
  require('./login.js')(Instance);
  require('./signup.js')(Instance);
  require('./dashboard.js')(Instance);
};
