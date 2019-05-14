// pages/videodetail/videodetail.js
const list = [{
    userName: '小明',
    userImg: '../../images/userinfo.png',
    content: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    date: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    content: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频,非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    date: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    content: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    date: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    content: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    date: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    content: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    date: '2019-05-14 10:29'
}, {
    userName: '小明',
    userImg: '../../images/userinfo.png',
    content: '非常实用 感觉帮助很大，清晰明了，希望可以继续出这么好的视频',
    date: '2019-05-14 10:29'
}]
Page({
    data: {
        tabIndex: 0,
        video: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        video2: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        introduce: '这里是讲师的简介的内容，这里是讲师的简介的内容， 这里是讲师的简介的内容 这里是讲师的简介的内容这里是讲师的简介的内容这里是讲师的简介的内容，这里是讲师的简介的内容这里是讲师的简介的内容',
        detail: '这里是会议详情的内容，这里是会议详情的内容这里是会议详情的内容这里是会议详情的内容，这里是会议详情的内容这里是会议详情的内容这里是会议详情的内容这里是会议详情的内容这里是会议详情的内容，这里是会议详情的内容，这里是会议详情的内容这里是会议详情的内容，这里是会议详情的内容，这里是会议详情的内容，这里是会议详情的内容，这里是会议详情的内容这里是会议详情的内容这里是会议详情的内容。',
        commentList: [...list],
        commentValue: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },
    changeTab(e) {
        this.setData({
            tabIndex: e.target.dataset.tab
        })
    },
    bindKeyInput(e) {
        this.setData({
            commentValue: e.detail.value
        })
    },
    publish() {
        console.log(this.data.commentValue)
    },
    loadMore() {
        this.setData({
            commentList: this.data.commentList.concat(list)
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