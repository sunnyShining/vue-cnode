<template>
	<div class="warning" v-show="visible">
		<span class="text">{{ text }}</span>
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
            },
            visible: {
                type: Boolean,
                default: false
            }
        }
    })
    export default class Warning extends Vue {
    };
</script>
<style lang="less" scoped>
	.warning{
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: center;
        align-items: center;
        z-index: 9999;
        .text{
            background-color: #000;
            color: #fff;
            position: absolute;
            padding: 5px 25px;
            opacity: .7;
            border-radius: 5px;
            font-size: 14px;
        }
    }
</style>
