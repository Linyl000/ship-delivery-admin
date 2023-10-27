<template>
  <div class="app-container">
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="68px"
    >
      <el-form-item
        label="客户ID"
        prop="userId"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      >
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入客户ID"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="订单编号" prop="orderId">
        <el-input
          v-model="queryParams.orderId"
          placeholder="请输入订单编号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货柜时间" prop="boxTime">
        <el-date-picker
          v-model="queryParams.boxTime"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <!-- <el-form-item label="完成时间" prop="orderTimes">
        <el-date-picker
          v-model="queryParams.orderTimes"
          type="datetimerange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="yyyy-MM-dd HH:mm:ss"
          value-format="yyyy-MM-dd HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item> -->
      <el-form-item label="总金额" prop="totalAmount">
        <el-input
          v-model="queryParams.totalAmount"
          placeholder="请输入总金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item
        label="利润"
        prop="profit"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      >
        <el-input
          v-model="queryParams.profit"
          placeholder="请输入利润"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付时间" prop="paymentTime">
        <el-date-picker
          clearable
          v-model="queryParams.paymentTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择支付时间"
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
      <!--      <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['fin:finance:add']"
        >新增</el-button>
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['fin:finance:edit']"
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
          v-hasPermi="['fin:finance:remove']"
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
          v-hasPermi="['fin:finance:export']"
          >导出</el-button
        >
      </el-col>
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>

    <el-table
      v-if="roleKey == 'admin' || roleKey == 'admin1'"
      v-loading="loading"
      :data="financeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="客户ID" align="center" prop="userId" />
      <el-table-column label="订单编号" align="center" prop="orderId" />

      <el-table-column
        label="货柜时间"
        align="center"
        prop="orderTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.orderTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>

      <el-table-column label="总金额(RMB)" align="center" prop="totalAmount" />
      <el-table-column
        label="总金额(PHP)"
        align="center"
        prop="totalAmountPHP"
      />
      <el-table-column label="报关成本" align="center" prop="bgCost" />
      <el-table-column label="清关成本" align="center" prop="qgCost" />
      <el-table-column label="派送成本" align="center" prop="psCost" />
      <el-table-column label="利润" align="center" prop="profit" />
      <el-table-column
        label="支付时间"
        align="center"
        prop="paymentTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentTime, '{y}-{m}-{d}') }}</span>
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
            v-hasPermi="['fin:finance:edit']"
            >修改</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['fin:finance:remove']"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <el-table
      v-else
      v-loading="loading"
      :data="financeList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单ID" align="center" prop="orderId" />
      <el-table-column
        label="货柜时间"
        align="center"
        prop="createTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="计费体积/重量" align="center" prop="finVolume" />
      <el-table-column label="计费单价" align="center" prop="finDj" />

      <el-table-column label="费用合计(RMB)" align="center" prop="totalRMB" />
      <el-table-column label="费用合计(PHP)" align="center" prop="totalPHP" />
      <el-table-column label="付款状态" align="center" prop="paymentStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.payment_status"
            :value="scope.row.paymentStatus"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="付款时间"
        align="center"
        prop="paymentTime"
        width="180"
      >
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paymentTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column
        label="已付金额(RMB)"
        align="center"
        prop="totalAmount"
      />
      <el-table-column
        label="已付金额(PHP)"
        align="center"
        prop="totalAmountPHP"
      />
    </el-table>
    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改财务表对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="700px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="客户ID" prop="userId">
              <el-input
                v-model="form.userId"
                placeholder="请输入客户ID"
                maxlength="50"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="订单编号" prop="orderId">
              <el-input
                v-model="form.orderId"
                placeholder="请输入订单编号"
                maxlength="50"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运输类型" prop="transportType">
              <el-select
                v-model="form.transportType"
                placeholder="请选择运输类型"
                :disabled="true"
              >
                <el-option
                  v-for="dict in dict.type.dy_transport_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="货柜时间" prop="orderTime">
              <el-date-picker
                clearable
                v-model="form.orderTime"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="请选择货柜时间"
                :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="完成时间" prop="finishTime">
              <el-date-picker
                clearable
                v-model="form.finishTime"
                placeholder="请输入完成时间"
                type="date"
                value-format="yyyy-MM-dd"
                :disabled="true"
              >
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="总金额" prop="totalAmount">
              <el-input
                v-model="form.totalAmount"
                placeholder="请输入总金额"
                maxlength="50"
                :disabled="true"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="报关成本" prop="bgCost">
              <el-input
                v-model="form.bgCost"
                placeholder="请输入报关成本"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="清关成本" prop="qgCost">
              <el-input
                v-model="form.qgCost"
                placeholder="请输入清关成本"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="派送成本" prop="psCost">
              <el-input
                v-model="form.psCost"
                placeholder="请输入派送成本"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="利润" prop="profit">
              <el-input
                v-model="form.profit"
                placeholder="请输入利润"
                maxlength="50"
              ></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="财务状态" prop="status">
              <el-select
                v-model="form.status"
                placeholder="请选择财务状态"
                :disabled="true"
              >
                <el-option
                  v-for="dict in dict.type.fin_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="支付状态" prop="paymentStatus">
              <el-select
                v-model="form.paymentStatus"
                placeholder="请选择支付状态"
              >
                <el-option
                  v-for="dict in dict.type.payment_status"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
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
import {
  listFinance,
  getFinance,
  delFinance,
  addFinance,
  updateFinance
} from '@/api/fin/finance'

export default {
  name: 'Finance',
  dicts: [
    'dy_transport_type',
    'dy_order_status',
    'payment_status',
    'fin_status'
  ],
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
      // 财务表表格数据
      financeList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        orderId: null,
        transportType: null,
        boxTime: null,
        orderTimes: null,
        totalAmount: null,
        cost: null,
        profit: null,
        createTime: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {},
      roleKey: null
    }
  },
  watch: {
    'queryParams.orderTimes': function (newOrderTimes) {
      this.queryParams.orderStartTime = newOrderTimes[0] || ''
      this.queryParams.orderEndTime = newOrderTimes[1] || ''
    },
    'queryParams.boxTime': function (newBoxTime) {
      this.queryParams.boxStartTime = newBoxTime[0] || ''
      this.queryParams.boxEndTime = newBoxTime[1] || ''
    }
  },
  created() {
    this.getList()
    this.roleKey = localStorage.getItem('roleKey')
  },
  methods: {
    /** 查询财务表列表 */
    getList() {
      let a = JSON.parse(JSON.stringify(this.queryParams))
      delete a.orderTimes
      delete a.boxTime
      this.loading = true
      listFinance(a).then((response) => {
        this.financeList = response.rows
        this.total = response.total
        this.loading = false
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
        userId: null,
        orderId: null,
        transportType: null,
        orderTime: null,
        finishTime: null,
        totalAmount: null,
        psCost: null,
        bgCost: null,
        qgCost: null,
        profit: null,
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
      this.single = selection.length !== 1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset()
      this.open = true
      this.title = '添加财务表'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getFinance(id).then((response) => {
        this.form = response.data
        this.open = true
        this.title = '修改财务表'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          if (this.form.id != null) {
            updateFinance(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.getList()
            })
          } else {
            addFinance(this.form).then((response) => {
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
        .confirm('是否确认删除财务表编号为"' + ids + '"的数据项？')
        .then(function () {
          return delFinance(ids)
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
        'fin/finance/export',
        {
          ...this.queryParams
        },
        `finance_${new Date().getTime()}.xlsx`
      )
    }
  }
}
</script>
