const ServerCollection = {};

ServerCollection.tileArray = {};

ServerCollection.addServer = (port, server) => {
  ServerCollection.tileArray[port] = server;
}

ServerCollection.removeServer = (port) => {
  if (ServerCollection.tileArray[port]) {
    const server = ServerCollection.tileArray[port];
    delete ServerCollection.tileArray[port];
    server.close();
  }
}

module.exports.ServerCollection = ServerCollection;
