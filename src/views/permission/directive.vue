<template>
  <div class="app-container">
    <switch-roles @change="handleRolesChange" />
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          只有
          <el-tag class="permission-tag" size="small">管理员</el-tag>
        </span>
        <el-tag
          v-permission="['admin']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          只有
          <el-tag class="permission-tag" size="small">企业用户</el-tag> can see
          this
        </span>
        <el-tag
          v-permission="['editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['editor']"
        </el-tag>
      </div>

      <div>
        <span v-permission="['admin', 'editor']" class="permission-alert">
          <el-tag class="permission-tag" size="small">管理员</el-tag> and
          <el-tag class="permission-tag" size="small">企业用户</el-tag>
        </span>
        <el-tag
          v-permission="['admin', 'editor']"
          class="permission-sourceCode"
          type="info"
        >
          v-permission="['admin','editor']"
        </el-tag>
      </div>
    </div>

    <div :key="'checkPermission' + key" style="margin-top:60px;">
      <aside>
        在某些情况下，使用v-permission将无效。例如：Element-UI的Tab组件或el-table-column以及其他可动态渲染dom的场景。您只能使用v-if执行此操作。

        <br />
        例如
      </aside>

      <el-tabs type="border-card" style="width:550px;">
        <el-tab-pane v-if="checkPermission(['admin'])" label="Admin">
          管理员
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane v-if="checkPermission(['editor'])" label="Editor">
          企业用户
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['editor'])"
          </el-tag>
        </el-tab-pane>

        <el-tab-pane
          v-if="checkPermission(['admin', 'editor'])"
          label="Admin-OR-Editor"
        >
          管理员 or 企业用户
          <el-tag class="permission-sourceCode" type="info">
            v-if="checkPermission(['admin','editor'])"
          </el-tag>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import permission from "@/directive/permission/index.js"; // 权限判断指令
import checkPermission from "@/utils/permission"; // 权限判断函数
import SwitchRoles from "./components/SwitchRoles";

export default {
  name: "DirectivePermission",
  components: { SwitchRoles },
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    };
  },
  methods: {
    checkPermission,
    handleRolesChange() {
      this.key++;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-container {
  ::v-deep .permission-alert {
    width: 320px;
    margin-top: 15px;
    background-color: #f0f9eb;
    color: #67c23a;
    padding: 8px 16px;
    border-radius: 4px;
    display: inline-block;
  }
  ::v-deep .permission-sourceCode {
    margin-left: 15px;
  }
  ::v-deep .permission-tag {
    background-color: #ecf5ff;
  }
}
</style>
