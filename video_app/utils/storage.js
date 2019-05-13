module.exports = {
    set: (key, data) => {
        try {
            wx.setStorageSync(key, data);
        } catch (err) {
            console.log(err);
        }
    },
    get: (key) => {
        try {
            return wx.getStorageSync(key);
        } catch (err) {
            console.log(err);
            return null;
        }
    }
}
