var blogDetails = new Vue({
    el: '#blogDetails',
    data:{
        title: '',
        date: '',
        tags: '',
        views: 0,
        content: '',
        commentsContent:'',
        commentsUsername: '',
        commentsEmails:'',
        commentsList:[]
    },
    methods: {
        makeComments: function () {
            var blogId = location.href.split('?')[1].split('=')[1];
            axios({
                method: 'post',
                data: {
                    commentsContent: blogDetails.commentsContent,
                    commentsUsername: blogDetails.commentsUsername,
                    commentsEmails: blogDetails.commentsEmails
                },
                url: '/makeComments?id=' + blogId
            }).then(function (resp){
                blogDetails.commentsContent = '';
                blogDetails.commentsUsername = '';
                blogDetails.commentsEmails = '';
                blogDetails.getComments();
            }).catch(function (error){
                console.log(error);
            })
        },
        getComments: function () {
            var blogId = location.href.split('?')[1].split('=')[1];
            axios({
                method:'get',
                url: '/getComments?id=' + blogId
            }).then(function(resp) {
                var data = resp.data.data;
                blogDetails.commentsList = data;
            }).catch(function (resp){
                console.log(resp);
            })
        }
    },
    created () {
        var blogId = location.href.split('?')[1].split('=')[1];
        axios({
            method: 'get',
            url: '/blogDetails?id=' + blogId
        }).then(function (resp) {
            var data = resp.data.data[0];
            blogDetails.title = data.title;
            blogDetails.date = data.ctime;
            blogDetails.tags = data.tags;
            blogDetails.views = data.views;
            blogDetails.content = data.content;
        }).catch(function (error) {
            console.log(error);
        });
        axios({
            method:'get',
            url: '/getComments?id=' + blogId
        }).then(function(resp) {
            var data = resp.data.data;
            blogDetails.commentsList = data;
        }).catch(function (resp){
            console.log(resp);
        })
    }
})