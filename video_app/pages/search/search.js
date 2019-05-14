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
        const value = e.detail.value;
        if (list.length >= 10 && value && list.indexOf(value) < 0) {
            list.shift();
        }
        if (value && list.indexOf(value) < 0) {
            list.unshift(value);
        }
        if (value && list.indexOf(value) >= 0) {
            list.unshift(list.splice(list.indexOf(value), 1)[0]);
        }
        wx.setStorageSync('tagList', JSON.stringify(list))
        this.setData({
            tagList: list
        })
        wx.navigateTo({
            url: `/pages/videolist/videolist?search=${value}`
        })
    },
    resetValue(e) {
        console.log(e.target.dataset.search);
        // this.setData({
        //     searchValue: e.target.dataset.search,
        //     focus: true
        // })
        const list = [...this.data.tagList];
        const value = e.target.dataset.search;
        if (list.length >= 10 && value && list.indexOf(value) < 0) {
            list.shift();
        }
        if (value && list.indexOf(value) < 0) {
            list.unshift(value);
        }
        if (value && list.indexOf(value) >= 0) {
            list.unshift(list.splice(list.indexOf(value), 1)[0]);
        }
        wx.setStorageSync('tagList', JSON.stringify(list))
        this.setData({
            tagList: list
        })
        wx.navigateTo({
            url: `/pages/videolist/videolist?search=${value}`
        })
    },
    clear() {
        const self = this;
        wx.showModal({
            title: '提示',
            content: '确定要清空历史搜索吗',
            success(res) {
              if (res.confirm) {
                wx.setStorageSync('tagList', JSON.stringify([]))
                self.setData({
                    tagList: []
                })
              } else if (res.cancel) {
                console.log('用户点击取消')
              }
            }
          })
    },
    // toList() {
    //     const list = [...this.data.tagList];
    //     if (list.length >= 10 && this.data.searchValue && list.indexOf(this.data.searchValue) < 0) {
    //         list.shift();
    //     }
    //     if (this.data.searchValue && list.indexOf(this.data.searchValue) < 0) {
    //         list.unshift(this.data.searchValue);
    //     }
    //     if (this.data.searchValue && list.indexOf(this.data.searchValue) >= 0) {
    //         list.unshift(list.splice(list.indexOf(this.data.searchValue), 1)[0]);
    //     }
    //     wx.setStorageSync('tagList', JSON.stringify(list))
    //     this.setData({
    //         tagList: list
    //     })
    //     wx.navigateTo({
    //         url: `/pages/videolist/videolist?search=${this.data.searchValue}`
    //     })
    // },
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