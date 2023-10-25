<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="90px"
    >
      <el-form-item label="进仓号" prop="logisticsId">
        <el-input
          v-model="queryParams.logisticsId"
          placeholder="请输入进仓号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <!-- <el-form-item label="出发地" prop="startPlace">
        <el-input
          v-model="queryParams.startPlace"
          placeholder="请输入出发地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="目的地" prop="endPlace">
        <el-input
          v-model="queryParams.endPlace"
          placeholder="请输入目的地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item> -->
      <el-form-item label="运单状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择运单状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.dy_order_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="创建时间" prop="createTime">
        <el-date-picker
          clearable
          v-model="queryParams.createTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择创建时间"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          icon="el-icon-search"
          size="mini"
          @click="handleQuery"
          >搜索</el-button
        >
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery"
          >重置</el-button
        >
      </el-form-item>
    </el-form>

    <el-row :gutter="10" class="mb8">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['logistics:logisticsNumber:add']"
          >新增</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['logistics:logisticsNumber:edit']"
          >修改</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['logistics:logisticsNumber:remove']"
          >删除</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['logistics:logisticsNumber:export']"
          >导出</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="info"
          plain
          icon="el-icon-s-operation"
          size="mini"
          :disabled="single2"
          @click="handleUpdate2"
          v-hasPermi="['logistics:logisticsNumber:edit']"
          >批量修改物流</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="logisticsNumberList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="id" align="center" prop="id" />
      <el-table-column label="进仓号" align="center" prop="logisticsId" />
      <!-- <el-table-column label="出发地" align="center" prop="startPlace" />
      <el-table-column label="目的地" align="center" prop="endPlace" /> -->
      <el-table-column label="运单状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_order_status"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="创建时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{
            parseTime(scope.row.createTime, '{y}-{m}-{d} {hh}:{mm}:{ss}')
          }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="操作"
        align="center"
        class-name="small-padding fixed-width"
      >
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['logistics:logisticsNumber:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['logistics:logisticsNumber:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    <!-- 批量 -->
    <el-dialog
      :title="'批量修改物流状态'"
      :visible.sync="open2"
      width="500px"
      append-to-body
    >
      <el-form ref="form2" :model="form2" :rules="rules2" label-width="110px">
        <!-- <el-form-item label="物流信息" prop="logisticsRecords">
          <el-input
            v-model="form2.logisticsRecords"
            placeholder="请输入物流信息"
          />
        </el-form-item> -->
        <el-form-item label="物流信息状态" prop="status">
          <el-select v-model="form2.status" placeholder="请选择物流信息状态">
            <el-option
              v-for="dict in dict.type.dy_order_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="adds">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
    <!-- 添加或修改物流运单表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="800px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="运单号" prop="logisticsId">
          <el-input v-model="form.logisticsId" placeholder="请输入进仓号" />
        </el-form-item>
        <!-- <el-form-item label="出发地" prop="startPlace">
          <el-input v-model="form.startPlace" placeholder="请输入出发地" />
        </el-form-item>
        <el-form-item label="目的地" prop="endPlace">
          <el-input v-model="form.endPlace" placeholder="请输入目的地" />
        </el-form-item> -->
        <el-form-item label="运单状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择运单状态">
            <el-option
              v-for="dict in dict.type.dy_order_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-tabs type="border-card" v-if="optType != 'add'">
        <el-tab-pane label="物流信息">
          <Records :optType="optType" :logisticsId="form.logisticsId"></Records>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listLogisticsNumber,
  getLogisticsNumber,
  delLogisticsNumber,
  addLogisticsNumber,
  updateLogisticsNumber,
  adds
} from '@/api/logistics/logisticsNumber'
import Records from '../records/index.vue'

export default {
  name: 'LogisticsNumber',
  dicts: ['dy_logistics_type', 'dy_logistics_record_status', 'dy_order_status'],
  components: { Records },
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      single2: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      //弹框的操作类型 view add edit
      optType: undefined,
      // 总条数
      total: 0,
      // 物流运单表表格数据
      logisticsNumberList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        logisticsId: null,
        startPlace: null,
        endPlace: null,
        status: null,
        createTime: null
      },
      changeIds: [],
      // 表单参数
      form: {}, // 表单参数
      form2: {},
      // 表单校验
      rules: {
        id: [{ required: true, message: 'id不能为空', trigger: 'blur' }],
        logisticsId: [
          { required: true, message: '进仓号不能为空', trigger: 'blur' }
        ],
        startPlace: [
          { required: true, message: '出发地不能为空', trigger: 'blur' }
        ],
        endPlace: [
          { required: true, message: '目的地不能为空', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '运单状态不能为空', trigger: 'change' }
        ]
      },
      // 表单校验
      rules2: {
        // logisticsRecords: [
        //   { required: true, message: '物流信息不能为空', trigger: 'blur' }
        // ],
        status: [
          { required: true, message: '物流信息状态不能为空', trigger: 'change' }
        ]
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    /** 查询物流运单表列表 */
    getList() {
      this.loading = true
      listLogisticsNumber(this.queryParams).then((response) => {
        this.logisticsNumberList = response.rows
        this.total = response.total
        this.loading = false
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.open2 = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        logisticsId: null,
        startPlace: null,
        endPlace: null,
        status: '0',
        optType: undefined,
        createTime: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.ids2 = selection.map((item) => item.logisticsId)
      this.single = selection.length !== 1
      this.multiple = !selection.length
      this.single2 = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.optType = 'add'
      this.open = true
      this.title = '添加物流运单表'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      this.optType = 'edit'
      const id = row.id || this.ids
      getLogisticsNumber(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改物流运单表'
      })
    },
    /** 修改按钮操作 */
    handleUpdate2(row) {
      this.form2 = {}
      this.open2 = true
      this.$set(this.form2, 'logisticsIds', row.logisticsId || this.ids2)
    },
    adds() {
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          adds(this.form2).then((response) => {
            this.$modal.msgSuccess('修改成功')
            this.open2 = false
            this.getList()
          })
        }
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateLogisticsNumber(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addLogisticsNumber(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.getList()
            })
          }
        }
      })
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids
      this.$modal
        .confirm('是否确认删除物流运单表id为"' + ids + '"的数据项？')
        .then(function () {
          return delLogisticsNumber(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download(
        'logistics/logisticsNumber/export',
        {
          ...this.queryParams
        },
        `logisticsNumber_${new Date().getTime()}.xlsx`
      )
    }
  }
}
</script>
