<template>
  <div class="app-container">
    <el-form ref="form" :model="form" :rules="rules" label-width="100px">
      <el-row v-if="roleKey == 'admin' || roleKey == 'admin1'">
        <el-col :span="12">
          <el-form-item label="客户ID" prop="createBy">
            <el-select
              v-model="form.createBy"
              filterable
              placeholder="选择客户"
              @change="getHistory"
            >
              <el-option
                v-for="dict in teacherList"
                :key="dict.id"
                :label="dict.userName"
                :value="dict.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发货人姓名" prop="shipperName">
            <el-input
              v-model="form.shipperName"
              placeholder="请输入发货人姓名"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人姓名" prop="consigneeName">
            <el-input
              v-model="form.consigneeName"
              placeholder="请输入收货人姓名"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="运输类型" prop="transportType">
            <el-select
              v-model="form.transportType"
              placeholder="请选择运输类型"
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
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发货人电话" prop="shipperPhone">
            <el-input
              v-model="form.shipperPhone"
              placeholder="请输入发货人电话"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人电话" prop="consigneePhone">
            <el-input
              v-model="form.consigneePhone"
              placeholder="请输入收货人电话"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="送货方式" prop="deliveryMethod">
            <el-select
              v-model="form.deliveryMethod"
              placeholder="请选择送货方式"
            >
              <el-option
                v-for="dict in dict.type.dy_delivery_method"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="发货人地址" prop="shipperAddress">
            <el-input
              v-model="form.shipperAddress"
              placeholder="请输入发货人地址"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item label="收货人地址" prop="consigneeAddress">
            <el-input
              v-model="form.consigneeAddress"
              placeholder="请输入收货人地址"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="单号" prop="oddNumbers">
            <el-input
              v-model="form.oddNumbers"
              placeholder="请输入单号"
              maxlength="30"
            />
          </el-form-item>
        </el-col> -->
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item
            label="出发地"
            prop="startPlace"
            v-if="roleKey == 'admin' || roleKey == 'admin1'"
          >
            <el-input
              v-model="form.startPlace"
              placeholder="请输入出发地"
              maxlength="30"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item
            label="到达地"
            prop="endPlace"
            v-if="roleKey == 'admin' || roleKey == 'admin1'"
          >
            <el-input
              v-model="form.endPlace"
              placeholder="请输入到达地"
              maxlength="50"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="托运单位" prop="consignor">
            <el-select v-model="form.consignor" placeholder="请选择托运单位">
              <el-option
                v-for="dict in dict.type.dy_ship_company"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="付款方式" prop="paymentMethod">
            <el-select
              v-model="form.paymentMethod"
              placeholder="请选择付款方式"
            >
              <el-option
                v-for="dict in dict.type.dy_payment_method"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="总金额(RMB)" prop="allFreight">
            <el-input
              v-model="form.allFreight"
              placeholder="请输入总金额(RMB)"
              maxlength="50"
              :disabled="disableAllFreightRMB"
            />
          </el-form-item>
        </el-col>
        <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="总金额(PHP)" prop="allFreightPHP">
            <el-input
              v-model="form.allFreightPHP"
              placeholder="请输入总金额(PHP)"
              maxlength="50"
              :disabled="disableAllFreightPHP"
            />
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="货柜类型" prop="boxType">
            <el-select v-model="form.boxType" placeholder="请选择货柜类型">
              <el-option
                v-for="dict in dict.type.dy_box_type"
                :key="dict.value"
                :label="dict.label"
                :value="dict.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="8" v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-form-item label="订单状态" prop="status">
            <el-select
              v-model="form.status"
              placeholder="请选择订单状态"
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
        </el-col> -->
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
      <div style="margin-bottom: 16px">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </div>
    <el-row :gutter="10" class="mb8">
      <!-- <el-col :span="1.5">
        <el-button
          type="primary"
          plain
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['dy:order:add']"
          >新增</el-button
        >
      </el-col> -->
      <el-col :span="1.5">
        <el-button
          type="success"
          plain
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['dy:order:edit']"
          >修改订单/货物明细</el-button
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
          v-hasPermi="['dy:order:remove']"
          >删除</el-button
        >
      </el-col>
      <!--      <el-col :span="1.5">
        <el-button
          type="warning"
          plain
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['dy:order:export']"
        >导出</el-button>
      </el-col> -->
      <right-toolbar
        :showSearch.sync="showSearch"
        @queryTable="getList"
      ></right-toolbar>
    </el-row>
    <el-form
      :model="queryParams"
      ref="queryForm"
      size="small"
      :inline="true"
      v-show="showSearch"
      label-width="90px"
    >
      <!--      <el-form-item label="托运单位" prop="consignor">
        <el-select v-model="queryParams.consignor" placeholder="请选择托运单位" clearable>
          <el-option
            v-for="dict in dict.type.dy_ship_company"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="订单号" prop="id">
        <el-input
          v-model="queryParams.id"
          placeholder="请输入订单号"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="发货人姓名" prop="shipperName">
        <el-input
          v-model="queryParams.shipperName"
          placeholder="请输入发货人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货人姓名" prop="consigneeName">
        <el-input
          v-model="queryParams.consigneeName"
          placeholder="请输入收货人姓名"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="运输类型" prop="transportType">
        <el-select
          v-model="queryParams.transportType"
          placeholder="请选择运输类型"
          clearable
        >
          <el-option
            v-for="dict in dict.type.dy_transport_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="发货人电话" prop="shipperPhone">
        <el-input
          v-model="queryParams.shipperPhone"
          placeholder="请输入发货人电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货人电话" prop="consigneePhone">
        <el-input
          v-model="queryParams.consigneePhone"
          placeholder="请输入收货人电话"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>

      <el-form-item label="送货方式" prop="deliveryMethod">
        <el-select
          v-model="queryParams.deliveryMethod"
          placeholder="请选择送货方式"
          clearable
        >
          <el-option
            v-for="dict in dict.type.dy_delivery_method"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="发货人地址" prop="shipperAddress">
        <el-input
          v-model="queryParams.shipperAddress"
          placeholder="请输入发货人地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="收货人地址" prop="consigneeAddress">
        <el-input
          v-model="queryParams.consigneeAddress"
          placeholder="请输入收货人地址"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="货柜类型" prop="boxType">
        <el-select
          v-model="queryParams.boxType"
          placeholder="请选择货柜类型"
          clearable
        >
          <el-option
            v-for="dict in dict.type.dy_box_type"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="付款状态" prop="receiptStatus">
        <el-select
          v-model="queryParams.receiptStatus"
          placeholder="请选择付款状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.payment_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <!-- <el-form-item label="订单状态" prop="status">
        <el-select
          v-model="queryParams.status"
          placeholder="请选择订单状态"
          clearable
        >
          <el-option
            v-for="dict in dict.type.dy_order_status"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item> -->
      <el-form-item label="付款方式" prop="paymentMethod">
        <el-select
          v-model="queryParams.paymentMethod"
          placeholder="请选择付款方式"
          clearable
        >
          <el-option
            v-for="dict in dict.type.dy_payment_method"
            :key="dict.value"
            :label="dict.label"
            :value="dict.value"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="出发地" prop="startPlace">
        <el-input
          v-model="queryParams.startPlace"
          placeholder="请输入出发地"
          clearable
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="到达地" prop="endPlace">
        <el-input
          v-model="queryParams.endPlace"
          placeholder="请输入到达地"
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
      <el-form-item label="完成时间" prop="orderTimes">
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
    <el-table
      v-loading="loading"
      :data="orderList"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55" align="center" />
      <el-table-column label="订单ID" align="center" prop="id" width="110px" />
      <el-table-column label="托运单位" align="center" prop="consignor">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_ship_company"
            :value="scope.row.consignor"
          />
        </template>
      </el-table-column>
      <el-table-column
        label="发货人姓名"
        align="center"
        prop="shipperName"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      />
      <el-table-column
        label="发货人电话"
        align="center"
        prop="shipperPhone"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      />
      <el-table-column
        label="发货人地址"
        align="center"
        prop="shipperAddress"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      />
      <el-table-column
        label="收货人姓名"
        align="center"
        prop="consigneeName"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      />
      <el-table-column
        label="收货人电话"
        align="center"
        prop="consigneePhone"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      />
      <el-table-column
        label="收货人地址"
        align="center"
        prop="consigneeAddress"
        v-if="roleKey == 'admin' || roleKey == 'admin1'"
      />
      <el-table-column label="付款状态" align="center" prop="receiptStatus">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.payment_status"
            :value="scope.row.receiptStatus"
          />
        </template>
      </el-table-column>
      <el-table-column label="运输类型" align="center" prop="transportType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_transport_type"
            :value="scope.row.transportType"
          />
        </template>
      </el-table-column>
      <el-table-column label="送货方式" align="center" prop="deliveryMethod">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_delivery_method"
            :value="scope.row.deliveryMethod"
          />
        </template>
      </el-table-column>
      <el-table-column label="付款方式" align="center" prop="paymentMethod">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_payment_method"
            :value="scope.row.paymentMethod"
          />
        </template>
      </el-table-column>
      <el-table-column label="出发地" align="center" prop="startPlace" />
      <el-table-column label="到达地" align="center" prop="endPlace" />
      <el-table-column label="总金额(RMB)" align="center" prop="allFreight" />
      <el-table-column
        label="总金额(PHP)"
        align="center"
        prop="allFreightPHP"
      />
      <el-table-column label="货柜类型" align="center" prop="boxType">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_box_type"
            :value="scope.row.boxType"
          />
        </template>
      </el-table-column>
      <el-table-column label="装柜状态" align="center" prop="boxType" />
      <!-- <el-table-column label="订单状态" align="center" prop="status">
        <template slot-scope="scope">
          <dict-tag
            :options="dict.type.dy_order_status"
            :value="scope.row.status"
          />
        </template>
      </el-table-column> -->
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
            v-hasPermi="['dy:order:edit']"
            >修改订单</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-download"
            @click="handleExport(scope.row)"
            v-hasPermi="['dy:order:export']"
            >网页查看</el-button
          >
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['dy:order:remove']"
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

    <!-- 添加或修改运输订单对话框 -->
    <el-dialog
      :title="title"
      :visible.sync="open"
      width="800px"
      append-to-body
      @close="cancel"
    >
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-row v-if="roleKey == 'admin' || roleKey == 'admin1'">
          <el-col :span="12">
            <el-form-item label="客户ID" prop="createBy">
              <el-select
                v-model="form.createBy"
                filterable
                placeholder="选择客户"
                @change="getHistory"
              >
                <el-option
                  v-for="dict in teacherList"
                  :key="dict.id"
                  :label="dict.userName"
                  :value="dict.id"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="出发地" prop="startPlace">
              <el-input
                v-model="form.startPlace"
                placeholder="请输入出发地"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="到达地" prop="endPlace">
              <el-input
                v-model="form.endPlace"
                placeholder="请输入到达地"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="roleKey == 'admin' || roleKey == 'admin1'">
            <el-form-item label="托运单位" prop="consignor">
              <el-select v-model="form.consignor" placeholder="请选择托运单位">
                <el-option
                  v-for="dict in dict.type.dy_ship_company"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发货人姓名" prop="shipperName">
              <el-input
                v-model="form.shipperName"
                placeholder="请输入发货人姓名"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人姓名" prop="consigneeName">
              <el-input
                v-model="form.consigneeName"
                placeholder="请输入收货人姓名"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发货人电话" prop="shipperPhone">
              <el-input
                v-model="form.shipperPhone"
                placeholder="请输入发货人电话"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人电话" prop="consigneePhone">
              <el-input
                v-model="form.consigneePhone"
                placeholder="请输入收货人电话"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="发货人地址" prop="shipperAddress">
              <el-input
                v-model="form.shipperAddress"
                placeholder="请输入发货人地址"
                maxlength="30"
              />
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="收货人地址" prop="consigneeAddress">
              <el-input
                v-model="form.consigneeAddress"
                placeholder="请输入收货人地址"
                maxlength="50"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="运输类型" prop="transportType">
              <el-select
                v-model="form.transportType"
                placeholder="请选择运输类型"
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
            <el-form-item label="送货方式" prop="deliveryMethod">
              <el-select
                v-model="form.deliveryMethod"
                placeholder="请选择送货方式"
              >
                <el-option
                  v-for="dict in dict.type.dy_delivery_method"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item
              label="付款方式"
              prop="paymentMethod"
              v-if="roleKey == 'admin' || roleKey == 'admin1'"
            >
              <el-select
                v-model="form.paymentMethod"
                placeholder="请选择付款方式"
              >
                <el-option
                  v-for="dict in dict.type.dy_payment_method"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="roleKey == 'admin' || roleKey == 'admin1'">
            <el-form-item label="总金额(RMB)" prop="allFreight">
              <el-input
                v-model="form.allFreight"
                placeholder="请输入总金额(RMB)"
                maxlength="50"
                :disabled="disableAllFreightRMB"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12" v-if="roleKey == 'admin' || roleKey == 'admin1'">
            <el-form-item label="货柜类型" prop="boxType">
              <el-select v-model="form.boxType" placeholder="请选择货柜类型">
                <el-option
                  v-for="dict in dict.type.dy_box_type"
                  :key="dict.value"
                  :label="dict.label"
                  :value="dict.value"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12" v-if="roleKey == 'admin' || roleKey == 'admin1'">
            <el-form-item label="总金额(PHP)" prop="allFreightPHP">
              <el-input
                v-model="form.allFreightPHP"
                placeholder="请输入总金额(PHP)"
                maxlength="50"
                :disabled="disableAllFreightPHP"
              />
            </el-form-item>
          </el-col>
        </el-row>
        <!-- <el-row>
          <el-col :span="12" v-if="roleKey == 'admin' || roleKey == 'admin1'">
            <el-form-item label="订单状态" prop="status">
              <el-select
                v-model="form.status"
                placeholder="请选择订单状态"
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
        </el-row> -->
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
      <el-tabs type="border-card" v-if="form.id != null">
        <el-tab-pane label="货物明细">
          <OderDt :optType="optType" :orderId="form.id"></OderDt>
        </el-tab-pane>
        <el-tab-pane
          label="装箱信息"
          v-if="roleKey == 'admin' || roleKey == 'admin1'"
        >
          <Box :optType="optType" :orderId="form.id" :submit="submitForm"></Box>
        </el-tab-pane>
      </el-tabs>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">保 存</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  listOrder,
  getOrder,
  delOrder,
  addOrder,
  updateOrder,
  getOld
} from '@/api/dy/order'
import { listKh } from '@/api/system/user'
import OderDt from './components/oderdt.vue'
import Box from './components/box.vue'

export default {
  name: 'Order',
  dicts: [
    'dy_box_type',
    'dy_ship_company',
    'dy_delivery_method',
    'dy_transport_type',
    'payment_status',
    'dy_payment_method',
    'dy_order_status'
  ],
  components: { OderDt, Box },
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
      showSearch: false,
      //弹框的操作类型 view add edit
      optType: undefined,
      teacherList: [],
      roleKey: undefined,
      // 总条数
      total: 0,
      // 运输订单表格数据
      orderList: [],
      // 弹出层标题
      title: '',
      // 是否显示弹出层
      open: false,
      open2: false,
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        consignor: null,
        shipperName: null,
        shipperPhone: null,
        shipperAddress: null,
        consigneeName: null,
        consigneePhone: null,
        consigneeAddress: null,
        transportType: null,
        deliveryMethod: null,
        paymentMethod: null,
        startPlace: null,
        endPlace: null,
        oddNumbers: null,
        allFreight: null,
        allFreightPHP: null,
        receiptStatus: null,
        status: null,
        boxTime: null,
        boxType: null,
        orderTimes: null,
        boxNumber: null,
        boxStartTime: '',
        boxEndTime: '',
        orderStartTime: '',
        orderEndTime: ''
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        createBy: [
          { required: true, message: '客户id不能为空', trigger: 'change' }
        ],
        consignor: [
          { required: true, message: '托运单位不能为空', trigger: 'change' }
        ],
        shipperName: [
          { required: true, message: '发货人姓名不能为空', trigger: 'blur' }
        ],
        shipperPhone: [
          { required: true, message: '发货人电话不能为空', trigger: 'blur' }
        ],
        shipperAddress: [
          { required: true, message: '发货人地址不能为空', trigger: 'blur' }
        ],
        consigneeName: [
          { required: true, message: '收货人姓名不能为空', trigger: 'blur' }
        ],
        consigneePhone: [
          { required: true, message: '收货人电话不能为空', trigger: 'blur' }
        ],
        consigneeAddress: [
          { required: true, message: '收货人地址不能为空', trigger: 'blur' }
        ],
        transportType: [
          { required: true, message: '运输类型不能为空', trigger: 'change' }
        ],
        deliveryMethod: [
          { required: true, message: '送货方式不能为空', trigger: 'change' }
        ],
        paymentMethod: [
          { required: true, message: '付款方式不能为空', trigger: 'change' }
        ],
        startPlace: [
          { required: true, message: '出发地不能为空', trigger: 'blur' }
        ],
        endPlace: [
          { required: true, message: '到达地不能为空', trigger: 'blur' }
        ],
        boxType: [{ required: true, message: '货柜不能为空', trigger: 'blur' }]
      },
      activeNames: []
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
    this.roleKey = localStorage.getItem('roleKey')
    this.getList()
    this.listTeacher()
  },
  computed: {
    disableAllFreightPHP() {
      return !!this.form.allFreight
    },
    disableAllFreightRMB() {
      return !!this.form.allFreightPHP
    }
  },
  methods: {
    getHistory(i) {
      getOld(i).then((res) => {
        if (res.data) {
          this.form = res.data
        }
      })
    },
    listTeacher() {
      listKh().then((res) => {
        this.teacherList = res.rows.map((item) => {
          return { ...item, id: item.userId.toString() }
        })
      })
    },
    /** 查询运输订单列表 */
    getList() {
      this.loading = true
      let a = JSON.parse(JSON.stringify(this.queryParams))
      delete a.orderTimes
      delete a.boxTime
      listOrder(a).then((response) => {
        this.orderList = response.rows
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
        consignor: null,
        shipperName: null,
        shipperPhone: null,
        shipperAddress: null,
        consigneeName: null,
        consigneePhone: null,
        consigneeAddress: null,
        transportType: null,
        deliveryMethod: null,
        paymentMethod: null,
        startPlace: null,
        endPlace: null,
        oddNumbers: null,
        barcodeUrl: null,
        allFreight: null,
        allFreightPHP: null,
        receiptStatus: null,
        status: null,
        createBy: null,
        createTime: null,
        updateBy: null,
        updateTime: null,
        boxType: null,
        remark: null,
        optType: undefined,
        roleKey: undefined
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
      this.optType = 'add'
      this.open2 = true
      this.title = '添加运输订单'
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset()
      const id = row.id || this.ids
      getOrder(id).then((response) => {
        this.form = response.data
        this.optType = 'edit'
        this.open = true
        this.title = '修改运输订单'
      })
    },
    /** 提交按钮 */
    submitForm() {
      this.$refs['form'].validate((valid) => {
        if (this.roleKey == 'admin' || this.roleKey == 'admin1') {
          if (!this.form.allFreight && !this.form.allFreightPHP) {
            this.$message.error('请填写RMB金额或PHP金额！')
            return
          }
        }

        if (valid) {
          if (this.form.id != null) {
            updateOrder(this.form).then((response) => {
              this.$modal.msgSuccess('修改成功')
              this.open = false
              this.open2 = false
              this.getList()
            })
          } else {
            addOrder(this.form).then((response) => {
              this.$modal.msgSuccess('新增成功')
              this.open = false
              this.reset()
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
        .confirm('是否确认删除运输订单编号为"' + ids + '"的数据项？')
        .then(function () {
          return delOrder(ids)
        })
        .then(() => {
          this.getList()
          this.$modal.msgSuccess('删除成功')
        })
        .catch(() => {})
    },
    /** 导出pdf按钮操作 */
    handleExport(row) {
      const routeData = this.$router.resolve({
        path: '/pdf',
        query: { data: JSON.stringify(row.id) }
      })
      const url = routeData.href
      window.open(url, '_blank')
    }
  }
}
</script>
