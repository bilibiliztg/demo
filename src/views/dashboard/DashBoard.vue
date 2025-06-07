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
          <div class="quick mt mb" @click="handleQuickClick">
            <el-col :span="4">
              <img :src="money" data-route="/operations/orders" style="cursor: pointer" />
              <p>订单管理</p>
            </el-col>
            <el-col :span="4">
              <img :src="total" data-route="/chargingstation/revenue" style="cursor: pointer" />
              <p>营收统计</p>
            </el-col>
            <el-col :span="4">
              <img :src="repair" data-route="/system" style="cursor: pointer" />
              <p>系统设置</p>
            </el-col>
            <el-col :span="4">
              <img :src="daily" data-route="/equipment" style="cursor: pointer" />
              <p>会员卡管理</p>
            </el-col>
            <el-col :span="4">
              <img :src="progress" data-route="/document" style="cursor: pointer" />
              <p>招商管理</p>
            </el-col>
            <el-col :span="4">
              <img :src="remain" data-route="/alarm" style="cursor: pointer" />
              <p>报警管理</p>
            </el-col>
          </div>
        </el-card>

        <el-card class="mt">
          <template #header>
            <div class="card-header">
              <h1>能源统计</h1>
            </div>
          </template>
          <el-row>
            <el-col :span="8">
              <div ref="chartGraphRef" class="chart-graph" style="width: 100%; height: 400px"></div>
            </el-col>
            <el-col :span="16">
              <div ref="chartLineRef" class="chart-line" style="width: 100%; height: 400px"></div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card>
          <template #header>
            <div class="card-header">
              <h1>设备总览</h1>
            </div>
          </template>
          <div ref="leidaRef" style="width: 100%; height: 250px"></div>
        </el-card>

        <el-card class="mt">
          <template #header>
            <h1>营收统计表</h1>
          </template>
          <ul class="revenue-list">
            <li v-for="(item, index) in topCityRankData" :key="index">
              <span class="rank">{{ item.rank }}</span>
              <span class="city">{{ item.city }}</span>
              <span class="amount">{{ formatNumber(item.amount) }}</span>
              <span class="percentage">{{ item.percentage }}%</span>
              <el-icon
                style="margin-left: 4px"
                :size="12"
                :color="item.trend === 'up' ? '#00C48D' : '#FF5C93'"
              >
                <component :is="item.trend === 'up' ? 'CaretTop' : 'CaretBottom'" />
              </el-icon>
            </li>
          </ul>
        </el-card>

        <el-card class="mt">
          <div class="card-header">
            <h1>故障报警</h1>
          </div>
          <el-timeline>
            <el-timeline-item timestamp="2025/6/6" placement="top" type="danger">
              <el-card>
                <h4>区域入侵</h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2025/6/6" placement="top" type="warning">
              <el-card>
                <h4>陌生人告警</h4>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2025/6/6" placement="top" type="info">
              <el-card>
                <h4>重点人员告警</h4>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
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
import { useChart } from '@/hooks/useChart'
import { getLineStatistic, getGraphStatistic, getLeidaGraph, getTopCityRank } from '@/api/dashboard'
import { useRoute, useRouter } from 'vue-router'
import { useTabsStore } from '@/stores/tabStore'
import { useUserStore } from '@/stores/userStore'

// 定义响应式变量存储当前时间
const currentTime = ref('')
let timer: number | null = null

const router = useRouter()
const tabsStore = useTabsStore()
const userStore = useUserStore()
//常用功能路由跳转
const handleQuickClick = (event: MouseEvent) => {
  // 获取点击的目标元素
  let target = event.target as HTMLElement
  // 向上查找带有 data-route 属性的 img 元素
  while (target && target !== event.currentTarget) {
    if (target.tagName === 'IMG' && target.hasAttribute('data-route')) {
      const routeKey = target.getAttribute('data-route') as string
      if (routeKey) {
        const currentMenu = userStore.getMenuByUrl(routeKey, userStore.menu)
        if (currentMenu) {
          tabsStore.addTab(currentMenu)
        }
        router.push({ path: routeKey })
      } else {
        console.warn(`未找到 ${routeKey} 对应的路由`)
      }
      break
    }
    target = target.parentElement as HTMLElement
  }
}

// 电量统计折线图
const chartLineRef = ref(null)
const setChartData = async () => {
  const chartOptions = ref({
    title: {
      text: '电量统计',
      left: 'left top',
    },
    tooltip: {
      trigger: 'axis',
      formatter: function (params) {
        if (!params || params.length === 0) return ''
        // 先添加第一个数据项的名称并换行
        let result = params[0].name + '<br/>'
        // 遍历 params 数组，拼接每个数据项的系列名称和值
        params.forEach((item) => {
          result += item.seriesName + ': ' + item.value
          if (item.seriesName === '充电量') {
            result += 'KW<br/>'
          } else if (item.seriesName === '充电时长') {
            result += 'h<br/>'
          } else if (item.seriesName === '充电功率') {
            result += 'KW/h<br/>'
          }
        })
        return result
      },
    },
    legend: {
      data: ['充电量', '充电时长', '充电功率'],
      textStyle: {
        color: '#333',
      },
    },
    xAxis: {
      type: 'category',
      data: ['13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'],
      boundaryGap: false,
    },
    yAxis: {
      type: 'value',
      axisLabel: {
        formatter: '{value} KW',
      },
    },
    series: [
      {
        name: '充电量',
        type: 'line',
        data: [20, 50, 30, 70, 60, 80, 40, 60, 50],
        itemStyle: {
          color: 'purple',
          shadowColor: 'rgba(0, 0, 255, 0.5)',
          shadowBlur: 10,
        },
        lineStyle: {
          width: 4,
        },
        smooth: true,
      },
      {
        name: '充电时长',
        type: 'line',
        data: [30, 40, 60, 50, 70, 20, 30, 40, 60],
        itemStyle: {
          color: 'lightgreen',
          shadowColor: 'rgba(0, 255, 0, 0.5)',
          shadowBlur: 10,
        },
        lineStyle: {
          width: 4,
        },
        smooth: true,
      },
      {
        name: '充电功率',
        type: 'line',
        data: [30, 40, 60, 50, 70, 20, 30, 40, 60],
        itemStyle: {
          color: 'skyblue',
          shadowColor: 'rgba(173, 216, 230, 0.5)',
          shadowBlur: 10,
        },
        lineStyle: {
          width: 4,
        },
        smooth: true,
      },
    ],
  })
  const res = await getLineStatistic()
  for (let i = 0; i < res.data.list.length; i++) {
    chartOptions.value.series[i].name = res.data.list[i].name
    chartOptions.value.series[i].data = res.data.list[i].data
  }
  chartOptions.value.legend.data = res.data.list.map((item) => item.name)
  return chartOptions
}
useChart(chartLineRef, setChartData)

//能源统计饼图
const chartGraphRef = ref(null)
const setChartGraph = async () => {
  const options = ref({
    legend: {
      top: 'top',
    },

    tooltip: {
      trigger: 'item',
      formatter: '{a} <br/>{b}: {c} %',
    },
    series: [
      {
        name: '营收占比',
        type: 'pie',
        radius: ['50%', '70%'], // 内外半径形成环形
        center: ['50%', '50%'],
        roseType: 'area',
        color: ['#4B6EBD', '#3DBB92', '#53C1D6'], // 颜色
        label: {
          show: false,
        },
        emphasis: {
          label: {
            show: true,
            fontSize: '16',
            fontWeight: 'bold',
          },
        },
        data: [
          { value: 35, name: '充电桩' }, // 数据值和名称
          { value: 30, name: '充电站' },
          { value: 25, name: '充电杆' },
        ],
      },
    ],
    graphic: {
      type: 'text',
      left: 'center',
      top: 'center',
      style: {
        text: '营收占比',
        textAlign: 'center',
        textVerticalAlign: 'middle',
        fontSize: 20,
        fill: '#333',
      },
    },
  })
  const res = await getGraphStatistic()
  options.value.series[0].data = res.data.list
  return options
}
useChart(chartGraphRef, setChartGraph)

//雷达图
const leidaRef = ref(null)
const setLeidaData = async () => {
  const chartOptions = ref({
    radar: {
      // shape: 'circle',
      indicator: [
        { name: '闲置数', max: 65 },
        { name: '使用数', max: 160 },
        { name: '故障数', max: 300 },
        { name: '维修数', max: 380 },
        { name: '更换数', max: 520 },
        { name: '报废数', max: 250 },
      ],
    },
    tooltip: {
      trigger: 'axis',
      // 自定义提示框内容
      formatter: function (params) {
        if (!params || params.length === 0) return ''
        let result = `${params[0].seriesName}<br/>`
        params.forEach((item) => {
          result += `${item.axisValue}: ${item.value}<br/>`
        })
        return result
      },
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [],
            name: 'Allocated Budget',
          },
        ],
      },
    ],
  })
  const res = await getLeidaGraph()
  chartOptions.value.series[0].data[0].value = res.data.list
  return chartOptions
}
useChart(leidaRef, setLeidaData)

//排行榜
const topCityRankData = ref()
onMounted(async () => {
  const res = await getTopCityRank()
  topCityRankData.value = res.data.list
})

// 格式化数字
const formatNumber = (num: number) => {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}

// 更新时间的函数
const updateTime = () => {
  const date = new Date()
  const year = date.getFullYear()
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const hours = String(date.getHours()).padStart(2, '0')
  const minutes = String(date.getMinutes()).padStart(2, '0')
  const seconds = String(date.getSeconds()).padStart(2, '0')
  currentTime.value = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}

// 组件挂载时启动定时器
onMounted(() => {
  updateTime()
  timer = window.setInterval(updateTime, 1000)
})

// 组件卸载时清除定时器，避免内存泄漏
onUnmounted(() => {
  if (timer) {
    window.clearInterval(timer)
  }
})
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

.revenue-list {
  padding: 0;
  margin: 0;

  li {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    border-bottom: 1px solid #f0f0f0;

    &:nth-child(even) {
      background-color: rgb(253, 246, 236);
    }

    &:nth-child(1) .rank {
      border-radius: 50%;
      background-color: red;
    }

    &:nth-child(2) .rank {
      border-radius: 50%;
      background-color: orange;
    }

    &:nth-child(3) .rank {
      border-radius: 50%;
      background-color: green;
    }

    .rank {
      display: inline-block;
      font-weight: bold;
      color: #666;
      width: 30px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      margin-right: 10px;
    }

    .city {
      flex: 1;
      margin-right: 20px;
    }

    .amount,
    .percentage {
      margin-right: 10px;
    }
  }
}
</style>
