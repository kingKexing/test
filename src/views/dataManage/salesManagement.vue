<!-- 销售管理 -->
<template>
  <div class="page">
    <!-- 搜索框 -->
    <el-row :gutter="1" style="margin-top: 10px">
      <el-col :span="4">
        <el-input placeholder="输入城市名" v-model="city" clearable></el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
      <el-col :span="2">
        <el-button type="primary" @click="edit(false)">添加销售人员</el-button>
      </el-col>
    </el-row>

    <!-- 表格 -->
    <el-table :data="tableData" style="width: 100%;margin-top:20px">
      <el-table-column type="index" label="序号" width="60"></el-table-column>
      <el-table-column prop="id" label="ID"></el-table-column>
      <el-table-column prop="userName" label="姓名"></el-table-column>
      <el-table-column prop="userTel" label="手机号"></el-table-column>
      <el-table-column prop="type" label="身份" sortable>
        <template slot-scope="scope">
          <span :class="[scope.row.type ? 'success' : 'error']">{{scope.row.type ? '管理员' : '超级管理员'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="createdTime" label="创建时间" sortable></el-table-column>
      <el-table-column label="操作" width="200">
        <template slot-scope="scope">
          <a @click.prevent="edit(scope.row)">查看详情</a>
          <a @click.prevent="del(scope.row.id)">删除</a>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <div style="margin-top:20px" class="block">
      <el-pagination
        :hide-on-single-page="true"
        :current-page="currentPage"
        :page-sizes="[10, 20, 30, 40]"
        :page-size="10"
        :total="itemCount"
        layout="total, sizes, prev, pager, next, jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>

    <!--  @close="close('form')" -->
    <el-dialog :title="title" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form" @validate="validate">
        <el-form-item label="姓名" label-width="120px" prop="userName">
          <el-input v-model="form.userName" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="城市" label-width="120px">
          <el-input type="text" v-model="form.city" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="用户电话" label-width="120px" prop="userTel">
          <el-input type="text" v-model="form.userTel" auto-complete="off"></el-input>
        </el-form-item>

        <el-form-item v-if="isAdd" label="创建人" label-width="120px" prop="createdUser">
          <el-input type="text" v-model="form.createdUser" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item v-else label="创建人" label-width="120px">
          <span>{{form.createdUser}}</span>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editTrue">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 弹出框 -->
  </div>
</template>
<script>
// salesList 此接口报错
import { salesList, addSales, editSales, delSales } from "@/api/data";
export default {
  data() {
    return {
      title: "添加销售人员",
      addType: "",
      //弹框的显示
      dialogFormVisible: false,
      // 每页条数
      pageSize: 10,

      // 列表总条数
      itemCount: 40,
      // 当前页说
      currentPage: 1,
      pageNo: 1,
      //   获取数据列表 可以为空对象
      form: {
        userName: "",
        password: "",
        city: "",
        createdUser: "",
        userTel: ""
      },
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        createdUser: [
          { required: true, message: "请输入名字", trigger: "blur" }
        ],
        userTel: [
          { required: true, message: "请输入电话号码", trigger: "blur" },
          { min: 11, max: 11, message: "长度为 11 个字符", trigger: "blur" }
        ]
      },

      city: "",
      isAdd: false,
      tableData: [
        {
          id: "123",
          account: "1345",
          userName: "黄家沟",
          userTel: "12121212121",
          type: 0, // 0:超管 ; 1:普通管理员
          createdTime: "2020-10-03",
          createdUser: "哈哈发"
        },
        {
          id: "123",
          account: "1345",
          userName: "黄家沟",
          userTel: "12121212121",
          type: 0, // 0:超管 ; 1:普通管理员
          createdTime: "2020-10-03"
        },
        {
          id: "123",
          account: "1345",
          userName: "黄家沟",
          userTel: "12121212121",
          type: 1, // 0:超管 ; 1:普通管理员
          createdTime: "2020-10-03"
        },
        {
          id: "123",
          account: "1345",
          userName: "黄家沟",
          userTel: "12121212121",
          type: 1, // 0:超管 ; 1:普通管理员
          createdTime: "2020-10-03"
        }
      ]
    };
  },
  created() {
    salesList({
      city: "无锡市"
      // account: "123"
    }).then(res => {
      console.log(res);
    });
    // this.getList();
  },
  methods: {
    getList() {
      let data = {
        pageNo: this.pageNo,
        pageSize: this.pageSize,
        name: this.name,
        telPhone: this.telPhone
      };
    },
    del(id) {
      this.$confirm("此操作将永久删除该管理员, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          console.log("success");
          delSales({ id }).then(res => {
            if (res.code == 200) {
              this.$message({
                type: "success",
                message: res.message
              });
              // 重新获取列表数据
              // this.getList();
            } else {
              this.$message({
                type: "warning",
                message: res.message
              });
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
    editTrue() {
      this.$refs.form.validate(boolean => {
        if (boolean) {
          // 校验成功之后
          let type;
          if (this.addType == "add") {
            // 添加数据
            addSales(this.form).then(res => {
              res.code && res.code === 200
                ? (type = "success")
                : (type = "warning");
              console.log(res);
              this.dialogFormVisible = false;
              // 重新获取数据
              // this.getList();
            });
          } else if (this.addType == "edit") {
            // 修改数据
            editSales(this.form).then(res => {
              res.code && res.code === 200
                ? (type = "success")
                : (type = "warning");
              console.log(res);
              this.dialogFormVisible = false;
              // 重新获取数据
              // this.getList();
            });
          }
          // 提示信息
          this.$message({
            type,
            message: res.message
          });
        } else this.$message({ type: "warning", message: "数据不完整" });
      });
    },
    edit(row) {
      if (row) {
        this.addType = "edit";
        this.form = row;
        this.isAdd = false;
        console.log(row);
      } else {
        this.addType = "add";
        this.form = {
          userName: "",
          password: "",
          city: "",
          createdUser: "",
          userTel: ""
        };
        this.isAdd = true;
        console.log(row);
      }

      this.dialogFormVisible = true;
    },
    validate(val, n, v) {
      // console.log(55555555);
      // console.log(val, n, v);
    },
    searchAll() {
      this.pageNo = 1;
      this.name = null;
      this.telPhone = null;

      this.getList();
    },
    search() {
      console.log(this.city);
    },
    handleSizeChange(val) {
      this.pageSize = val;
      // this.getList();
    },
    handleCurrentChange(val) {
      this.pageNo = val;
      this.getList();
    }
  }
};
</script>
<style  scoped>
.page {
  position: relative;
  padding: 20px;
}
.error {
  color: red;
}
.success {
  color: #67c23a;
}
.usual {
  color: #66b1ff;
}
</style>


