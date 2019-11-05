const getServiceUrl = function (fileUrl) {
  if (fileUrl) {
    const index = fileUrl.lastIndexOf(`\\`);
    const service_url = fileUrl.slice(0, index + 1);
    return service_url;
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

const createService = function (fileUrl) {

}

const getRandomPort = function () {
  const port = parseInt(Math.random() * 30001, 10);
  return port;
}

module.exports.getServiceUrl = getServiceUrl;
module.exports.checkFileFromat = checkFileFromat;
