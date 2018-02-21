<template>
    <div>123</div>
</template>
<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({})
    export default class Home extends Vue {
        id: string = '';
        created(): void{
            let id = this.$route.params.id;
            console.log(id);
        }
    };
</script>

