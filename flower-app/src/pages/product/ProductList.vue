<template>
  <div class="product-list" v-title :data-title="this.category_name">
    <section>
      <ul class="flower-list">
        <card :showList="showList"></card>
      </ul>
    </section>
  </div>
</template>

<script>
import card from "../../components/Card"; //引入商品卡片组件
import { apiClassPruduct } from "../../request/api";

export default {
  components: {
    card: card
  },
  data() {
    return {
      category_name: "",
      showList: [],
      category: {}
    };
  },
  created() {
    this.category = JSON.parse(localStorage.getItem("category"));
    this.category_name = this.category.category_name;
    this.getProductList();
  },
  methods: {
    //请求商品分类列表
    async getProductList() {
      let category_id = this.category.category_id;
      const params = {
        category_id: category_id
      };
      const res = await apiClassPruduct(params);
      this.showList = res.productData;
    }
  },
  mounted() {
    // this.$nextTick(() => {
    //   //点击返回图标返回首页
    //   document.querySelector("header").addEventListener("click", () => {
    //     this.$router.push("/Home");
    //   });
    // });
  }
};
</script>

<style scoped>
section {
  margin-bottom: 1.4rem;
  padding-top: 0.2667rem;
}
.flower-list {
  width: 100%;
  padding: 0 0.1333rem 0 0.1333rem;
}
</style>
