/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-25 11:18:39
 * @modify date 2018-02-25 11:18:39
 * @desc 用户
 */

import { Commit } from 'vuex';
import * as types from '../mutation-types';
import services from '../../services/services';

interface State {
    userInfo: {
        avatar_url: string;
        create_at: string;
        githubUsername: string;
        loginname: string;
        recent_replies: any;
        recent_topics: any;
        score: number;
    };
    collect: any;
    recentReplies: any;
    recentTopics: any;
}

const state: State = {
    userInfo: {
        avatar_url: '',
        create_at: '',
        githubUsername: '',
        loginname: '',
        recent_replies: [],
        recent_topics: [],
        score: 0
    },
    collect: [],
    recentReplies: [],
    recentTopics: []
};

const actions = {
    async getUser (context: { commit: Commit, state: State }, params: {username: string}) {
        let data = await services.user(params);
        context.commit(types.GET_USER, data);
    },
    async userCollect (context: { commit: Commit, state: State }, params: {username: string}) {
        let data = await services.userCollect(params);
        context.commit(types.GET_COLLECT, data);
    },
    // async getRecent (context: { commit: Commit, state: State }, params: {username: string}) {
    //     let data = await services.user(params);
    //     context.commit(types.GET_RECENT, params);
    // },
};

const mutations = {
    [types.GET_USER] (state: State, payload: any) {
        state.userInfo = payload.data || {};
        state.recentTopics = (payload.data && payload.data.recent_topics) ? payload.data.recent_topics : [];
        state.recentReplies = (payload.data && payload.data.recent_replies) ? payload.data.recent_replies : [];
    },
    [types.GET_COLLECT] (state: State, payload: any) {
        state.collect = payload.data || [];
    },
    // [types.GET_RECENT] (state: State, payload: any) {
    //     state.count = payload || {};
    // },
};

export default {
    state,
    mutations,
    actions,
};
