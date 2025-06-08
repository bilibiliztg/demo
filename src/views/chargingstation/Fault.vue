<template>
    <div class="fault-container">
        <el-card>
            <el-select v-model="select" style="width: 300px" placeholder="选择站点名称" filterable clearable>
                <el-option v-for="item in sourceDataList" :key="item.id" :label="item.name" :value="item.id" />
            </el-select>
        </el-card>
        <el-card class="mt">
            <el-radio-group size="large" v-model="radio" @change="handleChange">
                <el-radio-button :label="`全部(${tableData.length})`" :value="0" />
                <el-radio-button :label="`空闲中(${statusCount[1] || 0})`" :value="1" />
                <el-radio-button :label="`充电中(${statusCount[2] || 0})`" :value="2" />
                <el-radio-button :label="`连接中(${statusCount[3] || 0})`" :value="3" />
                <el-radio-button :label="`排队中(${statusCount[4] || 0})`" :value="4" />
                <el-radio-button :label="`已预约(${statusCount[5] || 0})`" :value="5" />
                <el-radio-button :label="`故障/离线(${statusCount[6] || 0})`" :value="6" />
            </el-radio-group>
        </el-card>

        <el-card class="mt">
            <el-row :gutter="20">
                <el-col :span="6" v-for="item in displayData" :key="item.id">
                    <div class="item">
                        <div class="top">
                            <div class="region">
                                <p>{{ item.stationId }}</p>
                                <p>{{ item.stationName }}</p>
                            </div>
                            <div class="status">
                                <p v-if="item.status === 1">空闲中</p>
                                <p v-else-if="item.status === 2">充电中</p>
                                <p v-else-if="item.status === 3">连接中</p>
                                <p v-else-if="item.status === 4">排队中</p>
                                <p v-else-if="item.status === 5">已预约</p>
                                <p v-else-if="item.status === 6">故障/离线</p>
                                <img :src="item.status == 1 ? free : item.status == 6 ? outline : ing" width="100px" />
                                <p v-if="item.status == 2">{{ item.percent }}</p>
                                <p v-else>0%</p>
                            </div>
                            <div class="info">
                                <h3>{{ item.id }}</h3>
                                <hr class="mb" />
                                <p>电压：{{ item.voltage }}</p>
                                <p>电流：{{ item.current }}</p>
                                <p>功率：{{ item.power }}</p>
                                <p>温度：{{ item.tem }}</p>
                            </div>
                        </div>

                        <div class="divder"></div>

                        <div class="btn">
                            <p style="font-size: 12px; color: #999">暂无预警</p>
                            <div style="text-align: right">

                                <el-popover placement="right" :width="300" trigger="click">
                                    <template #reference>
                                        <el-button size="small" type="warning" class="mr">维保记录</el-button>
                                    </template>
                                    <h3 class="mb">维保记录</h3>
                                    <el-timeline style="max-width: 600px">
                                        <el-timeline-item :timestamp="j.time" v-for="j in item.fixRecord" :key="j.time"
                                            :hollow="true" type="primary">
                                            {{ j.msg }}
                                        </el-timeline-item>
                                    </el-timeline>
                                </el-popover>

                                <el-popover placement="right" :width="300" trigger="click">
                                    <template #reference>
                                        <el-button size="small" type="primary" class="mr">使用记录</el-button>
                                    </template>
                                    <h3 class="mb">使用记录</h3>
                                    <el-timeline style="max-width: 600px">
                                        <el-timeline-item :timestamp="j.time" v-for="j in item.record" :key="j.time"
                                            :hollow="true" type="primary">
                                            {{ j.msg }}
                                        </el-timeline-item>
                                    </el-timeline>
                                </el-popover>

                            </div>
                        </div>
                    </div>
                </el-col>
            </el-row>
            <el-pagination class="fr mt mb" :current-page="req.pageNo" :page-size="req.pageSize"
                :page-sizes="[10, 20, 30, 40]" :background="true" layout="total, sizes, prev, pager, next, jumper"
                :total="total" @update:page-size="handleSizeChange"
                @update:current-page="handleCurrentChange" />
        </el-card>
    </div>
</template>

<script setup lang="ts">
import free from '@/assets/free.png'
import outline from '@/assets/outline.png'
import ing from '@/assets/ing.png'
import { getCharStationListData } from '@/api/charStation'
import { computed, onMounted, ref, watch } from 'vue'

const select = ref('')
const sourceDataList = ref([])
const tableData = ref([])
const displayData = ref([])
const req = ref({
    pageNo: 1,
    pageSize: 10,
})
const total = ref(0)

const loadData = async () => {
    const res = await getCharStationListData(null)
    const newData = res.data.map((item) => {
        // 复制原对象的 items 数组，并为每个元素添加新属性
        const newItems = item.list.map((subItem) => ({
            ...subItem,
            stationName: item.name,
            stationId: item.id,
        }))
        // 返回一个新对象，其中 items 替换为新数组
        return { ...item, list: newItems }
    })
    sourceDataList.value = newData
    tableData.value = sourceDataList.value.flatMap((item) => item.list) || []
    handleCurrentChange(req.value.pageNo)
}

onMounted(() => {
    loadData()
})

watch(
    () => select.value,
    async () => {
        if (select.value) {
            console.log('select.value', select.value)
            tableData.value =
                sourceDataList.value.filter((item) => item.id === select.value)[0].list || []
            handleSizeChange(req.value.pageSize)
        } else {
            tableData.value = sourceDataList.value.flatMap((item) => item.list) || []
            handleSizeChange(req.value.pageSize)
        }
    },
    { immediate: true },
)

const statusCount = computed(() => {
    const count = tableData.value.reduce((acc, item) => {
        // 初始化状态计数
        if (!acc[item.status]) {
            acc[item.status] = 0
        }
        // 对应状态计数加 1
        acc[item.status]++
        return acc
    }, {})
    return count
})

const radio = ref(0)
const handleChange = (val) => {
    handleSizeChange(req.value.pageSize)
}


const handleSizeChange = (val) => {
    req.value.pageSize = val
    req.value.pageNo = 1
    const startIndex = (req.value.pageNo - 1) * req.value.pageSize
    const endIndex = startIndex + req.value.pageSize
    if (radio.value !== 0) {
        displayData.value = tableData.value.filter((item) => item.status === radio.value).slice(startIndex, endIndex)
        total.value = tableData.value.filter((item) => item.status === radio.value).length
    } else {
        displayData.value = tableData.value.slice(startIndex, endIndex)
        total.value = tableData.value.length
    }
}

const handleCurrentChange = (val) => {
    req.value.pageNo = val
    const startIndex = (req.value.pageNo - 1) * req.value.pageSize
    const endIndex = startIndex + req.value.pageSize
    if (radio.value !== 0) {
        displayData.value = tableData.value.filter((item) => item.status === radio.value).slice(startIndex, endIndex)
        total.value = tableData.value.filter((item) => item.status === radio.value).length
    } else {
        displayData.value = tableData.value.slice(startIndex, endIndex)
        total.value = tableData.value.length
    }
}

</script>

<style scoped lang="less">
.item {
    background-color: rgb(247, 251, 254);
    height: 200px;
    border-radius: 10px 10px 0 0;
    padding: 20px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    &:hover {
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
    }

    margin-bottom: 20px;
    overflow: hidden;

    .top {
        display: flex;
        align-items: center;
        justify-content: space-evenly;
        margin-bottom: 10px;

        .status,
        .region {
            p {
                width: 76px;
                text-align: center;
                margin-bottom: 10px;
                color: rgb(61, 187, 146);
            }

            margin-left: 10px;
        }

        .info {
            color: #999;
            margin-left: 30px;
            line-height: 26px;
            margin-top: -10px;
        }
    }

    .divder {
        background-color: #f4f4f4;
        height: 2px;
        width: 95%;
        margin: auto;
    }

    .btn {
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
}
</style>
