<!-- 图片上传组件 可直接使用 -->
<template>
  <div>
    <el-upload
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :on-change="onChange"
      :file-list="fileList"
      :http-request="upLoad"
      :multiple="multiple"
      :on-exceed="uploadOverrun"
      :limit="limit"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      list-type="picture"
    >
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>
<script>
import axios from "axios";
const ajaxUrl = "https://backend.cs.yhcnet.cn/qgyOnlineWeb/photo/aliOssUpLoad";
export default {
  name: 'upImg',
  props: {
    // 名字的字符串
    fileName: {
      type: String,
      default: function() {
        return "";
      }
    },
    // 照片的字符转
    coverImg: {
      type: String,
      default: function() {
        return "String";
      }
    },
    multiple: {
      type: Boolean,
      default: function() {
        return false;
      }
    },
    limit: {
      type: Number,
      default: function() {
        return 1;
      }
    }
  },
  data() {
    return {
      // name  和 url的对象数组
      fileList: [],
      // 单纯的存放图片的名字
      fileListName: []
    };
  },
  watch: {
    fileName(val) {
      if (val) {
        this.fileListName = val.split(",");
      }
    },
    coverImg(val) {
      const that = this;
      if (val) {
        const value = val.split(",");
        for (let index = 0; index < value.length; index++) {
          this.$set(that.fileList, index, {
            name: "",
            url: value[index]
          });
        }
      }

      console.log("this.fileList1111111", this.fileList);
    }
  },
  methods: {
    upimages() {
      let value = "";
      for (let index = 0; index < this.fileList.length; index++) {
        value += this.fileList[index].url;
      }
      this.$emit("fileListWatch", value);
      this.$emit("fileListNameWatch", this.fileListName.join(","));
    },
    onChange() {
      this.upimages();
    },
    uploadOverrun: function() {
      this.$message({
        type: "error",
        message: "上传文件个数超出限制"
      });
    },
    handleRemove(file, fileList) {
      const that = this;
      console.log(file, fileList);
      that.fileList.forEach((element, index) => {
        if (element.uid === file.uid) {
          console.log("index", index);
          that.fileListName.splice(index, 1);
          that.fileList = fileList;
        }
      });
      this.upimages();
    },
    handlePreview(file) {
      console.log(file);
    },
    // 自定义图片上传 不常用
    upLoad(param) {
      const var_this = this;
      // 用来改变返回的值的结构
      const responseChange = {
        name: param.file.name,
        url: ""
      };
      const formData = new FormData();
      formData.append("oss", param.file);
      const config = {
        "Content-Type": "multipart/form-data"
      };
      axios.post(ajaxUrl, formData, config).then(function(response) {
        console.log("response", response);
        console.log("var_this.fileList之前之前之前", var_this.fileList);
        responseChange.url = response.data.fileAddress;
        // 为了显示
        var_this.fileList.push(responseChange);
        console.log("var_this.fileList", var_this.fileList);
        console.log(
          "var_this.fileList[0].url.indexOf",
          var_this.fileList[0].url.substr(
            0,
            var_this.fileList[0].url.indexOf("http", 10)
          )
        );
        // var_this.fileList[0].url = var_this.fileList[0].url.substr(0, var_this.fileList[0].url.indexOf('http', 10))
        // var_this.$set(var_this.fileList[0], 'url', var_this.fileList[0].url.substr(0, var_this.fileList[0].url.indexOf('http', 10)))
        console.log("var_this.fileListssssssssssss", var_this.fileList);
        // 为了上传使用
        var_this.fileListName.push(response.data.fileName);
        var_this.upimages();
      });
    }
  }
};
</script>
<style>
</style>
