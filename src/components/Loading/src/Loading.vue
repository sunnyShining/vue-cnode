<template>
    <div class="loading" v-show="visible">
        <div class="mask">
            <div class="outter">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        props: {
            text: {
                type: String,
                default: ''
            }
        }
    })
    export default class Loading extends Vue {
        visible: boolean = true;
    };
</script>
<style lang="less" scoped>
    @keyframes load{
        0%, 100%{
            height: 40px;
            background: green;
        }
        50%{
            height: 70px;
            margin: -15px 0;
            background: blue;
        }
    }
    .loading{
        transition: opacity .3s linear;
        width: 100%;
        height: 100%;
        position: fixed;
        display: block;
        text-align: center;
        top: 0;
        background-color: transparent;//背景透明
        z-index: 9999;
        &:after{
            content: "";
            display: inline-block;
        }
        .mask{
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, .2);
        }
        .outter {
            position: relative;
            top: 50%;
            display: inline-block;
            vertical-align: middle;
            height: 40px;
            width: 80px;
            span{
                display: inline-block;
                width: 8px;
                height: 100%;
                border-radius: 4px;
                background: green;
                animation: load 1s ease infinite;
            }
            span:nth-child(2){
                animation-delay:0.2s;
            }
            span:nth-child(3){
                animation-delay:0.4s;
            }
            span:nth-child(4){
                animation-delay:0.6s;
            }
            span:nth-child(5){
                animation-delay:0.8s;
            }
        }
    }
</style>
