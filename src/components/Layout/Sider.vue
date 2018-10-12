<template>
    <div id="sidebar">
        <div v-if="info && showInfo">
            <div class="panel">
                <div class="header">
                    <span class="col_fade">{{ isAuthor? '作者' : '个人信息' }}</span>
                </div>
                <div class="inner">
                    <div class="user_card">
                        <div>
                            <router-link class="user_avatar" :to="'/user/' + info.loginname">
                                <img :src="info.avatar_url" :alt="info.loginname" title="info.loginname" />
                            </router-link>
                            <span class="user_name"><router-link class="dark" :to="'/user/' + info.loginname">{{ info.loginname }}</router-link></span>
                            <div class="board clearfix">
                                <div class="floor">
                                    <span class="big">积分: {{ info.score ? info.score : 0 }} </span>
                                </div>
                            </div>
                            <div class="space clearfix"></div>
                            <span class="signature">
                                “
                                    sunshine
                                ”
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="panel">
                <div class="inner">
                    <router-link :to="'/create/new'" id="create_topic_btn">
                        <span class="span-success">发布话题</span>
                    </router-link>
                </div>
            </div>
        </div>
        <div class="panel" v-else>
            <div class="inner">
                <p>CNode：Node.js专业中文社区</p>
                <div>
                    您可以&nbsp;
                    <a>
                        <span class="span-info" @click="signIn">输入accesstoken登录</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="inner ads">
                <a href="https://alinode.aliyun.com/?ref=cnode" target="_blank" rel="noopener noreferrer" class="banner sponsor_outlink" data-label="alinode">
                    <img src="//dn-cnode.qbox.me/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" alt="" />
                </a>
                <div class="sep10"></div>
                <a href="http://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc&amp;utm_campaign=multicloud&amp;utm_content=gift&amp;ytag=cnodejs" target="_blank" rel="noopener noreferrer" class="banner sponsor_outlink" data-label="ucloud-banner">
                    <img src="//dn-cnode.qbox.me/FgQS-GQDfqwAD_v0NuhyYUOUk5MG" alt="" />
                </a>
                <div class="sep10"></div>
                <a href="https://0x7.me/UDyj" class="banner sponsor_outlink" data-label="qiniu-sidebar" target="_blank" rel="noopener noreferrer">
                    <img src="//dn-cnode.qbox.me/Fv9R31Y6ySKKJi95ldk9TRkJ7o5O" alt="" />
                </a>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">友情社区</span>
            </div>
            <div class="inner">
                <ol class="friendship-community">
                    <li>
                        <a href="https://ruby-china.org/" target="_blank" rel="noopener noreferrer">
                            <img src="//static2.cnodejs.org/public/images/ruby-china-20150529.png" alt="" />
                        </a>
                    </li>
                    <div class="sep10"></div>
                    <li>
                        <a href="http://golangtc.com/" target="_blank" rel="noopener noreferrer">
                            <img src="//static2.cnodejs.org/public/images/golangtc-logo.png" alt="" />
                        </a>
                    </li>
                    <div class="sep10"></div>
                    <li>
                        <a href="http://phphub.org/" target="_blank" rel="noopener noreferrer">
                            <img src="//static2.cnodejs.org/public/images/phphub-logo.png" alt="" />
                        </a>
                    </li>
                    <div class="sep10"></div>
                    <li>
                        <a href="https://testerhome.com/" target="_blank" rel="noopener noreferrer">
                            <img src="//static.cnodejs.org/FjLUc7IJ2--DqS706etPQ1EGajxK" alt="" />
                        </a>
                    </li>
                </ol>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">客户端二维码</span>
            </div>
            <div class="inner cnode-app-download">
                <img width="200" src="//dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt="" />
                <br />
                <a href="https://github.com/soliury/noder-react-native" target="_blank" rel="noopener noreferrer">客户端源码地址</a>
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
    export default class Sider extends Vue {
        get info(): object {
            return this.$store.state.app.info;
        }
        get showInfo(): boolean {
            return this.$store.state.app.showInfo;
        }
        get isAuthor(): boolean {
            return this.$store.state.app.isAuthor;
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
                        console.log(accessInfo);
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
    };
</script>
