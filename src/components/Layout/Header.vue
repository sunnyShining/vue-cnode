<template>
    <div class="navbar">
        <div class="navbar-inner">
            <div class="container">
                <a class="brand" href="/">
                    <img src="//o4j806krb.qnssl.com/public/images/cnodejs_light.svg">
                </a>
                <form id="search_form" class="navbar-search" action="/search">
                    <input type="text" id="q" name="q" class="search-query span3" value="">
                </form>
                <ul class="nav pull-right">
                    <li><a href="/">首页</a></li>
                    <li><a href="/my/messages">未读消息</a>
                    </li>
                    <li><a href="/getstart">新手入门</a></li>
                    <li><a href="/api">API</a></li>
                    <li><a href="/about" target="">关于</a></li>
                    <li><a href="/setting">设置</a></li>
                    <li>
                        <a href="/signout" data-method="post" rel="nofollow">退出</a>
                    </li>
                </ul>
                <a class="btn btn-navbar" id="responsive-sidebar-trigger">
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
            <span class="icon-bar"></span>
          </a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class Header extends Vue {
    };
</script>
