 <!-- 用户管理页面 -->
<template>
  <div class="dashboard-container">
    <!-- 顶部 -->
    <div>
      <text>状态：</text>
      <el-select v-model="selectVaue" placeholder="选择状态">
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
    <el-table :data="tableData" class="tableClass" border stripe>
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="type" label="身份" />
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="userTel" label="手机号" />
      <el-table-column prop="isEnable" label="状态" />
      <el-table-column prop="lastLoginTime" label="最后登录时间" />
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope" style="display: flex; flex-direction: row;">
          <el-button
            size="mini"
            type="primary"
            plain
            @click.prevent="forbit(scope.row.id,scope.row.isEnable)"
          >{{ scope.row.isEnable === '启用中'?'禁用':'启用' }}</el-button>
          <el-button size="mini" type="warning" plain @click.prevent="changeUser(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" plain @click.prevent="delTable(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 模态框 -->
    <el-dialog :visible.sync="change" title="修改用户信息">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="用户名：">
          <el-input v-model="addForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码：">
          <el-input v-model="addForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机">
          <el-input v-model="addForm.userTel" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="身份">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option
              v-for="item in adminType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="change = false">取 消</el-button>
        <el-button type="primary" @click="changeDia">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 增加模态框 -->
    <el-dialog :visible.sync="addChange" title="增加用户">
      <el-form :model="form">
        <el-form-item :label-width="formLabelWidth" label="用户名：">
          <el-input v-model="addForm.userName" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="账号：">
          <el-input v-model="addForm.account" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="密码：">
          <el-input v-model="addForm.password" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="手机">
          <el-input v-model="addForm.userTel" autocomplete="off" />
        </el-form-item>
        <el-form-item :label-width="formLabelWidth" label="身份">
          <el-select v-model="addForm.type" placeholder="请选择">
            <el-option
              v-for="item in adminType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addChange = false">取 消</el-button>
        <el-button type="primary" @click="addChangeArr">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分页开始 -->
    <div class="block">
      <el-pagination
        :current-page="currentPage"
        :page-sizes="[10, 30, 50, 100]"
        :page-size="10"
        :total="totalPageSize"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import {} from "@/api";
export default {
  name: "Dashboard",
  data() {
    return {
      tableData: [],
      paegNo: 1,
      pageSize: 10,
      totalPageSize: "",
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
      selectVaue: null,
      formLabelWidth: "180px",
      form: {
        permission: "",
        password: ""
      },
      addForm: {
        id: null,
        userName: null,
        password: null,
        account: null,
        type: 1,
        userTel: null
      },
      // 修改模态框
      change: false,
      // 用户id
      id: "",
      addChange: false
    };
  },
  computed: {
    ...mapGetters(["name"])
  },
  watch: {
    selectVaue(newValue, oldValue) {
      console.log(newValue, oldValue);
    }
  },
  mounted() {
    this.getTableList();
  },
  methods: {
    getTableList() {
      adminList(
        this.paegNo,
        this.pageSize,
        this.$store.state.activeUser,
        this.selectVaue,
        1
      ).then(res => {
        console.log("res", res);
        this.tableData = res.list;
        this.totalPageSize = res.itemCount;

        for (let i = 0; i < this.tableData.length; i++) {
          switch (this.tableData[i].type) {
            case 0:
              this.tableData[i].type = "超级管理员";
              break;
            case 1:
              this.tableData[i].type = "平台管理员";
              break;
          }
          switch (this.tableData[i].isEnable) {
            case 0:
              this.tableData[i].isEnable = "禁用中";

              break;
            case 1:
              this.tableData[i].isEnable = "启用中";
              break;
          }
        }
        console.log("this.tableData", this.tableData);
      });
    },
    // pageSize改变触发(每页显示条数)
    handleSizeChange(e) {
      console.log("e", e);
      this.pageSize = e;
      this.getTableList();
    },
    //
    handleCurrentChange(e) {
      console.log("e", e);
      this.pageNo = e;
      this.getTableList();
    },
    changeUser(row) {
      (this.addForm = {
        id: row.id,
        userName: row.userName,
        password: row.password,
        account: null,
        type: row.type,
        userTel: row.userTel
      }),
        (this.change = true);
    },
    // 修改用户信息  确定
    changeDia() {
      if ((this.addForm.type = "平台管理员")) {
        this.addForm.type = 1;
      } else if ((this.addForm.type = "超级管理员")) {
        this.addForm.type = 0;
      }
      updAdmin(this.addForm).then(res => {
        this.getTableList();
        this.change = false;
      });
    },
    // 查询
    search() {
      this.getTableList().then(response => {
        console.log("response", response);
      });
    },
    // 添加
    add() {
      this.addForm = {
        id: null,
        userName: null,
        password: null,
        account: null,
        type: 1,
        userTel: null
      };
      this.addChange = true;
    },
    addChangeArr() {
      // this.checked1 = false
      // this.checked2 = false
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
    forbit(id, isEnable) {
      console.log("this.$store.state", this.$store.state.activeUser);
      console.log("禁用启用", id, isEnable);
      // 用户在启用中
      if (isEnable === "启用中") {
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
      }
    },
    // 删除
    delTable(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          delAdmin(id, this.$store.state.activeUser).then(response => {
            if (response.code === 200) {
              this.$message({
                type: "success",
                message: "删除成功!"
              });
              this.getTableList();
            } else {
              this.$message({
                type: "error",
                message: "删除失败!"
              });
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
    // 修改
    // change() {
    //   console.log('修改')
    // }
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
