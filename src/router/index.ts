import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/home.vue';
import Getstart from '@/pages/getstart/getstart.vue';

Vue.use(Router);

export default new Router({
  	routes: [
	    {
	      	path: '/home',
	      	name: 'home',
	      	component: Home,
	    },
	    {
	      	path: '/getstart',
	      	name: 'getstart',
	      	component: Getstart,
	    },
	    {
        	path: '*',
        	redirect: '/home',
    	},
	],
});
