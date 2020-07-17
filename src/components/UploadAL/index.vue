<!-- 头像上传组件 -->
<template>
  <el-upload
    :show-file-list="false"
    :http-request="upload"
    :disabled="disabled"
    :before-upload="beforeAvatarUpload"
    class="icon-upload"
    action
  >
    <img v-if="imageUrl" :src="imageUrl" class="avatar" />
    <i v-else class="el-icon-plus avatar-uploader-icon" />
  </el-upload>
</template>

<script>
import { client } from "@/utils/upload";
// import { getToken } from "@/api/sysUser";
export default {
  name: "UploadAL",
  props: {
    imageUrl: "",
    disabled: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  created() {},
  methods: {
    async upload(data) {
      const localName = data.file.name;
      const uploadPath = "qgy/upload/";
      const fileExt = localName.substr(localName.lastIndexOf(".")); // 文件扩展名
      const fileName = `${Math.round(
        Math.random() * 10000
      )}_${Date.now()}${fileExt}`;
      let result;
      try {
        const res = await getToken();
        const obj = res.obj;
        result = await client(obj).put(uploadPath + fileName, data.file);
        console.log("client res", result);
      } catch (error) {
        console.log("upload err", error);
      }
      const url = result && result.url;
      this.$emit(
        "success",
        url
          .replace("http:", "https:")
          .replace("fxz-oss.oss-cn-beijing.aliyuncs.com", "file.wxfxz.cn")
      );
    },

    // 图片上传之前钩子函数 在图片上传之前对图片进行判断 是否可以上传
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 / 1024 < 0.5;

      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 500Kb !");
      }
      return isLt2M;
    }
  }
};
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.icon-upload {
  width: 10%;
  height: 10%;
}
.avatar-uploader-icon {
  color: #8c939d;
  width: 28px;
  height: 28px;
  text-align: center;
  line-height: 78px;
}
.avatar {
  width: 100%;
  height: 100%;
  display: block;
}
</style>
