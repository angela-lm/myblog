var DBUtil = require('./DBUtil');
function getCommentsId(blogId,success) {
    var querySql = 'select * from blog_comments_mapping where blogId=?';
    var parmas = [blogId];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,parmas,function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function getBlogId(commentsId,success){
    var querySql = 'select * from blog_comments_mapping where commentsId=?';
    var parmas = [commentsId];
    var connection = DBUtil.createConnection();
    var blogId = 0;
    connection.connect();
    connection.query(querySql,parmas,function (error,result){
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function createMapping(blogId,commentsId,ctime,success) {
    var querySql = 'insert into blog_comments_mapping (`blogId`,`commentsId`,`ctime`) values (?,?,?)';
    var parmas = [blogId,commentsId,ctime];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,parmas,function (error, result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
module.exports.getCommentsId = getCommentsId;
module.exports.createMapping = createMapping;
module.exports.getBlogId = getBlogId;