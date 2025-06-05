<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="18">
        <el-card>
          <template #header>
            <div class="title">
              <h3>今日设备运行状态</h3>
              <p>当前时间：{{ currentTime }}</p>
              <el-icon color="#86909c" style="margin-left: 5px">
                <Refresh />
              </el-icon>
            </div>
          </template>

          <div class="card-content">
            <div class="item">
              <h4>充电桩使用率</h4>
              <img :src="flash" alt="" class="mb mt" />
              <h1>72 / 95</h1>
              <div class="statistic-card">
                <el-statistic :value="98500">
                  <template #title>
                    <div style="display: inline-flex; align-items: center">
                      异常设备
                      <el-tooltip
                        effect="dark"
                        content="Number of users who logged into the product in one day"
                        placement="top"
                      >
                        <el-icon style="margin-left: 4px" :size="12">
                          <Warning />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>相较昨日</span>
                    <span class="red">
                      24%
                      <el-icon color="red">
                        <CaretTop />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <h4>充电柜使用率</h4>
              <img :src="flash2" alt="" class="mb mt" />
              <h1>655 / 1233</h1>
              <div class="statistic-card">
                <el-statistic :value="22">
                  <template #title>
                    <div style="display: inline-flex; align-items: center">
                      异常设备
                      <el-tooltip
                        effect="dark"
                        content="Number of users who logged into the product in one day"
                        placement="top"
                      >
                        <el-icon style="margin-left: 4px" :size="12">
                          <Warning />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>相较昨日</span>
                    <span class="green">
                      24%
                      <el-icon color="green">
                        <CaretTop />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div class="item">
              <h4>充电站使用率</h4>
              <img :src="flash3" alt="" class="mb mt" />

              <h1>2263 / 3398</h1>
              <div class="statistic-card">
                <el-statistic :value="47">
                  <template #title>
                    <div style="display: inline-flex; align-items: center">
                      异常设备
                      <el-tooltip
                        effect="dark"
                        content="Number of users who logged into the product in one day"
                        placement="top"
                      >
                        <el-icon style="margin-left: 4px" :size="12">
                          <Warning />
                        </el-icon>
                      </el-tooltip>
                    </div>
                  </template>
                </el-statistic>
                <div class="statistic-footer">
                  <div class="footer-item">
                    <span>相较昨日</span>
                    <span class="green">
                      24%
                      <el-icon color="green">
                        <CaretTop />
                      </el-icon>
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </el-card>

        <el-card class="mt">
          <template #header>
            <div class="card-header">
              <h1>常用功能</h1>
            </div>
          </template>
          <div class="quick mt mb">
            <el-col :span="4">
              <img :src="repair" />
              <p>设备维修</p>
            </el-col>
            <el-col :span="4">
              <img :src="daily" />
              <p>每日日报</p>
            </el-col>
            <el-col :span="4">
              <img :src="progress" />
              <p>任务进度</p>
            </el-col>
            <el-col :span="4">
              <img :src="total" />
              <p>营收占比</p>
            </el-col>
            <el-col :span="4">
              <img :src="money" />
              <p>营收统计</p>
            </el-col>
            <el-col :span="4">
              <img :src="remain" />
              <p>待办事项</p>
            </el-col>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6"> </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import flash from '@/assets/flash.png'
import flash2 from '@/assets/flash2.png'
import flash3 from '@/assets/flash3.png'
import repair from '@/assets/repair.png'
import progress from '@/assets/progress.png'
import remain from '@/assets/remain.png'
import total from '@/assets/total.png'
import money from '@/assets/money.png'
import daily from '@/assets/daily.png'
import { onMounted, onUnmounted, ref } from 'vue'


// 定义响应式变量存储当前时间
const currentTime = ref('');
let timer: number | null = null;

// 更新时间的函数
const updateTime = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

// 组件挂载时启动定时器
onMounted(() => {
  updateTime();
  timer = window.setInterval(updateTime, 1000);
});

// 组件卸载时清除定时器，避免内存泄漏
onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer);
  }
});





</script>

<style scoped lang="less">
.title {
  display: flex;
  align-items: flex-end;
  /* 底部对齐 */
  font-size: 20px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  p {
    color: #86909c;
    margin-left: 20px;
  }
}
.card-content {
  display: flex;
  justify-content: space-between;
  padding: 0 50px;
  .item {
    h4 {
      margin-bottom: 20px;
      margin-top: 20px;
    }

    h1 {
      font-size: 36px;
      margin-bottom: 20px;
    }

    .statistic-card {
      .el-statistic__content {
        margin: 10px !important;
      }
    }
  }
}

.quick {
  padding: 0 40px;
  margin-top: 30px;
  display: flex;
  justify-content: space-between;

  p {
    margin-top: 10px;
    color: #333;
  }
}
</style>
