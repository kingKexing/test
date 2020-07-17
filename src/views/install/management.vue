<template>
  <div class="dashboard-container">
    <!-- 顶部 -->
    <div>
      <!-- <text>状态：</text> -->
      <el-select v-model="params.isEnable" placeholder="选择状态">
        <el-option
          v-for="item in optionsState"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="success" @click="add">增加</el-button>
    </div>
    <!-- 表格 -->
    <management-table
      :currentPage="params.page"
      :tableData="tableData"
      :pageSizes="[10,20,30,40]"
      :pageSize="params.size"
      :totalPageSize="allSize"
      @changeUser="changeUser"
      @pageChange="pageChange"
      @sizeChange="sizeChange"
      @forbit="forbit"
      @delTable="delTable"
    />
    <!-- 弹出框 -->
    <management-dialog
      :form="addForm"
      :title="title"
      :change="change"
      :adminType="adminType"
      @cancel="cancel"
      @changeDia="changeDia"
    />
  </div>
</template>

<script>
import managementTable from "./component/managementTable";
import managementDialog from "./component/managementDialog";
import { mapGetters } from "vuex";
import { searchAdmin, editAdmin, removeAdmin } from "@/api/agent";
export default {
  name: "management",
  components: { managementTable, managementDialog },
  data() {
    return {
      title: "", // dialog 头部
      tableData: [
        {
          id: 123123,
          account: "aaasd",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 0, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 0, // 0：未启用
          userTel: "12345678985"
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 1, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 1 // 0：未启用
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 0, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 0 // 0：未启用
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 1, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 1 // 0：未启用
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 0, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 1 // 0：未启用
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 0, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 1 // 0：未启用
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 0, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 0 // 0：未启用
        },
        {
          id: 123123,
          account: "aaasd",
          userTel: "12345678985",
          userName: "用户名",
          password: "2131321",
          headUrl: "",
          type: 0, // 0：超管；1：管理员
          lastLoginTime: "2020-01-01",
          isEnable: 0 // 0：未启用
        }
      ],
      // 商品的状态，用于搜索
      optionsState: [
        {
          value: "0",
          label: "已禁用"
        },
        {
          value: "1",
          label: "已启用"
        },
        {
          value: null,
          label: "全部"
        }
      ],
      adminType: [
        {
          value: 0,
          label: "超级管理员"
        },
        {
          value: 1,
          label: "平台管理员"
        }
      ],
      // 选中的值
      // selectVaue: null,
      formLabelWidth: "180px",
      form: {
        permission: "",
        password: ""
      },
      addForm: {},
      /* addFormRules: {
        userName: [
          { required: true, trigger: "blur" },
          { min: 1, message: "请输入id", trigger: "blur" }
        ],
        password: [
          { required: true, trigger: "blur" },
          { min: 5, max: 16, message: "长度在 5 到 16 个字符", trigger: "blur" }
        ]
      }, */
      // 修改模态框
      change: false,
      id: "",
      params: {
        isEnable: null,
        page: 1, // 当前是第几页
        size: 10 // 每页显示条数
      },
      allSize: 50
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  watch: {
    // selectVaue(val) {
    //   this.params.isEnable = val;
    // }
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      // adminList(
      //   this.paegNo,
      //   this.pageSize,
      //   this.$store.state.activeUser,
      //   this.selectVaue,
      //   1
      // ).then(res => {
      //   console.log("res", res);
      //   this.tableData = res.list;
      //   this.totalPageSize = res.itemCount;
      //   for (let i = 0; i < this.tableData.length; i++) {
      //     switch (this.tableData[i].type) {
      //       case 0:
      //         this.tableData[i].type = "超级管理员";
      //         break;
      //       case 1:
      //         this.tableData[i].type = "平台管理员";
      //         break;
      //     }
      //     switch (this.tableData[i].isEnable) {
      //       case 0:
      //         this.tableData[i].isEnable = "禁用中";
      //         break;
      //       case 1:
      //         this.tableData[i].isEnable = "启用中";
      //         break;
      //     }
      //   }
      //   console.log("this.tableData", this.tableData);
      // });
    },
    // pageSize改变触发(每页显示条数)
    handleSizeChange(e) {
      console.log("e", e);
      this.pageSize = e;
      this.getTableList();
    },
    handleCurrentChange(e) {
      console.log("e", e);
      this.pageNo = e;
      this.getTableList();
    },
    // 修改提示框传入信息
    changeUser(row) {
      this.title = "修改用户信息";
      // 二选一 后面处理 this.addForm = row;
      this.addForm = {
        id: row.id,
        userName: row.userName,
        password: row.password,
        userName: row.userName,
        type: row.type,
        userTel: row.userTel
      };
      this.change = true;
    },
    // 页数变化触发
    pageChange(index) {
      console.log(index);
      this.params.page = index;
      this.searchAdmin(this.params);
    },
    sizeChange(val) {
      this.params.size = val;
      this.searchAdmin(this.params);
    },
    // 修改用户信息  确定
    changeDia(data) {
      data.modifiedUser = this.$store.state.activeUser;
      console.log(data);
      // 数据请求
      this.editAdmin(data);

      // if (this.form.password.length < 5) {
      //   this.message.error("密码长度不能少于5");
      // } else {
      //   if ((this.addForm.type = "平台管理员")) {
      //     this.addForm.type = 1;
      //   } else if ((this.addForm.type = "超级管理员")) {
      //     this.addForm.type = 0;
      //   }
      //   updAdmin(this.addForm).then(res => {
      //     this.getTableList();
      //     this.change = false;
      //   });
      // }
    },
    // 查询
    search() {
      this.params.page = 1; // 重置页标
      this.searchAdmin(this.params);
    },
    // 添加
    add() {
      this.title = "添加用户";
      this.addForm = {
        userName: null,
        password: null,
        userName: null,
        type: 1,
        userTel: null
      };
      this.change = true;
    },
    cancel() {
      this.change = false;
    },
    addChangeArr() {
      const type = 1;
      addAdmin(this.addForm).then(response => {
        console.log("response", response);
        if (response.code !== 200) {
          this.$message.error("添加用户失败");
        } else {
          // 新增成功以后 模态框隐藏，调用获取管理员列表的接口s
          this.addChange = false;
          this.getTableList();
        }
      });
    },
    // 禁用或则启用
    forbit(id, num) {
      // console.log("this.$store.state", this.$store.state.activeUser);
      console.log("禁用启用", id, num);
      // 发送数据请求 要加上 修改人
      let n;
      num === 0 ? (n = 1) : (n = 0);
      console.log(n);
      this.editAdmin({
        id,
        isEnable: n,
        modifiedUser: this.$store.state.activeUser
      });

      // 用户在启用中
      /* if (isEnable === "启用中") {
        const forbit = 0;
        forAdmin(forbit, id, this.$store.state.activeUser).then(response => {
          console.log("responseforrr", response);
          // 禁用成功
          if (response.code === 200) {
            this.$message.success("禁用成功");
            this.getTableList();
          } else {
            this.$message.error("禁用失败");
            // 禁用失败
          }
        });
      } else {
        // 用户处于禁用中
        const forbit = 1;
        forAdmin(forbit, id, this.$store.state.activeUser).then(response => {
          console.log("responseforrr", response);
          // 启用成功
          if (response.code === 200) {
            this.$message.success("启用成功");
            this.getTableList();
          } else {
            this.$message.error("启用失败");
            // 禁用失败
          }
        });
      } */
    },
    // 删除
    delTable(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log(id);
          // 发送数据请求
          removeAdmin(id).then(res => {
            if (res.code === 200) {
              this.$message({ message: "删除成功", type: "success" });
              this.searchAdmin(this.params);
            }
          });
        })
        .catch(() => {
          console.log("error");
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },

    // 数据请求方法
    searchAdmin(params) {
      searchAdmin(params).then(res => {
        if (res.code === 200) {
          if (res.data && res.data.length > 0) {
            this.params += 1;
            // this.tableData = res.data;
          }
        }
      });
    },
    editAdmin(params) {
      editAdmin(params).then(res => {
        console.log(res);
        if (res.code == 200) {
          this.$message({ message: "修改成功", type: "success" });
          this.searchAdmin(this.params);
        } else this.$message({ message: "修改失败", type: "error" });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.tableClass {
  margin-top: 20px;
}
</style>
