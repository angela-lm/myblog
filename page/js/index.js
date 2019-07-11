var everyDay = new Vue({
    el:'#daily-sentence',
    data: {
        content: '',
        contentChinese: '',
        writter: ''
    },
    computed: {

    },
    created () {
        axios({
            methods: 'get',
            url: '/getEveryDay'
        }).then(function(resp) {
            everyDay.content = resp.data.data[0].englishText;
            everyDay.contentChinese = resp.data.data[0].chinaText;
            everyDay.writter = resp.data.data[0].author;
        }).catch(function(resp) {
            console.log('请求失败！' + resp);
        })
    }
});
var blogList = new Vue({
    el: '#blog-article',
    data: {
        blogList: [],
        title:'',
        blogNum: 0,
        nowPage: 1,
        pageMenu: '',
        lastPage: 'show',
        nextPage: 'show'
    },
    methods: {
        getBlog(page){
            axios({
                methods: 'get',
                url: '/getBlog?blogNum=' + ((page - 1) * 5)
            }).then(function (resp){
                var data = resp.data.data;
                data.forEach(element => {
                    var tempArr = [];
                    element.tags = element.tags.split(',');
                    element.tags.forEach(function(ele){
                        var temp = {};
                        temp.tag = ele;
                        temp.link = '/html/tagBlogList.html?tag=' + ele;
                        tempArr.push(temp);
                    })
                    element.tags = tempArr;
                    element.link = '/html/blog.html?id=' + element.id;
                });
                blogList.blogList = data;
            }).catch(function(resp){
                console.log(resp);
            });
        },
        getPageSet(page) {
            this.nowPage = page;
            blogList.lastPage = page > 1 ? 'show' : '';
            blogList.nextPage = page >= blogList.pageIndex ? '' : 'show';
            this.getBlog(page); 
        }
    },
    computed: {
    },
    created() {
        axios({
            methods: 'get',
            url: '/getBlog?blogNum=' + 0
        }).then(function (resp){
            var data = resp.data.data;
            data.forEach(element => {
                var tempArr = [];
                element.tags = element.tags.split(',');
                element.tags.forEach(function(ele){
                    var temp = {};
                    temp.tag = ele;
                    temp.link = '/html/tagBlogList.html?tag=' + ele;
                    tempArr.push(temp);
                })
                element.tags = tempArr;
                element.link = '/html/blog.html?id=' + element.id;
            });
            blogList.blogList = data;
        }).catch(function(resp){
            console.log(resp);
        });
        axios({
            method: 'get',
            url: '/getBlogCount'
        }).then(function (resp) {
            var data = resp.data.data;
            var pageNum = parseInt((data.countNum - 1)/ 5) + 1;
                blogList.pageIndex = pageNum;  
                blogList.pageMenu = pageNum > 1 ? 'show' : '';
        }).catch(function(resp) {
            console.log(resp);
        })
    }
});