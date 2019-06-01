//index.js
//获取应用实例
import {ajaxApi} from '../../utils/api.js';
import login from '../../utils/login.js'

Page({
  data: {
    videoLiveList: [],
    videoList: []
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  toDetail(e) {
    wx.navigateTo({
      url: `/pages/videodetail/videodetail?id=${e.currentTarget.dataset.id}`
    })
  },
  toVideoList(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/videolist/videolist?type=${e.currentTarget.dataset.index || ''}`
    })
  },
  onLoad: function () {
    login().then(() => {
      this.searchVideo();
      this.query();
    })
  },
  toMeeting(e) {
    wx.navigateTo({
      url: `/pages/meetingpreview/meetingpreview?url=${e.currentTarget.dataset.url || ''}`
    })
  },
  searchVideo() {
    ajaxApi.getVideoList({
      page_no: 1,
      page_size: 5
    }).then((res = {}) => {
      console.log(res);
      res.data = res.data || {};
      this.setData({
        videoList: res.data.list || []
      })
    }).catch((error) => {
      wx.showToast({
          title: error.msg || error.message || error.errMsg || '出错了',
          icon: 'none',
          duration: 2000
      })
    })
  },
  query() {
    ajaxApi.queryLiveUrl({
      name: "livebroad"
    }).then((res = {}) => {
      res.data = res.data || {};
      this.setData({
        videoLiveList: res.data.val ? JSON.parse(res.data.val) : []
      })
    }).catch((error) => {
      wx.showToast({
          title: error.msg || error.message || error.errMsg || '出错了',
          icon: 'none',
          duration: 2000
      })
    })
  },
})
