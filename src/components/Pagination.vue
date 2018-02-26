<template>
    <div class="pagination">
        <div v-if="total <= 0" />
        <ul v-else-if="total <= 5">
            <li :class="[{'disabled': currentPage === 1}]" @click="changePage(1)"><a>«</a></li>
            <li v-for="n in total" :key="n" :class="[{'disabled active': currentPage === n}]" @click="changePage(n)"><a>{{ n }}</a></li>
            <li :class="[{'disabled': currentPage === total}]" @click="changePage(total)"><a>»</a></li>
        </ul>
        <ul v-else-if="currentPage < 4">
            <li :class="[{'disabled': currentPage === 1}]" @click="changePage(1)"><a>«</a></li>
            <li :class="[{'disabled active': currentPage === 1}]" @click="changePage(1)"><a>1</a></li>
            <li :class="[{'disabled active': currentPage === 2}]" @click="changePage(2)"><a>2</a></li>
            <li :class="[{'disabled active': currentPage === 3}]" @click="changePage(3)"><a>3</a></li>
            <li :class="[{'disabled active': currentPage === 4}]" @click="changePage(4)"><a>4</a></li>
            <li :class="[{'disabled active': currentPage === 5}]" @click="changePage(5)"><a>5</a></li>
            <li @click="changePage(currentPage + 2)"><a>...</a></li>
            <li @click="changePage(total)"><a>»</a></li>
        </ul>
        <ul v-else-if="currentPage < total - 2">
            <li @click="changePage(1)"><a>«</a></li>
            <li @click="changePage(currentPage - 2)"><a>...</a></li>
            <li @click="changePage(currentPage - 2)"><a>{{ currentPage - 2 }}</a></li>
            <li @click="changePage(currentPage - 1)"><a>{{ currentPage - 1 }}</a></li>
            <li class="disabled active"><a>{{ currentPage }}</a></li>
            <li @click="changePage(currentPage + 1)"><a>{{ currentPage + 1 }}</a></li>
            <li @click="changePage(currentPage + 2)"><a>{{ currentPage + 2 }}</a></li>
            <li @click="changePage(currentPage + 2)"><a>...</a></li>
            <li @click="changePage(total)"><a>»</a></li>
        </ul>
        <ul v-else>
            <li @click="changePage(1)"><a>«</a></li>
            <li @click="changePage(currentPage - 2)"><a>...</a></li>
            <li :class="[{'disabled active': currentPage === total - 4}]" @click="changePage(total - 4)"><a>{{ total - 4 }}</a></li>
            <li :class="[{'disabled active': currentPage === total - 3}]" @click="changePage(total - 3)"><a>{{ total - 3 }}</a></li>
            <li :class="[{'disabled active': currentPage === total - 2}]" @click="changePage(total - 2)"><a>{{ total - 2 }}</a></li>
            <li :class="[{'disabled active': currentPage === total - 1}]" @click="changePage(total - 1)"><a>{{ total - 1 }}</a></li>
            <li :class="[{'disabled active': currentPage === total}]" @click="changePage(total)"><a>{{ total }}</a></li>
            <li class="disabled"><a>»</a></li>
        </ul>
    </div>
</template>

<script lang="ts">
    import Vue from 'vue';
    import Component from 'vue-class-component';

    @Component({
        props: {
            total: {
                type: Number,
                default: 0
            },
            currentPage: {
                type: Number,
                default: 1
            },
            handlePage: {
                type: Function,
                default() {}
            }
        }
    })
    export default class Pagination extends Vue {
        changePage(num: number) {
            this.$emit('handlePage', num);
        }
    };
</script>
