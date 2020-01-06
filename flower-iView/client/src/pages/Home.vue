<template>
  <div class="layout">
    <Layout>
      <Header
        :style="{padding: 0,display:'flex',justifyContent:'space-between',zIndex: 99}"
        class="layout-header-bar"
      >
        <div>
          <Icon
            @click.native="collapsedSider"
            :class="rotateIcon"
            :style="{margin: '10px 10px 0',padding:'10px'}"
            type="navicon-round"
            size="24"
          />
        </div>
        <Breadcrumb style="flex-grow:1; font-size: 24px; color: #fff">花店后台管理</Breadcrumb>
        <div class="user">
          <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
            <Dropdown trigger="click" class="Tablist" @on-click="changeMenu">
              <a href="javascript:void(0)" name="ownSpace">
                <span class="main-user-name">管理员</span>
              </a>
              <DropdownMenu slot="list">
                <DropdownItem name="password">修改密码</DropdownItem>
                <DropdownItem name="loginout">退出登录</DropdownItem>
              </DropdownMenu>
            </Dropdown>
            <Avatar
              src="https://profile.csdnimg.cn/F/6/C/1_qq_41676648"
              style="background: #619fe7;margin-left: 10px;"
            ></Avatar>
          </Row>
        </div>
      </Header>
      <Layout :style="{width:'100vw',height:'100vh',paddingBottom:'64px',position:'relative'}">
        <Sider
          ref="side1"
          hide-trigger
          collapsible
          :collapsed-width="78"
          v-model="isCollapsed"
          :style="{overflowY:'auto'}"
        >
          <Menu theme="dark" width="auto" @on-select="openPath" :class="menuitemClasses">
            <MenuItem name="user">
              <Icon type="md-people" />
              <span>会员管理</span>
            </MenuItem>
            <MenuItem name="product">
              <Icon type="md-cube" />
              <span>商品管理</span>
            </MenuItem>
            <MenuItem name="order">
              <Icon type="md-apps" />
              <span>订单管理</span>
            </MenuItem>
            <MenuItem name="address">
              <Icon type="md-pin" />
              <span>地址管理</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Content :style="{width:'100%', height: '100%',overflowY:'auto'}">
          <div :style="{padding: '20px',margin:'0 auto',overflow:'hidden'}">
            <router-view />
          </div>
        </Content>

        <!--修改密码弹框-->
        <Modal title="修改密码" v-model="isShow" :mask-closable="false" :closable="false" width="300">
          <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
            <FormItem label="旧密码" prop="oldPassword">
              <Input type="password" v-model="formValidate.oldPassword" placeholder="请输入旧密码" />
            </FormItem>
            <FormItem label="新密码" prop="newPassword">
              <Input type="password" v-model="formValidate.newPassword" placeholder="请输入新密码" />
            </FormItem>
          </Form>
          <div slot="footer">
            <Button type="error" @click="passClose" style="margin-left: 8px">取消</Button>
            <Button type="primary" @click="passSubmit">保存</Button>
          </div>
          <Alert type="success" show-icon closable v-show="issuccess">修改成功</Alert>
        </Modal>
      </Layout>
    </Layout>
  </div>
</template>
<script>
import { apiAdminChangePass } from "../request/api";

export default {
  data() {
    return {
      isShow: false,
      issuccess: false,
      isCollapsed: false,
      formValidate: {
        oldPassword: "",
        newPassword: ""
      },
      ruleValidate: {
        oldPassword: [
          { required: true, message: "旧密码不能为空", trigger: "blur" },
          {
            type: "string",
            pattern: /^[\w_-]{6,16}$/,
            message: "请输入正确的密码",
            trigger: "blur"
          }
        ],
        newPassword: [
          { required: true, message: "新密码不能为空", trigger: "blur" },
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
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    }
  },
  methods: {
    //关闭修改密码弹框
    passClose() {
      this.isShow = false;
    },
    //提交修改密码
    async passSubmit() {
      const params = {
        admin_id: 0,
        new_password: this.formValidate.newPassword
      };
      const res = await apiAdminChangePass(params);
      if (res.code) {
        this.issuccess = true;
        setTimeout(() => {
          this.$router.push("/");
        }, 2000);
      }
    },
    //选择下拉框操作
    changeMenu(name) {
      if (name == "password") {
        this.isShow = true;
      } else if (name == "loginout") {
        this.$router.push("/");
      }
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    //左导航
    openPath(name) {
      this.$router.push({ name: name });
    }
  }
};
</script>

<style lang="less">
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
  height: 100vh;
}
.layout-header-bar {
  border-bottom: 1px solid #d7dde4;
}
.main-user-name {
  color: #fff;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.ivu-breadcrumb a {
  color: #fff;
  font-size: 22px;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  width: 20px;
  text-align: center;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.ivu-menu-vertical.collapsed-menu .ivu-menu-item,
.ivu-menu-vertical.collapsed-menu .ivu-menu-submenu-title {
  padding: 14px 20px;
  text-align: center;
}
.layout-logo {
  line-height: 64px;
  text-align: center;
  font-size: 18px;
}
.user {
  float: right;
  margin-right: 40px;
}
</style>
