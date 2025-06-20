<template>
  <el-dialog :title="props.title" :model-value="props.visible">
    <el-form :model="ruleForm" label-width="120" :rules="rules" ref="formRef">
      <el-row>
        <el-col :span="12">
          <el-form-item label="站点名称：" prop="name">
            <el-input v-model="ruleForm.name" />
          </el-form-item>
          <el-form-item label="站点id：" prop="id">
            <el-input v-model="ruleForm.id" :disabled="props.disabled" />
          </el-form-item>
          <el-form-item label="所属城市：" prop="city">
            <el-input v-model="ruleForm.city" />
          </el-form-item>
          <el-form-item label="站点负责人：" prop="person">
            <el-input v-model="ruleForm.person" />
          </el-form-item>
          <el-form-item label="负责人电话：" prop="tel">
            <el-input v-model="ruleForm.tel" />
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="快充数：" prop="fast">
            <el-input v-model="ruleForm.fast" />
          </el-form-item>
          <el-form-item label="慢充数：" prop="slow">
            <el-input v-model="ruleForm.slow" />
          </el-form-item>
          <el-form-item label="充电站状态：" prop="status">
            <el-select v-model="ruleForm.status" placeholder="充电站状态" :disabled="props.disabled">
              <el-option :value="1" label="全部"></el-option>
              <el-option :value="2" label="使用中"></el-option>
              <el-option :value="3" label="空闲中"></el-option>
              <el-option :value="4" label="维护中"></el-option>
              <el-option :value="5" label="待维修"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="正在充电：" prop="now">
            <el-input v-model="ruleForm.now" :disabled="props.disabled" />
          </el-form-item>
          <el-form-item label="故障数：" prop="fault">
            <el-input v-model="ruleForm.fault" :disabled="props.disabled" />
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <template #footer>
      <div class="dialog-footer">
        <el-button @click = "cancel">取消</el-button>
        <el-button type="primary" @click = "handleConfirm"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue'
import type { FormRules } from 'element-plus'
import type { CharStationRecord } from '@/api/charStation'

const props = defineProps<{
  record?: CharStationRecord | null
  title?: string
  visible: boolean
  disabled?: boolean
}>()

const emit = defineEmits<{
    (e: 'update-record', data: CharStationRecord): void
    (e: 'cancel'): void
}>()

const ruleForm = ref<CharStationRecord>({
  name: '',
  id: '',
  city: '',
  fast: '',
  slow: '',
  status: '',
  now: '',
  fault: '',
  person: '',
  tel: '',
})


// 监听 props.record 变化，更新本地编辑数据
watch(() => props.record, (newVal) => {
  if (newVal) {
    ruleForm.value = { ...newVal }
  } else {
    ruleForm.value = { name: '', id: '', city: '', fast: '', slow: '', status: '', now: '', fault: '', person: '', tel: '' }
  }
}, { immediate: true })


const formRef = ref()
const handleConfirm = () => {
  if (formRef.value) {
    formRef.value.validate((valid: boolean) => {
      if (valid) {
        emit('update-record', ruleForm.value)
      } else {
        console.log('表单验证失败')
        return false
      }
    })
  }
}

const cancel = () => {
  emit('cancel') 
}



const rules = reactive<FormRules<CharStationRecord>>({
  name: [{ required: true, message: '站点名称不能为空', trigger: 'blur' }],
  id: [{ required: true, message: '站点id不能为空', trigger: 'blur' }],
  city: [{ required: true, message: '所属城市不能为空', trigger: 'blur' }],
  person: [{ required: true, message: '站点负责人不能为空', trigger: 'blur' }],
  tel: [{ required: true, message: '负责人电话不能为空', trigger: 'blur' }],
  fast: [{ required: true, message: '快充数不能为空', trigger: 'blur' }],
  slow: [{ required: true, message: '慢充数不能为空', trigger: 'blur' }],
  status: [{ required: true, message: '充电站状态不能为空', trigger: 'blur' }],
  now: [{ required: true, message: '正在充电数不能为空', trigger: 'blur' }],
  fault: [{ required: true, message: '故障数量不能为空', trigger: 'blur' }],
})
</script>
