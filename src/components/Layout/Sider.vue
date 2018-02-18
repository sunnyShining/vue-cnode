<template>
    <div id="sidebar">
        <div class="panel">
            <div class="inner">
                <p>CNode：Node.js专业中文社区</p>
                <div>
                    您可以&nbsp;
                    <a>
                        <span class="span-info">输入accesstoken登录</span>
                    </a>
                </div>
            </div>
        </div>
        <div class="panel">
            <div class="inner ads">
                <a href="https://alinode.aliyun.com/?ref=cnode" target="_blank" rel="noopener noreferrer" class="banner sponsor_outlink" data-label="alinode">
                    <img src="//dn-cnode.qbox.me/Fn4D6BhOTz1IswvmzeZ1q7QW1ls_" alt="" />
                </a>
                <div class="sep10"></div>
                <a href="http://www.ucloud.cn/site/active/gift.html?utm_source=cnodejs&amp;utm_medium=content_pic_pc&amp;utm_campaign=multicloud&amp;utm_content=gift&amp;ytag=cnodejs" target="_blank" rel="noopener noreferrer" class="banner sponsor_outlink" data-label="ucloud-banner">
                    <img src="//dn-cnode.qbox.me/FgQS-GQDfqwAD_v0NuhyYUOUk5MG" alt="" />
                </a>
                <div class="sep10"></div>
                <a href="https://0x7.me/UDyj" class="banner sponsor_outlink" data-label="qiniu-sidebar" target="_blank" rel="noopener noreferrer">
                    <img src="//dn-cnode.qbox.me/Fv9R31Y6ySKKJi95ldk9TRkJ7o5O" alt="" />
                </a>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">友情社区</span>
            </div>
            <div class="inner">
                <ol class="friendship-community">
                    <li>
                        <a href="https://ruby-china.org/" target="_blank" rel="noopener noreferrer">
                            <img src="//o4j806krb.qnssl.com/public/images/ruby-china-20150529.png" alt="" />
                        </a>
                    </li>
                    <div class="sep10"></div>
                    <li>
                        <a href="http://golangtc.com/" target="_blank" rel="noopener noreferrer">
                            <img src="//o4j806krb.qnssl.com/public/images/golangtc-logo.png" alt="" />
                        </a>
                    </li>
                    <div class="sep10"></div>
                    <li>
                        <a href="http://phphub.org/" target="_blank" rel="noopener noreferrer">
                            <img src="//o4j806krb.qnssl.com/public/images/phphub-logo.png" alt="" />
                        </a>
                    </li>
                    <div class="sep10"></div>
                    <li>
                        <a href="https://testerhome.com/" target="_blank" rel="noopener noreferrer">
                            <img src="//dn-cnode.qbox.me/FjLUc7IJ2--DqS706etPQ1EGajxK" alt="" />
                        </a>
                    </li>
                </ol>
            </div>
        </div>
        <div class="panel">
            <div class="header">
                <span class="col_fade">客户端二维码</span>
            </div>
            <div class="inner cnode-app-download">
                <img width="200" src="//dn-cnode.qbox.me/FtG0YVgQ6iginiLpf9W4_ShjiLfU" alt="" />
                <br />
                <a href="https://github.com/soliury/noder-react-native" target="_blank" rel="noopener noreferrer">客户端源码地址</a>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class Sider extends Vue {
    };
</script>
