// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        searchValue: '',
        focus: false,
        tagList: wx.getStorageSync('tagList') ? JSON.parse(wx.getStorageSync('tagList')) : [],
        hotList: ['医疗', '门诊']
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    bindKeyInput(e) {
        this.setData({
            searchValue: e.detail.value
        })
    },
    confirm(e) {
        console.log(e);
        const list = [...this.data.tagList];
        if (list.length >= 10 && e.detail.value) {
            list.shift();
        }
        if (e.detail.value) {
            list.push(e.detail.value);
        }
        wx.setStorageSync('tagList', JSON.stringify(list))
        this.setData({
            tagList: list
        })
        wx.navigateTo({
            url: `/pages/videolist/videolist?search=${e.detail.value}`
        })
    },
    resetValue(e) {
        console.log(e.target.dataset.search);
        this.setData({
            searchValue: e.target.dataset.search,
            focus: true
        })
    },
    toList() {
        const list = [...this.data.tagList];
        if (list.length >= 10 && this.data.searchValue) {
            list.shift();
        }
        if (this.data.searchValue) {
            list.push(this.data.searchValue);
        }
        wx.setStorageSync('tagList', JSON.stringify(list))
        this.setData({
            tagList: list
        })
        wx.navigateTo({
            url: `/pages/videolist/videolist?search=${this.data.searchValue}`
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
        this.setData({
            tagList: wx.getStorageSync('tagList') ? JSON.parse(wx.getStorageSync('tagList')) : []
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

    }
})