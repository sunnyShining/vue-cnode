import Vue from 'vue';
import Loading from './Loading.vue';
let LoadingC = Vue.extend(Loading);
let instance: any;
export default {
    open (options: any = {}) {
        if (!instance) {
            this.initInstance(options);
        }
        instance.visible = true;
    },
    initInstance (options: any) {
        instance = new LoadingC({
            el: document.createElement('div')
        });
        instance.text = options.text || '加载中';
        // for (let prop in options) {
        //     if (options.hasOwnProperty(prop)) {
        //         instance[prop] = options[prop];
        //     }
        // }
        document.body.appendChild(instance.$el);
        Vue.nextTick(() => {
            instance.visible = true;
        });
    },
    close () {
        instance.visible = false;
    }
};
