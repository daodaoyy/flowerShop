<template>
  <div>
    <Card bordered style="width:520px;margin: 0 auto;">
      <p slot="title">添加商品</p>
      <Form ref="formProduct" :model="formProduct" :rules="ruleProduct" :label-width="80">
        <FormItem label="选择分类" prop="category">
          <Select v-model="formProduct.category" placeholder="请选择商品分类">
            <Option
              v-for="(item,index) in categoryList"
              :value="item.typeId"
              :key="index"
            >{{item.typeName}}</Option>
          </Select>
        </FormItem>
        <FormItem label="商品名称" prop="productName">
          <Input v-model="formProduct.productName" placeholder="请输入商品名称" clearable></Input>
        </FormItem>
        <FormItem label="商品价格" prop="productPrice">
          <Input v-model="formProduct.productPrice" placeholder="请输入商品价格" clearable></Input>
        </FormItem>
        <FormItem label="商品描述" prop="productDesc">
          <Input v-model="formProduct.productDesc" placeholder="请输入商品描述" clearable></Input>
        </FormItem>
        <FormItem label="商品库存" prop="productStock">
          <Input v-model="formProduct.productStock" placeholder="请输入商品库存" clearable></Input>
        </FormItem>
        <FormItem label="商品图片" class="productImg">
          <!-- <div class="upload-list" v-for="(item,index) in uploadList" :key="index">
            <img :src="item" />
          </div>-->
          <div class="upload-list" v-for="(item,index) in uploadList" :key="index">
            <span>{{item}}</span>
          </div>
          <i-upload v-model="isLoad" :imgList="uploadList"></i-upload>
          <div @click="isLoad = true">
            <Icon type="md-add" size="20" />
          </div>
        </FormItem>
        <FormItem label="材料" prop="productDatas">
          <Input
            v-model="formProduct.productDatas"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入所用材料"
            clearable
          ></Input>
        </FormItem>
        <FormItem label="花语" prop="productLanguage">
          <Input
            v-model="formProduct.productLanguage"
            type="textarea"
            :autosize="{minRows: 2,maxRows: 5}"
            placeholder="请输入花语"
            clearable
          ></Input>
        </FormItem>
      </Form>
      <div style="text-align:right;">
        <Button type="warning" @click="cancel">取消</Button>
        <Button type="primary" @click="submitProduct('formProduct')" style="margin-left: 8px">保存</Button>
      </div>
      <Alert type="success" show-icon closable v-show="edit_isShow">添加成功</Alert>
    </Card>
  </div>
</template>
<script>
import Upload from "@src/components/upload";
import { apiCreateProduct } from "@src/request/api";
export default {
  data() {
    return {
      edit_isShow: false,
      formProduct: {
        productId: "",
        category: "",
        productImg: [],
        productName: "",
        productPrice: "",
        productStock: 0,
        productDesc: "",
        productDatas: "",
        productLanguage: ""
      },
      ruleProduct: {
        category: [{ required: true, message: "请选择商品分类！" }],
        productImg: [{ required: true, message: "请选择商品图片！" }],
        productName: [{ required: true, message: "请输入商品名称！" }],
        productDesc: [{ required: true, message: "请输入商品描述！" }],
        productPrice: [{ required: true, message: "请输入商品价格！" }],
        productStock: [{ required: true, message: "请输入商品库存！" }],
        productDatas: [{ required: true, message: "请输入商品材料！" }],
        productLanguage: [{ required: true, message: "请输入商品花语！" }]
      },
      uploadList: [],
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
      loading: false,
      isLoad: false
    };
  },
  components: {
    "i-upload": Upload
  },
  mounted() {},
  methods: {
    //取消商品添加、回到商品管理页
    cancel() {
      this.$router.push("/productlist");
    },
    //添加商品
    async submitProduct(formProduct) {
      const params = {
        //传参
        product_name: this.formProduct.productName,
        product_datas: this.formProduct.productDatas,
        product_language: this.formProduct.productLanguage,
        product_desc: this.formProduct.productDesc,
        product_price: this.formProduct.productPrice,
        product_sell: 0,
        product_stock: this.formProduct.productStock,
        category_id: this.formProduct.category,
        product_img: this.uploadList,
        isdelete: false,
        hot_product: 0
      };
      const res = await apiCreateProduct(params);
      if (res.code) {
        this.edit_isShow = true;
        setTimeout(() => {
          this.$router.push("/productlist");
        }, 3000);
      } else {
        alert("添加失败！");
      }
    }
  }
};
</script>
<style lang="less">
.productImg {
  height: 60px;
  line-height: 0;
}
.upload-list {
  display: inline-block;
  width: 100px;
  height: 60px;
  text-align: center;
  line-height: 30px;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  margin-right: 4px;
}
.upload-list img {
  width: 100%;
  height: 100%;
}
.upload-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.upload-list:hover .upload-list-cover {
  display: block;
}
.upload-list-cover i {
  display: block;
  float: left;
  width: 50%;
  height: 50%;
  color: #fff;
  font-size: 20px;
  line-height: 30px;
  cursor: pointer;
}
.upload-list-cover i:hover {
  background: #0d0a31;
  color: red;
}
.ivu-alert {
  position: fixed;
  bottom: 220px;
  left: 720px;
}
</style>
