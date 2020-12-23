// <template>
  //   <div class="app-container">
    //     <div class="filter-container">
      //       <el-input
//         v-model="listQuery.title"
//         placeholder="企业名称"
//         style="width: 200px;"
//         class="filter-item"
//         @keyup.enter.native="handleFilter"
//       />

      //       <el-select
//         v-model="listQuery.type"
//         placeholder="企业行业"
//         clearable
//         class="filter-item"
//         style="width: 130px"
//       >
        //         <el-option
//           v-for="item in calendarTypeOptions"
//           :key="item.key"
//           :label="item.display_name + '(' + item.key + ')'"
//           :value="item.key"
//         />
        //       </el-select>

      //       <el-button
//         v-waves
//         class="filter-item"
//         type="primary"
//         icon="el-icon-search"
//         @click="handleFilter"
//       >
        //         查询
        //       </el-button>
      //       <el-button
//         class="filter-item"
//         style="margin-left: 10px;"
//         type="primary"
//         icon="el-icon-edit"
//         @click="handleCreate"
//       >
        //         新增
        //       </el-button>
      //       <el-button
//         v-waves
//         :loading="downloadLoading"
//         class="filter-item"
//         type="primary"
//         icon="el-icon-download"
//         @click="handleDownload"
//       >
        //         导出
        //       </el-button>
      //     </div>

    //     <el-table
//       :key="tableKey"
//       v-loading="listLoading"
//       :data="list"
//       border
//       fit
//       highlight-current-row
//       style="width: 100%;"
//       @sort-change="sortChange"
//     >
      //       <el-table-column
//         label="企业Logo"
//         prop="id"
//         align="center"
//         width="120"
//         :class-name="getSortClass('id')"
//       >
        //         <template slot-scope="{ row }">
          //           <span>{{ row.id }}</span>
          //         </template>
        //       </el-table-column>

      //       <el-table-column label="企业名称" min-width="100">
        //         <template slot-scope="{ row }">
          //           <span class="link-type" @click="handleUpdate(row)">{{
//             row.title
          //           }}</span>
          //           <el-tag>{{ row.type | typeFilter }}</el-tag>
          //         </template>
        //       </el-table-column>
      //       <el-table-column label="企业前缀" align="center" width="150">
        //         <template slot-scope="{ row }">
          //           <span
//             v-if="row.pageviews"
//             class="link-type"
//             @click="handleFetchPv(row.pageviews)"
//             >{{ row.pageviews }}</span>
          //           <span v-else>0</span>
          //         </template>
        //       </el-table-column>
      //       <el-table-column label="数据库地址" align="center" width="95">
        //         <template slot-scope="{ row }">
          //           <span
//             v-if="row.pageviews"
//             class="link-type"
//             @click="handleFetchPv(row.pageviews)"
//             >{{ row.pageviews }}</span>
          //           <span v-else>0</span>
          //         </template>
        //       </el-table-column>
      //       <el-table-column label="设备数量" width="110px" align="center">
        //         <template slot-scope="{ row }">
          //           <span>{{ row.author }}</span>
          //         </template>
        //       </el-table-column>
      //       <el-table-column label="端口" width="110px" align="center">
        //         <template slot-scope="{ row }">
          //           <span style="color:red;">{{ row.reviewer }}</span>
          //         </template>
        //       </el-table-column>
      //       <el-table-column label="状态" class-name="status-col" width="100">
        //         <template slot-scope="{ row }">
          //           <el-tag :type="row.status | statusFilter">
            //             {{ row.status }}
            //           </el-tag>
          //         </template>
        //       </el-table-column>
      //       <el-table-column
//         label="注册时间"
//         width="150px"
//         align="center"
//         sortable="custom"
//       >
        //         <template slot-scope="{ row }">
          //           <span>{{ row.timestamp | parseTime("{y}-{m}-{d} {h}:{i}") }}</span>
          //         </template>
        //       </el-table-column>
      //       <el-table-column
//         label="操作"
//         align="center"
//         class-name="small-padding fixed-width"
//       >
        //         <template slot-scope="{ row, $index }">
          //           <el-button type="primary" size="mini" @click="handleUpdate(row)">
            //             编辑
            //           </el-button>
          //           <el-button
//             type="success"
//             size="mini"
//             @click="handleUpdateDataBase(row)"
//           >
            //             配置数据
            //           </el-button>

          //           <el-button
//             v-if="row.status != 'deleted'"
//             size="mini"
//             type="danger"
//             @click="handleDelete(row, $index)"
//           >
            //             删除
            //           </el-button>
          //         </template>
        //       </el-table-column>
      //     </el-table>

    //     <pagination
//       v-show="total > 0"
//       :total="total"
//       :page.sync="listQuery.page"
//       :limit.sync="listQuery.limit"
//       @pagination="getList"
//     />

    //     <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      //       <el-form
//         ref="dataForm"
//         :rules="rules"
//         :model="temp"
//         label-position="left"
//         label-width="140px"
//         style="margin-left:50px;"
//       >
        //         <el-row :gutter="20">
          //           <el-col
            :span="12"
          ><el-form-item label="企业名称" prop="title">
            //               <el-input v-model="temp.title" />
            //             </el-form-item>
            //             <el-form-item label="统一社会信用代码" prop="title">
              //               <el-input v-model="temp.title" />
              //             </el-form-item>

            //             <el-form-item label="企业行业" prop="type">
              //               <el-select
//                 v-model="temp.type"
//                 class="filter-item"
//                 placeholder="请选择"
//               >
                //                 <el-option
//                   v-for="item in calendarTypeOptions"
//                   :key="item.key"
//                   :label="item.display_name"
//                   :value="item.key"
//                 />
                //               </el-select>
              //             </el-form-item>
            //             <el-form-item label="地址" prop="title">
              //               <el-input v-model="temp.title" />
              //             </el-form-item>
            //             <el-form-item label="营业执照" prop="title">
              //               <!-- <el-input v-model="temp.title" /> -->
              //               <el-upload
//                 class="avatar-uploader"
//                 action="
//                 #"
//                 :auto-upload="false"
//                 list-type="picture-card"
//                 :on-preview="handlePictureCardPreview"
//                 :on-remove="handleRemove"
//               >
                //                 <i class="el-icon-plus avatar-uploader-icon" />
                //               </el-upload>
              //               <el-dialog :visible.sync="dialogVisible">
                //                 <img width="100%" :src="temp.pic" alt="">
                //               </el-dialog>
              //             </el-form-item>
            //             <el-form-item label="企业logo" prop="title1">
              //               <el-upload
//                 class="avatar-uploader"
//                 action="
//                 #"
//                 :auto-upload="false"
//                 list-type="picture-card"
//                 :on-preview="handlePictureCardPreview"
//                 :on-remove="handleRemove"
//               >
                //                 <i class="el-icon-plus avatar-uploader-icon" />
                //               </el-upload>
              //             </el-form-item>
            //           </el-col>
          //           <el-col :span="12">
            //             <el-form-item label="联系人姓名" prop="title">
              //               <el-input
                v-model="temp.title"
              /></el-form-item>
            //             <el-form-item label="联系人手机号" prop="title">
              //               <el-input
                v-model="temp.title"
              /></el-form-item>
            //             <el-form-item label="法人姓名" prop="title">
              //               <el-input
                v-model="temp.title"
              /></el-form-item>

            //             <el-form-item label="法人证件号码" prop="title">
              //               <el-input v-model="temp.title" />
              //             </el-form-item>
            //             <el-form-item label="证件照片正反" prop="title">
              //               <el-upload
//                 class="avatar-uploader"
//                 action="
//                 #"
//                 :auto-upload="false"
//                 list-type="picture-card"
//                 :on-preview="handlePictureCardPreview"
//                 :on-remove="handleRemove"
//               >
                //                 <i class="el-icon-plus avatar-uploader-icon" />
                //               </el-upload>
              //             </el-form-item>
            //             <el-form-item label="官方网址" prop="title1">
              //               <el-input v-model="temp.title1" />
              //             </el-form-item>
            //           </el-col>
          //         </el-row>
        //         <el-form-item label="企业简介" prop="title1">
          //           <el-input v-model="temp.title1" />
          //         </el-form-item>
        //       </el-form>

      //       <div slot="footer" class="dialog-footer">
        //         <el-button @click="dialogFormVisible = false">
          //           取消
          //         </el-button>
        //         <el-button
//           type="primary"
//           @click="dialogStatus === 'create' ? createData() : updateData()"
//         >
          //           确定
          //         </el-button>
        //       </div>
      //     </el-dialog>

    //     <el-dialog
//       :title="textMap[dialogStatus]"
//       :visible.sync="dialogFormVisibleDB"
//     >
      //       <el-form
//         ref="dataForm"
//         :rules="rules"
//         :model="temp"
//         label-position="left"
//         label-width="140px"
//         style="margin-left:50px;"
//       >
        //         <el-form-item label="数据地址" prop="title">
          //           <el-input v-model="temp.title" />
          //         </el-form-item>
        //         <el-form-item label="端口" prop="title">
          //           <el-input v-model="temp.title" />
          //         </el-form-item>
        //       </el-form>

      //       <div slot="footer" class="dialog-footer">
        //         <el-button @click="dialogFormVisible = false">
          //           取消
          //         </el-button>
        //         <el-button
//           type="primary"
//           @click="dialogStatus === 'create' ? createData() : updateData()"
//         >
          //           确定
          //         </el-button>
        //       </div>
      //     </el-dialog>

    //     <el-dialog :visible.sync="dialogPvVisible" title="Reading statistics">
      //       <el-table
//         :data="pvData"
//         border
//         fit
//         highlight-current-row
//         style="width: 100%"
//       >
        //         <el-table-column prop="key" label="Channel" />
        //         <el-table-column prop="pv" label="Pv" />
        //       </el-table>
      //       <span slot="footer" class="dialog-footer">
        //         <el-button
          type="primary"
          @click="dialogPvVisible = false"
        >Confirm</el-button>
        //       </span>
      //     </el-dialog>
    //   </div>
  // </template>

<script>
// import {
//   fetchList,
//   fetchPv,
//   createArticle,
//   updateArticle
// } from "@/api/article";
// import waves from "@/directive/waves"; // waves directive
// import { parseTime } from "@/utils";
// import Pagination from "@/components/Pagination"; // secondary package based on el-pagination

// const calendarTypeOptions = [
//   { key: "CN", display_name: "仪器仪表制造业" },
//   { key: "US", display_name: "家具制造业" },
//   { key: "JP", display_name: "食品制造业" },
//   { key: "EU", display_name: "其他制造业" }
// ];

// // arr to obj, such as { CN : "China", US : "USA" }
// const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
//   acc[cur.key] = cur.display_name;
//   return acc;
// }, {});

// export default {
//   name: "ComplexTable",
//   components: { Pagination },
//   directives: { waves },
//   filters: {
//     statusFilter(status) {
//       const statusMap = {
//         published: "success",
//         draft: "info",
//         deleted: "danger"
//       };
//       return statusMap[status];
//     },
//     typeFilter(type) {
//       return calendarTypeKeyValue[type];
//     }
//   },
//   data() {
//     return {
//       tableKey: 0,
//       list: null,
//       total: 0,
//       listLoading: true,
//       listQuery: {
//         page: 1,
//         limit: 20,
//         importance: undefined,
//         title: undefined,
//         type: undefined,
//         sort: "+id"
//       },
//       importanceOptions: [1, 2, 3],
//       calendarTypeOptions,
//       statusOptions: ["published", "draft", "deleted"],
//       showReviewer: true,
//       temp: {
//         pic: null,
//         id: undefined,
//         importance: 1,
//         remark: "",
//         timestamp: new Date(),
//         title: "",
//         title1: "",
//         type: "",
//         status: "published"
//       },
//       dialogFormVisible: false,
//       dialogFormVisibleDB: false,
//       dialogStatus: "",
//       textMap: {
//         update: "企业信息",
//         updateDB: "数据配置",
//         create: "新增企业"
//       },
//       dialogPvVisible: false,
//       pvData: [],
//       rules: {
//         type: [
//           { required: true, message: "type is required", trigger: "change" }
//         ],
//         timestamp: [
//           {
//             type: "date",
//             required: true,
//             message: "timestamp is required",
//             trigger: "change"
//           }
//         ],
//         title: [
//           { required: true, message: "title is required", trigger: "blur" }
//         ],
//         title1: [{ required: false, trigger: "blur" }]
//       },
//       downloadLoading: false,
//       dialogVisible: false,
//       disabled: false
//     };
//   },
//   created() {
//     this.getList();
//   },
//   methods: {
//     getList() {
//       this.listLoading = true;
//       fetchList(this.listQuery).then(response => {
//         this.list = response.data.items;
//         this.total = response.data.total;

//         // Just to simulate the time of the request
//         setTimeout(() => {
//           this.listLoading = false;
//         }, 1.5 * 1000);
//       });
//     },
//     handleFilter() {
//       this.listQuery.page = 1;
//       this.getList();
//     },
//     handleModifyStatus(row, status) {
//       this.$message({
//         message: "操作Success",
//         type: "success"
//       });
//       row.status = status;
//     },
//     sortChange(data) {
//       const { prop, order } = data;
//       if (prop === "id") {
//         this.sortByID(order);
//       }
//     },
//     sortByID(order) {
//       if (order === "ascending") {
//         this.listQuery.sort = "+id";
//       } else {
//         this.listQuery.sort = "-id";
//       }
//       this.handleFilter();
//     },
//     resetTemp() {
//       this.temp = {
//         id: undefined,
//         importance: 1,
//         remark: "",
//         timestamp: new Date(),
//         title: "",
//         status: "published",
//         type: ""
//       };
//     },
//     handleCreate() {
//       this.resetTemp();
//       this.dialogStatus = "create";
//       this.dialogFormVisible = true;
//       this.$nextTick(() => {
//         this.$refs["dataForm"].clearValidate();
//       });
//     },
//     createData() {
//       this.$refs["dataForm"].validate(valid => {
//         if (valid) {
//           this.temp.id = parseInt(Math.random() * 100) + 1024; // mock a id
//           this.temp.author = "vue-element-admin";
//           createArticle(this.temp).then(() => {
//             this.list.unshift(this.temp);
//             this.dialogFormVisible = false;
//             this.$notify({
//               title: "Success",
//               message: "Created Successfully",
//               type: "success",
//               duration: 2000
//             });
//           });
//         }
//       });
//     },
//     handleUpdate(row) {
//       this.temp = Object.assign({}, row); // copy obj
//       this.temp.timestamp = new Date(this.temp.timestamp);
//       this.dialogStatus = "update";
//       this.dialogFormVisible = true;
//       this.$nextTick(() => {
//         this.$refs["dataForm"].clearValidate();
//       });
//     },
//     handleUpdateDataBase(row) {
//       this.temp = Object.assign({}, row); // copy obj
//       this.temp.timestamp = new Date(this.temp.timestamp);
//       this.dialogStatus = "updateDB";
//       this.dialogFormVisibleDB = true;
//       this.$nextTick(() => {
//         this.$refs["dataFormDB"].clearValidate();
//       });
//     },
//     updateData() {
//       this.$refs["dataForm"].validate(valid => {
//         if (valid) {
//           const tempData = Object.assign({}, this.temp);
//           tempData.timestamp = +new Date(tempData.timestamp); // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
//           updateArticle(tempData).then(() => {
//             const index = this.list.findIndex(v => v.id === this.temp.id);
//             this.list.splice(index, 1, this.temp);
//             this.dialogFormVisible = false;
//             this.$notify({
//               title: "Success",
//               message: "Update Successfully",
//               type: "success",
//               duration: 2000
//             });
//           });
//         }
//       });
//     },
//     handleDelete(row, index) {
//       this.$notify({
//         title: "Success",
//         message: "Delete Successfully",
//         type: "success",
//         duration: 2000
//       });
//       this.list.splice(index, 1);
//     },
//     handleFetchPv(pv) {
//       fetchPv(pv).then(response => {
//         this.pvData = response.data.pvData;
//         this.dialogPvVisible = true;
//       });
//     },
//     handleDownload() {
//       this.downloadLoading = true;
//       import("@/vendor/Export2Excel").then(excel => {
//         const tHeader = ["timestamp", "title", "type", "importance", "status"];
//         const filterVal = [
//           "timestamp",
//           "title",
//           "type",
//           "importance",
//           "status"
//         ];
//         const data = this.formatJson(filterVal);
//         excel.export_json_to_excel({
//           header: tHeader,
//           data,
//           filename: "table-list"
//         });
//         this.downloadLoading = false;
//       });
//     },
//     formatJson(filterVal) {
//       return this.list.map(v =>
//         filterVal.map(j => {
//           if (j === "timestamp") {
//             return parseTime(v[j]);
//           } else {
//             return v[j];
//           }
//         })
//       );
//     },
//     getSortClass(key) {
//       const sort = this.listQuery.sort;
//       return sort === `+${key}` ? "ascending" : "descending";
//     },
//     handleRemove(file) {
//       console.log(file);
//     },
//     handlePictureCardPreview(file) {
//       this.temp.pic = file.url;
//       this.dialogVisible = true;
//     },
//     handleDownload(file) {
//       console.log(file);
//     }
//   }
// };
// </script>
// <style>
// .avatar-uploader .el-upload {
//   width: 100px;
//   height: 100px;
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 100px;
//   height: 100px;
//   line-height: 100px;
//   text-align: center;
// }
// .avatar {
//   width: 100px;
//   height: 100px;
//   display: block;
// }
// </style>
