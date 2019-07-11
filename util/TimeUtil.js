function getTime() {
    return parseInt(Date.now() / 1000);
}
function formatTime(time) {
    var date = new Date(time * 1000);
    return date.getFullYear() + '-' + (date.getMonth() + 1) +'-'+ date.getDate()
}
module.exports.getTime = getTime;
module.exports.formatTime = formatTime;