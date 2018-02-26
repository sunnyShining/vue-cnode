<template>
    <div>
        <div class="panel">
            <div class="header topic_header">
                <span class="topic_full_title">
                    <span v-if="topic.top" class="put_top">置顶&nbsp;</span>
                    <span v-else-if="topic.good" class="put_good">精华&nbsp;</span>
                    <span v-else-if="topic.tab === 'share'" class="topiclist-tab">分享&nbsp;</span>
                    <span v-else-if="topic.tab === 'ask'" class="topiclist-tab">问答&nbsp;</span>
                    <span v-else-if="topic.tab === 'job'" class="topiclist-tab">工作&nbsp;</span>
                    <span v-else-if="topic.tab === 'dev'" class="topiclist-tab">测试&nbsp;</span>
                    {{ topic.title }}
                </span>
                <div class="changes">
                    <span>
                      发布于 {{ topic.create_at | fromNow }}
                    </span>
                    <span>
                      作者 <router-link :to="'/user/' + (topic.author &&topic.author.loginname)">{{ topic.author && topic.author.loginname }}</router-link>
                    </span>
                    <span>
                      {{ topic.visit_count }} 次浏览
                    </span>
                    <span> 来自 {{ topic.tab | tab }} </span>
                    <input v-if="topic.is_collect && accessInfo.success" class="span-common  pull-right collect_btn" type="submit" @click="decollect" value="取消收藏" action="de_collect" />
                    <input v-if="!topic.is_collect && accessInfo.success" class="span-common span-success pull-right collect_btn" type="submit" value="收藏" action="collect" @click="collect" />
                </div>
                <div id="manage_topic" v-if="topic.author && topic.author.loginname === accessInfo.loginname">
                    <router-link :to="'/create/' + id">
                        <i class="fa fa-lg fa-pencil-square-o" title="编辑"></i>
                    </router-link>
                </div>
            </div>
            <div class="inner topic">
                <div class="topic_content">
                    <div v-html="topic.content" />
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">{{ topic.replies && topic.replies.length }} 回复</span>
            </div>
            <div v-for="(item, index) in topic.replies" :key="index" :class="['cell reply_area reply_item', {'reply_highlight': item.is_uped}]" :reply_id="item.id" reply_to_id="" :id="item.id">
                <div class="author_content">
                    <router-link :to="'/user/' + item.author.loginname" class="user_avatar">
                        <img :src="item.author.avatar_url" alt="" title="" />
                    </router-link>
                    <div class="user_info">
                        <router-link class="dark reply_author" :to="'/user/' + item.author.loginname">{{ item.author.loginname }}</router-link>
                        <a class="reply_time" :href="'#' + item.id">{{ index + 1 }}楼•{{ item.create_at | fromNow}}</a>
                        <span v-if="item.author.loginname === topic.author.loginname" class="reply_by_author">作者</span>
                    </div>
                    <div class="user_action">
                        <span>
                            <i :class="['fa up_btn fa-thumbs-o-up', {'uped': item.is_uped}]" title="喜欢" @click="ups(item.id)"></i>
                            <span class="up-count">
                              &nbsp;{{ item.ups ? item.ups.length : 0 }}
                            </span>
                        </span>
                            <span v-if="accessInfo.success">
                                &nbsp;<i class="fa fa-reply reply2_btn" title="回复" @click="reply(item.id, item.author.loginname)"></i>
                            </span>
                    </div>
                </div>
                <div class="reply_content from-i5ting">
                    <div v-html="item.content" />
                </div>
                <div class="clearfix">
                    <div class="reply2_area">
                            <div v-if="replyId === item.id" class="markdown_editor in_editor">
                                <div class="markdown_in_editor">
                                    <mavon-editor v-model="reply1" :subfield="false" :placeholder="' '" />
                                    <div class="editor_buttons">
                                        <input class="span-primary submit_btn" type="button" @click="replyCallback1" value="回复">
                                    </div>
                                </div>
                            </div>
                    </div>
                </div>
            </div>
            <div class="panel" v-if="accessInfo.success">
                <div class="header">
                    <span class="col_fade">添加回复</span>
                </div>
                <div class="inner reply">
                    <div class="markdown_editor in_editor">
                        <div class="markdown_in_editor">
                            <mavon-editor v-model="reply2" :subfield="false" :placeholder="' '" />
                            <div class="editor_buttons">
                                <input class="span-primary submit_btn" type="button" @click="replyCallback2" value="回复">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { fromNow } from '../../filters/filters';
    import Dialog from '../../components/Dialog/index';
    import Warning from '../../components/Warning/index';
    import services from '../../services/services';

    @Component({
        filters: {
            tab(v: string): string {
                let tag = '';
                switch(v) {
                    case 'share':
                        tag = '分享';
                        break;
                    case 'ask':
                        tag = '问答';
                        break;
                    case 'job':
                        tag = '工作';
                        break;
                    case 'dev':
                        tag = '测试';
                        break;
                    default:
                        break;

                }
                return tag;
            },
            fromNow,
        }
    })
    export default class Home extends Vue {
        id: string = '';
        replyId: string = '';
        reply1: string = '';
        reply2: string = '';
        get topic (): object {
            return this.$store.state.detail.topic;
        }
        get accessInfo (): object {
            return this.$store.state.app.accessInfo;
        }
        created (): void {
            let id = this.$route.params.id;
            this.id = id;
            const { accesstoken } = this.$store.state.app;
            this.fetchTopic({
                id,
                accesstoken,
                mdrender: true
            });
        }
        async fetchTopic (options: {id: string; accesstoken: string; mdrender: boolean}) {
            await this.$store.dispatch('getTopic', options);
            // 侧边栏
            const topic = this.$store.state.detail.topic;
            this.changeSider(true, true, topic.author.loginname);
        }
        ups (reply_id: string): void {
            const accessInfo = this.$store.state.app.accessInfo;
            const accesstoken = this.$store.state.app.accesstoken;
            if (accessInfo.success) {
                const options = {
                    reply_id,
                    accesstoken,
                };
                services.ups(options).then((data) => {
                    const id = this.$route.params.id;
                    this.fetchTopic({
                        id,
                        accesstoken,
                        mdrender: true
                    });
                }, error => {
                    console.log(error);
                });
            } else {
                this.signIn();
            }
        }
        collect (): void {
            const { accessInfo, accesstoken } = this.$store.state.app;
            const id = this.$route.params.id;
            const options = {
                topic_id: id,
                accesstoken,
            };
            if (accessInfo.success) {
                services.collect(options).then((data) => {
                    this.fetchTopic({
                        id,
                        accesstoken,
                        mdrender: true
                    });
                }, error => {
                    console.log(error);
                })
            } else {
                this.signIn();
            }
        }
        decollect (): void {
            const id = this.$route.params.id;
            const { accessInfo, accesstoken } = this.$store.state.app;
            const options = {
                topic_id: id,
                accesstoken,
            };
            if (accessInfo.success) {
                services.deCollect(options).then((data) => {
                    this.fetchTopic({
                        id,
                        accesstoken,
                        mdrender: true
                    });
                }, error => {
                    console.log(error);
                });
            } else {
                this.signIn();
            }
        }
        signIn (): void {
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
                            Dialog.close();
                            Warning.info('登录成功！');
                            window.localStorage.setItem('accesstoken', accesstoken);
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
        changeSider (showInfo: boolean, isAuthor: boolean, name: string): void {
            this.$store.dispatch('authorOrNot', {
                showInfo,
                isAuthor,
            });
            this.$store.dispatch('getInfo', {
                username: name
            });
        }
        reply(reply_id: string, loginname: string) {
            this.replyId = this.replyId === '' ? reply_id : '';
            this.reply1 = `@${loginname} `;
        }
        replyCallback1 () {
            const { accesstoken } = this.$store.state.app;
            let options = {
                reply_id: this.replyId,
                accesstoken,
                content: this.reply1,
                topicId: this.id,
            };
            services.replies(options).then((data: any) => {
                if(data.success) {
                    this.fetchTopic({
                        id: this.id,
                        accesstoken,
                        mdrender: true
                    });
                    this.reply1 = '';
                    this.replyId = '';
                }
            }, error => {
                console.log(error);
            });
        }
        replyCallback2 () {
            const { accesstoken } = this.$store.state.app;
            let options = {
                accesstoken,
                content: this.reply2,
                topicId: this.id,
                reply_id: undefined,
            };
            services.replies(options).then((data: any) => {
                if(data.success) {
                    this.fetchTopic({
                        id: this.id,
                        accesstoken,
                        mdrender: true
                    });
                    this.reply2 = '';
                }
            }, error => {
                console.log(error);
            });
        }
    };
</script>

