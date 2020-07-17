<template>
  <div class="content">
    <el-row :gutter="5" style="margin-bottom: 10px">
      <el-col :span="4">
        <el-input placeholder="输入城市名" v-model="city" clearable></el-input>
      </el-col>
      <el-col :span="4">
        <el-button type="primary" @click="search">查询</el-button>
      </el-col>
    </el-row>
    <el-tabs type="border-card" @tab-click="changeTabs">
      <el-tab-pane label="日查询">
        <table-data
          :tableData="tableDataDay"
          :page="paramsDay.page"
          :size="paramsDay.size"
          :pageSizes="[10,20,30,40]"
          :allSize="allDaySize"
          @pageChange="dayChange"
          @sizeChange="daySizeChange"
        ></table-data>
      </el-tab-pane>
      <el-tab-pane label="月查询">
        <table-data
          :tableData="tableDataMonth"
          :page="paramsMonth.page"
          :size="paramsMonth.size"
          :pageSizes="[10,20,30,40]"
          :allSize="allMonthSize"
          @pageChange="monthChange"
          @sizeChange="monthSizeChange"
        ></table-data>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { financeDay, financeMonth } from "@/api/data";
import tableData from "./component/tableData";
export default {
  name: "finance",
  components: { tableData },
  data() {
    return {
      city: "",
      // 日数据
      tableDataDay: [
        {
          dateTime: "2020-02-02",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-03",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-04",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-05",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-02-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        }
      ],
      // 月数据
      tableDataMonth: [
        {
          dateTime: "2020-02-02",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-03-03",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-04-04",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-05-05",
          income: 2000,
          expenditure: 500,
          profit: 1500
        },
        {
          dateTime: "2020-06-06",
          income: 2000,
          expenditure: 500,
          profit: 1500
        }
      ],
      paramsDay: {
        city: "",
        size: 10,
        page: 1
      },
      paramsMonth: {
        city: "",
        size: 10,
        page: 1
      },
      allDaySize: 20,
      allMonthSize: 20 // 最后要修改 为0
    };
  },
  created() {
    // 查询数据
    this.financeDay(this.paramsDay);
    this.financeMonth(this.paramsMonth);
  },
  methods: {
    // 查询
    search() {
      // 发送网络请求 请求成功之后改变参数 和 显示页面
      this.paramsDay.city = this.city;
      this.paramsDay.page = 1;
      this.paramsMonth.page = 1;
      this.paramsMonth.city = this.city;

      // this.financeMonth(this.paramsMonth);
      // this.financeDay(this.financeDay);
    },
    // pageChange(page) {
    //   console.log(page);
    // },
    // 日查询 分页请求数据
    dayChange(val) {
      // this.paramsDay.page = val;
      // this.financeDay(this.paramsDay);
      // console.log(val, size, this.dayPage, this.allDaySize);
    },
    daySizeChange(val) {
      // this.paramsDay.size = val;
      // this.financeDay(this.paramsDay);
    },

    // 日查询数据
    financeDay(data) {
      financeDay(data).then(res => {
        console.log(res);
        if (res && res.caode === 200) {
          if (res.data && res.data.length > 0) {
            //this.allDaySize = res.data.toolCount; // 添加总数据条数
            //this.tableDataDay = res.data.data; // 给表数据赋值
            // if (this.pagings.pageIndex > 0) this.$message("暂无更多数据!");
          }
        } else this.$message({ type: "error", message: "暂无数据" });
      });
    },

    // 月查询 分页请求数据 页数发生变化时 触发
    monthChange(val) {
      this.paramsMonth.page = val;
      // this.financeMonth(this.paramsMonth);
      // console.log(val, size, this.monthPage, this.allMonthSize);
    },
    monthSizeChange(val) {
      // this.paramsMonth.size = val;
      // this.financeMonth(this.paramsMonth);
    },

    // 月查询数据
    financeMonth(data) {
      financeMonth(data).then(res => {
        if (res && res.code === 200) {
          if (res.data.data && res.data.data.length > 0) {
            // this.allMonthSize = res.data.toolCount; // 添加总数据条数
            // this.tableDataMonth = res.data.data; // 给表数据赋值
            // if (this.pagings.pageIndex > 0) this.$message("暂无更多数据!");
          }
        } else this.$message({ type: "error", message: "暂无数据" });
        console.log(res);
      });
    },

    // 切换回调
    changeTabs(tab) {
      if (tab.index == 0) {
        console.log("日查询");
      }
      if (tab.index == 1) {
        console.log("月查询");
      }
    },
    /* 设置分页  */
    setPagings() {
      // 分页属性设置
      this.pagings.total = this.allTableData.length; // 数据长度
      this.pagings.pageIndex = 1;
      this.pagings.pageSize = 5;
      // 设置默认分页数据 条数
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagings.pageSize;
      });
    },
    /* 页面数据显示条数 */
    sizeChange(pageSize) {
      // 切换 页面显示数据条数
      this.pagings.pageIndex = 1;
      this.pagings.pageSize = pageSize;
      this.tableData = this.allTableData.filter((item, index) => {
        return index < this.pagings.pageSize;
      });
    },
    /* 跳转指定页面 */
    currentChange(page) {
      console.log(page);
      // 获取当前页
      let index = this.pagings.pageSize * (page - 1);
      // 数据总数
      let nums = this.pagings.pageSize * page;
      // 容器
      let count = [];
      for (let i = index; i < nums; i++) {
        if (this.allTableData[i]) {
          count.push(this.allTableData[i]);
        }
        this.tableData = count;
      }
    }
  }
};
</script>

<style scoped>
.content {
  position: relative;
  padding: 10px;
}
</style>