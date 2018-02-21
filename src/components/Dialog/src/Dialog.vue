<template>
    <div class="dialog-mask" v-show="visible">
        <div class="dialog-wraper">
            <div v-if="showInput" class="dialog-input-container">
                <div v-if="showTitle" class="dialog-input-header">{{ title }}</div>
                <div class="dialog-input-body">
                    <input type="text" @input="changeBtnColor" :placeholder="inputPlaceholder" v-model="inputValue" class="dialog-input-textbox" />
                </div>
                <div class="dialog-input-btn">
                    <input class="dialog-input-btn-cancel f-c666666 dialog-b-right" type="button" @click="cancel" :value="cancelButtonText" />
                    <input class="dialog-input-btn-confirm f-cgreen" type="button" @click="confirm" :value="confirmButtonText" />
                </div>
            </div>
            <div v-else class="dialog-container">
                <div v-if="showTitle" class="dialog-input-header">{{ title }}</div>
                <div class="dialog-body f-c666666">
                    <div>
                        <div v-if="useText" v-html="text"></div>
                        <div v-else>{{ message }}</div>
                    </div>
                </div>
                <div v-if="showOneBtn" class="dialog-btn">
                    <input type="button" :style="{width: '100%'}" class="dialog-one-btn f-cgreen" :value="oneBtnText" @click="oneBtn" />
                </div>
                <div v-else class="dialog-btn">
                    <input class="dialog-btn-cancel f-c666666 dialog-b-right" type="button" @click="cancel" :value="cancelButtonText" />
                    <input class="dialog-btn-confirm f-cgreen" type="button" @click="confirm" :value="confirmButtonText" />
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        props: {
            title: {
                type: String,
                default: '温馨提示'
            },
            message: {
                type: String,
                default: ''
            },
            confirmButtonText: {
                type: String,
                default: '确定'
            },
            cancelButtonText: {
                type: String,
                default: '取消'
            },
            text: {
                type: String,
                default: ''
            },
            inputValue: {
                type: String,
                default: ''
            },
            cancelCallBack: {
                type: Function,
                default() {}
            },
            confirmCallBack: {
                type: Function,
                default() {}
            },
            oneBtnCallBack: {
                type: Function,
                default() {}
            }
        }
    })
    export default class Dialog extends Vue {
        visible: boolean = false;
        showOneBtn: boolean = false;
        showTitle: boolean = true;
        showInput: boolean = false;
        useText: boolean = false;
        activeBtn: boolean = false;
        showInputTestError: boolean = false;
        cancel(): void {
            let { cancelCallBack } = this.$props;
            cancelCallBack && cancelCallBack();
        }
        confirm(): void {
            let { confirmCallBack, inputValue } = this.$props;
            confirmCallBack && confirmCallBack(inputValue);
        }
        oneBtn(): void {
            let { oneBtnCallBack } = this.$props;
            oneBtnCallBack && oneBtnCallBack();
        }
        changeBtnColor(): void {}
    };
</script>
<style lang="less" scoped>
    .dialog-mask {
        position: fixed;
        z-index: 9998;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
        display: table;
        transition: opacity .3s ease;
        overflow: hidden;
    }

    .dialog-wraper {
        vertical-align: middle;
        display: table-cell;
    }

    .dialog-container,
    .dialog-input-container{
        // margin: 0px 1rem;
        width: 275px;
        margin: 0 auto;
        background-color: #fff;
        border-radius: 5px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
        transition: all .3s ease;
        font-family: Arial, "Microsoft YaHei";
    }

    .dialog-input-body{
        width: 100%;
        padding: 21px 23px;
        input {
            height: 22px;
            width: 80%;
            border: 1px solid #e7e7e7;
            font-size: 15px;
            text-indent: 1em;
        }
    }

    .dialog-input-btn-cancel,
    .dialog-input-btn-confirm {
        flex: 1;
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        border: none;
        background: none;
    }

    .dialog-header,
    .dialog-input-header {
        line-height: 28px;
        font-size: 18px;
        padding-top: 11px;
        text-align: center;
        font-weight: bolder;
        color: #1e1e1e;
    }

    .dialog-body {
        padding: 6px 40px 15px 40px;
        font-size: 15px;
        line-height: 20px;
    }

    .dialog-btn,
    .dialog-input-btn {
        border-top: 1px solid #e7e7e7;
        display: flex;
        width: 100%;
    }

    .dialog-btn-cancel,
    .dialog-btn-confirm {
        flex: 1;
        height: 45px;
        line-height: 45px;
        font-size: 17px;
        border: none;
        background: none;
    }

    .dialog-one-btn{
        height: 45px;
        line-height: 45px;
        font-size: 16px;
        border: none;
        background: none;
        color: green
    }

    .f-cgreen {
        color: green
    }
    .f-cdadada{
    color: #dadada;
    }

    .dialog-b-right {
        border-right: 1px solid #e7e7e7;
        border-radius: initial; //解决safari border继承bug
    }
</style>
