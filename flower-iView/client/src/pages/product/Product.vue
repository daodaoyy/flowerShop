<template>
  <div id="product">
    <Card bordered>
      <p slot="title">商品管理</p>
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
            <Button slot="append" icon="ios-search" @click="searchProduct"></Button>
          </Input>
        </Col>
        <Col>
          <Button type="info" @click="productAdd">添加商品</Button>
        </Col>
      </Row>
      <Table
        border
        :columns="productColumns"
        :data="showList"
        no-data-text="暂无数据"
        no-filtered-data-text="暂无筛选结果"
      ></Table>
      <div style="padding-bottom:1px; margin-top:15px; overflow:hidden;">
        <Page
          style="float:right;"
          :total="this.productData.length"
          :page-size="this.pageSize"
          :current="this.currentPage"
          size="small"
          show-elevator
          show-total
          @on-change="pageChange"
        ></Page>
      </div>
    </Card>

    <!-- 商品修改弹窗 -->
    <Modal title="修改产品" v-model="edit_isShow" :mask-closable="false" :closable="false">
      <Form ref="editProduct" :model="editProduct" :label-width="80">
        <FormItem label="商品Id" prop="productId">
          <Input disabled clearable :value="productId"></Input>
        </FormItem>
        <FormItem label="商品分类" prop="category_id">
          <Select v-model="editProduct.category_id">
            <Option
              v-for="(item, index) in categoryList"
              :value="item.typeId"
              :key="index"
            >{{item.typeName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="是否热销" prop="hot_product">
          <Select v-model="editProduct.hot_product">
            <Option
              v-for="(item, index) in hotSelect"
              :value="item.typeId"
              :key="index"
            >{{item.typeName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品名称" prop="product_name">
          <Input v-model="editProduct.product_name" clearable></Input>
        </FormItem>
        <FormItem label="商品价格" prop="product_price">
          <Input v-model="editProduct.product_price" clearable></Input>
        </FormItem>
        <FormItem label="商品库存" prop="product_stock">
          <Input v-model="editProduct.product_stock" clearable></Input>
        </FormItem>
        <FormItem label="商品销量" prop="product_sell">
          <Input v-model="editProduct.product_sell" clearable></Input>
        </FormItem>
        <FormItem label="商品描述" prop="product_desc">
          <Input v-model="editProduct.product_desc" clearable></Input>
        </FormItem>
        <FormItem label="商品图片" prop="product_img">
          <Input v-model="editProduct.product_img" clearable></Input>
        </FormItem>
        <FormItem label="商品材料" prop="product_datas">
          <Input
            v-model="editProduct.product_datas"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
        <FormItem label="商品花语" prop="product_language">
          <Input
            v-model="editProduct.product_language"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
          ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="error" @click="editClose" style="margin-left: 8px">取消</Button>
        <Button type="primary" @click="editSubmit('editProduct')">保存</Button>
      </div>
      <Alert type="success" show-icon closable v-show="issuccess">修改成功</Alert>
    </Modal>
  </div>
</template>

<script>
import {
  apiProductList,
  apiDeleteProduct,
  apiUpdateProduct,
  apiCateProduct,
  apiIdProduct
} from "@src/request/api";

export default {
  data() {
    return {
      issuccess: false,
      search_value: "",
      search_condition: "",
      pageSize: 10,
      productId: "",
      currentPage: 1,
      showList: [],
      productData: [],
      tempProduct: {},
      edit_isShow: false,
      editProduct: {},
      searchList: [
        {
          search_id: 0,
          searchName: "按商品分类"
        },
        {
          search_id: 1,
          searchName: "按商品Id"
        }
      ],
      categoryList: [
        {
          typeId: 0,
          typeName: "鲜花"
        },
        {
          typeId: 1,
          typeName: "干花"
        },
        {
          typeId: 2,
          typeName: "盆栽"
        }
      ],
      hotSelect: [
        {
          typeId: 0,
          typeName: "否"
        },
        {
          typeId: 1,
          typeName: "是"
        }
      ],
      productColumns: [
        {
          title: "商品ID",
          key: "product_id",
          width: 120,
          align: "center",
          fixed: "left"
        },
        {
          title: "商品分类",
          key: "category_id",
          width: 140,
          align: "center",
          render: (h, params) => {
            let category = "";
            switch (params.row.category_id) {
              case 0:
                category = "鲜花";
                break;
              case 1:
                category = "干花";
                break;
              case 2:
                category = "盆栽";
                break;
            }
            return h(
              "span",
              {
                props: {}
              },
              category
            );
          }
        },
        {
          title: "商品名称",
          key: "product_name",
          width: 140,
          align: "center"
        },
        {
          title: "商品图片",
          key: "product_img",
          width: "140px",
          align: "center",
          render: (h, params) => {
            const imgUrl = params.row.product_img;
            if (imgUrl) {
              return h("img", {
                attrs: {
                  src: require("../../assets/" + imgUrl)
                },
                style: {
                  width: "110px",
                  height: "110px",
                  marginTop: "5px",
                  marginLeft: "-5px"
                }
              });
            }
          }
        },
        {
          title: "商品价格(元/件)",
          key: "product_price",
          width: 140,
          align: "center",
          sortable: true
        },
        {
          title: "商品销量(件)",
          key: "product_sell",
          width: 140,
          align: "center",
          sortable: true
        },
        {
          title: "是否热销",
          key: "hot_product",
          width: 120,
          align: "center",
          render: (h, params) => {
            let hot = "";
            switch (params.row.hot_product) {
              case 0:
                hot = "否";
                break;
              case 1:
                hot = "是";
                break;
            }
            return h(
              "span",
              {
                props: {}
              },
              hot
            );
          }
        },
        {
          title: "商品库存(件)",
          key: "product_stock",
          width: 140,
          align: "center",
          sortable: true
        },
        {
          title: "商品操作",
          width: 140,
          align: "center",
          fixed: "right",
          render: (h, params) => {
            return h("div", [
              h(
                "Button",
                {
                  props: {
                    type: "error",
                    size: "small"
                  },
                  on: {
                    click: () => {
                      this.productRemove(params.index);
                    }
                  }
                },
                "下架"
              ),
              h(
                "Button",
                {
                  props: {
                    type: "warning",
                    size: "small"
                  },
                  style: {
                    marginLeft: "5px"
                  },
                  on: {
                    click: () => {
                      this.editProduct = JSON.parse(JSON.stringify(params.row));
                      this.edit_isShow = true;
                      this.productId = params.row.product_id;
                    }
                  }
                },
                "修改"
              )
            ]);
          }
        }
      ],
      ruleValidate: {
        productName: [
          {
            required: true,
            message: "请输入商品名称！"
          }
        ],
        productPrice: [
          {
            required: true,
            message: "请输入商品价格！"
          }
        ],
        productStock: [
          {
            required: true,
            message: "请输入商品库存！"
          }
        ],
        category: [
          {
            required: true,
            message: "请选择商品分类！"
          }
        ],
        isHot: [
          {
            required: true,
            message: "请选择是否热销！"
          }
        ]
      }
    };
  },
  created() {
    this.getProductList(); //获取商品列表
  },
  methods: {
    //获取商品列表
    async getProductList() {
      const res = await apiProductList();
      this.productData = res.productData;
      this.showList = this.productData.slice(0, 10); //初始化第一页
    },
    //前端实现分页
    pageChange(index) {
      this.currentPage = index;
      let start = (index - 1) * this.pageSize;
      let end = index * this.pageSize;
      this.showList = this.productData.slice(start, end);
    },
    //点击添加商品跳转到添加商品页
    productAdd() {
      this.$router.push("/new/product");
    },
    //删除下架商品
    async productRemove(index) {
      const productId = this.showList[index].product_id; //获取当前商品的id
      const params = {
        //向后台传参
        product_id: productId
      };
      const res = await apiDeleteProduct(params); //调接口
      if (res.code) {
        //删除成功后删除列表对应的商品
        this.showList.splice(index, 1);
      }
    },
    //按条件查找商品
    async searchProduct() {
      if (this.search_condition === "按商品分类") {
        let category_id = 0;
        switch (this.search_value) {
          case "鲜花":
            category_id = 0;
            break;
          case "干花":
            category_id = 1;
            break;
          case "盆栽":
            category_id = 2;
            break;
        }
        const params = {
          category_id: category_id
        };
        const res = await apiCateProduct(params);
        this.productData = res.productData;
        this.showList = this.productData.slice(0, 10);
      }
      if (this.search_condition === "按商品Id") {
        const params = {
          product_id: this.search_value
        };
        const res = await apiIdProduct(params);
        this.productData = res.productData;
        this.showList = this.productData.slice(0, 10);
      }
    },
    // 关闭商品修改面板
    editClose() {
      this.edit_isShow = false;
    },
    //修改商品提交按钮
    async editSubmit(editProduct) {
      const params = {
        //传参
        product_id: this.productId,
        product_name: this.editProduct.product_name,
        product_datas: this.editProduct.product_datas,
        product_language: this.editProduct.product_language,
        product_desc: this.editProduct.product_desc,
        product_price: this.editProduct.product_price,
        product_sell: this.editProduct.product_sell,
        product_stock: this.editProduct.product_stock,
        category_id: this.editProduct.category_id,
        product_img: this.editProduct.product_img,
        isdelete: false,
        hot_product: this.editProduct.hot_product
      };
      const res = await apiUpdateProduct(params);
      if (res.code) {
        this.issuccess = true;
        setTimeout(() => {
          this.issuccess = false;
          this.edit_isShow = false;
        }, 2000);
      } else {
        alert("修改失败！");
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
.ivu-alert {
  position: fixed;
  bottom: 220px;
  left: 720px;
}
</style>

