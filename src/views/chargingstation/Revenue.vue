<template>
  <div class="revenue-container">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="4">
          <el-card>
            <div class="title">
              <div class="round">
                <el-icon>
                  <Document />
                </el-icon>
              </div>
              <h4>今日总收入 (元)</h4>
            </div>
            <div class="total mt">
              <h1>239,824</h1>
              <div class="percent">-21%</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card>
            <div class="title">
              <div class="round">
                <el-icon>
                  <Document />
                </el-icon>
              </div>
              <h4>本月总收入 (万元)</h4>
            </div>
            <div class="total mt">
              <h1>2,924</h1>
              <div class="percent">-21%</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card>
            <div class="title">
              <div class="round">
                <el-icon>
                  <Document />
                </el-icon>
              </div>
              <h4>会员卡储值金额 (元)</h4>
            </div>
            <div class="total mt">
              <h1>239,824</h1>
              <div class="percent">-21%</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card>
            <div class="title">
              <div class="round">
                <el-icon>
                  <Document />
                </el-icon>
              </div>
              <h4>服务费总金额 (元)</h4>
            </div>
            <div class="total mt">
              <h1>239,824</h1>
              <div class="percent">-21%</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card>
            <div class="title">
              <div class="round">
                <el-icon>
                  <Document />
                </el-icon>
              </div>
              <h4>停车费总金额 (元)</h4>
            </div>
            <div class="total mt">
              <h1>239,824</h1>
              <div class="percent">-21%</div>
            </div>
          </el-card>
        </el-col>
        <el-col :span="4">
          <el-card>
            <div class="title">
              <div class="round">
                <el-icon>
                  <Document />
                </el-icon>
              </div>
              <h4>电费总金额 (元)</h4>
            </div>
            <div class="total mt">
              <h1>239,824</h1>
              <div class="percent">-21%</div>
            </div>
          </el-card>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mt">
      <div ref="chartRef" style="width: 100%; height: 240px"></div>
    </el-card>

    <el-card class="mt">
      <el-input v-model.trim="req.name" style="max-width: 400px" placeholder="输入站点名称筛选">
        <template #append>
          <el-button icon="Search" @click="loadData" />
        </template>
      </el-input>
      <el-table :data="tableData" class="mt" v-loading="loading">
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="name" label="充电站名称" />
        <el-table-column prop="id" label="充电站id" />
        <el-table-column prop="city" label="所属城市" />
        <el-table-column prop="count" label="充电桩总量(个)" />
        <el-table-column prop="day" label="单日总收入(元)" sortable>
          <template #default="scope">
            <span>{{ scope.row.day }}</span>
            <el-tag class="ml" :type="scope.row.percent > 0 ? 'success' : 'danger'">{{
              scope.row.percent > 0 ? '+' + scope.row.percent + '%' : scope.row.percent + '%'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="month" label="月度总收入(元)">
          <template #default="scope">
            <span>{{ scope.row.month }}</span>
            <el-tag class="ml" :type="scope.row.mpercent > 0 ? 'success' : 'danger'">{{
              scope.row.mpercent > 0 ? '+' + scope.row.mpercent + '%' : scope.row.percent + '%'
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="electricity" label="电费营收(元)" />
        <el-table-column prop="parkingFee" label="停车费营收(元)" />
        <el-table-column prop="serviceFee" label="服务费营收(元)" />
        <el-table-column prop="member" label="会员储值金(元)" />
      </el-table>
      <el-pagination
        class="fr mt mb"
        :current-page="req.pageNo"
        :page-size="req.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
        @update:page-size="handleSizeChange"
        @update:current-page="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { getRevenueChartData, pageRevenueListData } from '@/api/charStation'
import { useChart } from '@/hooks/useChart'

//柱状图
const chartRef = ref<HTMLDivElement | null>(null)
const setChartData = async () => {
  const chartOptions = ref({
    tooltip: {
      trigger: 'axis',
    },
    legend: {
      data: [],
    },
    xAxis: {
      type: 'category',
      data: ['一月', '二月', '三月', '四月', '五月', '六月', '七月'],
    },
    yAxis: [
      {
        type: 'value',
        name: '销售',
        position: 'left',
      },
      {
        type: 'value',
        name: '访问量',
        position: 'right',
      },
    ],
    series: [
      {
        name: '',
        type: 'bar',
        data: [],
        yAxisIndex: 0,
        itemStyle: {
          color: '#409eff',
        },
      },
      {
        name: '',
        type: 'line',
        data: [],
        yAxisIndex: 1,
        itemStyle: {
          color: '#409eff',
        },
        smooth: true,
      },
    ],
  })
  const res = await getRevenueChartData()
  for (let i = 0; i < res.data.list.length; i++) {
    chartOptions.value.series[i].name = res.data.list[i].name
    chartOptions.value.series[i].data = res.data.list[i].data
  }
  chartOptions.value.legend.data = res.data.list.map((item: any) => item.name)
  return chartOptions
}

useChart(chartRef, setChartData)

const req = ref({
  pageNo: 1,
  pageSize: 10,
  name: '',
})
//表格
const tableData = ref([])
const loading = ref(false)
const total = ref(0)
const loadData = async () => {
  loading.value = true
  try {
    const res = await pageRevenueListData(req.value)
    tableData.value = res.data.list
    total.value = res.data.total
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

const handleSizeChange = (val: number) => {
  req.value.pageSize = val
  loadData()
}

const handleCurrentChange = (val: number) => {
  req.value.pageNo = val
  loadData()
}

onMounted(() => {
  loadData()
})
</script>

<style scoped lang="less">
.title {
  display: flex;
  align-items: center;

  .round {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background-color: rgb(235, 236, 245);
    text-align: center;
    line-height: 35px;
    margin-right: 20px;
  }

  h4 {
    color: #666;
  }
}

.total {
  display: flex;
  align-items: center;

  h1 {
    margin-right: 20px;
    font-size: 30px;
  }

  .percent {
    display: inline-block;
    padding: 3px 5px;
    height: 20px;
    color: green;
    font-size: 12px;
    background-color: rgb(235, 247, 239);
    border-radius: 2px;
    line-height: 20px;
  }
}
</style>
