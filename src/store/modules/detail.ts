/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-23 22:28:04
 * @modify date 2018-02-21 22:28:04
 * @desc 详情vuex
 */

import { Commit } from 'vuex';
import * as types from '../mutation-types';
import services from '../../services/services';

interface State {
    topic: object;
}

const state: State = {
    topic: {},
};

const actions = {
    async getTopic (context: { commit: Commit, state: State }, params: {id: string; accesstoken: string; mdrender: boolean}) {
        let data = await services.topic(params);
        context.commit(types.GET_TOPIC, data);
  },
};

const mutations = {
	[types.GET_TOPIC] (state: State, payload: any) {
		state.topic = payload.data || {};
    },
};

export default {
    state,
    mutations,
    actions,
};
