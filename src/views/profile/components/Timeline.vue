<template>
  <div class="block">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) of list"
        :key="index"
        :timestamp="item.receDate"
        placement="top"
      >
        <el-card>
          <h4>{{ trim(item).CMD }}</h4>
          <p>{{ trim(item).MES }}</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array
    }
  },
  data() {
    return {
      timeline: []
    };
  },
  mounted() {
    // console.log(this.list);
    // this.list.forEach(item => {
    //   this.timeline = [];
    //   this.timeline.push({
    //     timestamp: item.receDate,
    //     title: item.message,
    //     content: item.message
    //   });
    // });
    // console.log(this.timeline);
  },
  methods: {
    trim(val) {
      var str = val.message;
      var object = {};
      str.slice(2, -1);
      str.substring(1, str.length - 2);
      if (JSON.parse(str).CMD == "logon") {
        object.CMD = "注册标识";
        object.MES = "证书 : " + JSON.parse(str).CA;
      }
      if (JSON.parse(str).CMD == "query") {
        object.CMD = "查询数据服务器地址（IP+端口）";
        object.MES = "";
      }
      if (JSON.parse(str).CMD == "data") {
        object.CMD = "数据上报";
        object.MES = "共计" + val.count + "条";
      }
      return object;
    },
    trim2(str) {
      str.slice(2, -1);
      str.substring(1, str.length - 2);
      JSON.parse(str);

      return JSON.parse(str).CMD;
    }
  }
};
</script>
