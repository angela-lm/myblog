var tagDao = require('../dao/tagsDao');
var respUntil = require('../util/respUtil');
var path = new Map();
function getTags(request,response) {
    tagDao.getRandomTags(function (result) {
        response.writeHead(200);
        response.write(respUntil.responseInfo('success','添加成功',result));
        response.end();
    });
}
path.set('/tags',getTags);

module.exports.path = path;
