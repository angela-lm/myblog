var fs = require('fs');
var globalConfig = require('./config');
var controllerSet = [];
var pathMap = new Map();
var files = fs.readdirSync(globalConfig['web_path']);
for(var i = 0; i < files.length; i++){
    var temp = require('./' + globalConfig['web_path'] + '/' + files[i]);
    if(temp.path){
        temp.path.forEach((value,key) => {
            if(pathMap.has(key) == false){
                pathMap.set(key,value);
            }else{
                throw new Error('url path 异常,url:' + key);
            }            
        });
        controllerSet.push(temp);
    }
}
module.exports = pathMap;