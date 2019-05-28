//app.js
import { ajaxApi } from './utils/api.js'
App({
    onLaunch: function () {
        this.login().then((data) => {
            console.log(data)
        }).catch((error) => {
            console.log(error)
        });
    },
    onShow() {
    },
    login() {
        const token = wx.getStorageSync('token');
        const self = this;
        return new Promise((resolve, reject) => {
            if (token) {
                wx.checkSession({
                    success() {
                        //session_key 未过期，并且在本生命周期一直有效
                        resolve({ token: token })
                    },
                    fail() {
                        // session_key 已经失效，需要重新执行登录流程
                         return self.wxlogin();
                    }
                })
            } else {
                //reject({ message: 'token is null' });
                return self.wxlogin();
            }
        });
    },
    wxlogin() {
        return new Promise(function (resolve, reject) {
            wx.login({
                success(res) {
                    if (res.code) {
                        wx.setStorageSync('userCode', res.code);
                        ajaxApi.codeToToken({
                            wxcode: res.code,
                            wxappid: 'wxbadd77563dc6c61d'
                        }).then((response = {}) => {
                            //返回token
                            console.log(111, response)
                            if (response.data.auth_token) {
                                wx.setStorageSync('token', response.data.auth_token);
                                resolve(res.data)
                            } else {
                                console.log(res.errMsg);
                                reject(res.errMsg)
                            }
                        }).catch((error) => {
                            reject(error)
                        })
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
    globalData: {
        userInfo: null
    }
})