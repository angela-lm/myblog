var tagBlogList = new Vue({
    el: '#blog-tag-article',
    data: {
        blogList: [],
        showInfo:''
    },
    created () {
        var tagName = location.search.split('=')[1];
        axios({
            method:'get',
            url:'/getArticleList?tag=' + tagName
        }).then(function(resp){
            var data = resp.data.data;
            if(typeof data == 'string'){
                tagBlogList.showInfo = data;
            }else{
                var blogList = [];
                data.forEach(function(ele){
                    ele.link = './blog.html?id=' + ele.id;
                    blogList.push(ele);
                });
                tagBlogList.blogList = blogList;
                console.log(blogList);
            }
        }).catch(function(resp){
            console.log(resp);
        })
    }
})