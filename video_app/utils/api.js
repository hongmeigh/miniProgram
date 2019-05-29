import HTTP from './request';
//import { API_ROOT } from './constants';
const {get, post, request} = HTTP;

const basePath = 'https://d1.ydguanjia.com/svere/api';
export const ajaxApi = {
    // 微信登录
    codeToToken(data) {
        return request(`${basePath}/wxlogin`, data)
    },
    // 获取用户信息
    getUserInfo(data) {
        return get(`${basePath}/user/info`, data)
    },
    // 获取视频列表
    getVideoList(data) {
        return get(`${basePath}/video/ls`, data)
    },
    // 获取视频详情
    getVideoDetail(data) {
        return get(`${basePath}/video/detail`, data)
    },
    // 获取视频历史记录列表
    getHisVideoList(data) {
        return get(`${basePath}/user/video_his`, data);
    },
    // 获取评论列表
    getCommentList(data) {
        return get(`${basePath}/video/comment/ls`, data);
    },
    // 发布评论
    publishComment(data) {
        return post(`${basePath}/video/comment/add`, data);
    },
    // 获取直播地址
    queryLiveUrl(data) {
        return HTTP.get(`${basePath}/config/get`, data)
    },
};


