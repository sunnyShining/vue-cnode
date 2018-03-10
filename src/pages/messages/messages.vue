<template>
    <div>
        <div class="panel">
            <div class="header">
                <ul class="breadcrumb">
                    <li><Link to="/home">主页</Link><span class="divider">/</span></li>
                    <li class="active">新消息</li>
                </ul>
            </div>
            <div class="inner" v-if="hasnotRead.length === 0">
                <p>无消息</p>
            </div>
            <div v-for="(item, index) in hasnotRead" class="cell" :message_id="item.id" :key="index">
                <span>
                    <router-link :to="'/user/' + (item.author && item.author.loginname)">{{ item.author && item.author.loginname }}</router-link>
                    回复了你的话题
                    <router-link :to="'/detail/' + (item.topic && item.topic.id)">{{ item.topic && item.topic.title }}</router-link>
                </span>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">过往信息</span>
            </div>
                <div class="inner" v-if="hasRead.length === 0">
                    <p>无消息</p>
                </div>
                <div v-for="(item, index) in hasRead" class="cell" :message_id="item.id" :key="index">
                    <span>
                        <router-link :to="'/user/' + (item.author && item.author.loginname)">{{ item.author && item.author.loginname }}</router-link>
                        回复了你的话题
                        <router-link :to="'/detail/' + (item.topic && item.topic.id)">{{ item.topic && item.topic.title }}</router-link>
                    </span>
                </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import services from '../../services/services';

    @Component({})
    export default class Message extends Vue {
        get hasRead(): any {
            return this.$store.state.app.hasRead;
        }
        get hasnotRead(): any {
            return this.$store.state.app.hasnotRead;
        }
        created(): void {
            const { accesstoken } = this.$store.state.app;
            this.changeSider();
            services.markAll({ accesstoken });
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