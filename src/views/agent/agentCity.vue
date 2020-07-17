<!-- 不能做分页处理 -->
<template>
  <div class="content">
    <!-- 搜索框 -->
    <div>
      <el-input placeholder="输入城市名" v-model="params.city" clearable style="width:150px"></el-input>
      <el-button type="primary" @click="search">查询</el-button>
      <el-button type="primary" @click="addCity">添加城市</el-button>
    </div>

    <!-- 表格 -->
    <list-table
      :tableData="tableData"
      :pageSize="params.size"
      :pageSizes="pageSizes"
      @handleEdit="handleEdit"
      @pageChange="pageChange"
      @changeSize="changeSize"
    ></list-table>
    <!-- 弹出框 -->
    <el-dialog title="修改信息" :visible.sync="isProp">
      <el-form :model="form">
        <!-- <el-form-item label="城市" :label-width="formLabelWidth">
          <el-input v-model="form.city" autocomplete="off"></el-input>
        </el-form-item>-->
        <el-form-item label="佣金比例" :label-width="formLabelWidth">
          <el-input v-model="form.rate" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="isProp = false">取 消</el-button>
        <el-button type="primary" @click="submitProp">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import listTable from "./component/cityTable";
import { adminList, removeAdmin, editAdmin } from "@/api/agent";
export default {
  name: "agentCity",
  components: { listTable },
  data() {
    return {
      formLabelWidth: "150px",
      tableData: [
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市",
          bb: "bbbb",
          cc: "cccc"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡省"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡县"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        },
        {
          id: "123123",
          createdTime: "2020-10-01",
          unsettledMoney: 123.32, // 待结算
          usedttledMoney: 45654.15, // 已结算
          city: "无锡市"
        }
      ],
      form: [],
      isProp: false,
      params: {
        city: "", // 搜索框输入内容
        page: 1, // 当前是第几页
        size: 10 // 每页显示条数
      },
      pageSizes: [10, 20, 30, 40], // 每页可显示数据条数
      allSize: 20, // 数据总长度 需要修改
      editIndex: null // 修改项的数组下标
    };
  },
  created() {
    this.adminList(this.params);
  },
  /* 此页面在做分页数据请求的时候  要带上 city */
  methods: {
    addCity() {},
    // 删除或者编辑信息方法
    handleEdit(val, n) {
      if (n) {
        // 删除
        removeAdmin(val.id).then(res => {
          if (res.code == 200) {
            this.$message({ message: "删除成功", type: "success" });
            this.adminList(this.params); // 请求数据
          } else this.$message({ message: "删除失败", type: "error" });
        });
      } else {
        // 编辑
        console.log(val);
        this.isProp = true;
        this.form = val;
        //this.editIndex = index; // 修改数组下标
      }
      // console.log(index);
    },
    // 弹出框提交
    submitProp() {
      let data = this.tableData[this.editIndex];
      data.city = this.form.city;
      data.rate = this.form.rate;
      console.log(data);
      // 发送请求
      editAdmin(data).then(res => {
        if (res.code == 200) {
          this.$message({
            message: "修改成功",
            type: "success"
          });
          // 网络请求
          this.adminList(this.params);
        }
        console.log(res);
      });
    },
    // 搜索
    search() {
      // 搜索后 重新排序
      // this.pageIndex = 1;
      this.params.page = 1;
      // let params = {
      //   city: this.input,
      //   page: this.pageIndex,
      //   pageSize: this.pageSize
      // };
      this.adminList(this.params);
      console.log(this.params.city);
    },
    // 页码改变
    pageChange(index) {
      this.params.page = index;
      this.adminList(this.params);
    },
    // 显示数据条数改变
    changeSize(index) {
      this.params.size = index;
      this.adminList(this.params);
    },
    // 请求数据方法
    adminList(params) {
      adminList(params).then(res => {
        if (res.data && res.data.length) {
          // 对获取数据进行处理
          // this.tableData = res.data;
          // this.allSize = res.toolCount;
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
</style>