<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.conditions"
        placeholder=""
        style="width: 200px;"
        class="filter-item"
        clearable
        @change="handleFilter"
      />

      <el-select
        v-model="listQuery.deviceType"
        class="filter-item"
        placeholder="模板类型"
        clearable
        @change="handleFilter"
      >
        <el-option
          v-for="item in modelList"
          :key="item.value"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <!-- <el-select
        v-model="listQuery.deviceType"
        placeholder="所属公司"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in calendarTypeOptions"
          :key="item.key"
          :label="item.display_name + '(' + item.key + ')'"
          :value="item.key"
        />
      </el-select> -->

      <el-select
        v-model="listQuery.iiotCode"
        filterabl
        placeholder="赋码状态"
        clearable
        class="filter-item"
        style="width: 130px"
        @change="handleFilter"
      >
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
      </el-button>

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        @click="handleSignupCodeBatch"
      >
        批量赋码
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
      <el-select
        v-model="entId"
        filterable
        placeholder="请选择公司"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in entList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="warning"
        @click="handleDistribution"
      >
        批量分配企业
      </el-button>

      <!-- <upload-excel-component
        :on-success="handleSuccess"
        :before-upload="beforeUpload"
      /> -->

      <el-upload
        ref="upload"
        class="upload-demo"
        accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
        :limit="1"
        :on-success="handleAvatarSuccess"
        :on-preview="handlePreview"
        :on-remove="handleRemove"
        :file-list="fileList"
        :before-upload="beforeAvatarUpload"
        action="#"
      >
        <!-- <el-button slot="trigger" type="primary" @click="downTemplate"
          >下载模板</el-button
        > -->

        <el-button slot="trigger" type="primary">选择excel</el-button>
        <el-button
          style="margin-left: 10px;"
          type="success"
          @click="submitUpload"
          >excel导入</el-button
        >
        <el-link type="danger" href="./temp.xlsx" download>下载模板</el-link>
      </el-upload>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      :row-key="getRowKeys"
      highlight-current-row
      style="width: 100%;"
      @sort-change="sortChange"
      @selection-change="onTableSelectAll"
    >
      <el-table-column type="selection" width="55" :reserve-selection="true" />
      <el-table-column
        label="设备序列号"
        prop="id"
        align="center"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.serialNumber
          }}</span>
        </template>
      </el-table-column>

      <el-table-column label="模板名" width="95">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.title
          }}</span>
          <el-tag>{{ row.deviceType }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="工业标识码" align="center" min-width="160">
        <template slot-scope="{ row }">
          <span>{{ row.iiotCode }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属公司" align="center" min-width="120">
        <template slot-scope="{ row }">
          <span>{{ row.entName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="设备生产时间" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deviceProductionTime | parseTime }} </span>
        </template>
      </el-table-column>
      <el-table-column label="设备当前位置" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.deviceLocation }} </span>
        </template>
      </el-table-column>
      <el-table-column label="数据推送ip地址" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.dataIp }}</span>
        </template>
      </el-table-column>
      <el-table-column label="数据推送端口号" width="120px" align="center">
        <template slot-scope="{ row }">
          <span>{{ row.dataPort }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        width="250px"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <el-button
            type="primary"
            size="mini"
            :disabled="row.iiotCode != null && row.iiotCode != ''"
            @click="handleSignupCode(row)"
          >
            赋码
          </el-button>

          <el-button type="success" size="mini">
            <router-link
              :to="{ path: '/machine/profile' }"
              @click.native="toDetail(row)"
              >查看详情</router-link
            >
          </el-button>

          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row.id)"
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
        label-width="120px"
        style="width: 400px; margin-left:50px;"
      >
        <el-form-item label="设备序列号" prop="serialNumber">
          <el-input v-model="temp.serialNumber" />
        </el-form-item>
        <el-form-item label="类型" prop="deviceType">
          <el-select
            v-model="temp.deviceType"
            class="filter-item"
            placeholder="请选择"
          >
            <el-option
              v-for="item in modelList"
              :key="item.value"
              :label="item.label"
              :value="item.label"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="当前地址" prop="deviceLocation">
          <el-input v-model="temp.deviceLocation" />
        </el-form-item>
        <el-form-item label="生产时间" prop="deviceProductionTime">
          <el-date-picker
            v-model="temp.deviceProductionTime"
            type="datetime"
            value-format="yyyy-MM-dd HH:mm:ss"
            placeholder="选择日期时间"
          />
        </el-form-item>
        <el-form-item label="数据推送ip地址" prop="dataIp">
          <el-input v-model="temp.dataIp" />
        </el-form-item>
        <el-form-item label="数据推送端口号" prop="dataPort">
          <el-input v-model="temp.dataPort" />
        </el-form-item>
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
import UploadExcelComponent from "@/components/UploadExcel/index.vue";
import { createCode } from "@/api/code";

import {
  fetchList,
  fetchPv,
  createDevice,
  updateDevice,
  deleteDevice,
  unique,
  updateEntIdByIdS
} from "@/api/device";
import * as fetchEntList from "@/api/ent";
import * as model from "@/api/model";
import waves from "@/directive/waves"; // waves directive
import { parseTime } from "@/utils";
import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

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
    }
  },
  data() {
    return {
      modelList: [],
      fileList: [],
      entList: [],
      options: [
        {
          value: "",
          label: "全部"
        },
        {
          value: "undefined1",
          label: "已赋码"
        },
        {
          value: "undefined",
          label: "未赋码"
        }
      ],
      value: "",
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        deviceType: null,
        conditions: undefined,
        iiotCode: "",
        sort: "1"
      },
      listQuery2: { sort: "1", page: 1, limit: 20 },
      sortOptions: [
        { label: "ID Ascending", key: "1" },
        { label: "ID Descending", key: "-1" }
      ],
      statusOptions: ["published", "draft", "deleted"],
      showReviewer: false,
      temp: {
        id: undefined,
        serialNumber: "",
        deviceType: "",
        deviceLocation: "",
        deviceProductionTime: "",
        iiotCode: "",
        dataIp: "",
        dataPort: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "设备信息",
        create: "新增设备"
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        serialNumber: [
          { required: true, message: "序列号不能为空", trigger: "blur" }
        ],
        deviceType: [
          {
            required: true,
            message: "设备类型不能为空",
            trigger: "change"
          }
        ],
        deviceLocation: [
          { required: true, message: "设备位置不能为空", trigger: "blur" }
        ],
        deviceProductionTime: [
          { required: true, message: "设备生产时间不能为空", trigger: "blur" }
        ],
        dataIp: [
          { required: true, message: "推送ip不能为空", trigger: "blur" }
        ],
        dataPort: [
          { required: true, message: "推送端口不能为空", trigger: "blur" }
        ]
      },
      downloadLoading: false,
      multipleSelection: [],
      multipleSelectionObject: [],
      entId: null,
      code: {}
    };
  },
  created() {
    this.getList();
    this.getModelList();
    this.getEntList();
  },
  methods: {
    toDetail(row) {
      localStorage.setItem("device", JSON.stringify(row));
    },
    handleSignupCodeBatch() {
      this.multipleSelectionObject.forEach(item => {
        this.handleSignupCode(item);
      });
    },
    handleSignupCode(val) {
      this.modelList.forEach(item => {
        if (item.label == val.deviceType) {
          this.code.templateVersion = item.value;
        }
      });
      var query = {
        page: 1,
        limit: 20,
        version: val.deviceType
      };
      model.fetchList(query).then(response => {
        this.code.deviceId = val.id;
        this.code.handle =
          response.data[0].prefix +
          "/" +
          val.deviceType +
          "." +
          val.serialNumber;
        this.code.version = response.data[0].version;
        this.code.value = response.data[0].list;
        this.code.value.forEach((element, index) => {
          this.$set(element, "data", {
            format: element.metadataType,
            value: val[element.idType]
          });
          this.$set(element, "index", 2000 + index);
          this.$set(element, "auth", "");
          this.$set(element, "type", element.idType);
        });
        unique(this.code).then(() => {
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: val.serialNumber + "赋码成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        });
      });
    },
    getModelList() {
      model.fetchList(this.listQuery).then(response => {
        response.data.forEach((element, index) => {
          this.modelList.push({ value: element.id, label: element.version });
        });
      });
    },
    handleAvatarSuccess(response, file, fileList) {
      console.log(response);
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePreview(file) {
      console.log(file);
    },
    submitUpload() {
      if (this.fileList.length == 0) {
        this.$notify({
          title: "警告",
          message: "请先选择",
          type: "warning",
          duration: 2000
        });
      } else {
        this.uuu();
        this.fileList = [];
        this.$refs.upload.clearFiles();
      }
    },
    beforeAvatarUpload(file) {
      var fileName = new Array();
      fileName = file.name.split(".");
      const extension = fileName[fileName.length - 1] === "xls";
      const extension2 = fileName[fileName.length - 1] === "xlsx";
      const isLt2M = file.size / 1024 / 1024 < 10;
      if (!extension && !extension2) {
        this.$message({
          message: "上传模板只能是xls、xlsx格式!",
          type: "warning"
        });
        //                    console.log('上传模板只能是xls、xlsx格式!')
      }
      if (!isLt2M) {
        this.$message({
          message: "上传模板大小不能超过 10MB!",
          type: "warning"
        });
        //                    console.log('上传模板大小不能超过 10MB!')
      }
      if (extension || (extension2 && isLt2M == true)) {
        this.fileList.push(file);
      }
      return false;
    },
    uuu() {
      var xhr = new XMLHttpRequest();
      var formData = new FormData();
      formData.append("file", this.fileList[0]);
      xhr.open("post", "/hub-api/device/import"); // url填写后台的接口地址，如果是post，在formData append参数（参考原文地址）
      xhr.responseType = "blob";
      xhr.onload = function(e) {
        if (this.status == 200) {
          var blob = this.response;
          var filename = "异常数据（修改重新再次上传）.xls";
          if (window.navigator.msSaveOrOpenBlob) {
            navigator.msSaveBlob(blob, filename);
          } else {
            // 非IE下载
            const elink = document.createElement("a");
            elink.download = filename;
            elink.style.display = "none";
            elink.href = URL.createObjectURL(blob);
            document.body.appendChild(elink);
            elink.click();
            URL.revokeObjectURL(elink.href); // 释放URL 对象
            document.body.removeChild(elink);
          }
        }
      };
      this.$notify({
        title: "成功",
        message: "导入成功，请查看反馈",
        type: "success",
        duration: 2000
      });
      this.getList();
      xhr.send(formData);
    },
    getEntList() {
      fetchEntList.fetchList(this.listQuery2).then(response => {
        response.data.forEach((element, index) => {
          this.entList.push({ value: element.id, label: element.entName });
        });
      });
    },
    getRowKeys(row) {
      return row.id; // 每条数据的唯一识别值
    },
    onTableSelectAll(arr) {
      this.multipleSelection = [];
      this.multipleSelectionObject = [];
      this.multipleSelectionObject = arr;
      arr.forEach(item => {
        this.multipleSelection.push(item.id);
      });
    },
    handleDistribution() {
      if (this.multipleSelection.length == 0) {
        this.$notify({
          title: "警告",
          message: "请先选择设备",
          type: "warning",
          duration: 2000
        });
      }
      if (this.entId == null || this.entId == "") {
        this.$notify({
          title: "警告",
          message: "请先选择企业",
          type: "warning",
          duration: 2000
        });
      } else {
        const tempData = {
          entId: this.entId,
          ids: this.multipleSelection
        };
        updateEntIdByIdS(tempData).then(() => {
          this.$notify({
            title: "成功",
            message: "分配成功",
            type: "success",
            duration: 2000
          });
          this.getList();
        });
      }
    },
    handleSuccess({ results, header }) {
      console.log(results);
      console.log(header);
      // this.tableData = results;
      // this.tableHeader = header;
    },
    beforeUpload(file) {
      // 判断文件格式
      const hz = file.name.split(".")[1];
      if (hz != "xlsx" && hz != "xls") {
        this.$alert("只能上传EXCEL文件！");
        return false;
      }
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        console.log(response);
        this.list = response.data;
        this.total = response.total;
        this.listLoading = false;
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
        serialNumber: "",
        deviceType: "",
        deviceLocation: "",
        deviceProductionTime: "",
        iiotCode: "",
        dataIp: "",
        dataPort: ""
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
          createDevice(this.temp).then(() => {
            this.list.unshift(this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "新增成功",
              type: "success",
              duration: 2000
            });
            this.getList();
          });
        }
      });
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row); // copy obj
      this.temp.timestamp = new Date(this.temp.timestamp);
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
          updateDevice(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id);
            this.list.splice(index, 1, this.temp);
            this.dialogFormVisible = false;
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            });
          });
        }
      });
    },
    handleDelete(id) {
      deleteDevice(id).then(response => {
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
