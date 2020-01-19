const http_server = require('http-server');
const path = require('path');
const net = require('net');

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

const createService = async function (service_url) {
  const port_number = await getRandomPort();

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

const createEarthService = async function () {
  const earth_app = path.join(__dirname, 'app');
  const {
    port_number
  } = await createService(earth_app);

  return `http://localhost:${port_number}/index.html`;
}

async function getRandomPort() {
  const port = parseInt(Math.random() * 30001 + 10000, 10);
  const is_useful = await checkPort(port);

  if (is_useful) {
    return port;
  } else {
    getRandomPort();
  }
}

function checkPort(port_number) {
  const server = net.createServer().listen(port_number);

  const promise = new Promise((resolve, reject) => {
    server.on('listening', () => {
      resolve(true);
      server.close();
    })

    server.on('error', (error) => {
      if (error.code === 'EADDRINUSE') {
        resolve(false);
      }
    })
  })

  return promise;
}

module.exports.getServiceUrl = getServiceUrl;
module.exports.checkFileFromat = checkFileFromat;
module.exports.createService = createService;
module.exports.createEarthService = createEarthService;
