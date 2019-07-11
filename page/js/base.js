var tagsRandom = new Vue ({
    el: '#random-tags',
    data: {
        tags:[]
    },
    computed: {
        randomColor: function() {
            return function () {
                var red = parseInt(Math.random() * 100);
                var green = parseInt(Math.random() * 255);
                var blue = parseInt(Math.random() * 255);
                return `rgba(${red},${green},${blue})`;
            }
        },
        randomSize : function () {
            return function () {
                var size = parseInt(Math.random() * 10) + 12;
                return size + 'px';
            }
        }
    },
    methods: {
        getNewTags(){
            axios({
                method: 'get',
                url: '/tags'
            }).then(function (resp) {
                var data = resp.data.data;
                tagsRandom.tags = data;
            }).catch(function(error) {
                console.log(error);
            })
        }
    },
    created () {
        axios({
            methods: 'get',
            url: '/tags'
        }).then(function (resp) {
            var tagList = [];
            var data = resp.data.data;
            data.forEach((ele) => {
                var tag = {
                    tag: ele.tag,
                    link: '/html/tagBlogList.html?tag=' + ele.tag
                };
                tagList.push(tag);
            })
            tagsRandom.tags = tagList;
        }).catch(function(error) {
            console.log(error);
        })
    }
});
var hotArticle = new Vue({
    el: '#hot-article',
    data: {
        hotArticle: [],
    },
    created() {
        axios({
            methods: 'get',
            url: '/getHotBlog'
        }).then(function (resp) {
            var data = resp.data.data;
            data.forEach(element => {
                element.link = '/html/blog.html?id=' +element.id;
            });
            hotArticle.hotArticle = data;
        }).catch(function(error) {
            console.log(error);
        })
    }
});
var comments = new Vue ({
    el: '#new-comments',
    data: {
        newComments: [],
        noComments: ''
    },
    created() {
        axios({
            method: 'get',
            url: '/getNewComments'
        }).then(function (resp) {
            var data = resp.data.data;
            if(typeof data == 'string'){
                comments.noComments = data;
            }else{
                comments.newComments = data;
            }
        }).catch(function (resp) {
            console.log(resp);
        })
    }
});
var search = new Vue({
    el: '#search',
    data: {
        searchKey: '',
    },
    computed:{
        searchLink: function () {
            return './html/tagBlogList.html?tag=' + this.searchKey;
        }
    }
})