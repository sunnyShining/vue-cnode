/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-21 04:41:43
 * @modify date 2018-02-21 04:41:43
 * @desc store入口
 */

import Vue from 'vue';
import Vuex, { Commit, Dispatch } from 'vuex';
// import actions from './actions';
// import getters from './getters';
import home from './modules/home';
import app from './modules/app';
import createLogger from 'vuex/dist/logger';

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
	// actions,
	// getters,
  	modules: {
		  home,
		  app,
  	},
  	strict: debug,
  	plugins: debug ? [createLogger({})] : [],
});

export interface ActionContextBasic {
  	commit: Commit;
  	dispatch: Dispatch;
}
