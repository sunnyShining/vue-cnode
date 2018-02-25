<template>
    <div>
        <div class="panel">
            <div class="header">
                <ul class="breadcrumb">
                    <li><router-link to="/home">主页</router-link><span class="divider">/</span></li>
                </ul>
            </div>
            <div class="inner userinfo">
                <div class="user_big_avatar">
                    <img :src="userInfo.avatar_url" class="user_avatar" :alt="userInfo.loginname" :title="userInfo.loginname" />
                </div>
                <a class="dark">{{ userInfo.loginname }}</a>
                <div class="user_profile">
                    <ul class="unstyled">
                        <span class="big">{{ userInfo.score }}</span> 积分
                        <li>
                            <router-link v-if="collect.length !== 0" class="dark" :to="'/userTopic/' + userInfo.loginname + '/collections'">
                                <span class="big collect-topic-count">{{ collect.length }}</span>个话题收藏
                            </router-link>
                        </li>
                        <li>
                            <i class="fa fa-lg fa-fw fa-github"></i>
                            <a class="dark" :href="'https://github.com/' + userInfo.githubUsername" target="_blank" rel="noopener noreferrer">
                                @{{ userInfo.githubUsername }}
                            </a>
                        </li>
                    </ul>
                </div>
                <p class="col_fade">注册时间 {{ userInfo.create_at | fromNow }}</p>
            </div>
        </div>

        <div class="panel">
            <div class="header">
                <span class="col_fade">最近创建的话题</span>
            </div>
            <div class="cell" v-for="(item, index) in userInfo.recent_topics" v-if="index < 6" :key="index">
                <router-link class="user_avatar pull-left" :to="'/user/' + item.author.loginname">
                    <img :src="item.author.avatar_url" alt="" :title="item.author.loginname" />
                </router-link>
                <router-link class="last_time pull-right" :to="'/detail/' + item.id">
                    <span class="last_active_time">{{ item.last_reply_at | fromNow }}</span>
                </router-link>
                <div class="topic_title_wrapper">
                    <span v-if="item.top" class="put_top">&nbsp;置顶&nbsp;</span>
                    <span v-else-if="item.good" class="put_good">&nbsp;精华&nbsp;</span>
                    <span v-else-if="item.tab === 'share'" class="topiclist-tab">&nbsp;分享&nbsp;</span>
                    <span v-else-if="item.tab === 'ask'" class="topiclist-tab">&nbsp;问答&nbsp;</span>
                    <span v-else-if="item.tab === 'job'" class="topiclist-tab">&nbsp;工作&nbsp;</span>
                    <span v-else-if="item.tab === 'dev'" class="topiclist-tab">&nbsp;测试&nbsp;</span>
                    <router-link class="topic_title" :to="'/detail/' + item.id" :title="item.title">
                        &nbsp;{{ item.title }}
                    </router-link>
                </div>
            </div>
                <div v-if="userInfo.recent_topics.length !== 0" class="cell more">
                    <router-link class="dark" :to="'/userTopic/' + name + '/topics'">查看更多»</router-link>
                </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">最近参与的话题</span>
            </div>
            <div class="cell" v-for="(item, index) in userInfo.recent_replies" :key="index">
                <router-link class="user_avatar pull-left" :to="'/detail/' + item.id">
                    <img :src="item.author && item.author.avatar_url" alt="" :title="item.author && item.author.loginname" />
                </router-link>
                <router-link class="last_time pull-right" :to="'/detail/' + item.id">
                    <span class="last_active_time">{{ item.last_reply_at | fromNow }}</span>
                </router-link>
                <div class="topic_title_wrapper">
                    <span v-if="item.top" class="put_top">&nbsp;置顶&nbsp;</span>
                    <span v-else-if="item.good" class="put_good">&nbsp;精华&nbsp;</span>
                    <span v-else-if="item.tab === 'share'" class="topiclist-tab">&nbsp;分享&nbsp;</span>
                    <span v-else-if="item.tab === 'ask'" class="topiclist-tab">&nbsp;问答&nbsp;</span>
                    <span v-else-if="item.tab === 'job'" class="topiclist-tab">&nbsp;工作&nbsp;</span>
                    <span v-else-if="item.tab === 'dev'" class="topiclist-tab">&nbsp;测试&nbsp;</span>
                    <router-link class="topic_title" :to="'/detail/' + item.id" :title="item.title">
                        &nbsp;{{ item.title }}
                    </router-link>
                </div>
            </div>
            <div class="cell more" v-if="userInfo.recent_replies && userInfo.recent_replies.length !== 0">
                <router-link class="dark" :to="'/userTopic/' + name + '/replies'">查看更多»</router-link>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { fromNow } from '../../filters/filters';

    @Component({
        filters: {
            fromNow
        }
    })
    export default class User extends Vue {
        name: string = '';
        get userInfo(): object {
            return this.$store.state.user.userInfo;
        }
        get collect(): any {
            return this.$store.state.user.collect;
        }
        async created() {
            const name = this.$route.params.name;
            this.name = name;
            await this.changeSider(true, false, name);
            this.getUser({username: name});
            this.userCollect({username: name});
        }
        getUser(options: {username: string}) {
            this.$store.dispatch('getUser', options);
        }
        userCollect (options: {username: string}) {
            this.$store.dispatch('userCollect', options);
        }
        changeSider(showInfo: boolean, isAuthor: boolean, name: string): void {
            this.$store.dispatch('authorOrNot', {
                isAuthor,
                showInfo,
            });
            if (name) {
                this.$store.dispatch('getInfo', { username: name });
            }
        }
    };
</script>