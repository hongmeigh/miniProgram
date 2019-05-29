import { ajaxApi } from './api.js'
function loginCheck() {
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
                    wx.setStorageSync('token', '');
                    resolve({ token: '' })
                    //return wxlogin();
                }
            })
        } else {
            //reject({ message: 'token is null' });
            resolve({ token: '' })
            //return wxlogin();
        }
    });
}
function login() {
    return loginCheck().then((resData) => {
        if (resData.token) {
            return resData;
        } else {
            return wxlogin();
        }
    })
}
function wxlogin() {
    return new Promise((resolve, reject) => {
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
                            console.log(res);
                            reject(res)
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
}
// function wxlogin() {
//     return new Promise((resolve, reject) => {
//         wx.login({
//             success(res) {
//                 if (res.code) {
//                     wx.setStorageSync('userCode', res.code);
//                     ajaxApi.codeToToken({
//                         wxcode: res.code,
//                         wxappid: 'wxbadd77563dc6c61d'
//                     }).then((response = {}) => {
//                         //返回token
//                         console.log(111, response)
//                         if (response.data.auth_token) {
//                             wx.setStorageSync('token', response.data.auth_token);
//                             resolve(res.data)
//                         } else {
//                             console.log(res);
//                             reject(res)
//                         }
//                     }).catch((error) => {
//                         reject(error)
//                     })
//                 } else {
//                     reject(res)
//                     console.log('登录失败！' + res.errMsg)
//                 }
//             },
//             fail(err) {
//                 console.log(222, err)
//                 reject(err)
//             }
//         })
//     })
// }
export default login;