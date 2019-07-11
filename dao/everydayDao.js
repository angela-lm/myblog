var DBUtil = require('./DBUtil');
function insertEveryDay(chinaText,englishText,author,ctime,success) {
    var insertSql = 'insert into every_day (`chinaText`,`englishText`,`author`,`ctime`) values (?,?,?,?)';
    var params = [chinaText,englishText,author,ctime];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}
function getEveryDay (success){
    var querySql = 'select * from every_day order by id desc limit 1';
    var params = [];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            success(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}
module.exports.insertEveryDay = insertEveryDay;
module.exports.getEveryDay = getEveryDay;