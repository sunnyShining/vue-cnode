/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-21 04:39:38
 * @modify date 2018-02-21 04:39:38
 * @desc 接口请求
 */

import utils, { Options } from '../utils/http';
import urls from './urls';
import Warning from '../components/Warning/index';

export default {
    // get /topics 主题首页
    topics(options = {}) {
        const opt: Options = {
            method: 'GET',
            spin: true,
            headers: {},
            mask: true,
            url: urls.topics,
            qs: options
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: object) => {
                resolve(data);
            });
        });
    },
    // get /topic/:id 主题详情
    topic(options: {id: string; accesstoken: string; mdrender: boolean}) {
        const opt: Options = {
            method: 'GET',
            spin: true,
            headers: {},
            mask: true,
            url: `${urls.topic}${options.id}`,
            qs: {
                accesstoken: options.accesstoken,
                mdrender: options.mdrender,
            }
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: object) => {
                resolve(data);
            });
        });
    },
    // // post /topics 新建主题
    // newTopics(options = {}) {
    //     if (options.tab === '') {
    //         Toast.info('请选择版块');
    //         return;
    //     } else if (options.title === '') {
    //         Toast.info('标题不能为空！');
    //         return;
    //     } else if (options.content === '') {
    //         Toast.info('内容不能为空！');
    //         return;
    //     }
    //     return new Promise((resolve, reject) => {
    //         utils.http.request({
    //             method: 'POST',
    //             url: urls.newTopics,
    //             qs: options,
    //         }, (data) => {
    //             resolve(data);
    //         });
    //     });
    // },
    // // post /topics/update 编辑主题
    // update(options = {}) {
    //     return new Promise((resolve, reject) => {
    //         utils.http.request({
    //             method: 'POST',
    //             url: urls.update,
    //             qs: options,
    //         }, (data) => {
    //             resolve(data);
    //         });
    //     });
    // },
    // post /topic_collect/collect 收藏主题
    collect(options = {}) {
        const opt: Options = {
            method: 'POST',
            spin: true,
            headers: {},
            mask: true,
            url: urls.collect,
            qs: options,
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: any) => {
                resolve(data);
            });
        });
    },
    // post /topic_collect/de_collect 取消主题
    deCollect(options = {}) {
        const opt: Options = {
            method: 'POST',
            spin: true,
            headers: {},
            mask: true,
            url: urls.deCollect,
            qs: options,
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: any) => {
                resolve(data);
            });
        });
    },
    // get /topic_collect/:loginname 用户所收藏的主题
    userCollect(options: {username: string}) {
        const opt: Options = {
            method: 'GET',
            spin: true,
            headers: {},
            mask: true,
            url: `${urls.userCollect}${options.username}`,
            qs: {},
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: any) => {
                resolve(data);
            });
        });
    },
    // post /topic/:topic_id/replies 新建评论
    replies(options: {topicId: string; content: string; accesstoken: string; reply_id: any}) {
        let url = `${urls.replies}${options.topicId}/replies`;
        let qs = {
            content: options.content,
            accesstoken: options.accesstoken
        } as any;
        if (options.reply_id) {
            qs.reply_id = options.reply_id;
        }
        const opt: Options = {
            method: 'POST',
            spin: true,
            headers: {},
            mask: true,
            url: `${urls.replies}${options.topicId}/replies`,
            qs,
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: any) => {
                resolve(data);
            });
        });
    },
    // post /reply/:reply_id/ups 为评论点赞
    ups(options: {reply_id: string; accesstoken: string}) {
        const opt: Options = {
            method: 'POST',
            spin: true,
            headers: {},
            mask: true,
            url: `${urls.ups}${options.reply_id}/ups`,
            qs: { accesstoken: options.accesstoken },
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: any) => {
                if (data.action === 'down') {
                    Warning.info('取消点赞');
                } else {
                    Warning.info('点赞成功');
                }
                resolve(data);
            });
        });
    },
    // get /user/:loginname 用户详情
    user(options: {username: string}) {
        const opt: Options = {
            method: 'GET',
            spin: false,
            headers: {},
            mask: true,
            url: `${urls.user}${options.username}`,
            qs: {}
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: object) => {
                resolve(data);
            });
        });
    },
    // post /accesstoken 验证 accessToken 的正确性
    accesstoken(options = {}) {
        const opt: Options = {
            method: 'POST',
            spin: true,
            headers: {},
            mask: true,
            url: urls.accesstoken,
            qs: options
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: object) => {
                resolve(data);
            });
        });
    },
    // get /message/count 获取未读消息数
    count(options = {}) {
        const opt: Options = {
            method: 'GET',
            spin: true,
            headers: {},
            mask: true,
            url: urls.count,
            qs: options
        };
        return new Promise((resolve, reject) => {
            utils.http.request(opt, (data: object) => {
                resolve(data);
            });
        });
    },
    // // get /messages 获取已读和未读消息
    // messages(options = {}) {
    //     return new Promise((resolve, reject) => {
    //         utils.http.request({
    //             method: 'GET',
    //             url: urls.messages,
    //             qs: options,
    //             mask: true,
    //         }, (data) => {
    //             resolve(data);
    //         });
    //     });
    // },
    // // post /message/mark_all 标记全部已读
    // markAll(options = {}) {
    //     return new Promise((resolve, reject) => {
    //         utils.http.request({
    //             method: 'POST',
    //             url: urls.markAll,
    //             qs: options,
    //             mask: true,
    //         }, (data) => {
    //             resolve(data);
    //         });
    //     });
    // },
    // // post /message/mark_one/:msg_id 标记单个消息为已读
    // markOne(options = {}) {
    //     return new Promise((resolve, reject) => {
    //         utils.http.request({
    //             method: 'POST',
    //             url: urls.markOne,
    //             qs: options,
    //         }).then((data) => {
    //             resolve(data);
    //         }).catch((error) => {
    //             reject(error);
    //             // 交予全局处理
    //             // message.error(error.msg);
    //         });
    //     });
    // },
};
