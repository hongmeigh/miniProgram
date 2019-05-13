//app.js
import { homeAjax } from './utils/api.js'
App({
    onLaunch: function () {
    },
    onShow() {
    },
    // login() {
    //     const token = wx.getStorageSync('token');
    //     return new Promise((resolve, reject) => {
    //         if (token) {
    //             wx.checkSession({
    //                 success() {
    //                     //session_key 未过期，并且在本生命周期一直有效
    //                     resolve({ token: token })
    //                 },
    //                 fail() {
    //                     // session_key 已经失效，需要重新执行登录流程
    //                     this.wxlogin().then((res) => {
    //                         homeAjax.getTokenByUserInfo({
    //                             code: wx.getStorageSync('userCode')
    //                         }).then((res) => {
    //                             //返回token
    //                             if (res.status == 1) {
    //                                 if (res.data.token) {
    //                                     wx.setStorageSync('token', res.data.token);
    //                                     resolve(res.data)
    //                                 } else {
    //                                     reject({ message: 'error1' })
    //                                 }
    //                             } else {
    //                                 reject({ message: 'error2' })
    //                             }
    //                         }).catch((error) => {
    //                             reject({ message: JSON.stringify(error) })
    //                         })
    //                     }).catch((error) => {
    //                         reject({ message: JSON.stringify(error) })
    //                     })
    //                 }
    //             })
    //         } else {
    //             reject({ message: 'token is null' });
    //             this.wxlogin();
    //         }
    //     });
    // },
    // wxlogin() {
    //     return new Promise(function (resolve, reject) {
    //         wx.login({
    //             success(res) {
    //                 if (res.code) {
    //                     wx.setStorageSync('userCode', res.code)
    //                     resolve(res)
    //                 } else {
    //                     reject(res)
    //                     console.log('登录失败！' + res.errMsg)
    //                 }
    //             },
    //             fail(err) {
    //                 reject(err)
    //             }
    //         })
    //     })
    // },
    globalData: {
        userInfo: null
    }
})