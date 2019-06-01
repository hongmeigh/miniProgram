// pages/videolist/videolist.js
import {ajaxApi} from '../../utils/api.js';
import login from '../../utils/login.js';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        loadText: '上拉加载更多',
        totalPage: 3,
        page: 1,
        videoList: [],
        pageSize: 20
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options);
        this.searchValue = options.search || '';
        this.type = options.type || '';
        if (this.type == 10) {
            wx.setNavigationBarTitle({
                title: '讲堂'
            })
        } else if (this.type == 20) {
            wx.setNavigationBarTitle({
                title: '病例'
            })
        } else if (this.type == 30) {
            wx.setNavigationBarTitle({
                title: 'EMDT'
            })
        } else if (this.type == 40) {
            wx.setNavigationBarTitle({
                title: '患教'
            })
        } else {
            wx.setNavigationBarTitle({
                title: '视频列表'
            })
        }
        login().then(() => {
          this.searchVideo();
        })
        
    },
    searchVideo() {
      this.setData({
        loadText: '加载中...'
      })
      ajaxApi.getVideoList({
        type: this.type || '',
        title: this.searchValue || '',
        page_no: this.data.page,
        page_size: this.data.pageSize
      }).then((res = {}) => {
        console.log(res);
        res.data = res.data || {};
        res.data.list = res.data.list || [];
        let loadText = '';
        if (this.data.page == 1 && res.data.list.length == 0) {
          loadText = '暂无数据'
        } else if (this.data.page >= 1 && this.data.page < res.data.total_page) {
          loadText = '上拉加载更多'
        } else if (this.data.page >= 1 && this.data.page >= res.data.total_page) {
          loadText = '加载完毕'
        }
        this.setData({
          totalPage: res.data.total_page,
          videoList: this.data.videoList.concat(res.data.list),
          page: this.data.page + 1,
          loadText: loadText
        })
      }).catch((error) => {
        wx.showToast({
            title: error.msg || error.message || error.errMsg || '出错了',
            icon: 'none',
            duration: 2000
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