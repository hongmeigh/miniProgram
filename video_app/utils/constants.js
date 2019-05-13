export const isProduct = process.env.DIST_ENV === 'product';

export const SOURCE_TYPE = 2001; // 账户中心门店业务类型

export const API_ROOT = isProduct ? 'https://www.xingbianli.com' : 'https://xbl.intra.im';

export const H5_ORIGIN = isProduct ? 'https://h5.xingbianli.com' : 'https://h5.intra.im';

export const SHARE_OBJ = {
    title: '猩便利 全程自助，自由自在',
    path: '/pages/index/index',
    imageUrl: 'https://s.xingbianli.cn/manual/img-wxstore-share.jpg'
};
