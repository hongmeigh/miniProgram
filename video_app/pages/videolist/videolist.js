// pages/videolist/videolist.js
const list = [{
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题这里是一个大标题,这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题这里是一个大标题,这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    imgUrl: '../../images/day1.png',
    title: '这里是一个大标题',
    description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadText: '上拉加载更多',
        totalPage: 3,
        page: 1,
        videoList: [...list] 
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.searchValue = options.search;
        this.type = options.type;
        if (this.type == 1) {
            wx.setNavigationBarTitle({
                title: '讲堂'
            })
        } else if (this.type == 2) {
            wx.setNavigationBarTitle({
                title: '病例'
            })
        } else if (this.type == 3) {
            wx.setNavigationBarTitle({
                title: 'Emdit'
            })
        } else if (this.type == 4) {
            wx.setNavigationBarTitle({
                title: '患教'
            })
        } else {
            wx.setNavigationBarTitle({
                title: '视频列表'
            })
        }
    },
    toDetail(e) {
      wx.navigateTo({
        url: `/pages/videodetail/videodetail?id=${e.currentTarget.dataset.id}`
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
        if (this.data.page >= this.data.totalPage) {
            return;
        }
        this.setData({
            loadText: '加载中...'
        })
        setTimeout(() => {
            const page = this.data.page;
            this.setData({
                videoList: this.data.videoList.concat(list),
                page: page + 1,
                loadText: page + 1 >= this.data.totalPage ? '加载完毕' : '上拉加载更多'
            })
        }, 1000)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})