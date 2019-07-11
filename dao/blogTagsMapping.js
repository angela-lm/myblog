var dbutil = require('../dao/DBUtil');

function insertBlogTagsMapping(articleId,tagId,ctime,success) {
    var insertSql = 'insert into blog_tags_mapping (`articleId`,`tagId`,`ctime`) values (?,?,?)';
    var parmas = [articleId, tagId,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,parmas,function(error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function getBlogId(tagId,success){
    var insertSql = 'select * from blog_tags_mapping where tagId=?';
    var parmas = [tagId];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,parmas,function(error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
module.exports.insertBlogTagsMapping = insertBlogTagsMapping;
module.exports.getBlogId = getBlogId;