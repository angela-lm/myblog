var dbutil = require('./DBUtil');
function insertTags(tag,ctime,success) {
    var insertSql = 'insert into tags (`tag`,`ctime`)  values (?,?);';
    var parmas = [tag,ctime];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(insertSql,parmas,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function getTags (tag,success){
    var querySql = 'select * from tags where tag=?';
    var parmas = [tag];
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(querySql,parmas,function (error,result) {
        if(error == null){
            success(result);
        }else if(result.length == 1){
            console.log(error);
        }
    })
    connection.end();
}

function getRandomTags (success){
    var queryCount = 'select count (*) from tags';
    var parmasCount = [];
    var querySql = 'select tag from tags limit ?,?';
    var connection = dbutil.createConnection();
    connection.connect();
    connection.query(queryCount,parmasCount,function(error,result) {
        if(error == null){
            var count = result[0]['count (*)'];
            var beginNum = parseInt(Math.random() * count);
                beginNum = count > 20 ? beginNum : 0;
            var parmas = [beginNum,20];
            connection.query(querySql,parmas,function (error,result) {
                if(error == null){
                    success(result);
                }else{
                    console.log(error);
                }
            })
            connection.end(); 
        }else{
            console.log(error);
        }
    })
    // connection.end();
}
module.exports.insertTags = insertTags;
module.exports.getTags = getTags;
module.exports.getRandomTags = getRandomTags;