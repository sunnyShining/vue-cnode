import { Commit } from 'vuex';
import * as types from '../mutation-types';

interface State {
    test: string;
}

const state: State = {
    test: 'test',
};

const actions = {
    changeTest (context: { commit: Commit, state: State }, params: object = { }) {
        context.commit(types.TEST, { test: '哎呀' });
  },
};

const mutations = {
	[types.TEST] (state: State, payload: any) {
		console.log(payload);
		state.test = payload.test;
    },
};

export default {
    state,
    mutations,
    actions,
};
