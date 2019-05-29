//index.js
//获取应用实例
import {ajaxApi} from '../../utils/api.js';

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
    this.searchVideo();
    this.query();
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
    })
  },
})
