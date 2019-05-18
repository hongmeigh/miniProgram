import {get, post} from './request';
//import { API_ROOT } from './constants';

const basePath = 'http://127.0.0.1:7001';
export const ajaxApi = {
    // 微信登录
    codeToToken(data) {
        return post(`${basePath}/api/wxlogin`, data)
    },
    // 获取用户信息
    getUserInfo(data) {
        return get(`${basePath}/api/user/info`, data)
    },
    // 获取视频列表
    getVideoList(data) {
        return get(`${basePath}/api/video/ls`, data)
    },
    // 获取视频历史记录列表
    getHisVideoList(data) {
        return get(`${basePath}/api/user/video_his`, data);
    },
    // 获取评论列表
    getCommentList(data) {
        return get(`${basePath}/api/comment/ls`, data);
    },
    // 发布评论
    publishComment(data) {
        return post(`${basePath}/api/comment/add`, data);
    }
};


