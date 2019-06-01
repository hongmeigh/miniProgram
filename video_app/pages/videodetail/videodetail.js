// pages/videodetail/videodetail.js
import {ajaxApi} from '../../utils/api.js';
import {formatTime} from '../../utils/util.js';
import login from '../../utils/login.js'
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
        totalPage: 1,
        loadText: '加载更多评论',
        popShow: false,
        userInfo: {},
        file: {
            name: '',
            url: ''
        },
        title: '',
        video_cover: '',
        height: (wx.getSystemInfoSync().screenHeight - 360) * 2
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.videoId = options.id;
        login().then(() => {
            this.getVideoDetail();
            this.getCommentList();
            this.queryUserInfo();
        })
        console.log(wx.getSystemInfoSync().windowHeight, wx.getSystemInfoSync().screenHeight)
    },
    preview() {
        const self = this;
        wx.showToast({
            title: '正在下载文件',
            icon: 'loading',
            duration: 200000
        })
        wx.downloadFile({
            // 示例 url，并非真实存在
            url: self.data.file.url,
            success: function (res) {
                wx.hideToast();
                const filePath = res.tempFilePath
                wx.openDocument({
                    filePath: filePath,
                    success: function (res) {
                        console.log('打开文档成功')
                    }
                })
            },
            fail: function() {
                wx.hideToast();
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
                file: res.data.attach ? JSON.parse(res.data.attach)[0] : '',
                title: res.data.title,
                video_cover: res.data.video_cover
            })
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
    },
    getCommentList() {
        if (this.data.page > this.data.totalPage) {
            return;
        }
        if (this.load) {
            return;
        }
        this.load = true;
        this.setData({
            loadText: '加载中...',  
        })
        ajaxApi.getCommentList({
            page_size: 6,
            page_no: this.data.page,
            video_id: this.videoId
        }).then((res = {}) => {
            this.load = false;
            console.log(res);
            res.data = res.data || {};
            res.data.list = res.data.list || [];
            res.data.list.forEach((item) => {
                item.create_at = formatTime(new Date(item.create_at))
            })
            let loadText = '';
            if (this.data.page === 1 && !res.data.list.length) {
                loadText = '暂无评论';
            } else if (this.data.page >= 1 && this.data.page < res.data.total_page) {
                loadText = '加载更多评论';
            } else if (this.data.page >= 1 && this.data.page >= res.data.total_page) {
                loadText = '没有更多评论了';
            }
            this.setData({
                loadText: loadText,
                totalPage: res.data.total_page || 0,
                commentList: this.data.commentList.concat(res.data.list),
                page: this.data.page + 1
            })
        }).catch((error) => {
            this.load = false;
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
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
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
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
        // if (!this.data.userInfo.username) {
        //     this.setData({
        //         popShow: true
        //     });
        //     return;
        // }
        ajaxApi.publishComment({
            content: this.data.commentValue,
            video_id: this.videoId
        }).then((res = {}) => {
            this.setData({
                page: 1,
                totalPage: 1,
                commentList: []
            }, () => {
                this.getCommentList();
            })
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
    },
    toWriteComment() {
        wx.navigateTo({
            url: `/pages/writecomment/writecomment?id=${this.videoId}`
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
        this.setData({
            page: 1,
            totalPage: 1,
            commentList: []
        }, () => {
            this.getCommentList();
        })
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
        return {
            title: this.data.title || '视频',
            imageUrl: this.data.video_cover,
            path: `/pages/videodetail/videodetail?id=${this.videoId}`
        }
    }
})