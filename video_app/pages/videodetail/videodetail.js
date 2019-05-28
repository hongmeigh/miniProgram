// pages/videodetail/videodetail.js
import {ajaxApi} from '../../utils/api.js';
const list = [{
    userName: '小明',
    userImg: '../../images/userinfo.png',
    commentContent: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    publishTime: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    commentContent: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频,非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    publishTime: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    commentContent: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    publishTime: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    commentContent: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    publishTime: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    commentContent: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    publishTime: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    commentContent: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    publishTime: '2019-05-14 10:29'
}]
Page({
    data: {
        tabIndex: 0,
        video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        videoUrl: '',
        teacherInfo: '',
        videoDetail: '',
        annex: '',
        commentList: [],
        commentValue: '',
        page: 1,
        totalPage: 2,
        loadText: '加载更多评论',
        popShow: false,
        userInfo: {},
        file: {
            name: '',
            url: ''
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.videoId = options.id;
        this.getVideoDetail();
        this.getCommentList();
        this.queryUserInfo();
    },
    preview() {
        const self = this;
        wx.downloadFile({
            // 示例 url，并非真实存在
            url: self.data.file.url,
            success: function (res) {
                const filePath = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    success: function (res) {
                        console.log('打开文档成功')
                    }
                })
            }
        })
    },
    getVideoDetail() {
        ajaxApi.getVideoDetail({
            id: this.videoId
        }).then((res = {}) => {
            console.log(res);
            res.data = res.data || {};
            this.setData({
                videoUrl: res.data.video_url,
                teacherInfo: res.data.presenter_profile.replace(/<img /g, '<img class="rich_img" '),
                videoDetail: res.data.content.replace(/<img /g, '<img class="rich_img" '),
                file: res.data.attach ? JSON.parse(res.data.attach)[0] : ''
            })
        })
    },
    getCommentList() {
        if (this.data.page > this.data.totalPage) {
            return;
        }
        this.setData({
            loadText: '加载中...',  
        })
        ajaxApi.getCommentList({
            page: this.data.page,
            video_id: this.videoId
        }).then((res = {}) => {
            console.log(res);
            res.data = res.data || {};
            res.data.commentList = res.data.commentList || [];
            let loadText = '';
            if (this.data.page === 1 && !res.data.commentList.length) {
                loadText = '暂无评论';
            } else if (this.data.page >= 1 && this.data.page < res.data.total_page) {
                loadText = '加载更多评论';
            } else if (this.data.page >= 1 && this.data.page >= res.data.total_page) {
                loadText = '没有更多评论了';
            }
            this.setData({
                loadText: loadText,
                totalPage: res.data.total_page || 0,
                commentList: this.data.commentList.concat(res.data.commentList),
                page: this.data.page + 1
            })
        })
    },
    getuserinfo(e) {
        console.log(e);
        this.setData({
            popShow: false
        })
    },
    queryUserInfo() {
        ajaxApi.getUserInfo().then((res = {}) => {
            console.log(res);
            res.data = res.data || {};
            this.setData({
                userInfo: res.data
            })
        })
    },
    changeTab(e) {
        this.setData({
            tabIndex: e.target.dataset.tab
        })
    },
    bindKeyInput(e) {
        this.setData({
            commentValue: e.detail.value
        })
    },
    publish() {
        console.log(this.data.commentValue)
        if (!this.data.commentValue) {
            wx.showToast({
                title: '请填写评论',
                icon: 'none',
                duration: 2000
            });
            return;
        }
        if (!this.data.userInfo.username) {
            this.setData({
                popShow: true
            })
        }
        ajaxApi.publishComment({
            commentContent: this.data.commentValue
        }).then((res = {}) => {
            this.setData({
                page: 1,
                commentList: []
            }, () => {
                this.getCommentList();
            })
        })
    },
    hidePop() {
        this.setData({
            popShow: false
        })
    },
    loadMore() {
        // this.setData({
        //     commentList: this.data.commentList.concat(list)
        // })
        this.getCommentList();
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function () {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function () {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})