<template>
  <div>
    <el-table
      ref="filterTable"
      :data="tableData"
      border
      stripe
      style="width: 100%;margin-top: 30px"
    >
      <el-table-column type="index" label="序号" sortable width="50"></el-table-column>
      <el-table-column prop="id" label="id" width="180"></el-table-column>
      <el-table-column prop="createdTime" label="入驻时间" sortable width="200"></el-table-column>
      <el-table-column prop="unsettledMoney" label="待结算" width="180"></el-table-column>
      <el-table-column prop="usedttledMoney" label="已结算" width="180"></el-table-column>
      <el-table-column prop="rate" label="佣金比例" width="130"></el-table-column>
      <el-table-column prop="city" label="城市" width="150"></el-table-column>
      <el-table-column label="操作" min-width="400">
        <template slot-scope="scope">
          <el-button size="small" @click="toAgentCity(scope.row.id)">点击跳转</el-button>
          <el-tooltip content="编辑" placement="top" :enterable="false">
            <el-button
              @click="handleEdit(scope.row,0)"
              size="small"
              type="primary"
              icon="el-icon-edit"
            ></el-button>
          </el-tooltip>
          <el-button
            @click="handleEdit(scope.row,1)"
            type="danger"
            size="small"
            icon="el-icon-delete"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :hide-on-single-page="true"
      class="paging"
      layout="sizes, prev, pager, next"
      :total="allSize"
      :page-sizes="pageSizes"
      :page-size="pageSize"
      :current-page="curPage"
      @current-change="pageChange"
      @size-change="changeSize"
    ></el-pagination>
    <!-- 
    @prev-click="pageChange(0)"
    @next-click="pageChange(1)"-->
  </div>
</template>

<script>
export default {
  name: "cityTable",
  props: {
    tableData: {
      type: Array
    },
    pageSize: {
      type: Number,
      default: 10
    },
    pageSizes: {
      type: Array,
      default: function() {
        return [10, 20, 30];
      }
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
  methods: {
    // 编辑和删除 0：编辑  1：删除
    handleEdit(val, n) {
      this.$emit("handleEdit", val, n);
    },
    // 页面改变时触发
    pageChange(index) {
      this.$emit("pageChange", index);
      // console.log(index);
    },
    // 显示数据条数发生变化时触发事件
    changeSize(index) {
      this.$emit("changeSize", index);
    },
    toAgentCity(val) {
      console.log(val);
      this.$router.push({
        path: "/agent/agentList",
        query: { id: val }
      });
    }
  }
};
</script>