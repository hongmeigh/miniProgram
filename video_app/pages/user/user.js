// pages/user/user.js
import {ajaxApi} from '../../utils/api.js';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo: {},
        popShow: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.queryUserInfo();
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
                console.log(error)
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
    toHistory() {
        wx.navigateTo({
            url: '/pages/history/history'
        })
    },
    toUserInfo() {
        wx.navigateTo({
            url: '/pages/userinfo/userinfo'
        })
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {
        this.queryUserInfo();
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})