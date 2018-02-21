<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container">
                <router-link class="brand" to="/home">
                    <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg" alt="logo" />
                </router-link>
                <ul class="nav pull-right">
                    <li><router-link to="/home">首页</router-link></li>
                    <li v-if="islogin"><router-link to="/messages"><span class="big messages_count">1</span>未读消息</router-link></li>
                    <li v-if="islogin"><router-link to="/create/new">发布话题</router-link></li>
                    <li><router-link to="/getstart">新手入门</router-link></li>
                    <li><router-link to="/api">API</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                    <li v-if="!islogin" @click="signIn"><a>登陆</a></li>
                    <li v-if="islogin"><a>设置</a></li>
                    <li v-if="islogin"><a>退出</a></li>
                </ul>
                <a class="btn btn-navbar" id="responsive-sidebar-trigger">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Dialog from '../Dialog/index';
    import Warning from '../Warning/index';

    @Component({})
    export default class Header extends Vue {
        islogin: boolean = false;
        signIn(): void {
            let self = this;
            Dialog.open({
                showInput: true,
                inputPlaceholder: '请输入accesstoken',
                confirmButtonText: '登陆',
                confirmCallBack: async function (accesstoken: string) {
                    if (accesstoken === '' || !accesstoken) {
                        Warning.info('accesstoken不能为空！');
                    } else {
                        await self.$store.dispatch('accesstoken', {accesstoken});
                        // const { getAccess } = self.$props;
                        // await getAccess({
                        //     accesstoken
                        // });
                        let accessInfo = self.$store.state.app.accessInfo;
                        console.log(accessInfo);
                        // const { accessInfo, changeAccesstoken, getInfo, getMessage } = self.$props;
                        if (accessInfo.success) {
                            self.$store.dispatch('changeAccesstoken', {accesstoken});
                            // await getMessage({
                            //     accesstoken,
                            //     mdrender: true
                            // });
                            // await getInfo({
                            //     username: accessInfo.loginname
                            // });
                            // Dialog.close();
                            Warning.info('登录成功！');
                            window.localStorage.setItem('accesstoken', accesstoken);
                            setTimeout(() => {
                                window.location.reload();
                            }, 1000);
                        } else {
                            Warning.info('accesstoken不正确，请重新输入！');
                        }
                    }
                },
                cancelCallBack(accesstoken: string) {
                    // Dialog.close();
                },
            });
        }
    };
</script>
