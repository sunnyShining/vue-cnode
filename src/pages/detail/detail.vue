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
                      作者 <a to="/user/ topic.author.loginname">{{ topic.author && topic.author.loginname }}</a>
                    </span>
                    <span>
                      {{ topic.visit_count }} 次浏览
                    </span>
                    <span> 来自 {{ topic.tab | tab }} </span>
                    <input v-if="topic.is_collect" class="span-common  pull-right collect_btn" type="submit" value="取消收藏" action="de_collect" />
                    <input v-else class="span-common span-success pull-right collect_btn" type="submit" value="收藏" action="collect" />
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
                    <a to="/user/item.author.loginname" class="user_avatar">
                        <img :src="item.author.avatar_url" alt="" title="" />
                    </a>
                    <div class="user_info">
                        <a class="dark reply_author" to="/user/item.author.loginname">{{ item.author.loginname }}</a>
                        <a class="reply_time" :href="'#' + item.id">{{ index + 1 }}楼•{{ item.create_at | fromNow}}</a>
                        <span v-if="item.author.loginname === topic.author.loginname" class="reply_by_author">作者</span>
                    </div>
                    <div class="user_action">
                        <span>
                            <i :class="['fa up_btn fa-thumbs-o-up', {'uped': item.is_uped}]" title="喜欢"></i>
                            <span class="up-count">
                              &nbsp;{{ item.ups ? item.ups.length : 0 }}
                            </span>
                        </span>
                        <!-- {
                            accessInfo.success ?
                            <span>
                                &nbsp;<i class="fa fa-reply reply2_btn" title="回复" onClick={() => {this.reply(item.id, item.author.loginname)}}></i>
                            </span>: null
                        } -->
                    </div>
                </div>
                <div class="reply_content from-i5ting">
                    <div v-html="item.content" />
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
        get topic(): object {
            return this.$store.state.detail.topic;
        }
        created(): void {
            let id = this.$route.params.id;
            const { accesstoken } = this.$store.state.app;
            this.fetchTopic({
                id,
                accesstoken,
                mdrender: true
            });
            // this.$store.dispatch('getTopics', options);
        }
        fetchTopic(options: {id: string; accesstoken: string; mdrender: boolean}): void {
            this.$store.dispatch('getTopic', options);
        }
    };
</script>

