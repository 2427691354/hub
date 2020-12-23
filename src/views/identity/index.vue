<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.conditions"
        placeholder=""
        style="width: 200px;"
        class="filter-item"
        clearable
        @keyup.enter.native="handleFilter"
      />

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        注册
      </el-button>
      <!-- <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        导出
      </el-button> -->
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
    >
      <el-table-column type="selection" width="55" />

      <el-table-column
        label="标识码"
        prop="id"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span>{{ row.handle }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板类型" align="center" sortable="custom">
        <template slot-scope="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>
      <el-table-column
        v-if="showReviewer"
        label="Reviewer"
        width="110px"
        align="center"
      >
        <template slot-scope="{ row }">
          <span style="color:red;">{{ row.reviewer }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属机器序列号" class-name="status-col">
        <template slot-scope="{ row }">
          <!-- <el-tag :type="row.status | statusFilter">

          </el-tag> -->
          {{ row.serialNumber }}
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        width="230"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button>
          <el-button type="success" size="mini">
            <router-link
              :to="{ path: '/identity/profile' }"
              @click.native="toDetail(row.handle)"
              >查看详情</router-link
            >
          </el-button>

          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row.handle)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form
        ref="dataForm"
        :rules="rules"
        :model="temp"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="标识码" prop="handle">
          <el-input
            v-model="temp.handle"
            :disabled="dialogStatus == 'update'"
          />
        </el-form-item>
        <el-form-item label="模板选择" prop="templateVersion">
          <el-select
            v-model="temp.templateVersion"
            class="filter-item"
            placeholder="请选择"
            @change="handleSelectModel"
          >
            <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <hr />
        <template v-for="(item, index) in temp.value">
          <el-form-item
            :label="item.name"
            prop="item"
            :rules="{
              required: item.required,
              message: item.name + '不能为空',
              trigger: 'blur'
            }"
          >
            <el-input
              v-model="item.data.value"
              :minlength="item.metadataMin"
              :maxlength="item.metadataMax"
              show-word-limit
            />
          </el-form-item>
        </template>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          取消
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          确定
        </el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pv" label="Pv" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPvVisible = false"
          >Confirm</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createCode,
  updateCode,
  deleteCode,
  queryCode
} from "@/api/code";
import * as model from "@/api/model";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

export default {
  name: "ComplexTable",
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: "success",
        draft: "info",
        deleted: "danger"
      };
      return statusMap[status];
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type];
    }
  },
  data() {
    return {
      test: "",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        conditions: undefined,
        sort: "1"
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      sortOptions: [
        { label: "ID Ascending", key: "1" },
        { label: "ID Descending", key: "-1" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        handle: "",
        templateVersion: "",
        deviceId: null,
        value: []
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "标识修改",
        create: "标识注册"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        handle: [
          { required: true, message: "标识码不能为空", trigger: "change" }
        ],
        templateVersion: [
          {
            type: "date",
            required: true,
            message: "请选择模板",
            trigger: "change"
          }
        ]
      },
      downloadLoading: false,
      modelList: [],
      modelListObject: [],
      items: []
    };
  },
  created() {
    this.getList();
    this.getModelList();
  },
  methods: {
    toDetail(handle) {
      localStorage.setItem("handle", handle);
    },
    createIndex() {
      var index = Math.ceil(Math.random() * 5000);
      if (index == 1001) {
        this.createIndex();
      }
      return index;
    },
    handleSelectModel(val) {
      this.modelList.forEach(item => {
        if (item.value == val) {
          this.temp.version = item.label;
        }
      });
      var query = {
        page: 1,
        limit: 20,
        id: val
      };
      model.fetchList(query).then(response => {
        this.temp.value = response.data[0].list;
        this.temp.value.forEach((element, index) => {
          this.$set(element, "data", {
            format: element.metadataType,
            value: ""
          });
          this.$set(element, "index", 2000 + index);
          this.$set(element, "auth", "");
          this.$set(element, "type", element.idType);
        });
      });
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
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data;
        this.total = response.total;
        this.listLoading = false;
      });
    },
    getModelList() {
      model.fetchList(this.listQuery).then(response => {
        response.data.forEach((element, index) => {
          this.modelList.push({ value: element.id, label: element.version });
        });
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作Success",
        type: "success"
      });
      row.status = status;
    },
    sortChange(data) {
      const { prop, order } = data;
      if (prop === "id") {
        this.sortByID(order);
      }
    },
    sortByID(order) {
      if (order === "ascending") {
        this.listQuery.sort = "+id";
      } else {
        this.listQuery.sort = "-id";
      }
      this.handleFilter();
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        handle: "",
        version: "",
        templateVersion: "",
        deviceId: null,
        value: []
      };
    },
    handleCreate() {
      this.resetTemp();
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    createData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          createCode(this.temp).then(() => {
            console.log(this.temp);
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleUpdate(row) {
      this.handleSelectModel2(row.version);
      this.temp = Object.assign({}, row); // copy obj
      queryCode(row.handle).then(response => {
        this.temp.value = JSON.parse(response.msg).value;
        this.temp.value = this.temp.value.slice(0);
        this.temp.value.shift();
        this.temp.value.forEach((element, index) => {
          this.modelListObject.forEach(item => {
            if (item.idType == element.type) {
              this.$set(element, "name", item.name);
            }
          });
          this.$set(element, "data", {
            format: "string",
            value: element.data.value
          });
          this.$set(element, "index", 2000 + index);
          this.$set(element, "auth", "");
          this.$set(element, "type", element.type);
        });
        // this.$notify({
        //   title: "成功",
        //   message: "删除成功",
        //   type: "success",
        //   duration: 2000
        // });
        // this.getList();
      });
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate();
      });
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp);
          tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
          updateCode(tempData).then(() => {
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          });
        }
      });
    },
    handleDelete(handle) {
      deleteCode(handle).then(response => {
        this.$notify({
          title: "成功",
          message: "删除成功",
          type: "success",
          duration: 2000
        });
        this.getList();
      });
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData;
        this.dialogPvVisible = true;
      });
    },
    handleDownload() {
      this.downloadLoading = true;
      import("@/vendor/Export2Excel").then(excel => {
        const tHeader = ["timestamp", "title", "type", "importance", "status"];
        const filterVal = [
          "timestamp",
          "title",
          "type",
          "importance",
          "status"
        ];
        const data = this.formatJson(filterVal);
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: "table-list"
        });
        this.downloadLoading = false;
      });
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === "timestamp") {
            return parseTime(v[j]);
          } else {
            return v[j];
          }
        })
      );
    },
    getSortClass: function(key) {
      const sort = this.listQuery.sort;
      return sort === `+${key}` ? "ascending" : "descending";
    }
  }
};
</script>
