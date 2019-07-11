var everyDayDao = require('../dao/everydayDao');
var timeUtil = require('../util/TimeUtil');
var respUntil = require('../util/respUtil');
var path = new Map();
function editEveryDay(request,response){
    request.on('data',function(data) {
        var dataList = {};
        data = data.toString().split('&');
        for(var i = 0; i < data.length;i++){
            dataArr = data[i].split('=');
            dataList[dataArr[0]] = dataArr[1];
        }
        everyDayDao.insertEveryDay(dataList['everydayChina'],dataList['everydayEnglish'],dataList['everydayAuthor'],timeUtil.getTime(),function (result) {
            response.writeHead(200);
            response.write(respUntil.responseInfo('success','添加成功',null));
            response.end();
        })
    })
}
path.set('/editEveryDay',editEveryDay);

function getEveryDay(request,response){
    everyDayDao.getEveryDay(function(result) {
        response.writeHead(200);
        response.write(respUntil.responseInfo('success','添加成功',result));
        response.end();
    })
}
path.set('/getEveryDay',getEveryDay);

module.exports.path = path;