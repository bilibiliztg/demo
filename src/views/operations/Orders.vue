<template>
    <el-card>
        <el-row :gutter="20">
            <el-col :span="6">
                <el-input placeholder="请输入订单号" v-model="formData.orderNo" />
            </el-col>
            <el-col :span="6">
                <el-select placeholder="订单状态" v-model="formData.status">
                    <el-option label="全部" :value="1"></el-option>
                    <el-option label="进行中" :value="2"></el-option>
                    <el-option label="已完成" :value="3"></el-option>
                    <el-option label="异常" :value="4"></el-option>
                </el-select>
            </el-col>
            <el-col :span="6">
                <el-input placeholder="设备编号" v-model="formData.no" />
            </el-col>
            <el-col :span="6">
                <el-button type="primary" @click="actions.handleQuery">查询</el-button>
                <el-button @click="resetForm">重置</el-button>
            </el-col>
            <el-col :span="6" class="mt">
                <el-input placeholder="请输入站点名称" v-model="formData.name" />
            </el-col>
            <el-col :span="6" class="mt">
                <el-date-picker v-model="date" type="daterange" range-separator="/" start-placeholder="开始时间"
                    end-placeholder="结束时间" @change="handleChange" value-format="YYYY-MM-DD" />
            </el-col>
        </el-row>
    </el-card>


    <el-card class="mt">
        <el-button type="danger" :disabled="!selectionList.length" @click="handleBatchDelete">批量删除</el-button>
        <el-button type="primary" icon="Download" :disabled="!selectionList.length"
            @click="exportToExcel">导出订单数据到Excel</el-button>
    </el-card>

    <el-card class="mt">
        <el-table :data="list" v-loading="loading" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55"></el-table-column>
            <el-table-column type="index" label="序号" width="80"></el-table-column>
            <el-table-column label="订单号" prop="orderNo"></el-table-column>
            <el-table-column label="设备编号" prop="equipmentNo"></el-table-column>
            <el-table-column label="订单日期" prop="date"></el-table-column>
            <el-table-column label="开始时间" prop="startTime"></el-table-column>
            <el-table-column label="结束时间" prop="endTime"></el-table-column>
            <el-table-column label="金额" prop="money"></el-table-column>
            <el-table-column label="支付方式" prop="pay"></el-table-column>
            <el-table-column label="订单状态" prop="status">
                <template #default="scope">
                    <el-tag type="success" v-if="scope.row.status == 2">进行中</el-tag>
                    <el-tag type="primary" v-else-if="scope.row.status == 3">已完成</el-tag>
                    <el-tag type="warning" v-else-if="scope.row.status == 4">异常</el-tag>
                </template>
            </el-table-column>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="handleDetail(scope.row.orderNo)">详情</el-button>
                    <el-button type="danger" size="small">删除</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination class="fr mt mb" v-model:current-page="pagination.currentPage.value"
            v-model:page-size="pagination.pageSize.value" :page-sizes="[10, 20, 30, 40]"
            layout="sizes, prev, pager, next, jumper,total" :total="pagination.total.value"
            @size-change="pagination.handlePageSizeChange" @current-change="pagination.handlePageChange" background />
    </el-card>

</template>

<script setup lang="ts">

import { ref, watch } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { useForm } from '@/hooks/useForm'
import { pageList, batchDeleteApi } from '@/api/order'
import dayjs from 'dayjs'
import { ElMessage } from 'element-plus'
import * as XLSX from 'xlsx'
import { saveAs } from 'file-saver'
import { useUserStore } from '@/stores/userStore'
import {  useTabsStore } from '@/stores/tabStore'


const date = ref<string[]>([dayjs().startOf('day').format('YYYY-MM-DD'), dayjs().endOf('day').format('YYYY-MM-DD')])
const selectionList = ref([])


const initialValues = {
    orderNo: '', // 订单号
    status: 1, // 订单状态 1 全部 2 进行中 3 已完成 4 异常
    no: '', // 设备编号
    name: '', // 站点名称
    startTime: date.value[0],
    endTime: date.value[1]
}

const { formData, list, pagination, actions, loading } = useForm(
    initialValues,
    async (params) => {
        const res = await pageList(params)
        return res.data
    },
    {
        autoLoad: true,
    }
)

const resetForm = () => {
    date.value = [dayjs().startOf('day').format('YYYY-MM-DD'), dayjs().endOf('day').format('YYYY-MM-DD')]
    formData.value = { ...initialValues }
    actions.handleQuery()
}

const handleChange = (value: string[]) => {
    formData.value.startTime = value[0]
    formData.value.endTime = value[1]
}

const handleSelectionChange = (val: any) => {
    selectionList.value = val
}

const handleBatchDelete = async () => {
    try {
        const res = await batchDeleteApi(selectionList.value.map((item) => item.orderNo));
        if (res.code) {
            ElMessage({
                message: res.data,
                type: "success"
            });
            actions.handleQuery()
            selectionList.value = []
        }
    } catch (error) {
        console.log(error)
    }

}

const router = useRouter()
const userStore = useUserStore()
const tabStore = useTabsStore()

const handleDetail = (orderNo: string) => {
    router.push({ path: '/operations/detail', query: { orderNo } })
    const menu = userStore.getMenuByUrl('/operations/detail', userStore.menu)
    if (menu) {
        tabStore.addTab(menu)
    }
}

// 定义状态映射
const statusMap = {
    1: '全部',
    2: '进行中',
    3: '已完成',
    4: '异常'
}

const exportToExcel = () => {
    // 获取表格数据
    let exportData = []

    if (selectionList.value.length > 0) {
        // 使用勾选的数据
        exportData = selectionList.value
    } else if (list.value.length > 0) {
        // 使用当前查询结果
        exportData = list.value
    } else {
        ElMessage.warning('暂无数据可导出')
        return
    }

    // 定义需要导出的字段和标题
    const exportFields = [
        { key: 'orderNo', title: '订单号' },
        { key: 'equipmentNo', title: '设备编号' },
        { key: 'date', title: '订单日期' },
        { key: 'startTime', title: '开始时间' },
        { key: 'endTime', title: '结束时间' },
        { key: 'money', title: '金额' },
        { key: 'pay', title: '支付方式' },
        { key: 'status', title: '订单状态' }
    ]

    // 构造二维数组作为工作表数据
    const worksheetData = [
        exportFields.map(f => f.title), // 表头
        ...exportData.map(item => exportFields.map(f => {
            if (f.key === 'status') {
                // 处理订单状态字段
                return statusMap[item[f.key]] || item[f.key] // 将数字转为对应中文
            }
            return item[f.key]
        }))
    ]

    // 创建工作表
    const ws = XLSX.utils.aoa_to_sheet(worksheetData)

    // 创建工作簿
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, '订单列表')

    // 生成 Excel 文件并触发下载
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' })
    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' })
    saveAs(blob, '订单列表.xlsx')
}


const route = useRoute()
watch(()=>route.name,(to,from)=>{
    if(to=="orders"&&from!="detail"){
        actions.handleQuery()
    }
})

</script>

<style scoped lang="less"></style>