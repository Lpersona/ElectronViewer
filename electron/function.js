let getServiceUrl = function (fileUrl) {
  if (fileUrl) {
    const index = fileUrl.lastIndexOf(`\\`);
    const service_url = fileUrl.slice(0, index + 1);
    return service_url;
  } else {
    return void 0;
  }
}


module.exports.getServiceUrl = getServiceUrl;
