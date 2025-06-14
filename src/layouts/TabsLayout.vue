<template>
  <el-tabs v-model="activeTab" type="card" class="demo-tabs" closable @tab-remove="removeTab" @tab-click="handleClick">
    <el-tab-pane v-for="item in tabList" :key="item.url" :label="item.name" :name="item.url">
      <template #label>
        <span class="custom-tabs-label">
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span class="custom-tabs-label-text">
            {{ item.name }}
          </span>
        </span>
      </template>
    </el-tab-pane>
  </el-tabs>
    <RouterView v-slot="{Component}">
        <KeepAlive>
            <component :is="Component" :key="$route.name" v-if="$route.meta.keepAlive"></component>
        </KeepAlive>
        <component :is="Component" :key="$route.name" v-if="!$route.meta.keepAlive"></component>
    </RouterView>
</template>

<script setup lang="ts">
import { useTabsStore } from '@/stores/tabStore'
import { useUserStore } from '@/stores/userStore'
import type { TabPaneName, TabsPaneContext } from 'element-plus'
import { storeToRefs } from 'pinia'
import { useRoute, useRouter } from 'vue-router'

const tabsStore = useTabsStore()
const { activeTab, tabList } = storeToRefs(tabsStore)
const router = useRouter()
const route = useRoute()

const userStore = useUserStore()
const currentMenu = userStore.getMenuByUrl(route.path, userStore.menu)
if (currentMenu) {
  tabsStore.addTab(currentMenu)  
}

const removeTab = (targetTab: TabPaneName) => {
  tabsStore.removeTab(targetTab.toString())
  router.push(activeTab.value)
}

const handleClick = (tab: TabsPaneContext) => {
  router.push(tab.props.name as string)
}
</script>

<style scoped>
.demo-tabs {
  ::deep .is-active {
    color: white !important;
    background-color: #5696ff;
  }
}
</style>
