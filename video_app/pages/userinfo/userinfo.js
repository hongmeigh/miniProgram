// miniprogram/pages/person/person.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        sexList: ['男', '女'],
        // userInfo: {
        //     nickname: '',
        //     avatarUrl: '',
        //     sex: '',
        //     company_name: '',
        //     mobile: ''
        // }
        nickname: '',
        avatarUrl: '',
        sex: '',
        mobile: '',
        userImg: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // onLoad: function(options) {
    //     getUserInfo().then(u => {
    //         console.log(u);
    //         this.setData({ userInfo: u })
    //     })
    // },
    onShow: function(){
        // getUserInfo().then(u => {
        //     this.setData({
        //         nickname: u.nickname,
        //         avatarUrl: u.avatarUrl,
        //         sex: u.sex,
        //         company_name: u.company_name,
        //         mobile: u.mobile
        //     })
        // })
    },

    bindNicknameInput(e) {
        this.setData({
            nickname: e.detail.value
        })
    },
    bindMobileInput(e) {
        this.setData({
            mobile: e.detail.value
        })
    },

    bindSexChange(e) {
        console.log(this.data.sexList[e.detail.value])
        this.setData({
            sex: this.data.sexList[e.detail.value]
            // 'userInfo.sex': this.data.sexList[e.detail.value]
        })
    },
    save() {
        // updateUserInfo({
        //     nickname: this.data.nickname,
        //     avatarUrl: this.data.avatarUrl,
        //     company_name: this.data.company_name,
        //     mobile: this.data.mobile,
        //     sex: this.data.sex
        // }).then(res => {
        //     console.log('update userInfo succeed')
        //     wx.showToast({
        //         title: '保存成功',
        //         icon: 'success',
        //         duration: 2000
        //     })
        //     // update globalData.userInfo if needed
        // }).catch((error) => {
        //     console.log(error)
        // })
    },
    chooseImg() {
        const self = this;
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success(res) {
                // tempFilePath可以作为img标签的src属性显示图片
                const tempFilePaths = res.tempFilePaths;
                self.setData({
                    userImg: tempFilePaths
                })
                // wx.uploadFile({
                //     url: '',
                //     filePath: tempFilePaths[0],
                //     name: 'file',
                //     formData: {
                //         user: 'test'
                //     },
                //     success(res) {
                //         const data = res.data
                //     }
                // })
            }
        })
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})