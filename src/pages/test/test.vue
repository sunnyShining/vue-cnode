<template>
    <div class="panel">
        <div class="header">
            <ul class="breadcrumb">
                <li><router-link to="/home">主页</router-link><span class="divider">/</span></li>
                <li class="active">test</li>
            </ul>
        </div>
        <div class="inner topic">
            test
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class Test extends Vue {
    };
</script>