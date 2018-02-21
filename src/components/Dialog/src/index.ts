/**
 * @author sunny
 * @email 17765293970@163.com
 * @create date 2018-02-21 08:43:40
 * @modify date 2018-02-21 08:43:40
 * @desc 弹框
 */
import Vue from 'vue';
import Dialog from './Dialog.vue';

let DialogC = Vue.extend(Dialog);
let instance: any;

// 默认值
let defaults = {
    title: '温馨提示', // 弹框头部
    showTitle: true, // 显示头
    message: '', // body的文字
    showInput: false, // 是否显示输入框
    inputPlaceholder: '', // 输入框未输入文字显示
    inputValue: null, // 输入框默认内容
    showInputTestError: false,
    showInputValidMoney: false,
    showClose: false,
    modalFade: false,
    lockScroll: false,
    closeOnClickModal: false,
    confirmButtonText: '确定', // 两个按钮确认按钮文字
    cancelButtonText: '取消', // 两个按钮取消按钮文字
    showOneBtn: false, // 是否显示一个按钮
    oneBtnText: '确定', // 一个按钮文案
    useText: false,
    text: '',
};

let initOptions = (options: any) => {
    let args = Object.assign({}, defaults, options);
    return args;
};
let getDialogInstance = (options: any) => {
    let args = initOptions(options);
    if (!instance) {
        instance = new DialogC({
            el: document.createElement('div')
        });
    }
    for (let prop in args) {
        if (args.hasOwnProperty(prop)) {
            instance[prop] = args[prop];
        }
    }
    document.body.appendChild(instance.$el);
    Vue.nextTick(() => {
        instance.visible = true;
    });
};

export default {
    open(options = {}) {
        getDialogInstance(options);
    }
};
