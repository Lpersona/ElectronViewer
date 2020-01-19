const ServerCollection = {};

ServerCollection.tiles = {};

ServerCollection.addServer = (port, server) => {
  ServerCollection.tiles[port] = server;
}

ServerCollection.removeServer = (port) => {
  if (ServerCollection.tiles[port]) {
    const server = ServerCollection.tiles[port];
    delete ServerCollection.tiles[port];
    server.close();
  }
}

ServerCollection.removeAll = () => {
  for (let key of Object.keys(ServerCollection.tiles)) {
    const server = ServerCollection.tiles[key];
    server.close();
  }
}

module.exports.ServerCollection = ServerCollection;
