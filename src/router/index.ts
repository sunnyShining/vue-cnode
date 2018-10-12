import Vue from 'vue';
import Router from 'vue-router';
// import Home from '@/pages/home/home.vue';
// import Detail from '@/pages/detail/detail.vue';
// import User from '@/pages/user/user.vue';
// import Getstart from '@/pages/getstart/getstart.vue';
// import About from '@/pages/about/about.vue';
// import Api from '@/pages/api/api.vue';
// import Create from '@/pages/create/create.vue';
// import Messages from '@/pages/messages/messages.vue';
// import UserTopic from '@/pages/userTopic/userTopic.vue';
// import NoFound from '@/pages/noFound/noFound.vue';

const Home = (r: any) => require.ensure([], () => r(require('@/pages/home/home.vue')));
const Detail = (r: any) => require.ensure([], () => r(require('@/pages/detail/detail.vue')));
const User = (r: any) => require.ensure([], () => r(require('@/pages/user/user.vue')));
const Getstart = (r: any) => require.ensure([], () => r(require('@/pages/getstart/getstart.vue')));
const About = (r: any) => require.ensure([], () => r(require('@/pages/about/about.vue')));
const Api = (r: any) => require.ensure([], () => r(require('@/pages/api/api.vue')));
const Create = (r: any) => require.ensure([], () => r(require('@/pages/create/create.vue')));
const Messages = (r: any) => require.ensure([], () => r(require('@/pages/messages/messages.vue')));
const UserTopic = (r: any) => require.ensure([], () => r(require('@/pages/userTopic/userTopic.vue')));
const NoFound = (r: any) => require.ensure([], () => r(require('@/pages/noFound/noFound.vue')));

Vue.use(Router);

export default new Router({
	mode: 'hash',
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
	      	path: '/noFound',
	      	name: 'noFound',
	      	component: NoFound,
	    },
	    {
        	path: '*',
        	redirect: '/home',
    	},
	],
});
