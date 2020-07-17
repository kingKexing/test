<template>
  <div class="app-container">
    <el-form ref="searchForm" :model="searchForm">
      <el-form-item>
        <el-row>
          <!-- <span>用户:</span>
          <el-input placeholder="请输入用户昵称" style="width:200px" v-model="searchForm.userName"></el-input>&emsp;&emsp;&emsp;-->
          <span>提现时间:</span>
          <el-date-picker
            v-model="searchForm.orderTime"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            format="yyyy-MM-dd HH:mm:ss"
            value-format="yyyy-MM-dd HH:mm:ss"
            @change="timeChange"
          ></el-date-picker>&ensp;&ensp;&ensp;&ensp;
          <el-button icon="el-icon-search" circle @click="search">搜索</el-button>
        </el-row>
      </el-form-item>
    </el-form>
    <el-table :data="tableList" element-loading-text="Loading" border fit highlight-current-row>
      <el-table-column align="center" label="用户信息" width="95" prop="createdUser">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.createdUser }}</span>
        </template>
      </el-table-column>

      <el-table-column label="金额" prop="money">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ Math.abs(scope.row.money) }}</span>
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="success">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ SUCCESS[scope.row.success] }}</span>
        </template>
      </el-table-column>
      <el-table-column label="流水号" prop="raiseId">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.raiseId }}</span>
        </template>
      </el-table-column>
      <el-table-column label="提现时间" prop="raisedTime">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.raisedTime }}</span>
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="操作" width="140" align="center">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" @click="confirmGrant(scope.row)">确认发放</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      :page-size="pageSize"
      @current-change="handleCurrentChange"
      :current-page="currentPage1"
      @size-change="handleSizeChange1"
      :page-sizes="[10, 20, 50, 100]"
    ></el-pagination>
  </div>
</template>

<script>
// import {} from "@/api";
// import {} from "@/api";
// import {} from "@/api";
import { Base64 } from "js-base64";
export default {
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "gray",
        deleted: "danger"
      };
      return statusMap[status];
    }
  },
  data() {
    return {
      tableList: [],
      SUCCESS: {
        0: "待审核",
        1: "已发放"
      },
      currentPage1: 1,
      total: 0,
      pageSize: 4,
      pageNo: 1,
      searchForm: {}
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      let pageNo = this.pageNo;
      let pageSize = this.pageSize;
      getAuditedList(0, pageNo, pageSize).then(response => {
        let { list } = response;
        list.forEach(item => {
          item.createdUser = Base64.decode(item.createdUser);
        });
        this.tableList = response.list;
        this.total = response.itemCount;
        this.currentPage1 = 1;
      });
    },
    handleCurrentChange(currentPage) {
      let pageSize = this.pageSize;
      console.log(currentPage);
      getAuditedList(0, currentPage, pageSize).then(response => {
        this.tableList = response.list;
        this.total = response.itemCount;
      });
      let arr = [];
      let record = null;
      let params = [];
      arr = this.searchForm.orderTime;
      params.push({ beginDate: arr[0] });
      params.push({ endDate: arr[arr.length - 1] });
      params.push({ userName: this.searchForm.userName });
      params.push({ isAudited: 0 });
      record = JSON.stringify(params);
      findByTime(currentPage, pageSize, record).then(response => {
        this.tableList = response.list;
        this.total = response.itemCount;
      });
    },
    search() {
      let arr = [];
      let record = null;
      let params = [];
      let pageNo = this.pageNo;
      let pageSize = this.pageSize;
      arr = this.searchForm.orderTime;
      params.push({ beginDate: arr[0] });
      params.push({ endDate: arr[arr.length - 1] });
      params.push({ userName: this.searchForm.userName });
      params.push({ isAudited: 1 });
      record = JSON.stringify(params);
      findByTime(pageNo, pageSize, record).then(response => {
        this.tableList = response.list;
        this.total = response.itemCount;
        this.currentPage1 = 1;
      });
    },
    timeChange(orderTime) {
      console.log(orderTime);
    },
    handleClose(done) {
      // this.$confirm("确认关闭？")
      //   .then(_ => {
      done();
      //   })
      // .catch(_ => {});
    },
    confirm() {},
    confirmGrant(row) {
      var timestamp = Date.parse(new Date());
      let withdrawEntity = Object.assign({}, row);
      let userId = withdrawEntity.userId;
      let raiseId = withdrawEntity.raiseId;
      console.log(raiseId);
      console.log(timestamp);
      this.$confirm("确认发放？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
      withdraw(userId, raiseId).then(() => {
        this.dialogVisible = false;
        this.fetchData();
      });
    },
    handleSizeChange1(pageSize) {
      this.pageSize = pageSize;
      this.handleCurrentChange(this.currentPage1);
    }
  }
};
</script>
