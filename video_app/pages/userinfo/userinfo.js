// miniprogram/pages/person/person.js
import {ajaxApi} from '../../utils/api.js';
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
        userInfo: {},
        nickname: '',
        avatarUrl: '',
        sex: '',
        mobile: '',
        userImg: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        this.queryUserInfo();
    },
    onShow: function(){

    },
    queryUserInfo() {
        ajaxApi.getUserInfo().then((res = {}) => {
            console.log(res);
            res.data = res.data || {};
            this.setData({
                nickname: res.data.nickname || '',
                avatarUrl: res.data.avatar_url || '',
                sex: res.data.sex || '',
                mobile: res.data.phone_no || ''
            })
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
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
        ajaxApi.updateUserInfo({
            nickname: this.data.nickname,
            avatar_url: this.data.avatarUrl,
            phone_no: this.data.mobile,
            sex: this.data.sex
        }).then(res => {
            wx.showToast({
                title: '保存成功',
                icon: 'success',
                duration: 2000
            })
            // update globalData.userInfo if needed
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
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
                console.log(222, res)
                wx.uploadFile({
                    url: 'https://d1.ydguanjia.com/svere/api/upload',
                    filePath: tempFilePaths[0],
                    name: 'file',
                    formData: {
                    },
                    success(res) {
                        console.log(res)
                        const data = res.data;
                        const response = data ? JSON.parse(data) : {};
                        if (response.code == 1) {
                            self.setData({
                                avatarUrl: response.data.file_url
                            })
                        } else {
                            wx.showToast({
                                title: response.msg || '上传图片失败',
                                icon: 'none',
                                duration: 2000
                            })
                              
                        }
                    }
                })
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