var DBUtil = require('./DBUtil');

// 向数据库中插入blog
function insertBlog(title,tags,content,brief,ctime,succsess) {
    var insertSql = 'insert into blog (`title`,`tags`,`content`,`brief`,`ctime`,`views`)  values (?,?,?,?,?,?)';
    var params = [title,tags,content,brief,ctime,0];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(insertSql,params,function(error,result){
        if(error == null){
            succsess(result);
        }else{
            console.log(error);
        }
    })
    connection.end();
}

// 首页获取blog，限定获取博客条数；
function getBlog (blogNum,succsess){
    var querySql = 'select * from blog limit ?,?';
    var params = [blogNum,blogNum + 5];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result){
        if(error == null){
            succsess(result);
        }else{
            console.log('error');
        }
    })
    connection.end();
}

function getBlogCount(success){
    var querySql = 'select count( * ) from blog';
    var params = [];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result){
        if(error == null){
            success(result);
        }else{
            console.log('error');
        }
    })
    connection.end();   
}
function getTagBlog(blogId,succsess){
    var querySql = 'select * from blog where id=?';
    var params = [blogId];
    var connection = DBUtil.createConnection();
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
function getHotBlog(succsess){
    var querySql = 'select title,ctime,id from blog order by views limit 0, 10';
    var params = [];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            succsess(result);
        }else{
            console.log(error);
        }
    });
    connection.end();
}

function blogDetails(blogId,succsess){
    var querySql = 'select * from blog where id=?';
    var changeView = 'update blog set views=? where id=?';
    var params = [blogId];
    var connection = DBUtil.createConnection();
    connection.connect();
    connection.query(querySql,params,function (error,result) {
        if(error == null){
            var paramsView = [result[0].views + 1,blogId];
            connection.query(changeView,paramsView,function(result) {
                // console.log(result);
            })
            succsess(result);
            connection.end();
        }else{
            console.log(error);
        }
    })
}
module.exports.insertBlog = insertBlog;
module.exports.getBlog = getBlog;
module.exports.getHotBlog = getHotBlog;
module.exports.blogDetails = blogDetails;
module.exports.getTagBlog = getTagBlog;
module.exports.getBlogCount = getBlogCount;