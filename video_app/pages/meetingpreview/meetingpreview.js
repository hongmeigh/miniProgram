// pages/meetingpreview/meetingpreview.js
import {ajaxApi} from '../../utils/api.js';
import login from '../../utils/login.js'
Page({

    /**
     * 页面的初始数据
     */
    data: {
        previewCont: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(wx.getStorageSync('preview'));
        this.setData({
            previewCont: wx.getStorageSync('preview') ? wx.getStorageSync('preview').replace(/<img /g, '<img class="rich_img" ') : ''
        })
        // this.index = options.index || 0;
        // console.log(this.index)
        // login().then(() => {
        //     this.query();
        // })
    },
    query() {
        ajaxApi.queryLiveUrl({
          name: "livebroad"
        }).then((res = {}) => {
          res.data = res.data || {};
          const videoLiveList = res.data.val ? JSON.parse(res.data.val) : [];
          this.setData({
            previewCont: videoLiveList[this.index].preview.replace(/<img /g, '<img class="rich_img" ')
          })
        }).catch((error) => {
          wx.showToast({
              title: error.msg || error.message || error.errMsg || '出错了',
              icon: 'none',
              duration: 2000
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

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})