/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-21 10:14:03
 * @modify date 2018-02-21 10:14:03
 * @desc 全局
 */

import { Commit } from 'vuex';
import * as types from '../mutation-types';
import services from '../../services/services';

interface State {
    accesstoken: string;
    accessInfo: {
        success: boolean;
        loginname: string;
        avatar_url: string;
        id: string;
    };
    count: {
        data: number;
        success: boolean;
    };
    info: object;
    isAuthor: boolean;
    showInfo: boolean;
    hasRead: any;
    hasnotRead: any;
}

const state: State = {
    accesstoken: '',
    accessInfo: {
        success: false,
        loginname: '',
        avatar_url: '',
        id: '',
    },
    info: {
        avatar_url: '',
        create_at: '',
        githubUsername: '',
        loginname: '',
        recent_replies: [],
        recent_topics: [],
        score: 0
    },
    isAuthor: false,
    showInfo: false,
    count: {
        success: false,
        data: 0,
    },
    hasRead: [],
    hasnotRead: [],
};

const actions = {
    async accesstoken (context: { commit: Commit, state: State }, params: object = {}) {
        let data = await services.accesstoken(params);
        context.commit(types.ACCESS_TOKEN, data);
    },
    changeAccesstoken (context: { commit: Commit, state: State }, params: object = {}) {
        context.commit(types.CHANGE_ACCESS_TOKEN, params);
    },
    async getInfo (context: { commit: Commit, state: State }, params: {username: string}) {
        let data = await services.user(params);
        context.commit(types.GET_INFO, data);
    },
    authorOrNot (context: { commit: Commit, state: State }, params: {isAuthor: boolean, showInfo: boolean}) {
        context.commit(types.AUTH_OR_NOT, params);
    },
    async getMessageCount (context: { commit: Commit, state: State }, params: object = {}) {
        let data = await services.count(params);
        context.commit(types.GET_MESSAGE_COUNT, data);
    },
    async getMessage (context: { commit: Commit, state: State }, params: object = {}) {
        let data = await services.messages(params);
        context.commit(types.GET_MESSAGE, data);
    }
};

const mutations = {
	[types.ACCESS_TOKEN] (state: State, payload: any) {
		state.accessInfo = payload || {};
    },
    [types.CHANGE_ACCESS_TOKEN] (state: State, payload: any) {
		state.accesstoken = payload.accesstoken || '';
    },
    [types.GET_INFO] (state: State, payload: any) {
        state.info = payload.data || {};
    },
    [types.AUTH_OR_NOT] (state: State, payload: any) {
        state.isAuthor = payload.isAuthor || false;
        state.showInfo = payload.showInfo || false;
    },
    [types.GET_MESSAGE_COUNT] (state: State, payload: any) {
        state.count = payload || {};
    },
    [types.GET_MESSAGE] (state: State, payload: any) {
        state.hasRead = (payload.data && payload.data.has_read_messages) ? payload.data.has_read_messages : [];
        state.hasnotRead = (payload.data && payload.data.hasnot_read_messages) ? payload.data.hasnot_read_messages : [];
    },
};

export default {
    state,
    mutations,
    actions,
};
