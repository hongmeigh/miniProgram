import {get, post} from './request';
//import { API_ROOT } from './constants';

const basePath = 'http://api1.sljy.com';
export const homeAjax = {
    // userInfo换token
    getTokenByUserInfo(data) {
        return post(`${basePath}/wechat/ld-sentence/login`, data)
    },
    // 检查用户是否绑定手机号
    checkPhoneExist(data) {
        return get(`${basePath}/wechat/ld-sentence/get-phone`, data);
    },
    // 用户绑定手机号
    bindPhoneToUser(data) {
        return post(`${basePath}/wechat/ld-sentence/get-phone`, data);
    }
};
export const studyLevelAjax = {
    // 获取学习类型
    getStudyType(data) {
        return get(`${basePath}/wechat/ld-sentence/get-subject-list`, data);
    },
    // 提交学习类型
    submitScoreType(data) {
        return post(`${basePath}/wechat/ld-sentence/create-learning-plan`, data)
    }
};
export const subjectAjax = {
    // 获取题目列表
    getSubjectList(data) {
        return get(`${basePath}/wechat/ld-sentence/get-day-sentences`, data);
    },
    // 提交学习完成
    submitFinish(data) {
        return post(`${basePath}/wechat/ld-sentence/creat-study-log`, data)
    }
};
export const userInfoAjax = {
    // 获取用户学习信息
    getUserSubjectList(data) {
        return get(`${basePath}/wechat/ld-sentence/get-person-center-info`, data);
    }
}
export const learningAjax = {
    // 获取已学习题目信息
    getLearningSubjectList(data) {
        return get(`${basePath}/wechat/ld-sentence/get-study-log-by-day`, data);
    }
}
export const shareAjax = {
    // 获取已分享图片
    getShareBackImg(data) {
        return get(`${basePath}/wechat/ld-sentence/get-share-back-img`, data);
    },
    // 获取已分享图片
    shareCount(data) {
        return post(`${basePath}/wechat/ld-sentence/set-share`, data);
    }
}


