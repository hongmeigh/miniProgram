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
      imgUrl: 'https://img1.dxycdn.com/2019/0118/457/3323887035940868926-10.png',
      title: '这里是一个大标题',
      description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
    }, {
      imgUrl: 'https://img1.dxycdn.com/2019/0416/334/3340209691929395091-73.png',
      title: '这里是一个大标题这里是一个大标题,这里是一个大标题',
      description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
    }, {
      imgUrl: 'https://img1.dxycdn.com/2019/0416/751/3340212324744739821-73.png',
      title: '这里是一个大标题',
      description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
    }, {
      imgUrl: 'https://img1.dxycdn.com/2019/0509/565/3344466895725820036-73.png',
      title: '这里是一个大标题',
      description: '这里是一段简介，这里是一段简介，这里是一段简介，这里是一段简介这里是一段简介'
    }, {
      imgUrl: 'https://res.dxycdn.com/cms/upload/asset/2017/05/22/A1495089762.png',
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
    
  }
})
