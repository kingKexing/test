<!-- 财务数据表格组件 style="width: 70%;magin:0 auto"-->
<template>
  <div class="content">
    <el-table class="table" :data="tableData" border stripe>
      <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
      <el-table-column prop="city" label="城市" width="180" sortable></el-table-column>
      <el-table-column prop="account" label="账号" width="180" sortable></el-table-column>
      <el-table-column prop="password" label="密码" width="180"></el-table-column>
      <el-table-column prop="profit" label="操作" min-width="180" fixed="right">
        <template slot-scope="scope">
          <el-button @click="handleEdit(scope.row,0)" type="primary" size="small">编辑</el-button>
          <el-button @click="handleEdit(scope.row,1)" type="danger" size="small">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :hide-on-single-page="true"
      class="paging"
      layout="prev, pager, next"
      :total="allSize"
      :page-size="pageSize"
      :current-page="curPage"
      @size-change="sizeChange"
      @current-change="pageChange"
    ></el-pagination>
  </div>
</template>

<script>
export default {
  name: "tableData",
  props: {
    tableData: {
      type: Array
    },
    pageSize: {
      type: Number,
      default: 10
    },
    curPage: {
      type: Number,
      default: 1
    },
    allSize: {
      type: Number,
      default: 20
    }
  },
  data() {
    return {
      tag: true
    };
  },
  methods: {
    // 前一页和后一页跳转
    pageChange(val) {
      this.$emit("pageChange", val);
    },
    sizeChange(val) {
      this.$emit("sizeChange", val);
    },
    // 编辑和删除
    handleEdit(val, n) {
      this.$emit("handleEdit", val, n);
    }
  }
};
</script>

<style scoped>
.paging {
  position: relative;
  margin-top: 10px;
}
.content {
  position: relative;
  width: 70%;
  margin: 0 auto;
  margin-top: 50px;
}
</style>

