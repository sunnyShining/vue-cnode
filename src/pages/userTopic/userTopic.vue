<template>
    <div>
        <div class="panel">
            <div class="header">
                <ul class="breadcrumb">
                    <li><router-link to="/home">主页</router-link><span class="divider">/</span></li>
                    <li class="active" v-if="title === name + '的主页'"><router-link :to="'/user/' + name">{{ name }}}的主页</router-link></li>
                    <li v-else class="active">{{ title }}</li>
                </ul>
            </div>
        </div>
        <div class="panel">
            <div class="header">{{ header }}</div>
            <div class="inner no-padding">
                <div id="topic_list">
                    <div v-if="topics.length !== 0" v-for="(item, index) in topics" class="cell" :key="index">
                        <router-link class="user_avatar pull-left" :to="'/user/' + item.author.loginname">
                            <img :src="item.author && item.author.avatar_url" alt="" :title="item.author && item.author.loginname" />
                        </router-link>
                        <router-link class="last_time pull-right" :to="'/topic/' + item.id">
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
                    <div v-else class="inner padding">
                        <div class="inner">
                            <p>无话题</p>
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

    @Component({
        filters: {
            fromNow
        }
    })
    export default class UserTopic extends Vue {
        type: string = '';
        name: string = '';
        title: string = '';
        header: string = '';
        get topics() {
            let userTopics = [];
            switch (this.type) {
                case 'collections':
                    userTopics = this.$store.state.user.collect;
                    break;
                case 'topics':
                    userTopics = this.$store.state.user.recentTopics || [];
                    break;
                case 'replies':
                    userTopics = this.$store.state.user.recentReplies || [];
                    break;
                default:
                    userTopics = [];
                    break;
            }
            return userTopics;
        }
        async created() {
            const name = this.$route.params.name;
            this.type = this.$route.params.type;
            this.name = name;
            await this.changeSider(true, false, name);
            switch (this.type) {
                case 'collections':
                    this.userCollect({username: name});
                    this.title = `${name} 收藏的话题`;
                    this.header = `${name} 收藏的话题`;
                    break;
                case 'topics':
                    this.getUser({username: name});
                    this.title =  `${name} 的主页`;
                    this.header = `${this.name} 创建的话题`;
                    break;
                case 'replies':
                    this.getUser({username: name});
                    this.title = `${name} 的主页`,
                    this.header = `${name} 参与的话题`
                    break;
                default:
                    break;
            }
        }
        userCollect (options: {username: string}) {
            this.$store.dispatch('userCollect', options);
        }
        getUser(options: {username: string}) {
            this.$store.dispatch('getUser', options);
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