<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" :type="2" :info="deviceInfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <!-- <el-tab-pane label="历史数据" name="activity">
                <activity />
              </el-tab-pane> -->
              <el-tab-pane label="历史消息" name="timeline">
                <timeline :list="list" />
              </el-tab-pane>
              <!-- <el-tab-pane label="企业信息" name="account">
                <account :user="user" />
              </el-tab-pane> -->
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Activity from "./components/Activity";
import Timeline from "./components/Timeline";
import Account from "./components/Account";
import { fetchListmessageByDevice } from "@/api/device";

export default {
  name: "Profile",
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      deviceInfo: null,
      user: {},
      activeTab: "timeline",
      list: []
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  created() {
    this.getUser();
    this.deviceInfo = JSON.parse(localStorage.getItem("device"));
    this.getMessageList();
  },
  methods: {
    getMessageList() {
      this.listLoading = true;
      fetchListmessageByDevice({
        page: 1,
        limit: 10,
        serialNumber: this.deviceInfo.serialNumber,
        sort: "-1"
      }).then(response => {
        this.list = response.data;
      });
    },
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar
      };
    }
  }
};
</script>
