/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-21 04:41:04
 * @modify date 2018-02-21 04:41:04
 * @desc 首页vuex
 */

import { Commit } from 'vuex';
import * as types from '../mutation-types';
import services from '../../services/services';

interface State {
    topics: object;
}

const state: State = {
    topics: [],
};

const actions = {
    async getTopics (context: { commit: Commit, state: State }, params: object = {}) {
        let data = await services.topics(params);
        context.commit(types.GET_TOPICS, data);
  },
};

const mutations = {
	[types.GET_TOPICS] (state: State, payload: any) {
		state.topics = payload.data;
    },
};

export default {
    state,
    mutations,
    actions,
};
