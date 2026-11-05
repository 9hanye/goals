/* No goal data enters the service worker. Count same-scope windows before user-approved update. */
self.addEventListener('message', event => {
  if (event.data?.type !== 'GOAL_COUNT_WINDOWS' || !event.ports[0]) return;
  event.waitUntil(self.clients.matchAll({type:'window',includeUncontrolled:true}).then(clients => {
    event.ports[0].postMessage({windows:clients.filter(client=>client.url.startsWith(self.registration.scope)).length});
  }));
});
