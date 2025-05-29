<template>
  <div class="bg">
    <el-container>
      <el-aside class="aside">
        <div class="login">
          <div class="logo">
            <img :src="logo" alt="logo" width="70px" height="70px" />
            <h1 class="ml">能源动力港平台</h1>
          </div>
          <el-form
            :model="form"
            style="max-width: 400px"
            class="login-form"
            ref="ruleFormRef"
            :rules="rules"
          >
            <el-form-item prop="username">
              <el-input v-model="form.username" placeholder="请输入用户名" prefix-icon="User" />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="form.password"
                placeholder="请输入密码"
                prefix-icon="Lock"
                type="password"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary" style="width: 100%" @click="submitForm(ruleFormRef)"
                >登录</el-button
              >
            </el-form-item>
          </el-form>
        </div>
      </el-aside>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import logo from '@/assets/logo.png'
import { ref, reactive } from 'vue'
import { ElNotification } from 'element-plus'
import type { FormInstance, FormRules } from 'element-plus'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/userStore'

const router = useRouter()
const userStore = useUserStore()

interface RuleForm {
  username: string
  password: string
}

const ruleFormRef = ref<FormInstance>()
const form = ref<RuleForm>({
  username: '',
  password: '',
})

// 表单验证规则
const rules = reactive<FormRules<RuleForm>>({
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 3, max: 8, message: '用户名必须3-8位', trigger: 'blur' },
  ],
  password: [
    { min: 6, max: 16, message: '密码必须6-16位', trigger: 'blur' },
    // {
    //   pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/,
    //   message: '密码必须包含大小写字母和数字',
    //   trigger: 'blur',
    // },
  ],
})

// 表单提交
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid) => {
    if (valid) {
      // 验证通过，执行登录逻辑
      userStore.login(form.value).then(() => { // 登录成功后跳转到首页
        router.push("/")
      });
    } else {
      ElNotification({
        title: 'Error',
        message: '请输入正确的用户名或密码',
        type: 'error',
      })
    }
  })
}
</script>

<style lang="less" scoped>
.bg {
  background: url(@/assets/bg.png) no-repeat center center;
  background-size: cover;
  height: 100vh;

  .aside {
    width: 800px;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .login {
    width: 500px;
    height: 300px;
    padding: 10px;
    box-shadow: 0 0 10px 10px #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    .logo {
      width: 400px;
      display: flex;
      justify-content: center;
      align-items: center;
      margin-bottom: 10px;
      font-size: 30px;

      h1 {
        color: rgb(14, 53, 148);
      }
    }

    .login-form {
      width: 100%;
    }
  }
}
</style>
