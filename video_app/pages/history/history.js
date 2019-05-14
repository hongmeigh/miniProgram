const list = [
    {
        videoURL: 'http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400',
        title: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        showImg: '../../images/video.jpg',
        show: false
    }, {
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        title: '这是一个标题这是一个标题这是一个标题,这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        showImg: '../../images/video.jpg',
        show: false
    }, {
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        title: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        showImg: '../../images/video.jpg',
        show: false
    }, {
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        title: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        showImg: '../../images/video.jpg',
        show: false
    }, {
        videoURL: 'https://ent-21.oss-cn-shanghai.aliyuncs.com/meeting/5ca1ddf6-ae16-41fc-972f-9d979632463a.mp4',
        title: '这是一个标题这是一个标题这是一个标题',
        publishTime: '2019-05-14 12:02',
        showImg: '../../images/video.jpg',
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
        historyList: [...list]
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