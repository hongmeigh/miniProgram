//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    videoLiveList: [{
      bgUrl: '../../images/day1.png'
    }, {
      bgUrl: '../../images/day2.png'
    }],
    videoList: [{
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
    }]
  },
  //事件处理函数
  toSearch: function() {
    wx.navigateTo({
      url: '/pages/search/search'
    })
  },
  toVideoList(e) {
    console.log(e)
    wx.navigateTo({
      url: `/pages/videolist/videolist?type=${e.currentTarget.dataset.index}`
    })
  },
  onLoad: function () {
    
  }
})
