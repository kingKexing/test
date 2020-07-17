<template>
  <div class="content">
    <!-- 表格 -->
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column type="index" label="序号" width="50" fixed="left"></el-table-column>
      <el-table-column prop="agentId" label="代理商id"></el-table-column>
      <el-table-column prop="creatTime" label="创建时间" sortable></el-table-column>
      <el-table-column prop="orderIdList" label="结算id"></el-table-column>
      <el-table-column prop="city" label="城市"></el-table-column>
      <el-table-column prop="auditUser" label="审核人"></el-table-column>
      <el-table-column prop="auditType" label="审核状态" sortable>
        <template slot-scope="scope">
          <span v-if="scope.row.auditType === 0">待审核</span>
          <span class="success" v-if="scope.row.auditType === 1">审核通过</span>
          <span class="error" v-if="scope.row.auditType === 2">审核未通过</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="260">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="onLine(scope.row)">线上结算</el-button>
          <el-button type="text" size="small" @click="offLine(scope.row)">线下结算</el-button>
          <el-button type="text" size="small" @click="revoke(scope.row)">撤销审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :hide-on-single-page="true"
      style="margin-top: 10px"
      @size-change="sizeChange"
      @current-change="pageChange"
      :current-page="params.page"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="params.size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="allSize"
    ></el-pagination>
  </div>
</template>

<script>
import { settleList } from "@/api/data";

export default {
  name: "finance",
  data() {
    return {
      tableData: [
        {
          id: 123,
          agentId: 321,
          settleId: 21,
          orderIdList: "哈哈的好的",
          auditType: 0, // 0：待审核；1：审核通过；2：审核未通过
          auditUser: "和谐号",
          creatTime: "2020-01-02",
          price: 32.21
        },
        {
          id: 123,
          agentId: 321,
          settleId: 22,
          orderIdList: "哈哈的好的",
          auditType: 0, // 0：待审核；1：审核通过；2：审核未通过
          auditUser: "和谐号",
          creatTime: "2020-01-02",
          price: 32.21
        },
        {
          id: 123,
          agentId: 321,
          settleId: 23,
          orderIdList: "哈哈的好的",
          auditType: 1, // 0：待审核；1：审核通过；2：审核未通过
          auditUser: "和谐号",
          creatTime: "2020-01-02",
          price: 32.21
        },
        {
          id: 123,
          agentId: 321,
          settleId: 24,
          orderIdList: "哈哈的好的",
          auditType: 2, // 0：待审核；1：审核通过；2：审核未通过
          auditUser: "和谐号",
          creatTime: "2020-01-02",
          price: 32.21
        },
        {
          id: 123,
          agentId: 321,
          settleId: 25,
          orderIdList: "哈哈的好的",
          auditType: 2, // 0：待审核；1：审核通过；2：审核未通过
          auditUser: "和谐号",
          creatTime: "2020-01-02",
          price: 32.21
        },
        {
          id: 123,
          agentId: 321,
          settleId: 26,
          orderIdList: "哈哈的好的",
          auditType: 1, // 0：待审核；1：审核通过；2：审核未通过
          auditUser: "和谐号",
          creatTime: "2020-01-02",
          price: 32.21
        }
      ],
      params: {
        page: 1,
        size: 10
      },
      allSize: 40
    };
  },
  methods: {
    // 线上结算
    onLine(val) {
      console.log(val);
    },
    // 线下结算
    offLine(val) {
      console.log(val);
    },
    revoke(val) {
      console.log(val);
    },
    // 页码改变事件
    pageChange(val) {
      this.params.page = val;
      console.log(val);
      this.settleList();
    },
    // 条数改变时触发
    sizeChange(val) {
      this.params.size = val;
      // 请求数据
      this.settleList();
    },
    // 列表请求
    settleList() {
      settleList(this.params).then(res => {
        if (res.code === 200 && res.data && res.data.length > 0) {
          this.tableData = res.data;
        }
        console.log(res);
      });
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  padding: 10px;
}
.success {
  color: #78c950;
}
.error {
  color: #fc5200;
}
</style>