<template>
  <div class="person-info">
    <el-badge is-dot class="item">
      <el-icon :size = "20"><Bell /></el-icon>
    </el-badge>
    <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" />
    <el-dropdown @command="handleCommand">
    <span class="el-dropdown-link">
      欢迎你：{{ username }}
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command = "personInfo">个人中心</el-dropdown-item>
        <el-dropdown-item command = "logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/userStore";
import { computed } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const userStore = useUserStore();

const username = computed(() => {
  return userStore.username;
})

const handleCommand = (command: string) => {
  if (command === "logout") {
    userStore.logout();
    router.push("/login");
  } else if (command === "personInfo") {
    router.push("/personal");
  }
}

</script>


<style scoped>
.person-info {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
</style>
