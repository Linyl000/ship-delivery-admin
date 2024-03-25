<template>
  <div class="app-container">
    <el-form :model="queryParams" ref="queryForm" size="small" :inline="true" v-show="showSearch" label-width="68px">
      <el-form-item label="用户id" prop="userId">
        <el-input
          v-model="queryParams.userId"
          placeholder="请输入用户id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="财务id" prop="financeId">
        <el-input
          v-model="queryParams.financeId"
          placeholder="请输入财务id"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付金额" prop="amount">
        <el-input
          v-model="queryParams.amount"
          placeholder="请输入支付金额"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="三位货币代码" prop="currency">
        <el-input
          v-model="queryParams.currency" 
          placeholder="请输入三位货币代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="支付状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="请选择支付状态" clearable>
          <el-option
            v-for="dict in dict.type.pay_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="客户端IP" prop="clientIp">
        <el-input
          v-model="queryParams.clientIp"
          placeholder="请输入客户端IP"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品标题" prop="subject">
        <el-input
          v-model="queryParams.subject"
          placeholder="请输入商品标题"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商品描述信息" prop="body">
        <el-input
          v-model="queryParams.body"
          placeholder="请输入商品描述信息"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="商户订单号" prop="mchOrderNo">
        <el-input
          v-model="queryParams.mchOrderNo"
          placeholder="请输入商户订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="错误代码" prop="errCode">
        <el-input
          v-model="queryParams.errCode"
          placeholder="请输入错误代码"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="渠道" prop="channelId">
        <el-select v-model="queryParams.channelId" placeholder="请选择渠道" clearable>
          <el-option
            v-for="dict in dict.type.pay_channel"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单失效时间" prop="expireTime">
        <el-date-picker clearable
          v-model="queryParams.expireTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择订单失效时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item label="订单支付成功时间" prop="paySuccTime">
        <el-date-picker clearable
          v-model="queryParams.paySuccTime"
          type="date"
          value-format="yyyy-MM-dd"
          placeholder="请选择订单支付成功时间">
        </el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
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
          v-hasPermi="['payorder:payorder:add']"
        >新增</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['payorder:payorder:edit']"
        >修改</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="danger"
          plain
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['payorder:payorder:remove']"
        >删除</el-button>
      </el-col>
      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['payorder:payorder:export']"
        >导出</el-button>
      </el-col>
      <right-toolbar :showSearch.sync="showSearch" @queryTable="getList"></right-toolbar>
    </el-row>

    <el-table v-loading="loading" :data="payorderList" @selection-change="handleSelectionChange">
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单支付id" align="center" prop="id" />
      <el-table-column label="用户id" align="center" prop="userId" />
      <el-table-column label="财务id" align="center" prop="financeId" />
      <el-table-column label="支付金额" align="center" prop="amount" />
      <el-table-column label="三位货币代码" align="center" prop="currency" />
      <el-table-column label="支付状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pay_status" :value="scope.row.status"/>
        </template>
      </el-table-column>
      <el-table-column label="客户端IP" align="center" prop="clientIp" />
      <el-table-column label="商品标题" align="center" prop="subject" />
      <el-table-column label="商品描述信息" align="center" prop="body" />
      <el-table-column label="商户订单号" align="center" prop="mchOrderNo" />
      <el-table-column label="错误代码" align="center" prop="errCode" />
      <el-table-column label="渠道" align="center" prop="channelId">
        <template slot-scope="scope">
          <dict-tag :options="dict.type.pay_channel" :value="scope.row.channelId"/>
        </template>
      </el-table-column>
      <el-table-column label="订单失效时间" align="center" prop="expireTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.expireTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="订单支付成功时间" align="center" prop="paySuccTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.paySuccTime, '{y}-{m}-{d}') }}</span>
        </template>
      </el-table-column>
      <el-table-column label="错误留言" align="center" prop="errMsg" />
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['payorder:payorder:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['payorder:payorder:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />

    <!-- 添加或修改用户账单对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="用户id" prop="userId">
          <el-input v-model="form.userId" placeholder="请输入用户id" />
        </el-form-item>
        <el-form-item label="财务id" prop="financeId">
          <el-input v-model="form.financeId" placeholder="请输入财务id" />
        </el-form-item>
        <el-form-item label="支付金额" prop="amount">
          <el-input v-model="form.amount" placeholder="请输入支付金额" />
        </el-form-item>
        <el-form-item label="三位货币代码" prop="currency">
          <el-input v-model="form.currency" placeholder="请输入三位货币代码" />
        </el-form-item>
        <el-form-item label="支付状态" prop="status">
          <el-select v-model="form.status" placeholder="请选择支付状态">
            <el-option
              v-for="dict in dict.type.pay_status"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="客户端IP" prop="clientIp">
          <el-input v-model="form.clientIp" placeholder="请输入客户端IP" />
        </el-form-item>
        <el-form-item label="商品标题" prop="subject">
          <el-input v-model="form.subject" placeholder="请输入商品标题" />
        </el-form-item>
        <el-form-item label="商品描述信息" prop="body">
          <el-input v-model="form.body" placeholder="请输入商品描述信息" />
        </el-form-item>
        <el-form-item label="商户订单号" prop="mchOrderNo">
          <el-input v-model="form.mchOrderNo" placeholder="请输入商户订单号" />
        </el-form-item>
        <el-form-item label="错误代码" prop="errCode">
          <el-input v-model="form.errCode" placeholder="请输入错误代码" />
        </el-form-item>
        <el-form-item label="渠道" prop="channelId">
          <el-select v-model="form.channelId" placeholder="请选择渠道">
            <el-option
              v-for="dict in dict.type.pay_channel"
              :key="dict.value"
              :label="dict.label"
              :value="dict.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="订单失效时间" prop="expireTime">
          <el-date-picker clearable
            v-model="form.expireTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择订单失效时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="订单支付成功时间" prop="paySuccTime">
          <el-date-picker clearable
            v-model="form.paySuccTime"
            type="date"
            value-format="yyyy-MM-dd"
            placeholder="请选择订单支付成功时间">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="错误留言" prop="errMsg">
          <el-input v-model="form.errMsg" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { listPayorder, getPayorder, delPayorder, addPayorder, updatePayorder } from "@/api/payorder/payorder";

export default {
  name: "Payorder",
  dicts: ['pay_status', 'pay_channel'],
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
      // 用户账单表格数据
      payorderList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        userId: null,
        financeId: null,
        amount: null,
        currency: null,
        status: null,
        clientIp: null,
        subject: null,
        body: null,
        mchOrderNo: null,
        errCode: null,
        channelId: null,
        expireTime: null,
        paySuccTime: null,
        errMsg: null
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    /** 查询用户账单列表 */
    getList() {
      this.loading = true;
      listPayorder(this.queryParams).then(response => {
        this.payorderList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        id: null,
        userId: null,
        financeId: null,
        amount: null,
        currency: null,
        status: null,
        clientIp: null,
        subject: null,
        body: null,
        mchOrderNo: null,
        errCode: null,
        channelId: null,
        expireTime: null,
        paySuccTime: null,
        createTime: null,
        updateTime: null,
        errMsg: null
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.id)
      this.single = selection.length!==1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加用户账单";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const id = row.id || this.ids
      getPayorder(id).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改用户账单";
      });
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.id != null) {
            updatePayorder(this.form).then(response => {
              this.$modal.msgSuccess("修改成功");
              this.open = false;
              this.getList();
            });
          } else {
            addPayorder(this.form).then(response => {
              this.$modal.msgSuccess("新增成功");
              this.open = false;
              this.getList();
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const ids = row.id || this.ids;
      this.$modal.confirm('是否确认删除用户账单编号为"' + ids + '"的数据项？').then(function() {
        return delPayorder(ids);
      }).then(() => {
        this.getList();
        this.$modal.msgSuccess("删除成功");
      }).catch(() => {});
    },
    /** 导出按钮操作 */
    handleExport() {
      this.download('payorder/payorder/export', {
        ...this.queryParams
      }, `payorder_${new Date().getTime()}.xlsx`)
    }
  }
};
</script>
