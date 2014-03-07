var Instance = {};

require('./../lib/db.js')(Instance);

Instance.db.User.sync();
Instance.db.Client.sync();
Instance.db.Project.sync();
Instance.db.Campaign.sync();
