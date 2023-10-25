<template>
  <div class="app-container">
    <el-row :gutter="10" class="mb8" v-if="optType != 'view'">
      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dy:dt:add']"
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
          v-hasPermi="['dy:dt:remove']"
          >删除</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-loading="loading"
      :data="dtList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="商品名称" align="center" prop="name" />
      <el-table-column label="数量" align="center" prop="number" />
      <el-table-column label="单件重量" align="center" prop="weight" />
      <el-table-column label="总重量" align="center" prop="totalWeight" />
      <el-table-column label="装箱数" align="center" prop="boxNumber" />
      <el-table-column label="总数" align="center" prop="totalNumber" />
      <el-table-column label="单价" align="center" prop="unitPrice" />
      <el-table-column label="总货值" align="center" prop="totalValue" />
      <el-table-column label="商品材料" align="center" prop="material" />
      <el-table-column label="订单状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_order_status"
            :value="scope.row.status"
          />
        </template>
      </el-table-column>
      <el-table-column label="备注" align="center" prop="remark" />
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
            v-hasPermi="['dy:dt:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dy:dt:remove']"
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

    <!-- 添加或修改订单明细对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品名称" prop="name">
              <el-input
                v-model="form.name"
                placeholder="请输入商品名称"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="箱数" prop="number">
              <el-input v-model="form.number" placeholder="请输入箱数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="装箱数" prop="boxNumber">
              <el-input v-model="form.boxNumber" placeholder="请输入装箱数" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总数" prop="totalNumber">
              <el-input v-model="form.totalNumber" placeholder="请输入总数" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单件重量" prop="weight">
              <el-input v-model="form.weight" placeholder="请输入单件重量" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总重量" prop="totalWeight">
              <el-input v-model="form.totalWeight" placeholder="请输入总重量" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="单价" prop="unitPrice">
              <el-input v-model="form.unitPrice" placeholder="请输入单价" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总货值" prop="totalValue">
              <el-input v-model="form.totalValue" placeholder="请输入总货值" />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="商品材料" prop="material">
              <el-input v-model="form.material" placeholder="请输入商品材料" />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item
              label="商品状态"
              prop="status"
              v-if="roleKey == 'admin' || roleKey == 'admin1'"
            >
              <el-select
                v-model="form.status"
                placeholder="请选择商品状态"
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
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input
                v-model="form.remark"
                type="textarea"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listDt, getDt, delDt, addDt, updateDt } from '@/api/dy/dt'

export default {
  name: 'Dt',
  dicts: ['dy_pakge_method', 'dy_order_status'],
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
      // 订单明细表格数据
      dtList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        name: null,
        number: null,
        pakgeMethod: null,
        weight: null,
        volume: null,
        unitPrice: null,
        freight: null,
        orderId: this.orderId
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        name: [
          { required: true, message: '货物名称不能为空', trigger: 'blur' }
        ],
        number: [{ required: true, message: '数量不能为空', trigger: 'blur' }],
        boxNumber: [
          { required: true, message: '装箱数不能为空', trigger: 'blur' }
        ],
        totalNumber: [
          { required: true, message: '总数不能为空', trigger: 'blur' }
        ],
        weight: [
          { required: true, message: '单件重量不能为空', trigger: 'blur' }
        ],
        totalWeight: [
          { required: true, message: '总重量不能为空', trigger: 'blur' }
        ],
        unitPrice: [
          { required: true, message: '单价不能为空', trigger: 'blur' }
        ],
        totalValue: [
          { required: true, message: '总货值不能为空', trigger: 'blur' }
        ],
        material: [
          { required: true, message: '商品材料不能为空', trigger: 'blur' }
        ]
      },
      roleKey: null
    }
  },
  props: {
    optType: undefined,
    orderId: undefined
  },
  created() {
    this.getList()
    this.roleKey = localStorage.getItem('roleKey')
  },
  methods: {
    /** 查询订单明细列表 */
    getList() {
      this.loading = true
      listDt(this.queryParams).then((response) => {
        this.dtList = response.rows
        this.total = response.total
        this.loading = false
        localStorage.setItem('len', this.total)
      })
    },
    // 取消按钮
    cancel() {
      this.open = false
      this.reset()
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        orderId: this.orderId,
        name: null,
        number: null,
        pakgeMethod: null,
        weight: null,
        volume: null,
        unitPrice: null,
        freight: null,
        deliveryFee: null,
        itemValue: null,
        premium: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        status: null
      }
      this.resetForm('form')
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map((item) => item.id)
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加货物明细'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getDt(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改货物明细'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateDt(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addDt(this.form).then((response) => {
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
        .confirm('是否确认删除订单明细编号为"' + ids + '"的数据项？')
        .then(function () {
          return delDt(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
    }
  }
}
</script>

<style></style>
