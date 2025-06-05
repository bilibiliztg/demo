<template>
    <el-sub-menu v-if="item.children" :index="item.url">
        <template #title>
            <el-icon>
                <component :is="item.icon" />
            </el-icon>
            <span>{{ item.name }}</span>
        </template>
        <nav-menu-item v-for="child in item.children" :key="child.url" :item="child"></nav-menu-item>
    </el-sub-menu>
    <el-menu-item v-else :index="item.url" v-show="!(item.name == '订单详情')" @click="addTab(item)">
        <el-icon>
            <component :is="item.icon" />
        </el-icon>
        <span>{{ item.name }}</span>
    </el-menu-item>
</template>

<script  lang="ts">
import { defineComponent } from 'vue';
import type { PropType } from 'vue';
import type { MenuItem as MenuItemType } from "../../types/user"; //这里换成@符号会有bug，先不换了
import { useTabsStore } from '@/stores/tabStore'
export default defineComponent({
    name: 'NavMenuItem', // 你可以给组件起一个名字
    props: {
        item: {
            type: Object as PropType<MenuItemType>, //使用 TypeScript 的 PropType 来指定 item 的具体类型为 MenuItemType
            required: true
        }
    },
    setup() {
        const tabsStore = useTabsStore()
        function addTab(item: MenuItemType) {
            tabsStore.addTab(item)
        }
        return {
            addTab
        }
    }
});
</script>

<style scoped>

</style>