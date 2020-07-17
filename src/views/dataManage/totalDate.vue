<style scoped>
/* .conTop {
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 20px;
}
.itemTop {
  margin: 20px 60px;
  width: 19.5%;
  height: 100px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
  background: white;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
} */
.totalDateContainer {
  position: relative;
}
.conBom {
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  align-content: space-around;
  align-items: center;
  border-bottom: 1px solid #e3e3e3;
  margin-bottom: 20px;
}
.itemBom {
  margin: 20px 20px;
  width: 19.5%;
  height: 100px;
  background: white;
  border: 1px solid #e3e3e3;
  border-radius: 5px;
}
.block {
  position: relative;
  margin-left: 10%;
}
.item {
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-direction: column;
}
.city {
  width: 150px;
}
</style>
 <!-- 此页面需要有数据才能写 -->
<template>
  <!-- 数据统计 -->
  <div class="totalDateContainer">
    <!-- 顶部的数据-->
    <!-- <div class="conBom">
      <div class="itemBom" v-for="(value,key,index) in topDataList" :key="index">
        <div class="item" v-if="key == 'allSaleMoney'">
          <div>总交易额</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSiteSaleMoney'">
          <div>砍价商品交易额</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
        <div class="item" v-if="key == 'directSaleMoney'">
          <div>抢购商品交易额</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSiteCount'">
          <div>砍价商品总数</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
        <div class="item" v-if="key == 'directCount'">
          <div>抢购商品总数</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSiteNum'">
          <div>商品总数</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
        <div class="item" v-if="key == 'userNum'">
          <div>用户总数</div>
          <div class="number">{{topDataList[key]}}</div>
        </div>
      </div>
    </div>-->

    <!-- <div class="topContainerOne topC">
        <div class="addtopc">
          <div>总交易额</div>
          <div class="number">{{dataslist.allSaleMoney?dataslist.allSaleMoney:0}}</div>
        </div>
        <div class="addtopc">
          <div>砍价商品交易额</div>
          <div class="number">{{dataslist.productSiteSaleMoney?dataslist.productSiteSaleMoney : 0}}</div>
        </div>
        <div class="addtopc">
          <div>普通商品交易额</div>
          <div class="number">{{dataslist.directSaleMoney?dataslist.directSaleMoney : 0}}</div>
        </div>
    </div>-->
    <!-- 说明：tp为砍价 cp为普通 -->
    <!-- <div class="topContainerTwo topC">
        <div class="addtopc">
          <div>砍价商品总数</div>
          <div class="number">{{ dataslist.productSiteCount?dataslist.productSiteCount:0}}</div>
        </div>
        <div class="addtopc">
          <div>普通商品总数</div>
          <div class="number">{{ dataslist.directCount?dataslist.directCount:0}}</div>
        </div>
        <div class="addtopc">
          <div>用户数量</div>
          <div class="number">{{ dataslist.userNum?dataslist.userNum:0}}</div>
        </div>
    </div>-->
    <!-- 下面的搜索的交易额 -->

    <div class="block">
      <el-input class="city" placeholder="城市" v-model="city" clearable></el-input>
      <el-date-picker
        v-model="valuetime"
        :picker-options="pickerOptions"
        type="datetimerange"
        value-format="yyyy-MM-dd HH:mm:ss"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        align="right"
      />
      <el-button type="primary" @click="searchDate">搜索</el-button>
      <!-- <el-button size="small" @click="thisDay">今天</el-button> -->
      <el-button :type="ins==0?'danger':''" size="small" @click="thisYesterday(0)">昨日</el-button>
      <el-button :type="ins==1?'danger':''" size="small" @click="thisWeek(1)">本周</el-button>
      <el-button :type="ins==2?'danger':''" size="small" @click="thisMonth(2)">本月</el-button>
      <el-button :type="ins==3?'danger':''" size="small" @click="thisYear(3)">本年</el-button>
    </div>
    <!-- 底部的数据-->
    <div class="conBom">
      <div class="itemBom" v-for="(value,key,index) in dataslist" :key="index">
        <div class="item" v-if="key == 'allSaleMoney'">
          <div>总交易额</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSiteSaleMoney'">
          <div>砍价商品交易额</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'directSaleMoney'">
          <div>抢购商品交易额</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSiteCount'">
          <div>砍价商品总数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'directCount'">
          <div>抢购商品总数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSiteNum'">
          <div>商品总数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'userNum'">
          <div>用户总数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'allSaleMoneyForDate'">
          <div>总销售额</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productSaleMoneyDate'">
          <div>砍价商品交易额</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'directSaleMoneyDate'">
          <div>抢购商品交易额</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'productOrder'">
          <div>砍价商品订单数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'directOrder'">
          <div>抢购商品订单数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'orderRefund'">
          <div>商品退款</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'payNum'">
          <div>付款人数/订单数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'visitPv'">
          <div>访客数</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'visitToOrder'">
          <div>访客转化率</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'orderToPay'">
          <div>下单转化率</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'payRate'">
          <div>付款转化率</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <div class="item" v-if="key == 'newUser'">
          <div>新用户销量／占比</div>
          <div class="number">{{dataslist[key]}}</div>
        </div>
        <!-- <div v-if="key == 'allSaleMoneyForDate'">总销售额</div>
          <div v-if="key == 'productSaleMoneyDate'">砍价商品交易额</div>
          <div v-if="key == 'directSaleMoneyDate'">抢购商品交易额</div> 
          <div v-if="key == 'productOrder'">砍价商品订单数</div>
          <div v-if="key == 'directOrder'">抢购商品订单数</div>
          <div v-if="key == 'orderRefund'">商品退款</div>
          <div v-if="key == 'payNum'">付款人数/订单数</div>
          <div v-if="key == 'visitPv'">访客数</div>
          <div v-if="key == 'visitToOrder'">访客转化率</div>
          <div v-if="key == 'orderToPay'">下单转化率</div>
          <div v-if="key == 'payRate'">付款转化率</div>
          <div v-if="key == 'newUser'">新用户销量／占比</div>
        <div class="number">{{value}}</div>-->
      </div>
    </div>

    <!-- <div class="topContainer"> -->
    <!-- <div class="topContainerOne topC topB">
          <div class="addtopc" style="background-color: white">
            <div>总交易额</div>
            <div
              class="number numberRed"
            >{{ dataslist.allSaleMoneyForDate? dataslist.allSaleMoneyForDate:0 }}</div>
          </div>
          <div class="addtopc" style="background-color: white">
            <div>砍价商品交易额</div>
            <div
              class="number numberRed"
            >{{ dataslist.productSaleMoneyDate? dataslist.productSaleMoneyDate:0 }}</div>
          </div>
          <div class="addtopc" style="background-color: white">
            <div>砍价商品订单数</div>
            <div class="number numberRed">{{ dataslist.directtOrder? dataslist.directtOrder:0 }}</div>
          </div>
          <div class="addtopc" style="background-color: white">
            <div>普通商品交易额</div>
            <div
              class="number numberRed"
            >{{ dataslist.directSaleMoneyDate? dataslist.directSaleMoneyDate:0 }}</div>
          </div>
    </div>-->
    <!-- 二级的开始位置 -->
    <!-- <div class="topContainerTwo topC topB">
          <div class="addtopc">
            <div>普通商品订单数</div>
            <div class="number numberRed">{{ dataslist.productOrder?dataslist.productOrder:0 }}</div>
          </div>
          <div class="addtopc">
            <div>新用户销量/占比</div>
            <div class="number numberRed">{{ dataslist.newUser?dataslist.newUser:0 }}</div>
          </div>
          <div class="addtopc">
            <div>付款人数/订单数</div>
            <div class="number numberRed">{{ dataslist.payNum?dataslist.payNum:0 }}</div>
          </div>
          <div class="addtopc">
            <div>访客数</div>
            <div class="number numberRed">{{ dataslist.visiterPv?dataslist.visiterPv:0 }}</div>
          </div>
    </div>-->
    <!--三级开始的位置-->
    <!-- <div class="topContainerTwo topC">
          <div class="addtopc">
            <div>访客转化率</div>
            <div class="number numberRed">{{ dataslist.visiterToOrder?dataslist.visiterToOrder:0}}</div>
          </div>
          <div class="addtopc">
            <div>下单转换率</div>
            <div class="number numberRed">{{ dataslist.orderToPay?dataslist.orderToPay:0 }}</div>
          </div>
          <div class="addtopc">
            <div>付款转换率</div>
            <div class="number numberRed">{{ dataslist.payRate?dataslist.payRate:0 }}</div>
          </div>
          <div class="addtopc">
            <div>商品订单退款</div>
            <div class="number numberRed">{{ dataslist.orderRefund?dataslist.orderRefund:0 }}</div>
          </div>
    </div>-->
    <!-- </div> -->
  </div>
</template>
<script>
import { allData } from "@/api/data";

export default {
  data() {
    return {
      // 返回的顶部的数据
      topData: "",
      // 底部的请求的带有时间的返回的数据
      bottomData: {},
      // 事件组件选定事件以后的数据
      timeData: [],
      // 开始事件
      beginDate: "",
      // 结束事件
      endDate: "",
      valueDate: "",
      ins: 0,
      // 斜杠
      lineF: "/",
      vipDividAccount: "",
      // 新数据
      createdTimeStart: null,
      createdTimeEnd: null,
      valuetime: null,
      pickerOptions: {
        shortcuts: [
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      city: "",
      dataslist: {
        allSaleMoney: 20, // 总交易额
        productSiteSaleMoney: 152.3, //砍价商品交易额
        directSaleMoney: 156.21, //抢购商品交易额
        productSiteCount: 50, //砍价商品总数
        directCount: 20, //抢购商品总数
        productSiteNum: 10, //商品总数
        userNum: 30, //用户总数
        //
        allSaleMoneyForDate: 321, //总销售额  --按时间查询
        productSaleMoneyDate: 6541, //砍价商品交易额  --按时间查询
        directSaleMoneyDate: 215, //抢购商品交易额  --按时间查询
        productOrder: 20, //砍价商品订单数  --按时间查询
        directOrder: 54, //抢购商品订单数  --按时间查询
        orderRefund: 21, //商品退款  --按时间查询
        payNum: 43, //付款人数/订单数  --按时间查询
        visitPv: 21, //访客数  --按时间查询
        visitToOrder: "12%", //访客转化率  --按时间查询
        orderToPay: "21%", //下单转化率  --按时间查询
        payRate: "54%", //付款转化率  --按时间查询
        newUser: "20%" //新用户销量／占比  --按时间查询
      },
      topDataList: {}
    };
  },
  watch: {},
  beforeCreate() {},
  created() {
    // 对象解构并赋值到另一个对象
    this.topDataList = (({
      allSaleMoney,
      productSiteSaleMoney,
      directSaleMoney, //抢购商品交易额
      productSiteCount, //砍价商品总数
      directCount, //抢购商品总数
      productSiteNum, //商品总数
      userNum //用户总数
    }) => ({
      allSaleMoney,
      productSiteSaleMoney,
      directSaleMoney, //抢购商品交易额
      productSiteCount, //砍价商品总数
      directCount, //抢购商品总数
      productSiteNum, //商品总数
      userNum //用户总数
    }))(this.dataslist);

    // console.log(this.topDataList, this.dataslist);
    this.thisYesterday(0);
    this.getData();
  },
  mounted() {},
  updated() {},

  methods: {
    // 获取一日数据
    getontime() {
      var day1 = new Date();
      day1.setTime(day1.getTime() - 3600 * 1000 * 24 * 7);
      var s1 =
        day1.getFullYear() +
        "-" +
        (day1.getMonth() + 1) +
        "-" +
        day1.getDate() +
        " " +
        "00:00:00";
      this.createdTimeStart = s1;
      var day2 = new Date();
      day2.setTime(day2.getTime());
      var s2 =
        day2.getFullYear() +
        "-" +
        (day2.getMonth() + 1) +
        "-" +
        day2.getDate() +
        " " +
        "00:00:00";
      this.createdTimeEnd = s2;
      console.log("s1", this.valuetime);
      this.valuetime = [this.createdTimeStart, this.createdTimeEnd];
    },
    get_str_time(time) {
      var datetime = new Date();
      datetime.setTime(time);
      var year = datetime.getFullYear();
      var month =
        datetime.getMonth() + 1 < 10
          ? "0" + (datetime.getMonth() + 1)
          : datetime.getMonth() + 1;
      var date =
        datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
      var hour =
        datetime.getHours() < 10
          ? "0" + datetime.getHours()
          : datetime.getHours();
      var minute =
        datetime.getMinutes() < 10
          ? "0" + datetime.getMinutes()
          : datetime.getMinutes();
      var second =
        datetime.getSeconds() < 10
          ? "0" + datetime.getSeconds()
          : datetime.getSeconds();
      return (
        year +
        "-" +
        month +
        "-" +
        date +
        " " +
        hour +
        ":" +
        minute +
        ":" +
        second
      );
    },
    // 获取界面的数据的接口
    getData() {
      let data = {
        city: this.city,
        startTime: this.createdTimeStart,
        endTime: this.createdTimeEnd
      };
      console.log("--------------", data);
      allData(data).then(res => {
        console.log("res", res);
        // this.dataslist = res.list;
      });
    },
    // 搜索按钮
    searchDate() {
      console.log(this.valuetime);
      if (this.valuetime == null) {
        this.$message({
          type: "warning",
          message: "请输入搜索字段"
        });
        return false;
      }
      this.createdTimeStart = this.valuetime[0];
      this.createdTimeEnd = this.valuetime[1];

      this.getData();
      this.ins = "5";
    },
    // 今
    // 昨天
    thisYesterday(ins) {
      this.ins = ins;
      // 获取昨天的零点的时间戳
      var firstTime = new Date();
      firstTime.setHours(24);
      firstTime.setMinutes(0);
      firstTime.setSeconds(0);
      firstTime.setMilliseconds(0);
      firstTime = firstTime.getTime();
      console.log(firstTime);
      firstTime = firstTime - 24 * 60 * 60 * 1000 * 2;
      firstTime = this.get_str_time(firstTime);
      console.log("昨天的0点的时间戳");
      console.log(firstTime);
      this.createdTimeStart = firstTime;

      // 昨天的24点的时间
      var endTime = new Date();
      endTime.setHours(24);
      endTime.setMinutes(0);
      endTime.setSeconds(0);
      endTime.setMilliseconds(0);
      endTime = endTime.getTime();
      endTime = endTime - 24 * 60 * 60 * 1000;
      endTime = this.get_str_time(endTime);
      console.log("昨天的24点的时间戳");
      console.log(endTime);
      this.createdTimeEnd = endTime;
      this.getData();
    },
    // // 本周
    thisWeek(ins) {
      this.ins = ins;
      var firstTime = new Date();
      let num = firstTime.getDay();
      if (num == 0) {
        num = 7;
      } else if (num == 6) {
      }
      console.log(num);
      firstTime.setHours(24);
      firstTime.setMinutes(0);
      firstTime.setSeconds(0);
      firstTime.setMilliseconds(0);
      firstTime = firstTime.getTime();
      console.log(firstTime);
      firstTime = firstTime - 24 * 60 * 60 * 1000 * num;
      firstTime = this.get_str_time(firstTime);
      console.log(firstTime);
      this.createdTimeStart = firstTime;
      var endTime = new Date();
      this.createdTimeEnd = this.get_str_time(endTime);
      this.getData();
    },
    // // 本月
    thisMonth(ins) {
      this.ins = ins;
      var firstTime = new Date();
      firstTime.setDate(1);
      firstTime.setHours(0);
      firstTime.setMinutes(0);
      firstTime.setSeconds(0);
      firstTime.setMilliseconds(0);
      firstTime = firstTime.getTime();
      firstTime = this.get_str_time(firstTime);
      console.log("本月第一天的0点的时间戳");
      console.log(firstTime);
      this.createdTimeStart = firstTime;

      // 本月里现在的时间 结束时间
      var endTime = new Date();
      this.createdTimeEnd = this.get_str_time(endTime);
      console.log("本月里今天的现在时间");
      this.getData();
    },
    // 本年
    thisYear(ins) {
      this.ins = ins;
      var firstTime = new Date();
      firstTime.setDate(1);
      firstTime.setMonth(0);
      firstTime.setHours(0);
      firstTime.setMinutes(0);
      firstTime.setSeconds(0);
      firstTime.setMilliseconds(0);
      firstTime = firstTime.getTime();
      firstTime = this.get_str_time(firstTime);
      console.log("本月第一天的0点的时间戳");
      console.log(firstTime);
      this.createdTimeStart = firstTime;

      var endTime = new Date();
      this.createdTimeEnd = this.get_str_time(endTime);
      this.getData();
    }
  }
};
</script>

