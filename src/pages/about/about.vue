<template>
    <div class="panel">
        <div class="header">
            <ul class="breadcrumb">
                <li><router-link to="/home">主页</router-link><span class="divider">/</span></li>
                <li class="active">关于</li>
            </ul>
        </div>
        <div class="inner topic">
            <div class="topic_content">
                <div class="markdown-text">
                    <h3>关于</h3>
                    <p>CNode 社区为国内最大最具影响力的 Node.js 开源技术社区，致力于 Node.js 的技术研究。</p>
                    <p>CNode 社区由一批热爱 Node.js 技术的工程师发起，目前已经吸引了互联网各个公司的专业技术人员加入，我们非常欢迎更多对 Node.js 感兴趣的朋友。</p>
                    <p>CNode 的 SLA 保证是，一个9，即 90.000000%。</p>
                    <p>社区目前由 <a href="http://cnodejs.org/user/alsotang" target="_blank" rel="noopener noreferrer">@alsotang</a> 在维护，有问题请联系：<a href="https://github.com/alsotang" target="_blank" rel="noopener noreferrer">https://github.com/alsotang</a></p>
                    <p>请关注我们的官方微博：<a href="http://weibo.com/cnodejs" target="_blank" rel="noopener noreferrer">http://weibo.com/cnodejs</a></p>
                    <h3>移动客户端</h3>
                    <p>客户端由 <a href="https://cnodejs.org/user/soliury" target="_blank" rel="noopener noreferrer">@soliury</a> 开发维护。</p>
                    <p>源码地址： <a href="https://github.com/soliury/noder-react-native" target="_blank" rel="noopener noreferrer">https://github.com/soliury/noder-react-native</a> 。</p>
                    <p>立即体验 CNode 客户端，直接扫描页面右侧二维码。</p>
                    <p>另，安卓用户同时可选择：<a href="https://github.com/TakWolf/CNode-Material-Design" target="_blank" rel="noopener noreferrer">https://github.com/TakWolf/CNode-Material-Design</a> ，这是 Java 原生开发的安卓客户端。</p>
                </div>
                <div class="about-friend-links">
                    <h3>友情链接</h3>
                    <a href="https://www.huoban.com/" target="_blank" rel="noopener noreferrer">
                        <img src="//dn-cnode.qbox.me/Ftmw28ed0I_rir7YYz3c_jVPkCGx" alt="" />
                    </a>
                    <a href="http://100offer.com/" target="_blank" rel="noopener noreferrer">
                        <img src="//dn-cnode.qbox.me/FmU1Ik57z6wrl9JDTNdcYBTDetFq" alt="" />
                    </a>
                    <a href="https://www.teambition.com/" target="_blank" rel="noopener noreferrer">
                        <img src="//dn-cnode.qbox.me/FkMR_SqpCp4Q0eDIaWrQlALiXdmP" alt="" />
                    </a>
                    <a href="http://yunzhihui.com/" target="_blank" rel="noopener noreferrer">
                        <img src="//dn-cnode.qbox.me/Fq2cV_14IFHwelZ-6jey42Z0-eOR" alt="" />
                    </a>
                    <a href="http://www.jiguang.cn/" target="_blank" rel="noopener noreferrer">
                        <img src="//dn-cnode.qbox.me/FijGJbij9GObh5AXw-Vyu5LGn08a" alt="" />
                    </a>
                    <a href="http://segmentfault.com/" target="_blank" rel="noopener noreferrer">
                        <img src="//o4j806krb.qnssl.com/public/images/temp/sf.png" alt="" />
                    </a>
                    <a href="http://ionichina.com/" target="_blank" rel="noopener noreferrer">
                        <img src="//o4j806krb.qnssl.com/public/images/temp/ionichina.png" alt="" />
                    </a>
                </div>
                <div class="">
                    <h3>LOGO</h3>
                    <p>
                        白底： <a href="https://cnodejs.org/public/images/cnodejs.svg" target="_blank" rel="noopener noreferrer">/public/images/cnodejs.svg</a>
                    </p>
                    <p>
                        黑底： <a href="https://cnodejs.org/public/images/cnodejs_light.svg" target="_blank" rel="noopener noreferrer">/public/images/cnodejs_light.svg</a>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class Home extends Vue {
        created(): void {
            this.changeSider();
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