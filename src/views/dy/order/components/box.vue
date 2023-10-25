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
      <el-form-item label="进仓号" prop="boxNumber">
        <el-input
          v-model="queryParams.boxNumber"
          placeholder="请输入进仓号"
          clearable
          @keyup.enter.native="handleQuery"
        />
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
    <el-row :gutter="10" class="mb8" v-if="optType != 'view'">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dy:box:add']"
          >新增</el-button
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
          v-hasPermi="['dy:box:remove']"
          >删除</el-button
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
          v-hasPermi="['dy:box:edit']"
          >批量修改物流</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-s-ticket"
          size="mini"
          :disabled="single3"
          @click="goPrintTab"
          v-hasPermi="['dy:box:edit']"
          >打印标签</el-button
        >
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-upload"
          size="mini"
          @click="syncFinances"
          v-hasPermi="['dy:box:edit']"
          >同步到财务</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="boxList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="装箱id" align="center" prop="id" />
      <el-table-column label="进仓号" align="center" prop="boxNumber" />
      <el-table-column label="商品名称" align="center" prop="tradeName" />
      <el-table-column label="入库件数" align="center" prop="number" />
      <el-table-column label="长(cm)" align="center" prop="tradeLong" />
      <el-table-column label="宽(cm)" align="center" prop="tradeWidth" />
      <el-table-column label="高(cm)" align="center" prop="tradeHeight" />
      <el-table-column label="单间体积(m³)" align="center" prop="unitVolume" />
      <el-table-column label="单件重量(kg)" align="center" prop="unitWeight" />
      <el-table-column
        label="入库体积(m³)"
        align="center"
        prop="storageVolume"
      />
      <el-table-column
        label="入库重量(kg)"
        align="center"
        prop="storageWeight"
      />
      <el-table-column
        label="二维码"
        align="center"
        prop="barcodeUrl"
        width="100"
      >
        <template slot-scope="scope">
          <image-preview :src="scope.row.barcodeUrl" :width="50" :height="50" />
        </template>
      </el-table-column>
      <el-table-column label="货柜状态" align="center" prop="boxStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.order_box_status"
            :value="scope.row.boxStatus"
          />
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
            v-hasPermi="['dy:box:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dy:box:remove']"
            >删除</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-s-ticket"
            @click="goPrintTab(scope.row)"
            v-hasPermi="['dy:box:edit']"
            >打印标签</el-button
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

    <!-- 添加或修改集箱信息对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <!--           <el-form-item label="订单id" prop="orderId">
             <el-input v-model="form.orderId" placeholder="请输入订单id" />
           </el-form-item> -->
        <el-form-item label="进仓号" prop="boxNumber">
          <el-input v-model="form.boxNumber" placeholder="请输入进仓号" />
        </el-form-item>
        <el-form-item label="货物名" prop="tradeId">
          <el-select v-model="form.tradeId" filterable placeholder="货物名">
            <el-option
              v-for="dict in teacherList"
              :key="dict.id"
              :label="dict.name"
              :value="dict.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="入库数量" prop="number">
          <el-input
            v-model="form.number"
            placeholder="请输入入库数量"
            v-on:change="calculateVolumeOrWeight()"
          />
        </el-form-item>
        <el-form-item label="单件重量/kg" prop="unitWeight">
          <el-input
            v-model="form.unitWeight"
            placeholder="请输入单件重量/kg"
            v-on:change="calculateVolumeOrWeight()"
          />
        </el-form-item>
        <el-form-item label="长/cm" prop="tradeLong">
          <el-input
            v-model="form.tradeLong"
            placeholder="请输入长/cm"
            v-on:change="calculateVolumeOrWeight()"
          />
        </el-form-item>
        <el-form-item label="宽/cm" prop="tradeWidth">
          <el-input
            v-model="form.tradeWidth"
            placeholder="请输入宽/cm"
            v-on:change="calculateVolumeOrWeight()"
          />
        </el-form-item>
        <el-form-item label="高/cm" prop="tradeHeight">
          <el-input
            v-model="form.tradeHeight"
            placeholder="请输入高/cm"
            v-on:change="calculateVolumeOrWeight()"
          />
        </el-form-item>
        <el-form-item label="单件体积/m³" prop="unitVolume">
          <el-input v-model="form.unitVolume" disabled />
        </el-form-item>
        <el-form-item label="入库体积/m³" prop="storageVolume">
          <el-input v-model="form.storageVolume" disabled />
        </el-form-item>
        <el-form-item label="入库重量KG" prop="storageWeight">
          <el-input v-model="form.storageWeight" disabled />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
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
  </div>
</template>

<script>
import {
  listBox,
  getBox,
  delBox,
  addBox,
  updateBox,
  status,
  syncFinance
} from '@/api/dy/box'
import { listDt } from '@/api/dy/dt'
export default {
  name: 'Box',
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 显示搜索条件
      showSearch: true,
      // 总条数
      total: 0,
      //批量
      single2: true,
      form2: {},
      open2: false,
      //tab
      single3: true,
      // 集箱信息表格数据
      boxList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        orderId: this.orderId,
        boxNumber: null
        // tradeName: null,
        // number: null,
        // tradeLong: null,
        // tradeWidth: null,
        // tradeHeight: null,
        // storageWeight: null,
        // storageVolume: null,
      },
      // 表单参数
      form: {},
      teacherList: [],
      // 表单校验
      rules: {
        boxNumber: [
          { required: true, message: '进仓号不能为空', trigger: 'blur' },
          {
            pattern: /^[A-Za-z0-9]+$/,
            message: '进仓号只能包含大小写英文字母和数字',
            trigger: 'blur'
          }
        ],
        tradeId: [
          { required: true, message: '商品名称不能为空', trigger: 'blur' }
        ],
        number: [
          { required: true, message: '入库件数不能为空', trigger: 'blur' }
        ],
        tradeLong: [
          { required: true, message: '长/cm不能为空', trigger: 'blur' }
        ],
        tradeWidth: [
          { required: true, message: '宽/cm不能为空', trigger: 'blur' }
        ],
        tradeHeight: [
          { required: true, message: '高/cm不能为空', trigger: 'blur' }
        ],
        // unitVolume: [
        //   { required: true, message: "单件体积m³不能为空", trigger: "blur" }
        // ],
        unitWeight: [
          { required: true, message: '单件重量KG不能为空', trigger: 'blur' }
        ],
        storageWeight: [
          { required: true, message: '入库重量KG不能为空', trigger: 'blur' }
        ]
        // storageVolume: [
        //   { required: true, message: "入库体积m³不能为空", trigger: "blur" }
        // ],
      }, // 表单校验
      rules2: {
        // logisticsRecords: [
        //   { required: true, message: '物流信息不能为空', trigger: 'blur' }
        // ],
        status: [
          { required: true, message: '物流信息状态不能为空', trigger: 'change' }
        ]
      },
      len: null
    }
  },
  dicts: ['dy_order_status', 'order_box_status'],
  props: {
    optType: undefined,
    orderId: undefined,
    submit: undefined
  },
  created() {
    this.getList()
  },
  methods: {
    listTeacher() {
      listDt({ orderId: this.orderId }).then((res) => {
        this.teacherList = res.rows.map((item) => {
          return { ...item }
        })
      })
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1
      this.getList()
    },
    resetQuery() {
      this.resetForm('queryForm')
      this.handleQuery()
    },
    /** 查询集箱信息列表 */
    getList() {
      this.loading = true
      listBox(this.queryParams).then((response) => {
        this.boxList = response.rows
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
        orderId: this.orderId,
        boxNumber: null,
        tradeName: null,
        tradeId: null,
        number: null,
        tradeLong: null,
        tradeWidth: null,
        tradeHeight: null,
        unitVolume: null,
        unitWeight: null,
        storageWeight: null,
        storageVolume: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null
      }
      this.resetForm('form')
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.single2 = !selection.length
      this.single3 = !selection.length
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加集箱信息'
      this.listTeacher()
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getBox(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改集箱信息'
      })
    },
    /** 批量修改按钮操作 */
    handleUpdate2(row) {
      this.form2 = {}
      this.open2 = true
      this.$set(this.form2, 'ids', row.id || this.ids)
    },
    adds() {
      this.$refs['form2'].validate((valid) => {
        if (valid) {
          status(this.form2).then((response) => {
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
            updateBox(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addBox(this.form).then((response) => {
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
        .confirm('是否确认删除集箱信息编号为"' + ids + '"的数据项？')
        .then(function () {
          return delBox(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
    },
    syncFinances() {
      let title
      if (this.total >= localStorage.getItem('len')) {
        title = '确定同步？'
      } else {
        title = '还有商品未完成装柜，是否确认同步？'
      }
      this.$modal
        .confirm(title)
        .then(() => {
          this.submit()
          return syncFinance({ orderId: this.orderId.toString() })
        })
        .then(() => {
          this.$modal.msgSuccess('财务同步成功')
        })
        .catch(() => {})
    },
    goPrintTab(row) {
      const routeData = this.$router.resolve({
        path: '/printTab',
        query: {
          orderId: this.orderId,
          ids: JSON.stringify(row.id) || JSON.stringify(this.ids)
        }
      })
      const url = routeData.href
      window.open(url, '_blank')
    },
    calculateVolumeOrWeight() {
      this.form.unitVolume = (
        (this.form.tradeLong * this.form.tradeWidth * this.form.tradeHeight) /
        1000000
      ).toString()
      this.form.storageVolume = (
        (this.form.number *
          this.form.tradeLong *
          this.form.tradeWidth *
          this.form.tradeHeight) /
        1000000
      ).toString()
      this.form.storageWeight = (
        this.form.number * this.form.unitWeight
      ).toString()
    }
  }
}
</script>
