module.exports = function(Instance) {
  'use strict';

  // Static Handlers
  Instance.server.route({
    method: 'GET',
    path: '/images/{file*}',
    config: { auth: false, handler: { directory: { path: './img', listing: true } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/img/{file*}',
    config: { auth: false, handler: { directory: { path: './img', listing: true } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/css/{file*}',
    config: { auth: false, handler: { directory: { path: './css', listing: true } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/js/{file*}',
    config: { auth: false, handler: { directory: { path: './js', listing: false } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/vendor/{file*}',
    config: { auth: false, handler: { directory: { path: './vendor', listing: false } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/templates/{file*}',
    config: { auth: false, handler: { directory: { path: './templates', listing: false } } }
  });
  Instance.server.route({
    method: 'GET',
    path: '/includes/{file*}',
    config: { auth: false, handler: { directory: { path: './includes', listing: false } } }
  });
};
