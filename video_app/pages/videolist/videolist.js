// pages/videolist/videolist.js
import {ajaxApi} from '../../utils/api.js';
const list = [{
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }, {
    videoId: 1,
    videoImg: '../../images/day1.png',
    videoTitle: '这里是一个大标题',
    videoDescription: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
  }];
Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadText: '上拉加载更多',
        totalPage: 3,
        page: 1,
        videoList: [] 
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
                title: 'EMDT'
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
        this.searchVideo();
    },
    searchVideo() {
      this.setData({
        loadText: '加载中...'
      })
      ajaxApi.getVideoList({
        type: this.type,
        videoTitle: this.searchValue || '',
        page: this.data.page
      }).then((res = {}) => {
        console.log(res);
        res.data = res.data || {};
        res.data.videoList = res.data.videoList || [];
        let loadText = '';
        if (this.data.page == 1 && res.data.videoList.length == 0) {
          loadText = '暂无数据'
        } else if (this.data.page >= 1 && this.data.page < res.data.totalPage) {
          loadText = '上拉加载更多'
        } else if (this.data.page >= 1 && this.data.page >= res.data.totalPage) {
          loadText = '加载完毕'
        }
        this.setData({
          totalPage: res.data.totalPage,
          videoList: this.data.videoList.concat(res.data.videoList),
          page: this.data.page + 1,
          loadText: loadText
        })
      })
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
        if (this.data.page > this.data.totalPage) {
          return;
        }
        this.searchVideo();
        // if (this.data.page >= this.data.totalPage) {
        //     return;
        // }
        // this.setData({
        //     loadText: '加载中...'
        // })
        // setTimeout(() => {
        //     const page = this.data.page;
        //     this.setData({
        //         videoList: this.data.videoList.concat(list),
        //         page: page + 1,
        //         loadText: page + 1 >= this.data.totalPage ? '加载完毕' : '上拉加载更多'
        //     })
        // }, 1000)
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})