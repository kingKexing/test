<template>
  <div class="tableClass">
    <!-- 表格 -->
    <el-table :data="tableData" class="tableClass" border stripe>
      <el-table-column type="index" label="序号" width="50" fixed="left" />
      <el-table-column prop="userName" label="用户名" />
      <el-table-column prop="type" label="身份" sortable>
        <template slot-scope="scope">
          <span
            :class="[scope.row.type ? 'usual':'super']"
          >{{scope.row.type == 0 ? '平台管理员' : '超级管理员'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="account" label="账号" />
      <el-table-column prop="userTel" label="手机号" />
      <el-table-column prop="isEnable" label="状态" width="100" sortable>
        <template slot-scope="scope">
          <span
            :class="[!scope.row.isEnable ? 'success':'error']"
          >{{scope.row.isEnable ? '已禁用' : '未禁用'}}</span>
        </template>
      </el-table-column>
      <el-table-column prop="lastLoginTime" label="最后登录时间" width="130px" sortable />
      <el-table-column label="操作" width="250px">
        <template slot-scope="scope" style="display: flex; flex-direction: row;">
          <el-button
            size="mini"
            type="primary"
            plain
            :class="[scope.row.isEnable === 1 ? 'success':'error']"
            @click.prevent="forbit(scope.row.id,scope.row.isEnable)"
          >{{ scope.row.isEnable === 0 ? '禁用':'启用' }}</el-button>
          <el-button size="mini" type="warning" plain @click.prevent="changeUser(scope.row)">修改</el-button>
          <el-button size="mini" type="danger" plain @click.prevent="delTable(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页开始 -->
    <el-pagination
      :hide-on-single-page="true"
      style="margin-top: 10px"
      :current-page="currentPage"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :total="totalPageSize"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="pageChange"
      @size-change="sizeChange"
    />
    <!-- @size-change="handleSizeChange" -->
  </div>
</template>
<script>
export default {
  name: "managementTable",
  props: {
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40, 50];
      }
    },
    pageSize: {
      type: Number,
      default: 10
    },
    tableData: {
      type: Array
    },
    currentPage: {
      type: Number,
      default: 1
    },
    totalPageSize: {
      type: Number,
      default: 100
    }
  },
  methods: {
    // 修改用户触发
    changeUser(val) {
      this.$emit("changeUser", val);
    },
    pageChange(index) {
      this.$emit("pageChange", index);
    },
    sizeChange(val) {
      this.$emit("sizeChange", val);
    },
    // 更改状态 触发
    forbit(id, num) {
      this.$emit("forbit", id, num);
      // console.log(id, num);
    },
    delTable(id) {
      this.$emit("delTable", id);
    }
  }
};
</script>

<style scoped>
.tableClass {
  margin-top: 20px;
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
.super {
  color: #e6a23c;
}
</style>