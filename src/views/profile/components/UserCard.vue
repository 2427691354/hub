<template>
  <div>
    <el-card v-if="type == 2" style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>设备信息</span>
      </div>

      <!-- <div class="user-profile">
        <div class="box-center">
          <el-image
            style="width: 100px; height: 100px"
            :src="machine"
            :preview-src-list="machineList"
          />
        </div>
      </div> -->
      <div class="user-profile">
        <div class="box-center">
          <el-image
            style="width: 100px; height: 100px"
            :src="machine"
            :preview-src-list="machineList"
          />
        </div>
        <div class="box-center">
          <!-- <div class="user-name text-center">{{ info.iiotCode }}</div> -->
          <div class="user-role text-center text-muted">
            {{ info.iiotCode | uppercaseFirst }}
          </div>
        </div>
      </div>

      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="identity" /><span>机器序列号</span>
          </div>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ info.serialNumber }}
            </div>
          </div>
          <div class="user-skills user-bio-section">
            <div class="user-bio-section-header">
              <svg-icon icon-class="skill" /><span>基本属性</span>
            </div>
            <div class="user-bio-section-body">
              <div class="progress-item">
                <span>数据推送ip:</span>
                {{ info.dataIp }}
              </div>
              <br />
              <div class="progress-item">
                <span>数据port:</span>
                {{ info.dataPort }}
              </div>
              <br />
              <div class="progress-item">
                <span>当前地址:</span>
                {{ info.deviceLocation }}
              </div>
            </div>
          </div>
        </div>
      </div></el-card
    >
    <!-- <el-card v-if="type == 2" style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>设备信息</span>
      </div>

      <div class="user-profile">
        <div class="box-center">
          <pan-thumb
            :image="user.avatar"
            :height="'100px'"
            :width="'100px'"
            :hoverable="false"
          >
            <div>Hello</div>
            {{ user.role }}
          </pan-thumb>
        </div>
        <div class="box-center">
          <div class="user-name text-center">{{ user.name }}</div>
          <div class="user-role text-center text-muted">
            {{ user.role | uppercaseFirst }}
          </div>
        </div>
      </div>

      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="education" /><span>Education</span>
          </div>
          <div class="user-bio-section-body">
            <div class="text-muted">
              JS in Computer Science from the University of Technology
            </div>
          </div>
        </div>

        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill" /><span>Skills</span>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <span>Vue</span>
              <el-progress :percentage="70" />
            </div>
            <div class="progress-item">
              <span>JavaScript</span>
              <el-progress :percentage="18" />
            </div>
            <div class="progress-item">
              <span>Css</span>
              <el-progress :percentage="12" />
            </div>
            <div class="progress-item">
              <span>ESLint</span>
              <el-progress :percentage="100" status="success" />
            </div>
          </div>
        </div>
      </div>
    </el-card> -->
    <el-card v-if="type == 1" style="margin-bottom:20px;">
      <div slot="header" class="clearfix">
        <span>基本信息</span>
      </div>

      <div class="user-profile">
        <div class="box-center">
          <!-- <el-image
            style="width: 100px; height: 100px"
            :src="code"
            :preview-src-list="codeList"
          /> -->

          <vue-qr
            :logo-src="logoSrc"
            :size="191"
            :margin="0"
            :auto-color="true"
            :dot-scale="1"
            :text="
              'http://snms.suyunplat.com/snms/ui/query?id=' + codeInfo.handle
            "
          />

          <!-- <pan-thumb
            :image="code"
            :height="'100px'"
            :width="'100px'"
            :hoverable="false"
          >
            <div>Hello</div>
            {{ user.role }}
          </pan-thumb> -->
        </div>
      </div>

      <div class="user-bio">
        <div class="user-education user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="identity" /><span>标识码</span>
          </div>
          <div class="user-bio-section-body">
            <div class="text-muted">
              {{ codeInfo.handle }}
            </div>
          </div>
        </div>

        <div class="user-skills user-bio-section">
          <div class="user-bio-section-header">
            <svg-icon icon-class="skill" /><span>基本属性</span>
          </div>
          <div class="user-bio-section-body">
            <div class="progress-item">
              <span>前缀:</span>
              {{ codeInfo.prefix }}
            </div>
            <br />
            <div class="progress-item">
              <span>模板类型:</span>
              {{ codeInfo.templateVersion }}
            </div>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import PanThumb from "@/components/PanThumb";
import VueQr from "vue-qr";
export default {
  components: { PanThumb, VueQr },
  props: {
    info: {
      type: Object,
      default: () => {
        return {
          id: undefined,
          serialNumber: "",
          deviceType: "",
          deviceLocation: "",
          iiotCode: "",
          dataIp: "",
          dataPort: ""
        };
      }
    },
    codeInfo: {
      type: Object
    },
    type: { type: Number },
    user: {
      type: Object,
      default: () => {
        return {
          name: "",
          email: "",
          avatar: "",
          role: ""
        };
      }
    }
  },
  data() {
    return {
      logoSrc: "",
      appSrc: "http://www.baidu.com",
      code: require("../../../assets/code.png"),
      codeList: [require("../../../assets/code.png")],
      machine: require("../../../assets/device03.jpg"),
      machineList: [
        require("../../../assets/device.png"),
        require("../../../assets/device02.jpg"),
        require("../../../assets/device03.jpg")
      ]
    };
  }
};
</script>

<style lang="scss" scoped>
.box-center {
  margin: 0 auto;
  display: table;
}

.text-muted {
  color: #777;
}

.user-profile {
  .user-name {
    font-weight: bold;
  }

  .box-center {
    padding-top: 10px;
  }

  .user-role {
    padding-top: 10px;
    font-weight: 400;
    font-size: 14px;
  }

  .box-social {
    padding-top: 30px;

    .el-table {
      border-top: 1px solid #dfe6ec;
    }
  }

  .user-follow {
    padding-top: 20px;
  }
}

.user-bio {
  margin-top: 20px;
  color: #606266;

  span {
    padding-left: 4px;
  }

  .user-bio-section {
    font-size: 14px;
    padding: 15px 0;

    .user-bio-section-header {
      border-bottom: 1px solid #dfe6ec;
      padding-bottom: 10px;
      margin-bottom: 10px;
      font-weight: bold;
    }
  }
}
</style>
