const storage = require('./storage');

function getToken() {
    const token = storage.get('token') || '';
    return token;
}

module.exports = {
    get: (url, data) => {
        return request(url, 'GET', data);
    },
    post: (url, data) => {
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
                if (statusCode == 401 || statusCode == 403 || data.code == 401 || data.code == 403 || data.code == 605) {
                    wx.setStorageSync('token', '');
                    wx.setStorageSync('userCode', '');
                } else {
                    resolve(data);
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
