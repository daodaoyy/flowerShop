<template>
  <div id="user">
    <Card bordered>
      <p slot="title">会员管理</p>
      <Row type="flex" justify="space-between" class="code-row">
        <Col>
          <Input v-model="search_value" style="max-width:320px;">
            <Select v-model="search_condition" slot="prepend" style="width: 80px">
              <Option
                v-for="item in searchList"
                :key="item.searchId"
                :value="item.searchName"
              >{{item.searchName}}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="searchUserData"></Button>
          </Input>
        </Col>
      </Row>
      <Table
        border
        :columns="userColumns"
        :data="showList"
        no-data-text="暂无数据"
        no-filtered-data-text="暂无筛选结果"
      ></Table>
      <div style="padding-bottom:1px; margin-top:15px; overflow:hidden;">
        <template v-if="this.userData">
          <Page
            style="float:right;"
            :total="this.userData.length"
            :page-size="this.pageSize"
            :current="this.currentPage"
            size="small"
            show-elevator
            show-total
            @on-change="pageChange"
          ></Page>
        </template>
      </div>
    </Card>
  </div>
</template>

<script>
import {
  apiUserList,
  apiDeleteUser,
  apiUpdateUser,
  apiFindUserPhone,
  apiFindUserId
} from "@src/request/api";

export default {
  data() {
    return {
      search_value: "",
      searchList: [
        {
          search_id: 0,
          searchName: "按账号"
        },
        {
          search_id: 1,
          searchName: "按Id"
        }
      ],
      search_condition: "",
      pageSize: 10,
      currentPage: 1,
      showList: [],
      userData: [],
      userColumns: [
        {
          title: "用户ID",
          key: "user_id",
          width: 80,
          align: "center",
          fixed: "left"
        },
        {
          title: "用户账号",
          key: "user_phone",
          Width: 100,
          align: "center"
        },
        {
          title: "用户密码",
          key: "user_password",
          Width: 100,
          align: "center"
        },
        {
          title: "用户名",
          key: "user_name",
          Width: 60,
          align: "center"
        },
        {
          title: "性别",
          key: "user_sex",
          width: 70,
          align: "center",
          render: (h, params) => {
            let sex = "";
            switch (params.row.user_sex) {
              case 0:
                sex = "男";
                break;
              case 1:
                sex = "女";
                break;
            }
            return h(
              "span",
              {
                props: {}
              },
              sex
            );
          }
        },
        {
          title: "积分",
          key: "user_points",
          Width: 60,
          align: "center",
          sortable: true
        },
        {
          title: "会员等级",
          key: "user_level",
          width: 100,
          align: "center",
          render: (h, params) => {
            let member = "";
            switch (params.row.user_level) {
              case 0:
                member = "白银会员";
                break;
              case 1:
                member = "黄金会员";
                break;
              case 2:
                member = "铂金会员";
                break;
              case 3:
                member = "钻石会员";
                break;
              case 4:
                member = "皇冠会员";
                break;
            }
            return h(
              "span",
              {
                props: {}
              },
              member
            );
          }
        },
        {
          title: "状态",
          key: "user_status",
          width: 80,
          align: "center",
          render: (h, params) => {
            let status = "";
            switch (params.row.user_status) {
              case 0:
                status = "禁用";
                break;
              case 1:
                status = "启用";
                break;
            }
            return h(
              "span",
              {
                props: {}
              },
              status
            );
          }
        },
        {
          title: "会员操作",
          width: 150,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: params.row.user_status === 0 ? "success" : "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      let data = {
                        userId: params.row.user_id,
                        status: params.row.user_status === 0 ? 1 : 0
                      };
                      this.updateUser(data, params.index);
                    }
                  }
                },
                params.row.user_status === 0 ? "启用" : "禁用"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.userRemove(params.index);
                    }
                  }
                },
                "删除"
              )
            ]);
          }
        }
      ]
    };
  },
  created() {
    this.getUserList(); //获取用户列表
  },
  methods: {
    //获取用户列表
    async getUserList() {
      const res = await apiUserList();
      this.userData = res.userData;
      this.showList = this.userData.slice(0, 10); //初始化第一页
    },
    //按条件查找用户
    async searchUserData() {
      if (this.search_condition === "按账号") {
        const params = {
          user_phone: this.search_value
        };
        const res = await apiFindUserPhone(params);
        this.userData = res.userData;
        this.showList = this.userData.slice(0, 10);
      }
      if (this.search_condition === "按Id") {
        const params = {
          user_id: this.search_value
        };
        const res = await apiFindUserId(params);
        this.userData = res.userData;
        this.showList = this.userData.slice(0, 10);
      }
    },
    //分页
    pageChange(index) {
      this.currentPage = index;
      let start = (index - 1) * this.pageSize;
      let end = index * this.pageSize;
      this.showList = this.userData.slice(start, end);
    },
    //删除用户
    async userRemove(index) {
      const userId = this.showList[index].user_id; //获取当前用户的id
      console.log(userId);
      const params = {
        //向后台传参
        user_id: userId
      };
      const res = await apiDeleteUser(params); //调接口
      if (res.code) {
        //删除成功后删除列表对应的用户
        this.showList.splice(index, 1);
      }
    },
    //禁用或启用用户
    async updateUser(data, index) {
      const params = {
        //传参
        user_id: data.userId,
        user_status: data.status
      };
      const res = await apiUpdateUser(params);
      if (res.code) {
        this.showList[index].user_status = data.status;
      }
    }
  },
  mounted() {}
};
</script>

<style lang="less">
.code-row .ivu-col {
  margin-bottom: 16px;
}
.ivu-table-cell div {
  display: flex;
  justify-content: space-between;
}
</style>
