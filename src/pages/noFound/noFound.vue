<template>
	<div class="panel">
		<div class="error">
			<h1>404<br/>Not Found</h1>
		</div>
	</div>
</template>
<script lang="ts">
	import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class NoFound extends Vue {
    	created() :void {
			setTimeout(() => {
				this.$router.replace('/home');
			}, 1000);
    	}
    }
</script>
<style lang="less">
	.error {
	    color: black;
	    text-align: center;
	    width: 200px;
	    margin: 0 auto;
	    h1 {
	      font-family: cursive;
	    }
	}
</style>