import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/pages/home/home.vue';
import Detail from '@/pages/detail/detail.vue';
import User from '@/pages/user/user.vue';
import Getstart from '@/pages/getstart/getstart.vue';
import About from '@/pages/about/about.vue';
import Api from '@/pages/api/api.vue';
import Create from '@/pages/create/create.vue';
import Messages from '@/pages/messages/messages.vue';
import UserTopic from '@/pages/userTopic/userTopic.vue';

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
	      	path: '/user/:name',
	      	name: 'user',
	      	component: User,
	    },
	    {
	      	path: '/getstart',
	      	name: 'getstart',
	      	component: Getstart,
	    },
	    {
	      	path: '/api',
	      	name: 'api',
	      	component: Api,
	    },
	    {
	      	path: '/about',
	      	name: 'about',
	      	component: About,
	    },
	    {
	      	path: '/create/:id',
	      	name: 'create',
	      	component: Create,
	    },
	    {
	      	path: '/messages',
	      	name: 'messages',
	      	component: Messages,
	    },
	    {
	      	path: '/userTopic/:name/:type',
	      	name: 'userTopic',
	      	component: UserTopic,
	    },
	    {
        	path: '*',
        	redirect: '/home',
    	},
	],
});
