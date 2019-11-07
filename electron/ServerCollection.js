const TileCollection = {};

TileCollection.tileArray = {};

TileCollection.addServer = (port, server) => {
  TileCollection.tileArray[port] = server;
}

TileCollection.removeServer = (port) => {
  if (TileCollection.tileArray[port]) {
    const server = TileCollection.tileArray[port];
    server.close();
  }
}

module.exports.TileCollection = TileCollection;
