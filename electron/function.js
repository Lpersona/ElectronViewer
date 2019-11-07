const http_server = require('http-server');

const getServiceUrl = function (fileUrl) {
  if (fileUrl) {
    const index = fileUrl.lastIndexOf(`\\`);
    const service_url = fileUrl.slice(0, index + 1);
    const file_name = fileUrl.slice(index + 1);
    return {
      service_url,
      file_name
    };
  } else {
    return void 0;
  }
}

const checkFileFromat = function (fileUrl, fromat) {
  if (fileUrl) {
    const index = fileUrl.lastIndexOf(`.`);
    const file_fromat = fileUrl.slice(index + 1).toLocaleLowerCase();
    return file_fromat === fromat;
  }

  return false;
}

const createService = function (service_url) {
  const port_number = getRandomPort();

  const tile_server = http_server.createServer({
    root: service_url,
    cors: '*',
  });

  tile_server.listen(port_number);

  return {
    tile_server,
    port_number
  };
}

const createEarthService = function () {
  const earth_app = '';
  const {
    port_number
  } = createService(earth_app);
  return `http://localhost:${port_number}/index.html`;
}

function getRandomPort() {
  const port = parseInt(Math.random() * 30001 + 10000, 10);
  return port;
}

module.exports.getServiceUrl = getServiceUrl;
module.exports.checkFileFromat = checkFileFromat;
module.exports.createService = createService;
