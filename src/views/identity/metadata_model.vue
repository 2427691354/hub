<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.conditions"
        style="width: 200px;"
        class="filter-item"
        clearable
        @change="handleFilter"
      />

      <el-button
        class="filter-item"
        style="margin-left: 10px;"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        新增
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

      <el-table-column label="前缀" min-width="100">
        <template slot-scope="{ row }">
          <span class="link-type" @click="handleUpdate(row)">{{
            row.prefix
          }}</span>
        </template>
      </el-table-column>
      <el-table-column label="模板版本" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.version }}</span>
        </template>
      </el-table-column>

      <el-table-column label="描述" align="center" width="150">
        <template slot-scope="{ row }">
          <span>{{ row.description }}</span>
        </template>
      </el-table-column>

      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="{ row, $index }">
          <!-- <el-button type="primary" size="mini" @click="handleUpdate(row)">
            编辑
          </el-button> -->

          <el-button
            v-if="row.status != 'deleted'"
            size="mini"
            type="danger"
            @click="handleDelete(row)"
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
        label-width="140px"
        style=" margin-left:50px;"
      ><el-form-item label="前缀" prop="prefix">
         <el-input v-model="temp.prefix" />
       </el-form-item>
        <el-form-item label="模板版本" prop="version">
          <el-input v-model="temp.version" />
        </el-form-item>
        <el-form-item label="描述" prop="description">
          <el-input v-model="temp.description" />
        </el-form-item>
        <el-form-item label="自定义属性">
          <el-button @click="addDomain">新增属性</el-button>
        </el-form-item>
        <el-form
          ref="dataForm"
          label-position="left"
          :model="temp.list[0]"
          label-width="80px"
        >
          <el-form-item>
            <el-col :span="4"> <el-form-item label="中文名称" /></el-col>
            <el-col :span="4"> <el-form-item label="英文名称" /> </el-col>
            <el-col :span="4"> <el-form-item label="数据类型" /></el-col>
            <el-col :span="4"> <el-form-item label="最小长度" /></el-col>
            <el-col :span="4"> <el-form-item label="最大长度" /></el-col>
            <el-col :span="4" /><el-form-item label="必填项" /></el-col>
          </el-form-item>

          <el-form-item
            v-for="(item, index) in temp.list"
            :key="item.key"
            :prop="'domains.' + index + '.value'"
          >
            <el-col :span="4">
              <el-input v-model="item.name" size="mini" />
            </el-col>
            <el-col :span="4">
              <el-input v-model="item.idType" size="mini" />
            </el-col>

            <el-col :span="4">
              <el-input
                v-model="item.metadataType"
                size="mini"
              /></el-col>
            <el-col :span="4">
              <el-input v-model="item.metadataMin" size="mini" />
            </el-col>
            <el-col :span="4">
              <el-input
                v-model="item.metadataMax"
                size="mini"
              /></el-col>
            <el-col :span="4">
              {{ item.required }}
              <el-checkbox v-model="item.required" />
              <el-button
                icon="el-icon-delete"
                circle
                size="mini"
                @click.prevent="removeDomain(item)"
              />
            </el-col>
          </el-form-item>
        </el-form>
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
      </div></el-dialog>

    <el-dialog :visible.sync="dialogPvVisible" title="分配设备">
      <el-table
        :data="pvData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="设备名" />
        <el-table-column prop="pv" label="标识码" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >确定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  fetchPv,
  createModel,
  updateModel,
  deleteModel
} from '@/api/model'
import waves from '@/directive/waves' // waves directive
import { parseTime } from '@/utils'
import Pagination from '@/components/Pagination' // secondary package based on el-pagination

const calendarTypeOptions = [
  { key: 'CN', display_name: '仪器仪表制造业' },
  { key: 'US', display_name: '家具制造业' },
  { key: 'JP', display_name: '食品制造业' },
  { key: 'EU', display_name: '其他制造业' }
]

// arr to obj, such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

export default {
  name: 'ComplexTable',
  components: { Pagination },
  directives: { waves },
  filters: {
    statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'info',
        deleted: 'danger'
      }
      return statusMap[status]
    },
    typeFilter(type) {
      return calendarTypeKeyValue[type]
    }
  },
  data() {
    return {
      tableKey: 0,
      list: null,
      total: 0,
      listLoading: true,
      listQuery: {
        page: 1,
        limit: 20,
        importance: undefined,
        conditions: undefined,
        sort: '1'
      },
      importanceOptions: [1, 2, 3],
      calendarTypeOptions,
      statusOptions: ['published', 'draft', 'deleted'],
      showReviewer: true,
      temp: {
        id: null,
        prefix: '',
        version: '',
        description: '',
        list: []
      },
      dialogFormVisible: false,
      dialogFormVisibleDB: false,
      dialogStatus: '',
      textMap: {
        update: '模板信息',
        create: '新增模板'
      },
      dialogPvVisible: false,
      pvData: [],
      rules: {
        prefix: [
          { required: true, message: '前缀不能为空', trigger: 'change' }
        ],
        version: [
          { required: true, message: '模板版本不能为空', trigger: 'change' }
        ]
      },
      downloadLoading: false,
      dialogVisible: false,
      disabled: false,
      dynamicValidateForm: {
        domains: [
          {
            value: ''
          }
        ],
        email: ''
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    addDomain() {
      this.temp.list.push({
        name: '',
        idType: '',
        metadataType: '',
        metadataMin: '',
        metadataMax: '',
        required: false
      })
    },
    removeDomain(item) {
      var index = this.temp.list.indexOf(item)
      if (index !== -1) {
        this.temp.list.splice(index, 1)
      }
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data
        this.total = response.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: '操作Success',
        type: 'success'
      })
      row.status = status
    },
    sortChange(data) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    },
    sortByID(order) {
      if (order === 'ascending') {
        this.listQuery.sort = '1'
      } else {
        this.listQuery.sort = '-1'
      }
      this.handleFilter()
    },
    resetTemp() {
      this.temp = {
        id: undefined,
        prefix: '',
        version: '',
        description: '',
        list: []
      }
    },
    handleCreate() {
      this.resetTemp()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    createData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          createModel(this.temp).then(() => {
            this.list.unshift(this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '新增成功',
              type: 'success',
              duration: 2000
            })
            this.getList()
          })
        }
      })
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, row) // copy obj
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },
    updateData() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateModel(tempData).then(() => {
            const index = this.list.findIndex(v => v.id === this.temp.id)
            this.list.splice(index, 1, this.temp)
            this.dialogFormVisible = false
            this.$notify({
              title: '成功',
              message: '更新成功',
              type: 'success',
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      deleteModel(row).then(response => {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        this.getList()
      })
    },
    handleFetchPv(pv) {
      fetchPv(pv).then(response => {
        this.pvData = response.data.pvData
        this.dialogPvVisible = true
      })
    },
    handleDownload() {
      this.downloadLoading = true
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
        const filterVal = [
          'timestamp',
          'title',
          'type',
          'importance',
          'status'
        ]
        const data = this.formatJson(filterVal)
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: 'table-list'
        })
        this.downloadLoading = false
      })
    },
    formatJson(filterVal) {
      return this.list.map(v =>
        filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        })
      )
    },
    getSortClass(key) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    },
    handleRemove(file) {
      console.log(file)
    },
    handlePictureCardPreview(file) {
      this.temp.pic = file.url
      this.dialogVisible = true
    }
  }
}
</script>
<style>
.el-form-item__content {
  margin-left: 0 !important;
}
.avatar-uploader .el-upload {
  width: 100px;
  height: 100px;
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
}
.avatar {
  width: 100px;
  height: 100px;
  display: block;
}
</style>
