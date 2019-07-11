function responseInfo(status, msg,data) {
    return JSON.stringify({
        status: status,
        message: msg,
        data: data
    })
}
module.exports.responseInfo = responseInfo;