//app.js
import { ajaxApi } from './utils/api.js'
App({
    onLaunch: function () {
        this.login();
    },
    onShow() {
    },
    login() {
        const token = wx.getStorageSync('token');
        return new Promise((resolve, reject) => {
            if (token) {
                wx.checkSession({
                    success() {
                        //session_key 未过期，并且在本生命周期一直有效
                        resolve({ token: token })
                    },
                    fail() {
                        // session_key 已经失效，需要重新执行登录流程
                        this.getToken();
                    }
                })
            } else {
                reject({ message: 'token is null' });
                this.getToken();
            }
        });
    },
    wxlogin() {
        return new Promise(function (resolve, reject) {
            wx.login({
                success(res) {
                    if (res.code) {
                        wx.setStorageSync('userCode', res.code)
                        resolve(res)
                    } else {
                        reject(res)
                        console.log('登录失败！' + res.errMsg)
                    }
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    },
    getToken() {
        this.wxlogin().then((data) => {
            ajaxApi.codeToToken({
                code: data.code
            }).then((res = {}) => {
                //返回token
                if (res.data.token) {
                    wx.setStorageSync('token', res.data.token);
                    resolve(res.data)
                } else {
                    console.log(res.errMsg)
                }
            }).catch((error) => {
                console.log(error)
            })
        }).catch((error) => {
            reject({ errMsg: JSON.stringify(error) })
        })
    },
    globalData: {
        userInfo: null
    }
})