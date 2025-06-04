<template>
    <div class="common-layout">
    <el-container>
      <el-aside width="200px">
        <nav-menu> </nav-menu>
      </el-aside>
      <el-container>
        <el-header>Header</el-header>
        <el-main>
          <RouterView />
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavMenu from '@/components/navMenu/NavMenu.vue';


</script>

<style scoped lang="less">
.el-aside{
    height: 100vh;;
    box-shadow: 10px 0 8px -2px rgba(0, 0, 0, 0.2);
    background-color: #545c64
  }
  .el-header{
    padding: 0 !important
  }
  .el-main{
    height: 80vh;
    overflow: auto;
  }

</style>