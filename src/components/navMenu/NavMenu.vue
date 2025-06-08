<template>
  <div class="logo">
    <img :src="logo" width="34px" height="34px" />
    <h1>长乐未央</h1>
  </div>
  <el-menu
    active-text-color="#ffd04b"
    background-color="#545c64"
    class="el-menu-vertical-demo"
    :default-active="$route.path"
    text-color="#fff"
    :router="true"
  >
    <nav-menu-item v-for="item in menuList" :key="item.id" :item="item"></nav-menu-item>
  </el-menu>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import NavMenuItem from './NavMenuItem.vue'
import { useUserStore } from '@/stores/userStore'
import { computed } from 'vue'

const userStore = useUserStore()
const menuList = computed(() => {
  return userStore.menu
})
</script>

<style lang="less" scoped>
.logo {
  display: flex;
  justify-content: center;
  height: 50px;
  align-items: center;
  padding: 10px 0;
  img {
    margin-left: -10px;
  }
  h1 {
    color: #fff;
    margin-left: 10px;
    font-size: 22px;
  }
}
.el-menu {
  border-right: none;
}
</style>
