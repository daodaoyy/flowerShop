<template>
  <div class="upload" v-show="visible">
    <div class="modal-mask"></div>
    <div class="modal-warp">
      <div class="modal">
        <div class="modal-content">
          <div class="modal-header">
            <div class="modal-header-inner">{{title}}</div>
          </div>
          <div class="modal-body">
            <div id="preview" class="upload_preview">
              <div class="preview-list" v-for="(item,index) in previewList" :key="index">
                <img :src="item" />
                <div class="preview-list-cover">
                  <Icon
                    type="md-close"
                    @click="handleRemove(index)"
                    size="20"
                    style="position: absolute;top: 0; right: 0;cursor: pointer;color: #777;"
                  />
                </div>
              </div>
              <div class="upload_choose">
                <label for="fileImage" style="display:block;cursor: pointer;">
                  <Icon type="md-add" size="20" />
                </label>
                <input
                  ref="upload"
                  @change="chooseFile"
                  type="file"
                  name
                  id="fileImage"
                  multiple
                  accept="image/gif, image/jpeg, image/jpg, image/png"
                  style="display: none;"
                />
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button @click="closeUpload" type="button" class="btn btn-text btn-large">{{cancelText}}</button>
            <button
              id="fileSubmit"
              @click="submitFile"
              type="button"
              class="btn btn-primary btn-large upload_submit_btn"
            >{{okText}}</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "upload",
  props: {
    value: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: "图片上传"
    },
    cancelText: {
      type: String,
      default: "取消"
    },
    okText: {
      type: String,
      default: "确定上传"
    },
    imgList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  data() {
    return {
      visible: this.value,
      previewList: [],
      files: null
    };
  },
  mounted() {},
  methods: {
    chooseFile(event) {
      //关闭上传图片文件
      let that = this;
      let files = event.target.files;
      this.files = files;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();
        reader.onload = event => {
          that.previewList.push(event.target.result);
        };
        reader.readAsDataURL(files[i]);
      }
    },
    submitFile() {
      //确定上传图片
      let files = this.files;
      this.imgList.push("images/" + files[0].name);
      if (files.length >= 0) {
        if (files[0].size > 2 * 1024 * 1024) {
          this.fail("文件大小不能超过2m");
          return false;
        }
      } else {
        this.fail("请选择需要上传的文件");
      }
    },
    handleRemove(index) {
      //移除上传的图片
      this.previewList.splice(index, 1);
      // this.files.splice(index, 1);
    },
    closeUpload() {
      //取消上传图片
      this.visible = false;
      this.previewList = [];
      this.files = null;
    }
  },
  watch: {
    value(val) {
      this.visible = val;
    },
    visible(val) {
      this.$emit("input", val);
    }
  }
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(55, 55, 55, 0.6);
  height: 100%;
  z-index: 1000;
}
.modal-warp {
  position: fixed;
  overflow: auto;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  -webkit-overflow-scrolling: touch;
  outline: 0;
}
.modal-wrap * {
  box-sizing: border-box;
  -webkit-tap-highlight-color: transparent;
}
.modal {
  margin: 0 auto;
  position: relative;
  outline: 0;
  top: 100px;
  width: 520px;
}
.modal-content {
  position: relative;
  background-color: #fff;
  border: 0;
  border-radius: 6px;
  background-clip: padding-box;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}
@media (max-width: 768px) {
  .modal {
    width: auto !important;
    margin: 10px;
  }
}
.modal-header {
  border-bottom: 1px solid #e8eaec;
  padding: 14px 16px;
  line-height: 1;
}
.modal-body {
  display: flex;
  padding: 16px;
  font-size: 12px;
  line-height: 1.5;
}
.modal-footer {
  border-top: 1px solid #e8eaec;
  padding: 12px 18px 12px 18px;
  text-align: right;
}
.btn {
  display: inline-block;
  margin-bottom: 0;
  font-weight: 400;
  text-align: center;
  vertical-align: middle;
  touch-action: manipulation;
  cursor: pointer;
  background-image: none;
  border: 1px solid transparent;
  white-space: nowrap;
  line-height: 1.5;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  padding: 5px 15px 6px;
  font-size: 12px;
  border-radius: 4px;
  transition: color 0.2s linear, background-color 0.2s linear,
    border 0.2s linear, box-shadow 0.2s linear;
  color: #515a6e;
  background-color: #fff;
  border-color: #dcdee2;
}
.btn-text {
  color: #515a6e;
  background-color: transparent;
  border-color: transparent;
}
.btn-text:hover {
  color: #57a3f3;
}
.btn-primary {
  color: #fff;
  background-color: #2d8cf0;
  border-color: #2d8cf0;
}
.btn-primary:hover {
  color: #fff;
  background-color: #57a3f3;
  border-color: #57a3f3;
}
.btn-large {
  padding: 6px 15px 6px 15px;
  font-size: 14px;
  border-radius: 4px;
}

.upload_choose {
  width: 76px;
  height: 76px;
  margin-bottom: 5px;
  line-height: 74px;
  background: #fff;
  border: 1px dashed #dcdee2;
  border-radius: 4px;
  text-align: center;
  position: relative;
  overflow: hidden;
  transition: border-color 0.2s ease;
}
.upload_choose:hover {
  border: 1px dashed #2d8cf0;
}
.upload_preview {
  display: flex;
  flex-wrap: wrap;
}
.preview-list {
  width: 76px;
  height: 76px;
  text-align: center;
  line-height: 30px;
  border: 1px solid transparent;
  border-radius: 4px;
  overflow: hidden;
  background: #fff;
  position: relative;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  margin-right: 5px;
  margin-bottom: 5px;
}
.preview-list img {
  width: 100%;
  height: 100%;
}
.preview-list-cover {
  display: none;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}
.preview-list:hover .preview-list-cover {
  display: block;
}
</style>
