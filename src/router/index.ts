import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/home.vue';
import Detail from '@/pages/detail/detail.vue';
import Getstart from '@/pages/getstart/getstart.vue';
import About from '@/pages/about/about.vue';
import Api from '@/pages/api/api.vue';

Vue.use(Router);

export default new Router({
  	routes: [
	    {
	      	path: '/home',
	      	name: 'home',
	      	component: Home,
		},
		{
			path: '/detail/:id',
			name: 'detail',
			component: Detail
		},
	    {
	      	path: '/getstart',
	      	name: 'getstart',
	      	component: Getstart,
	    },
	    {
	      	path: '/about',
	      	name: 'about',
	      	component: About,
	    },
	    {
	      	path: '/api',
	      	name: 'api',
	      	component: Api,
	    },
	    {
        	path: '*',
        	redirect: '/home',
    	},
	],
});
