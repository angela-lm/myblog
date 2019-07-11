var commentsDao = require('../dao/commentsDao');
var blogCommentsMapping = require('../dao/blogCommentsMappingDao');
var TimeUtil = require('../util/TimeUtil');
var respUntil = require('../util/respUtil');
var path = new Map();

function makeComments(request,response){
    request.on('data',function (data){
        var data = JSON.parse(data.toString());
        commentsDao.makeComments(data.commentsContent,data.commentsUsername,data.commentsEmails,'../img/img/' + parseInt(Math.random() * 2 + 1) + '.jpg',TimeUtil.getTime(),function (result) {
            blogCommentsMapping.createMapping(request.query.id,result.insertId,TimeUtil.getTime(),function (result) {
                response.writeHead(200);
                response.write(respUntil.responseInfo('success','添加成功',result));
                return response.end();
            });
        })
    })
}
path.set('/makeComments',makeComments);

function getComments(request,response){
    blogCommentsMapping.getCommentsId(request.query.id,function (result) {
        var resultArr = [];
        for(var i = 0; i < result.length; i ++){
            commentsDao.getComments(result[i].commentsId,function (res){
                res[0].ctime = TimeUtil.formatTime(res[0].ctime);
                resultArr.push(res[0]);
                if(resultArr.length == result.length){
                    response.writeHead(200);
                    response.write(respUntil.responseInfo('success','查询成功',resultArr));
                    return response.end();
                }
            })
        }
    })
}
path.set('/getComments',getComments);

function getNewComments(request,response){
    var resultArr = [];
    commentsDao.getNewComments(function(result){
        var len = result.length;
        if(len > 0){
            result.forEach(function(ele) {
                ele.ctime = TimeUtil.formatTime(ele.ctime);
                blogCommentsMapping.getBlogId(ele.id,function(res) {
                    ele.link = '/html/blog.html?id=' + res[0].blogId;
                    resultArr.push(ele);
                    if(resultArr.length == len){
                        response.writeHead(200);
                        response.write(respUntil.responseInfo('success','查询成功',resultArr));
                        response.end();
                    }
                })
            })
        }else{
            response.writeHead(200);
            response.write(respUntil.responseInfo('success','查询成功','暂时还有评论哦！'));
            response.end();
        }
    })
}
path.set('/getNewComments',getNewComments);

module.exports.path = path;