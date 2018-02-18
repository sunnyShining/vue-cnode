import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
// import actions from './actions';
// import getters from './getters';
import feed from './modules/feed';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	// actions,
	// getters,
  	modules: {
  		feed,
  	},
  	strict: debug,
  	plugins: debug ? [createLogger({})] : [],
});

export interface ActionContextBasic {
  	commit: Commit;
  	dispatch: Dispatch;
}
