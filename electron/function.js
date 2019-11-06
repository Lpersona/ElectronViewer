const Koa = require('koa');
const route = require('koa-route');
const serve = require('koa-static');
const cors = require('koa2-cors');

const koa_app = new Koa();

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
  const home = serve(service_url);
  const port_number = getRandomPort();

  koa_app.use(cors({
    origin: '*'
  }));
  koa_app.use(home);
  koa_app.listen(port_number);

  return port_number;
}

const createEarthService = function () {
  const earth_app = '';
  const port_number = createService(earth_app);
  return `http://localhost:${port_number}/index.html`;
}

function getRandomPort() {
  const port = parseInt(Math.random() * 30001 + 10000, 10);
  return port;
}

module.exports.getServiceUrl = getServiceUrl;
module.exports.checkFileFromat = checkFileFromat;
module.exports.createService = createService;
