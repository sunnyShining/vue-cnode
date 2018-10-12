<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container">
                <router-link class="brand" to="/home">
                    <img src="//static2.cnodejs.org/public/images/cnodejs_light.svg" alt="logo" />
                </router-link>
                <ul class="nav pull-right">
                    <li><router-link to="/home">首页</router-link></li>
                    <li v-if="accessInfo.success"><router-link to="/messages"><span v-if="count.data" class="big messages_count">{{ count.data  }}</span>未读消息</router-link></li>
                    <li v-if="accessInfo.success"><router-link to="/create/new">发布话题</router-link></li>
                    <li><router-link to="/getstart">新手入门</router-link></li>
                    <li><router-link to="/api">API</router-link></li>
                    <li><router-link to="/about">关于</router-link></li>
                    <li v-if="!accessInfo.success" @click="signIn"><a>登陆</a></li>
                    <li v-if="accessInfo.success" @click="setting"><a>设置</a></li>
                    <li v-if="accessInfo.success" @click="logout"><a>退出</a></li>
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
        get accessInfo(): object {
            return this.$store.state.app.accessInfo;
        }
        get count(): object {
            return this.$store.state.app.count;
        }
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
                        let accessInfo = self.$store.state.app.accessInfo;
                        if (accessInfo.success) {
                            self.$store.dispatch('changeAccesstoken', {accesstoken});
                            await self.$store.dispatch('getMessage', {accesstoken,
                                mdrender: true
                            });
                            await self.$store.dispatch('getInfo', {
                                username: accessInfo.loginname
                            });
                            Dialog.close();
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
                    Dialog.close();
                },
            });
        }
        logout(): void {
            let _this = this;
            Dialog.open({
                showInput: false,
                message: '确定要退出吗？',
                confirmButtonText: '确定',
                confirmCallBack: async function () {
                    window.localStorage.removeItem('accesstoken');
                    await _this.$store.dispatch('accesstoken', {accesstoken: ''});
                    await _this.$store.dispatch('changeAccesstoken', {accesstoken: ''});
                    Dialog.close();
                    Warning.info('登出成功！');
                    setTimeout(() => {
                        window.location.reload();
                    }, 1000);
                },
                cancelCallBack() {
                    Dialog.close();
                },
            });
        }
        setting(): void {
            Dialog.open({
                showInput: false,
                message: '请移步cnode官网修改个人信息！',
                showOneBtn: true,
                oneBtnText: '我知道了',
                oneBtnCallBack() {
                    Dialog.close();
                },
            });
        }
    };
</script>
