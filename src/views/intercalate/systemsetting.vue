<template>
  <div class="page">
    <div class="contPage">
      <el-form ref="form" label-position="left" label-width="150px">
        <div>
          <el-form-item label="退款手续费费率(%):">
            <el-input v-model="form.settlefee" type="number" style="width:430px"></el-input>
          </el-form-item>
        </div>
        <div>
          <div class="toSet">
            <h3>精选轮播图设置</h3>
          </div>
          <div class="imgList">
            <el-upload
              action="https://backend.cs.yhcnet.cn/qgyOnlineWeb/photo/aliOssUpLoad"
              name="oss"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview2"
              :on-remove="handleRemove2"
              :on-success="successImg2"
              :file-list="fileList"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt />
            </el-dialog>
          </div>
        </div>
        <div>
          <div class="toSet">
            <h3>默认推广设置</h3>
          </div>
          <el-form-item label="分享标题:">
            <el-input v-model="form.sharetitle" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="分享描述:">
            <el-input v-model="form.sharedescription" type="textarea" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="分享图片:" prop="shareImg">
            <el-upload
              class="avatar_uploader"
              action="https://backend.cs.yhcnet.cn/qgyOnlineWeb/photo/aliOssUpLoad"
              name="oss"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img
                v-if="form.shareimg"
                :src="form.shareimg"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>

            <!-- <el-upload
              class="avatar_uploader"
              action="https://backend.cs.yhcnet.cn/qgyOnlineWeb/photo/aliOssUpLoad"
              name="oss"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="form.shareimg" :src="form.shareimg" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>-->
          </el-form-item>
        </div>
        <div>
          <div class="toSet">
            <h3>客服信息</h3>
          </div>
          <el-form-item label="客服微信:">
            <el-input v-model="form.customerservicewechat" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="客服电话:">
            <el-input v-model="form.customerservicetel" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="客服二维码:" prop="shareImg">
            <el-upload
              class="avatar_uploader"
              action="https://backend.cs.yhcnet.cn/qgyOnlineWeb/photo/aliOssUpLoad"
              name="oss"
              :show-file-list="false"
              :on-success="handleAvatarSuccess1"
              :before-upload="beforeAvatarUpload1"
            >
              <img
                v-if="form.customerserviceqrcode"
                :src="form.customerserviceqrcode"
                class="avatar"
              />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </div>
        <div>
          <el-form-item label="评论最长字符数:">
            <el-input v-model="form.commentwords" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="当天分享上限:">
            <el-input v-model="form.shareupper" style="width:430px"></el-input>
          </el-form-item>
          <!-- <el-form-item label="每日限购次数:">
            <el-input v-model="form.limitbuyday" style="width:430px"></el-input>
          </el-form-item> -->
          <el-form-item label="单商品抢购次数:">
            <el-input v-model="form.limitcommodity" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="绑定结算账户:">
            <el-input v-model="form.settaccount" :disabled="true" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号:">
            <el-input v-model="form.settCardId" :disabled="true" style="width:430px"></el-input>
          </el-form-item>
          <el-form-item label="银行名称:">
            <el-input v-model="form.settBankName" :disabled="true" style="width:430px"></el-input>
          </el-form-item>
        </div>
      </el-form>
    </div>
    <div class="submit_bottom_box">
      <el-row class="submit_bottom_el">
        <el-button type="primary" size="small" @click="onSubmit()">提交修改</el-button>
      </el-row>
    </div>
  </div>
</template>
<script>
// import { querySetting, upSetting } from "@/api/newApi/setting";
export default {
  data() {
    return {
      imgList: [],
      dialogImageUrl: "",
      dialogVisible: false,
      form: {},
      imageUrl: "",
      shareimgList: "",
      fileList: [
      
      ]
    };
  },
  created() {
    this.getData();
 
  
  },
  methods: {
    handleRemove2(file, fileList) {
      console.log(file, fileList);
      this.shareimgList = fileList;
    },
    handlePictureCardPreview2(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    successImg2(response, file, fileList) {
      console.log(fileList);
      this.shareimgList = fileList;
    },
    getImg(){
        let imgStr=this.form.bannerEntityList.url
    let imgList = imgStr.split(",")
    console.log(imgList)
    this.fileList=imgList.map((item,i)=>{
      return {
        url:item
      }
    })
    },
    getData() {
      querySetting({}).then(res => {
        this.form = res.data;
        let listStr = this.form.bannerEntityList.image;
        let list = listStr.split(",");
              this.getImg()
        console.log(list);
        for (let i = 0; i < list.length; i++) {
          let listIndex = {
            url: list[i]
          };
          // this.imgList.push(listIndex)
          // this.imgList[i].url=list[i]
        }
        console.log("this.imgList");
        console.log(this.imgList);
      });
    },
    onSubmit() {
      // console.log("list");
      // console.log(this.fileList.length);
      // console.log(this.fileList);

      // 轮播图 上传字符串
      let shareimgList;
      if (this.shareimgList != "") {
        console.log(1);
        shareimgList = this.shareimgList.map((item, i) => {
          console.log(item);
          if (item.response) {
            return item.response.fileAddress;
          } else {
            return item.url;
          }
        });
      } else {
        console.log(2);
        shareimgList = this.fileList.map((item, i) => {
          console.log(item);
          if (item.response) {
            return item.response.fileAddress;
          } else {
            return item.url;
          }
        });
      }
      let shareimg = shareimgList.join(",");
      console.log(1111)
      let banner=this.form.bannerEntityList
      console.log(banner.image)
      this.$set(banner,'url', shareimg)
       this.form.bannerEntityList=banner
      let list = [1, 2];
      let num = 0;
      var listStr = "";
      for (let i = 0; i < this.imgList.length; i++) {
        listStr += this.imgList[i].response.fileAddress + ",";
        //   list.push(this.imgList[i].response.fileAddress)
        num++;
      }
      if (num == this.imgList.length) {
        console.log("llllll");
        console.log(listStr);
      }

      this.form.bannerEntityList.image = listStr;
      //    return false
      upSetting(this.form).then(res => {
        if (res.code == 200) {
          this.$message({
            type: "success",
            message: res.message
          });
        } else {
          this.$message({
            type: "warning",
            message: res.message
          });
        }
      });
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.shareimg = file.response.fileAddress;
    },
    beforeAvatarUpload(file) {
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("上传头像图片只能是 JPG 格式!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("上传头像图片大小不能超过 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    successList(response, file, fileList) {
      console.log(fileList);
      this.imgList = fileList;
    },
    handleAvatarSuccess1(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.form.customerserviceqrcode = file.response.fileAddress;
    },
    beforeAvatarUpload1(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    handleRemove(file, fileList) {
      this.imgList = fileList;
    },
    handlePreview(file) {
      console.log(this.form.bannerEntityList);
      console.log(file);
    }
  }
};
</script>
<style scoped>
.imgList {
  width: 600px;
}
.contPage {
  padding: 50px 100px;
}
.toSet {
  padding: 20px 0;
}
.avatar_uploader i {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.avatar_uploader i:hover {
  border-color: #409eff;
}

.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}

.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
.submit_bottom_box {
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 50px;
  z-index: 100;
  background-color: #ffffcc;
}

.submit_bottom_el {
  margin: 9px auto;
  width: 130px;
}
</style>

