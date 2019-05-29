const storage = require('./storage');
import login from './login.js'

function getToken() {
    const token = storage.get('token') || '';
    return token;
}

const HTTP = {
    get(url, data) {
        return login().then(() => {
            return request(url, 'GET', data);
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
    },
    post(url, data) {
        return login().then(() => {
            return request(url, 'POST', data);
        }).catch((error) => {
            wx.showToast({
                title: error.msg || error.message || error.errMsg || '出错了',
                icon: 'none',
                duration: 2000
            })
        })
    },
    request(url, data) {
        return request(url, 'POST', data);
    }
};

const request = (url, method, _data = {}) => {
    method = method || 'GET';
    const token = getToken();
    const header = Object.assign({}, {
        'Content-type': 'application/x-www-form-urlencoded',
        AuthToken: token,
        // SubType: 'miniProgram',
        // cookie: 'token=' + token
    });
    return new Promise((resolve, reject) => {
        wx.request({
            url,
            data: _data,
            method: method || 'GET',
            header: header,
            success: (res) => {
                const { statusCode, data } = res;
                // console.log(res)
                // if (statusCode == 401 || statusCode == 403) {
                if (statusCode == 401 || statusCode == 403 || data.code == 401 || data.code == 1001 || data.code == 403 || data.code == 605) {
                    wx.setStorageSync('token', '');
                    wx.setStorageSync('userCode', '');
                } else if (data.code == 1) {
                    resolve(data);
                } else {
                    wx.showModal({
                        title: '错误',
                        content: data.msg || '出错啦',
                        success (res) {
                            if (res.confirm) {
                                console.log('用户点击确定')
                            } else if (res.cancel) {
                                console.log('用户点击取消')
                            }
                        }
                    })
                      
                }
            },
            fail: (err) => {
                reject({
                    code: 0,
                    msg: err.errMsg || '请求失败'
                })
            },
            complete: (err) => {
                reject({
                    code: 0,
                    msg: err.errMsg || '请求失败'
                })
            }
        })
    });
};
export default HTTP;
