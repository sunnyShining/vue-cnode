<template>
    <div id="app">
        <Header />
        <div id="main">
            <Sider />
            <div id="content">
                <router-view/>
            </div>
        </div>
        <Footer />
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import { Header, Footer, Sider } from './components/Layout/index';

    @Component({
        components: {
            Header,
            Footer,
            Sider,
        }
    })
    export default class App extends Vue {
        created(): void {
            this.tryLogin();
        }
        async tryLogin () {
            const accesstoken = window.localStorage.getItem('accesstoken');
            await this.$store.dispatch('accesstoken', {accesstoken});
            let accessInfo = this.$store.state.app.accessInfo;
            if (accessInfo.success) {
                this.$store.dispatch('changeAccesstoken', {accesstoken});
                await this.$store.dispatch('getMessageCount', {accesstoken});
                await this.$store.dispatch('getMessage', {
                    accesstoken,
                    mdrender: true
                });
            }
        }
    };
</script>
