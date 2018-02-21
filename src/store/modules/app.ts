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
}

const state: State = {
    accesstoken: '',
    accessInfo: {
        success: false,
        loginname: '',
        avatar_url: '',
        id: ''
    },
};

const actions = {
    async accesstoken (context: { commit: Commit, state: State }, params: object = {}) {
        let data = await services.accesstoken(params);
        context.commit(types.ACCESS_TOKEN, data);
    },
    changeAccesstoken (context: { commit: Commit, state: State }, params: object = {}) {
        context.commit(types.CHANGE_ACCESS_TOKEN, params);
    },
};

const mutations = {
	[types.ACCESS_TOKEN] (state: State, payload: any) {
		state.accessInfo = payload || {};
    },
    [types.CHANGE_ACCESS_TOKEN] (state: State, payload: any) {
		state.accesstoken = payload.accesstoken || '';
    },
};

export default {
    state,
    mutations,
    actions,
};
