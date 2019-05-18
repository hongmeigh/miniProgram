import {ajaxApi} from '../../utils/api.js';
const list = [
    {
        videoId: 1,
        videoURL: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        videoTitle: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        videoImg: '../../images/video.jpg',
        show: false
    }, {
        videoId: 2,
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        videoTitle: '这是一个标题这是一个标题这是一个标题,这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        videoImg: '../../images/video.jpg',
        show: false
    }, {
        videoId: 3,
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        videoTitle: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        videoImg: '../../images/video.jpg',
        show: false
    }, {
        videoId: 4,
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        videoTitle: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        videoImg: '../../images/video.jpg',
        show: false
    }, {
        videoId: 5,
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        videoTitle: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        videoImg: '../../images/video.jpg',
        show: false
    }
]
Page({

    /**
     * 页面的初始数据
     */
    data: {
        page: 1,
        totalPage: 3,
        historyList: [...list],
        prevPlay: null,
        loadText: '上拉加载更多'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    toShowVideo(e) {
        const index = e.currentTarget.dataset.index;
        console.log(index);
        const str = `historyList[${index}].show`;
        this.setData({
            [str]: true
        }, () => {
            console.log(this.data.historyList)
        })
    },
    toPlay(e) {
        console.log(e);
        const id = e.currentTarget.dataset.id;
        if (this.prevId != id) {
            this.prevPlay && this.prevPlay.pause();
            this.prevPlay = wx.createVideoContext(id);
            this.prevId = id;
            this.prevPlay.pause();
            this.prevPlay.play();
        }
    },
    searchVideo() {
        this.setData({
          loadText: '加载中...'
        })
        ajaxApi.getHisVideoList({
          page: this.data.page
        }).then((res = {}) => {
          console.log(res);
          res.data = res.data || {};
          res.data.list = res.data.list || [];
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
            historyList: this.data.historyList.concat(res.data.list),
            page: this.data.page + 1,
            loadText: loadText
          })
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
                historyList: this.data.historyList.concat(list),
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