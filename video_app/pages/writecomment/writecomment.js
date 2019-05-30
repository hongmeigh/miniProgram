// pages/writecomment/writecomment.js
import {ajaxApi} from '../../utils/api.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        commentValue: '',
        userInfo: {},
        popShow: false,
        disabled: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.videoId = options.id || '';
        this.queryUserInfo();
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
    getuserinfo(e) {
        console.log(e);
        this.setData({
            popShow: false
        })
        if (e.detail.userInfo) {
            ajaxApi.updateUserInfo({
                nickname: e.detail.userInfo.nickName,
                avatar_url: e.detail.userInfo.avatarUrl,
                sex: e.detail.userInfo.gender == 1 ? '男' : e.detail.userInfo.gender == 2 ? '女' : ''
                // sex: this.data.sex
            }).then(res => {
                this.queryUserInfo();
                wx.showToast({
                    title: '授权成功',
                    icon: 'success',
                    duration: 2000
                })
                // update globalData.userInfo if needed
            }).catch((error) => {
                wx.showToast({
                    title: error.msg || error.message || error.errMsg || '出错了',
                    icon: 'none',
                    duration: 2000
                })
            })
        }
    },
    hidePop() {
        this.setData({
            popShow: false
        })
    },
    toLogin() {
        this.setData({
            popShow: true
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
        if (!this.data.userInfo.nickname) {
            this.setData({
                popShow: true,
                disabled: true
            });
            return;
        }
        ajaxApi.publishComment({
            content: this.data.commentValue,
            video_id: this.videoId
        }).then((res = {}) => {
            console.log(222, res)
            wx.showToast({
                title: '发布成功',
                icon: 'success',
                duration: 1000
            })
            setTimeout(() => {
                wx.navigateBack({
                    delta: 1
                })
            }, 1000)
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
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