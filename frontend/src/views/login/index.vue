<template>
  <div class="container">
    <div class="login pa-30">
      <h2>Nest Admin</h2>
      <a-form
        :model="formState"
        name="basic"
        autocomplete="off"
        :label-col="{ span: 4 }"
        @finish="onFinish"
        @finishFailed="onFinishFailed"
      >
        <a-form-item
          label="用户名"
          name="user_name"
          :rules="[{ required: true, message: 'Please input your user_name!' }]"
        >
          <a-input v-model:value="formState.user_name" />
        </a-form-item>

        <a-form-item
          label="密码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item
          label="验证码"
          name="password"
          :rules="[{ required: true, message: 'Please input your password!' }]"
        >
          <a-input v-model:value="formState.password" style="width: 200px" />
          <img src="" alt="" />
        </a-form-item>

        <a-form-item :wrapper-col="{ offset: 8, span: 16 }">
          <a-button type="primary" html-type="submit">登录</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive } from 'vue'

interface FormState {
  user_name: string
  password: string
  remember: boolean
}
export default defineComponent({
  setup() {
    const formState = reactive<FormState>({
      user_name: '',
      password: '',
      remember: true
    })
    const onFinish = (values: any) => {
      console.log('Success:', values)
    }

    const onFinishFailed = (errorInfo: any) => {
      console.log('Failed:', errorInfo)
    }
    return {
      formState,
      onFinish,
      onFinishFailed
    }
  }
})
</script>

<style lang="less" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  background: url('@/assets/img/bg.png') center no-repeat;
  background-size: 100% 100%;
  .login {
    width: 500px;
    border-radius: 20px;
    background-color: #fff;
    h2 {
      text-align: center;
    }
  }
}
</style>
