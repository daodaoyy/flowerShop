<template>
  <Card class="login">
    <p slot="title">花店后台管理系统</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户账号" prop="adminPhone">
        <Input v-model="formValidate.adminPhone" placeholder="输入用户账号" />
      </FormItem>
      <FormItem label="密码" prop="adminPassword">
        <Input type="password" v-model="formValidate.adminPassword" placeholder="输入密码" />
      </FormItem>
      <Button type="primary" @click="submitMessage" style="margin-left: 180px">登录</Button>
      <Button type="info" @click="reset">密码重置</Button>
      <p></p>
    </Form>
  </Card>
</template>

<script>
import { apiAdmin } from "@src/request/api";
export default {
  data() {
    return {
      formValidate: {
        adminPhone: "",
        adminPassword: ""
      },
      ruleValidate: {
        adminPhone: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /^[1][3,4,5,7,8][0-9]{9}$/,
            message: "请输入正确的手机号码",
            trigger: "blur"
          }
        ],
        adminPassword: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /^[\w_-]{6,16}$/,
            message: "请输入6-16位数字或字母或_或-",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //点击密码重置跳转到重置页
    reset() {
      this.$router.push("/Secret");
    },
    //点击登录调 apiAdmin 管理员信息验证接口
    async submitMessage() {
      const params = {
        //向后台传参验证
        admin_phone: this.formValidate.adminPhone,
        admin_password: this.formValidate.adminPassword
      };
      const res = await apiAdmin(params); //调接口
      if (res.code === 1) {
        //判断信息是否一致、一致跳转首页
        this.$router.push("/home");
      } else {
        this.$Message.error("账户或密码错误");
      }
    }
  }
};
</script>

<style lang="less">
.login {
  width: 360px;
  margin: auto;
  margin-top: 150px;
}
</style>
