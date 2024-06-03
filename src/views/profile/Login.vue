<template>
  <div>
    <nav-bar>
      <template v-slot:default>登录</template>
    </nav-bar>
    <div style="margin-top: 50px">
      <div style="text-align: center;padding-top: 50px">
        <van-image
          width="10rem"
          height="5rem"
          fit="contain"
          src="https://www.lmonkey.com/_nuxt/img/logo.2a324bb.png"
        />
      </div>
    </div>
    <van-form @submit="onSubmit">

        <van-field
            v-model="email"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' }]"
        />
        <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' }]"
        />
      <div style="margin: 16px;">
        <div class="link-login" @click="$router.push({path:'/register'})">
          没有账号，立即注册
        </div>
        <van-button round block type="info" color="#44b883" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import NavBar from "@/components/common/navbar/NavBar.vue";
import {reactive, ref,toRefs} from "vue";
import {login} from "@/network/user";
import {Notify,Toast} from "vant";
import {useRouter} from "vue-router";

export default {
  name:"register",
  components: {NavBar},
  setup(){
    const router = useRouter()
    const userInfo = reactive({
      email:"",
      password:'',
    })

    const onSubmit = ()=>{
      // 先验证
      login(userInfo).then(res=>{
          // 将token保存在本地
          window.localStorage.setItem('token', res.access_token)

          // 在vuex isLogin
        Toast.success('登录成功')
        userInfo.email = '';
        userInfo.password = ''

        setTimeout(()=>{
          router.go(-1)
        },500)
      })
      // 提交给服务器

    }
    return{
      ...toRefs(userInfo),
      onSubmit
    }
  }

}

</script>


<style scoped lang="scss">
.link-login{
  font-size: 14px;
  margin-bottom: 20px;
  color: #42b983;
  display: inline-block;
  text-align: left;
  float: left;
}
</style>