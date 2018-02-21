import Vue from 'vue';
import Warning from './Warning.vue';
let WarningC = Vue.extend(Warning);
let instance: any;
export default {
	info (text = ' ') {
		if (!instance) {
			instance = new WarningC({
				el: document.createElement('div')
			});
			instance.text = text;
			document.body.appendChild(instance.$el);
			Vue.nextTick(() => {
				instance.visible = true;
			});
		}
		instance.visible = true;
		setTimeout(() => {
			this._close();
		}, 2000);
	},
	_close () {
		instance.visible = false;
	}
};
