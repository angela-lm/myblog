var express = require('express');
var globalConfig = require('./config');
var loader = require('./loader');
var app = new express();
app.use(express.static('./page/'));

app.post('/editEveryDay',loader.get('/editEveryDay'));
app.get('/getEveryDay',loader.get('/getEveryDay'));

app.post('/editBlog',loader.get('/editBlog'));
app.get('/getBlog',loader.get('/getBlog'));
app.get('/getHotBlog',loader.get('/getHotBlog'));
app.get('/blogDetails',loader.get('/blogDetails'));
app.get('/getBlogCount',loader.get('/getBlogCount'));

app.get('/tags',loader.get('/tags'));
app.get('/getArticleList',loader.get('/getArticleList'));

app.post('/makeComments',loader.get('/makeComments'));
app.get('/getComments',loader.get('/getComments'));
app.get('/getNewComments',loader.get('/getNewComments'));

app.listen(globalConfig['port'],function() {
    console.log('服务器已启动');
});