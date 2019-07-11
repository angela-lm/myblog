var DButil =  require('./DBUtil');

function getComments(commentsId,success) {
    var querySql = 'select * from comments where id=?';
    var params = [commentsId];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function makeComments(commentsContent,commentsUsername,commentsEmails,iconPic,ctime,succsess){
    var querySql = 'insert into comments (`username`,`email`,`iconPic`,`ctime`,`content`) values (?,?,?,?,?)';
    var params = [commentsUsername,commentsEmails,iconPic,ctime,commentsContent];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            succsess(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

function getNewComments(success) {
    var querySql = 'select id,username,ctime,content from comments order by id desc limit 0,5';
    var params = [];
    var connection = DButil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
module.exports.getComments = getComments;
module.exports.makeComments = makeComments;
module.exports.getNewComments = getNewComments;