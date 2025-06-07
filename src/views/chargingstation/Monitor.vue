<template>
  <div class="common-layout">
    <el-card>
      <el-row :gutter="20">
        <el-col :span="6">
          <el-input v-model.trim="input" placeholder="请输入站点名称或ID" class="input-with-select">
            <template #append>
              <el-select v-model="select" placeholder="按名称查询" style="width: 115px">
                <el-option label="按名称查询" value="name" />
                <el-option label="按ID查询" value="id" />
              </el-select>
            </template>
          </el-input>
        </el-col>
        <el-col :span="6">
          <el-select v-model="req.status" placeholder="状态" clearable>
            <el-option label="全部" value="1" />
            <el-option label="使用中" value="2" />
            <el-option label="空闲中" value="3" />
            <el-option label="维护中" value="4" />
            <el-option label="待维修" value="5" />
          </el-select>
        </el-col>
        <el-col :span="6">
          <el-button type="primary" @click="loadData">查询</el-button>
          <el-button @click="reset">重置</el-button>
        </el-col>
      </el-row>
    </el-card>
    <el-card class="mt">
      <el-row>
        <el-col :span="6">
          <el-statistic title="累计充电量(度)" :value="268900" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="累计充电次数(次)" :value="1389"></el-statistic>
        </el-col>
        <el-col :span="6">
          <el-statistic title="服务区域(个)" :value="88" />
        </el-col>
        <el-col :span="6">
          <el-statistic title="累计效益(元)" :value="5622178"> </el-statistic>
        </el-col>
      </el-row>
    </el-card>

    <el-card class="mt">
      <el-button type="primary" @click="handleAdd">
        <el-icon style="margin-right: 5px">
          <Plus />
        </el-icon>
        新增充电站
      </el-button>
      <CharSattionEdit
        :visible="dialogParmas.visible"
        :record="dialogParmas.record"
        :title="dialogParmas.title"
        :disabled="dialogParmas.disabled"
        @close="dialogParmas.visible = false"
        @cancel="dialogParmas.visible = false"
        @update-record="updateRecord"
        destroy-on-close
      ></CharSattionEdit>
    </el-card>

    <el-card class="mt">
      <el-table :data="pageData?.list" style="width: 100%" v-loading="loading">
        <el-table-column type="index" width="60" label="序号" />
        <el-table-column prop="name" label="站点名称" width="200" />
        <el-table-column prop="id" label="站点id" />
        <el-table-column prop="city" label="所属城市" />
        <el-table-column prop="fast" label="快充数" />
        <el-table-column prop="slow" label="慢充数" />
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <el-tag v-if="scope.row.status == 2" type="primary">使用中</el-tag>
            <el-tag v-else-if="scope.row.status == 3" type="success">空闲中</el-tag>
            <el-tag v-else-if="scope.row.status == 4" type="warning">维护中</el-tag>
            <el-tag v-else-if="scope.row.status == 5" type="danger">待维修</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="now" label="正在充电" />
        <el-table-column prop="fault" label="故障数" />
        <el-table-column prop="person" label="站点负责人" />
        <el-table-column prop="tel" label="负责人电话" />
        <el-table-column label="操作" width="200">
          <template #default="scope">
            <el-button type="primary" size="small" @click="edit(scope.row)">编辑</el-button>
            <el-popconfirm title="确定要删除吗" @confirm="handleDelete(scope.row.id)">
              <template #reference>
                <el-button type="danger" size="small">删除</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="fr mt mb"
        :current-page="req.pageNo"
        :page-size="req.pageSize"
        :page-sizes="[10, 20, 30, 40]"
        :background="true"
        layout="total, sizes, prev, pager, next, jumper"
        :total="pageData?.total"
        @update:page-size="handleSizeChange"
        @update:current-page="handleCurrentChange"
      />
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { pageCharStationRecord, updateCharStationRecord, deleteCharStationRecord } from '@/api/charStation'
import type { CharStationRecord, CharStationRecordReq, PageCommonResp } from '@/api/charStation'
import CharSattionEdit from '@/components/charStation/CharSattionEdit.vue'

const req = ref<CharStationRecordReq>({
  pageNo: 1,
  pageSize: 10,
  name: '',
  id: '',
  status: '1',
})
const input = ref<string>('')
const select = ref<'name' | 'id'>('name')
const loading = ref(false)

const reset = () => {
  req.value = {
    pageNo: 1,
    pageSize: 10,
    name: '',
    id: '',
    status: '1',
  }
  select.value = 'name'
  input.value = ''
  loadData()
}

const pageData = ref<PageCommonResp<CharStationRecord>>()

const loadData = async () => {
  loading.value = true
  try {
    req.value[select.value] = input.value
    const { data } = await pageCharStationRecord(req.value)
    pageData.value = data as PageCommonResp<CharStationRecord> // 使用类型断言
  } catch (error) {
    console.log(error)
  } finally {
    loading.value = false
    if (!pageData.value) {
      pageData.value = {
        pageNo: req.value.pageNo,
        pageSize: req.value.pageSize,
        total: 0,
      }
    }
  }
}

const dialogParmas = ref<{
  visible: boolean
  record?: CharStationRecord | null
  title?: string
  disabled?: boolean
}>({
  visible: false,
})

const handleAdd = () => {
  dialogParmas.value = {
    visible: true,
    title: '新增充电站',
    disabled: false,
    record: { name: '', id: '', city: '', fast: '', slow: '', status: '', now: '', fault: '', person: '', tel: '' },
  }
}
const edit = (row: CharStationRecord) => {
  dialogParmas.value = {
    visible: true,
    record: row,
    title: '编辑充电站',
    disabled: true,
  }
}

const handleDelete = async (id: string) => {
  const res = await deleteCharStationRecord({id})
  loadData() 
}

const updateRecord = async (data: CharStationRecord) => {
  await updateCharStationRecord(data)
  dialogParmas.value.visible = false
  loadData()
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
.demo-form-inline {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background-color: aliceblue;
  .el-input {
    --el-input-width: 220px;
  }
  .el-select {
    --el-select-width: 220px;
  }
}
</style>
