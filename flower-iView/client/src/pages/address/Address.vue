<template>
  <div id="address">
    <Card bordered>
      <p slot="title">地址管理</p>
      <Row type="flex" justify="space-between" class="code-row">
        <Col>
          <Input v-model="search_value" style="max-width:340px;">
            <Select v-model="search_condition" slot="prepend" style="width: 120px">
              <Option
                v-for="item in searchList"
                :key="item.searchId"
                :value="item.searchName"
              >{{item.searchName}}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="addressSearch"></Button>
          </Input>
        </Col>
      </Row>
      <Table
        border
        :columns="addressColumns"
        :data="showList"
        no-data-text="暂无数据"
        no-filtered-data-text="暂无筛选结果"
      ></Table>
      <div style="padding-bottom:1px; margin-top:15px; overflow:hidden;">
        <Page
          style="float:right;"
          :total="this.addressData.length"
          :page-size="this.pageSize"
          :current="this.currentPage"
          size="small"
          show-elevator
          show-total
          @on-change="pageChange"
        ></Page>
      </div>
    </Card>
  </div>
</template>

<script>
import { apiAddressList, apiAddressUser, apiAddressId } from "@src/request/api";

export default {
  data() {
    return {
      search_value: "",
      search_condition: "",
      searchList: [
        {
          search_id: 0,
          searchName: "按会员Id"
        },
        {
          search_id: 1,
          searchName: "按地址Id"
        }
      ],
      pageSize: 10,
      currentPage: 1,
      showList: [],
      addressData: [],
      addressColumns: [
        {
          title: "收货信息ID",
          key: "address_id",
          width: 120,
          align: "center",
          fixed: "left"
        },
        {
          title: "会员Id",
          key: "user_id",
          width: 120,
          align: "center"
        },
        {
          title: "收货人姓名",
          key: "receiver",
          width: 140,
          align: "center"
        },
        {
          title: "收货人手机",
          key: "address_phone",
          width: 180,
          align: "center"
        },
        {
          title: "省份",
          key: "province_name",
          width: 180,
          align: "center"
        },
        {
          title: "市",
          key: "city_name",
          width: 140,
          align: "center"
        },
        {
          title: "区/县",
          key: "district_name",
          width: 140,
          align: "center"
        },
        {
          title: "详细地址",
          key: "address_detile",
          width: 140,
          align: "center"
        }
      ]
    };
  },
  created() {
    this.getAddressList(); //获取用户列表
  },
  methods: {
    //获取地址列表
    async getAddressList() {
      const res = await apiAddressList();
      this.addressData = res.addressData;
      this.showList = this.addressData.slice(0, 10); //初始化第一页
    },
    //分页
    pageChange(index) {
      this.currentPage = index;
      let start = (index - 1) * this.pageSize;
      let end = index * this.pageSize;
      this.showList = this.addressData.slice(start, end);
    },
    //按条件查找地址
    async addressSearch() {
      if (this.search_condition === "按会员Id") {
        const params = {
          user_id: this.search_value
        };
        const res = await apiAddressUser(params);
        this.addressData = res.addressData;
        this.showList = this.addressData.slice(0, 10);
      }
      if (this.search_condition === "按地址Id") {
        const params = {
          address_id: this.search_value
        };
        const res = await apiAddressId(params);
        this.addressData = res.addressData;
        this.showList = this.addressData.slice(0, 10);
      }
    }
  }
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

