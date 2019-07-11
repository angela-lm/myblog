var blogDao = require('../dao/blogDao');
var tagsDao = require('../dao/tagsDao');
var blogTagsMapping = require('../dao/blogTagsMapping');
var timeUtil = require('../util/TimeUtil');
var respUntil = require('../util/respUtil');
var path = new Map();
function editBlog(request,response){
    request.on('data',function(data) {
        var dataList = {};
        var tagList = [];
        data = data.toString().split('&');
        data.forEach(element => {
            if(element.split('=')[0] =='tags'){
                dataList[element.split('=')[0]] = element.split('=')[1].replace(/，/g,',');
                tagList = dataList[element.split('=')[0]].split(',');
            }else{
                dataList[element.split('=')[0]] = element.split('=')[1];
            }
        });
        blogDao.insertBlog(dataList['title'],dataList['tags'],dataList['content'],dataList['brief'],timeUtil.getTime(),function(result) {
            var articleId = result.insertId;
            tagList.forEach(elem => {
                tagsDao.getTags(elem,function (result) {
                    if(result == null || result.length == 0){
                        tagsDao.insertTags(elem,timeUtil.getTime(),function(result){
                            blogTagsMapping.insertBlogTagsMapping(articleId,result.insertId,timeUtil.getTime(),function (result) {
                            });
                        })
                    }else if(result.length == 1){
                        blogTagsMapping.insertBlogTagsMapping(articleId,result[0].id,timeUtil.getTime(),function (result) {});
                    }
                })
            })
            response.writeHead(200);
            response.write(respUntil.responseInfo('success','添加成功',null));
            response.end();
        })
    })
}
path.set('/editBlog',editBlog);

function getBlog(request, response) {
    var blogNum = parseInt(request.query.blogNum);
    var resultArr = [];
    blogDao.getBlog(blogNum,function (result) {
        result.forEach(function (ele) {
            var temp = {};
            temp.id = ele.id;
            temp.ctime = timeUtil.formatTime(ele.ctime);
            temp.title = ele.title;
            temp.brief = ele.brief;
            temp.views = ele.views;
            temp.tags = ele.tags;
            resultArr.push(temp);
        })
        response.writeHead(200);
        response.write(respUntil.responseInfo('success','添加成功',resultArr));
        response.end();
    })
}
path.set('/getBlog',getBlog);

function getHotBlog(request,response) {
    blogDao.getHotBlog(function (result) {
        result.forEach(function (element) {
            element.ctime = timeUtil.formatTime(element.ctime);
        })
        response.writeHead(200);
        response.write(respUntil.responseInfo('success','添加成功',result));
        response.end();
    })
}
path.set('/getHotBlog',getHotBlog);

function getBlogCount(request,response) {
    blogDao.getBlogCount(function (result){
        var result = result[0]['count( * )'];
        response.writeHead(200);
        response.write(respUntil.responseInfo('success','添加成功',{countNum:result}));
        response.end();  
    })
}
path.set('/getBlogCount',getBlogCount);

function blogDetails(request, response) {
    var blogId = request.query.id;
    blogDao.blogDetails(blogId,function (result) {
        result[0].ctime = timeUtil.formatTime(result[0].ctime);
        response.writeHead(200);
        response.write(respUntil.responseInfo('success','添加成功',result));
        response.end();
    })
}
path.set('/blogDetails',blogDetails);

function getTagBlogs(request,response){
    var resultArr = [];
    var tag = request.query.tag;
    tagsDao.getTags(tag,function(result){
        if(result.length > 0){
            blogTagsMapping.getBlogId(result[0].id,function(result) {
                var len = result.length;
                result.forEach(function(ele){
                    blogDao.getTagBlog(ele.articleId,function(result){
                        result.forEach(function(ele){
                            ele.ctime = timeUtil.formatTime(ele.ctime);
                        })
                        resultArr.push(result[0]);
                        if(resultArr.length == len){
                            response.writeHead(200);
                            response.write(respUntil.responseInfo('success','添加成功',resultArr));
                            response.end();
                        }
                    })
                })
            })
        }else{
            response.writeHead(200);
            response.write(respUntil.responseInfo('success','添加成功','此分类还没有添加内容，请快去添加吧！'));
            response.end();
        }
    })
}
path.set('/getArticleList',getTagBlogs);
module.exports.path = path;