<!-- 财务数据表格组件 -->
<template>
  <div class="content">
    <el-table :data="tableData" border stripe>
      <el-table-column type="index" label="序号" width="50"></el-table-column>
      <el-table-column prop="dateTime" label="日期" width="180" sortable></el-table-column>
      <el-table-column prop="income" label="收入" width="180" sortable></el-table-column>
      <el-table-column prop="expenditure" label="支出" width="180" sortable></el-table-column>
      <el-table-column prop="profit" label="盈利" width="180" sortable></el-table-column>
    </el-table>
    <!--  :hide-on-single-page="true" -->
    <!-- 分页 -->
    <el-pagination
      :hide-on-single-page="true"
      style="margin-top: 10px"
      :current-page="page"
      :page-sizes="pageSizes"
      :page-size="size"
      :total="allSize"
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="pageChange"
      @size-change="sizeChange"
    />
  </div>
</template>

<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    page: {
      type: Number,
      default: 1
    },
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 30, 40];
      }
    },
    size: {
      type: Number,
      default: 10
    },
    allSize: {
      type: Number,
      default: 20
    }
  },
  methods: {
    pageChange(val) {
      this.$emit("pageChange", val);
    },
    sizeChange(val) {
      this.$emit("sizeChange", val);
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  width: 792px;
  margin: 0 auto;
}
</style>


<style>
/* 表格居中 */
.el-table td,
.el-table th {
  text-align: center;
}
</style>