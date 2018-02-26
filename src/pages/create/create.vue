<template>
    <div>
        <div class="panel">
            <div class="header">
                <ol class="breadcrumb">
                    <li><a href="/">主页</a><span class="divider">/</span></li>
                    <li class="active">发布话题</li>
                </ol>
            </div>
            <div class="inner post">
                <form id="create_topic_form">
                    <fieldset>
                        <span class="tab-selector">选择版块：</span>
                        <select name="tab" id="tab-value" v-model="tab">
                            <option value="">请选择</option>
                            <option value="share">分享</option>
                            <option value="ask">问答</option>
                            <option value="job">招聘</option>
                            <option value="dev">客户端测试</option>
                        </select>
                        <span id="topic_create_warn"></span>
                        <p>
                            <input type="text" style="width: 85%" autoFocus="" v-model="title" name="title" placeholder="标题字数 10 字以上" />
                        </p>
                        <div class="markdown_editor in_editor">
                            <div class="markdown_in_editor">
                                <mavon-editor v-model="value" :subfield="false" :placeholder="' '" @change="changeContent" />
                                <div class="editor_buttons">
                                    <input type="button" class="span-primary submit_btn" @click="create" value="提交">
                                </div>
                            </div>
                        </div>
                    </fieldset>
                </form>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import Warning from '../../components/Warning/index';
    import services from '../../services/services';

    @Component({})
    export default class Create extends Vue {
        id: string = '';
        tab: string = '';
        title: string = '';
        value: string = '';
        content: string = '';
        changeContent(value: string , render: string): void {
            this.content = render;
        }
        created(): void {
            let id = this.$route.params.id;
            this.id = id;
            if (id !== 'new') {
                const { accesstoken } = this.$store.state.app;
                this.fetchTopic({
                    id,
                    accesstoken,
                    mdrender: false
                });
            }
            this.changeSider();
        }
        async fetchTopic (options: {id: string; accesstoken: string; mdrender: boolean}) {
            await this.$store.dispatch('getTopic', options);
            // 侧边栏
            const topic = this.$store.state.detail.topic;
            this.value = topic.content;
            this.title = topic.title;
            this.tab = topic.tab;
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
        async create() {
            const accesstoken = this.$store.state.app.accesstoken;
            const options = {
                title: this.title,
                accesstoken,
                tab: this.tab,
                content: this.value,
            };
            if (this.tab === '') {
                Warning.info('请选择版块');
                return;
            } else if (this.title === '') {
                Warning.info('标题不能为空！');
                return;
            } else if (this.content === '') {
                Warning.info('内容不能为空！');
                return;
            }
            if (this.id === 'new') {
                services.newTopics({
                    title: this.title,
                    accesstoken,
                    tab: this.tab,
                    content: this.value,
                }).then((data: any) => {
                    if (data.success) {
                        this.$router.push('/home');
                        Warning.info('发布成功！');
                    }
                }, error => {
                    console.log(error);
                });
            } else {
                services.update({
                    title: this.title,
                    accesstoken,
                    tab: this.tab,
                    content: this.value,
                    topic_id: this.id,
                }).then((data: any) => {
                    if (data.success) {
                        this.$router.push('/home');
                        Warning.info('发布成功！');
                    }
                }, error => {
                    console.log(error);
                });
            }

        }
    };
</script>