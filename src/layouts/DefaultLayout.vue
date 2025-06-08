<template>
  <div class="common-layout">
    <el-watermark :content="content">
      <el-container>
        <el-aside width="200px">
          <nav-menu> </nav-menu>
        </el-aside>
        <el-container>
          <el-header>
            <top-header class="top-header"></top-header>
          </el-header>
          <el-main>
            <TabsLayout />
          </el-main>
        </el-container>
      </el-container>
    </el-watermark>

  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/navMenu/NavMenu.vue'
import TopHeader from '@/components/topHeader/TopHeader.vue'
import TabsLayout from '@/layouts/TabsLayout.vue'
import { onMounted, ref } from 'vue'
import { useUserStore } from '@/stores/userStore'

const userStore = useUserStore()
const content = ref<string[]>([])

onMounted(() => {
  content.value = [userStore.username]
})

</script>

<style scoped lang="less">
.el-aside {
  height: 100vh;
  box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
  background-color: #545c64;
}

.el-header {
  padding: 0 !important;
}

.el-main {
  height: 80vh;
  overflow: auto;
}

.top-header {
  height: 100%;
  width: 100%;
  background-color: #fff;
}
</style>
