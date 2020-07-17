<style scoped>
.content {
  position: relative;
  padding: 20px;
}
.from-con {
  position: relative;
  display: flex;
  justify-content: space-around;
  margin-top: 150px;
  width: 100%;
  height: 100%;
}
.con {
  width: 40%;
}
</style>
<template>
  <div class="content">
    <el-form label-position="left" label-width="100px" :model="managerForm">
      <div class="from-con">
        <div class="con">
          <el-form-item label="用户名:" v-if="managerForm.userName">
            <span>{{managerForm.userName}}</span>
          </el-form-item>
          <el-form-item label="城市:" v-if="managerForm.city">
            <span>{{managerForm.city}}</span>
            <el-button
              type="primary"
              size="mini"
              style="margin-left:100px"
              @click="delManager(managerForm.id)"
            >解绑</el-button>
          </el-form-item>
          <el-form-item label="结算费率:" v-if="managerForm.rate">
            <span>{{managerForm.rate}}</span>
          </el-form-item>
          <el-form-item label="创建时间:" v-if="managerForm.createdTime">
            <span>{{managerForm.createdTime}}</span>
          </el-form-item>
          <el-form-item label="最后登录:" v-if="managerForm.lastLoginTime">
            <span>{{managerForm.lastLoginTime}}</span>
          </el-form-item>
          <el-form-item label="修改时间:" v-if="managerForm.modifiedTime">
            <span>{{managerForm.modifiedTime}}</span>
          </el-form-item>
        </div>
        <div class="con">
          <el-form-item label="已结算:" v-if="managerForm.usedttledMoney">
            <span>{{managerForm.usedttledMoney}}</span>
          </el-form-item>
          <el-form-item label="待结算:" v-if="managerForm.unsettledMoney">
            <span>{{managerForm.unsettledMoney}}</span>
          </el-form-item>
          <el-form-item label="银行卡号:" v-if="managerForm.bankCard">
            <span>{{managerForm.bankCard}}</span>
          </el-form-item>
          <el-form-item label="用户电话:" v-if="managerForm.userTel">
            <span>{{managerForm.userTel}}</span>
          </el-form-item>
          <el-form-item label="修改人:" v-if="managerForm.modifiedUser">
            <span>{{managerForm.modifiedUser}}</span>
          </el-form-item>
        </div>
      </div>
    </el-form>
    <el-button type="danger" style="margin-left:100px" @click="delManager(managerForm.id)">删除</el-button>
  </div>
</template>

<script>
import { manager, delManager } from "@/api/agent";
// import tableData from "./component/listTable";
export default {
  name: "agentCity",
  // components: { tableData },
  data() {
    return {
      isProp: false,
      managerForm: {
        id: "123", //主键，自增列
        account: "2312", //用户名
        city: "无锡市", //城市
        rate: "20%", //结算费率
        headUrl: "12312", //头像图片
        type: 0, //身份 0：超级管理员 1：平台管理员
        bankCard: "12312312", //银行卡号
        userName: "123123123", //用户昵称
        usedttledMoney: "123213", //已结算金额
        unsettledMoney: "123123", //待结算金额
        permission: "123213", //权限
        lastLoginTime: "123123", //最后登录时间
        isEnable: "123123", //是否已启用 0：未启用
        createdUser: "123123", //创建人
        createdTime: "123213", //创建时间
        modifiedUser: "123213", //修改人
        modifiedTime: "123213", //修改时间
        userTel: "12321" //用户电话
      }
    };
  },
  created() {
    manager(this.$route.query).then(res => {
      // if (res.code && res.code === 200) this.managerForm = res.data;
      console.log(res);
    });
    console.log(this.$route.query); // 获取传递过来的值
  },
  methods: {
    delManager(id) {
      delManager({ id }).then(res => {
        let type;
        if (res.code && res.code === 200) type = "success";
        else type = "warning";
        this.$message({
          type,
          message: res.message
        });
        console.log(res);
      });
      console.log(id);
    }
  }
};
</script>

