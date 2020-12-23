<template>
  <div class="app-container">
    <div v-if="user">
      <el-row :gutter="20">
        <el-col :span="6" :xs="24">
          <user-card :user="user" :type="1" :code-info="codeInfo" />
        </el-col>

        <el-col :span="18" :xs="24">
          <el-card>
            <el-tabs v-model="activeTab">
              <el-tab-pane label="标识信息" name="activity" />
              <activity :value="codeInfo" />
            </el-tabs>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { queryCode } from "@/api/code";
import * as model from "@/api/model";

import { mapGetters } from "vuex";
import UserCard from "./components/UserCard";
import Activity from "./components/Activity";
import Timeline from "./components/Timeline";
import Account from "./components/Account";

export default {
  name: "Profile",
  components: { UserCard, Activity, Timeline, Account },
  data() {
    return {
      user: {},
      activeTab: "activity",
      handle: "",
      codeInfo: {},
      modelListObject: [],
      modelList: []
    };
  },
  computed: {
    ...mapGetters(["name", "avatar", "roles"])
  },
  created() {
    this.getUser();

    this.handle = localStorage.getItem("handle");
    queryCode(this.handle).then(response => {
      this.codeInfo = JSON.parse(response.msg);
      this.codeInfo.value = this.codeInfo.value.slice(0);
      this.codeInfo.value.shift();
      this.handleSelectModel2(this.codeInfo.templateVersion);
    });
  },
  methods: {
    getUser() {
      this.user = {
        name: this.name,
        role: this.roles.join(" | "),
        email: "admin@test.com",
        avatar: this.avatar
      };
    },
    handleSelectModel2(val) {
      var query = {
        page: 1,
        limit: 20,
        version: val
      };
      model.fetchList(query).then(response => {
        this.modelListObject = response.data[0].list;
      });
      model.fetchList(query).then(response => {
        this.modelListObject = response.data[0].list;
        this.codeInfo.value.forEach((element, index) => {
          this.modelListObject.forEach(item => {
            if (item.idType == element.type) {
              this.$set(element, "name", item.name);
            }
          });
          // this.$set(element, "data", {
          //   format: "string",
          //   value: element.data.value
          // });
          // this.$set(element, "index", 2000 + index);
          // this.$set(element, "auth", "");
          // this.$set(element, "type", element.type);
        });
      });
    }
  }
};
</script>
