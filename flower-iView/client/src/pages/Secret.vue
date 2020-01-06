<template>
  <Card class="secret">
    <p slot="title">重置密码</p>
    <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
      <FormItem label="用户账号" prop="adminPhone">
        <Input v-model="formValidate.adminPhone" placeholder="输入用户账号" />
      </FormItem>
      <FormItem label="秘钥" prop="passwordtag">
        <Input type="password" v-model="formValidate.passwordtag" placeholder="请输入管理员秘钥" />
      </FormItem>
      <Alert type="success" show-icon closable v-show="issuccess">重置成功</Alert>
      <Button type="primary" @click="submitMessage">确认修改</Button>
      <p></p>
    </Form>
  </Card>
</template>

<script>
import { apiAdmin, apiResetPass } from "@src/request/api";
export default {
  data() {
    return {
      issuccess: false,
      formValidate: {
        adminPhone: "",
        passwordtag: ""
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
        passwordtag: [
          { required: true, message: "秘钥不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /[0-9]{6,16}/,
            message: "请输入正确的秘钥",
            trigger: "blur"
          }
        ]
      }
    };
  },
  mounted() {},
  methods: {
    //重置密码
    async submitMessage() {
      const params = {
        admin_phone: this.formValidate.adminPhone,
        admin_secret: this.formValidate.passwordtag,
        admin_password: "666666"
      };
      const res = await apiResetPass(params);
      if (res.code) {
        this.issuccess = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
    }
  }
};
</script>

<style lang="less">
.secret {
  width: 360px;
  margin: auto;
  margin-top: 150px;
}
</style>
