<template>
    <div class="hello">
        <h1>{{ feed.test }}</h1>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';
    import store from '../../store/index';
    import { Getter, Action } from 'vuex-class';

    @Component({})
    export default class Home extends Vue {
        msg: string = 'Welcome to Your Vue.js App';
        get feed(): object{
            return this.$store.state.feed
        }
        created(): void{
            console.log(this.$store.state.feed);
            this.$store.dispatch('changeTest');
        }
    };
</script>
