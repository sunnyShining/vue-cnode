/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-21 04:40:08
 * @modify date 2018-02-21 04:40:08
 * @desc ajax
 */

import axios from 'axios';
import Loading from '../components/Loading/index';
import Warning from '../components/Warning/index';

export interface Options {
    method: string;
    spin: boolean;
    headers: object;
    url: string;
    mask: boolean;
    qs: object;
}
let spin = true;
// 请求拦截
axios.interceptors.request.use(function (config) {
    if ((Window as any).responseCount === undefined) {
        (Window as any).responseCount = 0;
    }
    if (!(Window as any).responseCount++) {
        spin && Loading.open();
    }
    return config;
}, function (error) {
    return Promise.reject(error);
});

// 响应拦截（一般拦截登录，还有loading等）
axios.interceptors.response.use(function (response) {
    // Do something with response data
    if (!--(Window as any).responseCount) {
        spin && Loading.close();
    }
    if (response.status >= 200 && response.status < 300) {
        return Promise.resolve(response);
    } else {
        let error = {
            success: false,
            error_msg: '系统错误，请稍后重试！'
        };
        return Promise.reject(error);
    }
}, function (error) {
    if (!--(Window as any).responseCount) {
        spin && Loading.close();
    }
    let err = {
        success: false,
        error_msg: '系统错误，请稍后重试！'
    };
    // Do something with response error
    return Promise.reject(error.response.data || err);
});

export default {
    http: {
        request (options: Options, cb: Function) {
            options.method = options.method && options.method.toLocaleUpperCase();
            spin = options.spin;
            if (!options.headers) {
                options.headers = {};
            }
            if (options.method === 'GET') {
                axios.get(options.url, {
                    params: options.qs,
                    headers: options.headers
                }).then((res: any) => {
                    if (!res.data.success && !options.mask) {
                        Warning.info(res.error_msg);
                    }
                    cb(res.data);
                }).catch((err) => {
                    if (!err.success && !options.mask) {
                        Warning.info(err.error_msg);
                    }
                    cb(err);
                });
            } else if (options.method === 'POST') {
                axios.post(options.url, {
                    ...options.qs
                }, {
                    headers: options.headers
                }).then((res: any) => {
                    if (!res.data.success && !options.mask) {
                        Warning.info(res.error_msg);
                    }
                    cb(res.data);
                }).catch((err) => {
                    if (!err.success && !options.mask) {
                        Warning.info(err.error_msg);
                    }
                    cb(err);
                });
            }
        }
    }
};
