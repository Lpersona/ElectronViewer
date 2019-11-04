let getServiceUrl = function (fileUrl) {
  if (fileUrl) {
    const index = fileUrl.lastIndexOf(`\\`);
    const service_url = fileUrl.slice(0, index + 1);
    return service_url;
  } else {
    return void 0;
  }
}

let getRandomPort = function () {

}


module.exports.getServiceUrl = getServiceUrl;
module.exports.getRandomPort = getRandomPort;
