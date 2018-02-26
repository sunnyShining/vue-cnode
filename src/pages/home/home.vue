<template>
    <div class="panel">
        <div class="header">
            <a @click="changeTag('all')" :class="['topic-tab', { 'current-tab': currentTag === 'all' }]">全部</a>
            <a @click="changeTag('good')" :class="['topic-tab', { 'current-tab': currentTag === 'good' }]">精华</a>
            <a @click="changeTag('share')" :class="['topic-tab', { 'current-tab': currentTag === 'share' }]">分享</a>
            <a @click="changeTag('ask')" :class="['topic-tab', { 'current-tab': currentTag === 'ask' }]">问答</a>
            <a @click="changeTag('job')" :class="['topic-tab', { 'current-tab': currentTag === 'job' }]">招聘</a>
            <a @click="changeTag('dev')" :class="['topic-tab', { 'current-tab': currentTag === 'dev' }]">客户端测试</a>
        </div>
        <div class="inner no-padding">
            <div id="topic_list">
                <div v-for="(item, index) in topics" class="cell" :key="index">
                    <router-link class="user_avatar pull-left" :to="'/user/' + (item.author && item.author.loginname)">
                        <img :src="item.author.avatar_url" :title="item.author.loginname" :alt="item.author.loginname" />
                    </router-link>
                    <span class="reply_count pull-left">
                        <span class="count_of_replies" title="回复数">
                            {{ item.reply_count }}
                        </span>
                        <span class="count_seperator"> / </span>
                        <span class="count_of_visits" title="点击数">
                            {{ item.visit_count }}
                        </span>
                    </span>
                    <router-link class="last_time pull-right" :to="'/detail/' + item.id">
                        <span class="last_active_time">{{ item.last_reply_at | fromNow }}</span>
                    </router-link>
                    <div class="topic_title_wrapper">
                        <span v-if="item.top" class="put_top">置顶&nbsp;</span>
                        <span v-else-if="item.good" class="put_good">精华&nbsp;</span>
                        <span v-else-if="item.tab === 'share'" class="topiclist-tab">分享&nbsp;</span>
                        <span v-else-if="item.tab === 'ask'" class="topiclist-tab">问答&nbsp;</span>
                        <span v-else-if="item.tab === 'job'" class="topiclist-tab">工作&nbsp;</span>
                        <span v-else-if="item.tab === 'dev'" class="topiclist-tab">测试&nbsp;</span>
                        <span v-else></span>
                        <router-link class="topic_title" :to="'/detail/' + item.id" :title="item.title">
                            {{ item.title }}
                        </router-link>
                    </div>
                </div>
            </div>
            <Pagination v-if="topics.length > 0" :total="total" :currentPage="currentPage" @handlePage="handlePage" />
            <div v-else />
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { fromNow } from '../../filters/filters';
    import Pagination from '../../components/Pagination.vue';

    interface Options {
        page: number;
        tab: string;
        limit: number;
        mdrender: boolean;
    }

    @Component({
        components: {
            Pagination,
        },
        filters: {
          fromNow,
        }
    })
    export default class Home extends Vue {
        currentTag: string = 'all';
        total: number = 589;
        currentPage: number = 1;
        get topics(): object{
            return this.$store.state.home.topics
        }
        created(): void{
            let options: Options = {
                page: 1,
                tab: 'all',
                limit: 40,
                mdrender: true,
            };
            this.fetchTopics(options);
        }
        async fetchTopics(options: Options) {
            await this.$store.dispatch('getTopics', options);
            this.changeSider();
        }
        changeTag(tag: string): void {
            let total: number = 0;
            switch(tag) {
                case 'all':
                    total = 589;
                    break;
                case 'good':
                    total = 16;
                    break;
                case 'share':
                    total = 36;
                    break;
                case 'ask':
                    total = 64;
                    break;
                case 'job':
                    total = 11;
                    break;
                case 'dev':
                    total = 30;
                    break;
                default:
                    break;
            }
            this.currentTag = tag;
            this.total = total;
            this.currentPage = 1;
            let options = {
                page: 1,
                tab: tag,
                limit: 40,
                mdrender: true,
            };
            this.fetchTopics(options);
        }
        handlePage(page: number): void {
            if (page !== this.currentPage){
                let options = {
                    page,
                    tab: this.currentTag,
                    limit: 40,
                    mdrender: true,
                };
                this.fetchTopics(options);
                window.scrollTo(0, 0);
                this.currentPage = page;
            }
        }
        async changeSider () {
            const accesstoken = window.localStorage.getItem('accesstoken');
            await this.$store.dispatch('accesstoken', {accesstoken});
            const accessInfo = this.$store.state.app.accessInfo;
            let showInfo = accessInfo.success ? true : false;
            this.$store.dispatch('authorOrNot', {
                showInfo,
                isAuthor: false,
            });
            if (accessInfo && accessInfo.loginname !== '' && accessInfo.loginname) {
                this.$store.dispatch('getInfo', {
                    username: accessInfo.loginname
                });
            }
        }
    };
</script>
