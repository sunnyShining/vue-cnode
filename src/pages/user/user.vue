<template>
    <div class="panel">
        <div class="header">
            <ul class="breadcrumb">
                <li><router-link to="/home">主页</router-link><span class="divider">/</span></li>
                <li class="active">User</li>
            </ul>
        </div>
        <div class="inner topic">
            User
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class User extends Vue {
    };
</script>