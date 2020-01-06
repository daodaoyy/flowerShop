<template>
  <div id="order">
    <Card bordered>
      <p slot="title">订单管理</p>
      <Row type="flex" justify="space-between" class="code-row">
        <Col>
          <Input v-model="search_value" style="max-width:320px;">
            <Select v-model="search_condition" slot="prepend" style="width: 100px">
              <Option
                v-for="item in searchList"
                :key="item.searchId"
                :value="item.searchName"
              >{{item.searchName}}</Option>
            </Select>
            <Button slot="append" icon="ios-search" @click="orderSearch"></Button>
          </Input>
        </Col>
      </Row>
      <Table
        border
        :columns="orderColumns"
        :data="showList"
        no-data-text="暂无数据"
        no-filtered-data-text="暂无筛选结果"
      ></Table>
      <div style="padding-bottom:1px; margin-top:15px; overflow:hidden;">
        <Page
          style="float:right;"
          :total="this.orderData.length"
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
import {
  apiOrderList,
  apiUpdateOrder,
  apiOrderStatus,
  apiIdOrder
} from "@src/request/api";

export default {
  data() {
    return {
      search_value: "",
      search_condition: "",
      searchList: [
        {
          search_id: 0,
          searchName: "按订单状态"
        },
        {
          search_id: 1,
          searchName: "按订单Id"
        }
      ],
      pageSize: 10,
      currentPage: 1,
      showList: [],
      orderData: [],
      orderColumns: [
        {
          title: "订单Id",
          key: "order_id",
          width: 120,
          align: "center",
          fixed: "left"
        },
        {
          title: "地址Id",
          key: "address_id",
          width: 120,
          align: "center"
        },
        {
          title: "商品Id",
          key: "product_id",
          width: 120,
          align: "center"
        },
        {
          title: "订购人姓名",
          key: "buyer_name",
          width: 140,
          align: "center"
        },
        {
          title: "订购人电话",
          key: "buyer_phone",
          width: 180,
          align: "center"
        },
        {
          title: "下单时间",
          key: "order_time",
          width: 180,
          align: "center"
        },
        {
          title: "订单总额",
          key: "order_price",
          width: 140,
          align: "center",
          sortable: true
        },
        {
          title: "状态",
          key: "order_status",
          width: 140,
          align: "center",
          render: (h, params) => {
            let status = "";
            switch (params.row.order_status) {
              case 0:
                status = "待付款";
                break;
              case 1:
                status = "待发货";
                break;
              case 2:
                status = "已发货";
                break;
              case 3:
                status = "已完成";
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
          title: "订单操作",
          width: 155,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            if (
              params.row.order_status === 1 &&
              params.row.order_redmin === 1
            ) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success"
                    },
                    on: {
                      //修改订单状态
                      click: () => {
                        let data = {
                          orderId: params.row.order_id,
                          status: params.row.order_status === 1 ? 2 : 1,
                          redmin: params.row.order_redmin === 1 ? 0 : 1
                        };
                        this.updateOrder(data, params.index);
                      }
                    }
                  },
                  "发货"
                ),
                h(
                  "Button",
                  {
                    props: {
                      type: "error"
                    },
                    style: {
                      marginLeft: "5px"
                    }
                  },
                  "催单"
                )
              ]);
            }
            if (params.row.order_status === 1) {
              return h("div", [
                h(
                  "Button",
                  {
                    props: {
                      type: "success"
                    },
                    on: {
                      //修改订单状态
                      click: () => {
                        let data = {
                          orderId: params.row.order_id,
                          status: params.row.order_status === 1 ? 2 : 1
                        };
                        this.updateOrder(data, params.index);
                      }
                    }
                  },
                  "发货"
                )
              ]);
            }
          }
        }
      ]
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    //获取订单列表
    async getOrderList() {
      const res = await apiOrderList();
      // console.log(res);
      this.orderData = res.orderData;
      this.showList = this.orderData.slice(0, 10);
    },
    //分页
    pageChange(index) {
      this.currentPage = index;
      let start = (index - 1) * this.pageSize;
      let end = index * this.pageSize;
      this.showList = this.orderData.slice(start, end);
    },
    //修改订单状态
    async updateOrder(data, index) {
      const params = {
        //传参
        order_id: data.orderId,
        order_status: data.status,
        order_redmin: data.redmin
      };
      const res = await apiUpdateOrder(params);
      if (res.code) {
        this.showList[index].order_status = data.status;
        this.showList[index].order_redmin = data.redmin;
      }
    },
    //按条件查找订单
    async orderSearch() {
      if (this.search_condition === "按订单状态") {
        let order_status = 0;
        switch (this.search_value) {
          case "待付款":
            order_status = 0;
            break;
          case "待发货":
            order_status = 1;
            break;
          case "待收货":
            order_status = 2;
            break;
          case "已完成":
            order_status = 3;
            break;
        }
        const params = {
          order_status: order_status
        };
        const res = await apiOrderStatus(params);
        this.orderData = res.orderData;
        this.showList = this.orderData.slice(0, 10);
      }
      if (this.search_condition === "按订单Id") {
        const params = {
          order_id: this.search_value
        };
        const res = await apiIdOrder(params);
        this.orderData = res.orderData;
        this.showList = this.orderData.slice(0, 10);
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
