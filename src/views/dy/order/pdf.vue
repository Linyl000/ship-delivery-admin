<template>
  <div class="container">
    <table>
      <tr>
        <th colspan="10">
          <div
            style="display: flex; align-items: center; justify-content: center"
          >
            <img
              :src="dept.logo"
              width="50"
              height="50"
              style="margin: 0 20px"
            />
            <h1 style="font-weight: 700">{{ dept.deptName }}托运单</h1>
          </div>
        </th>
        <th colspan="2" style="text-align: left; font-size: 24px">
          总件数：{{ order.total }}
        </th>
      </tr>
      <tr>
        <td colspan="12" style="text-align: center">
          <span style="margin: 15px">托运日期: {{ order.deliveryDate }}</span
          ><span style="margin: 15px">出发地: {{ order.startPlace }}</span
          ><span style="margin: 15px">到达地区: {{ order.endPlace }}</span
          ><span style="margin: 15px">托运单号:{{ order.oddNumbers }}</span>
        </td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: left">托运单位</td>
        <td colspan="3">{{ order.consignorName }}</td>
        <td colspan="3" style="text-align: left">客户代码</td>
        <td colspan="3">{{ order.username }}</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: left">发货人</td>
        <td colspan="3">{{ order.shipperName }}</td>
        <td colspan="3" style="text-align: left">收货人</td>
        <td colspan="3">{{ order.consigneeName }}</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: left">联系电话</td>
        <td colspan="3">{{ order.shipperPhone }}</td>
        <td colspan="3" style="text-align: left">联系电话</td>
        <td colspan="3">{{ order.consigneePhone }}</td>
      </tr>
      <tr>
        <td colspan="3" style="text-align: left">发货地址</td>
        <td colspan="3">{{ order.shipperAddress }}</td>
        <td colspan="3" style="text-align: left">送货地址</td>
        <td colspan="3">{{ order.consigneePhone }}</td>
      </tr>
      <tr>
        <td colspan="2">运输类型</td>
        <td colspan="2">{{ order.transportTypeName }}</td>
        <td colspan="2">送货方式</td>
        <td colspan="2">{{ order.deliveryMethodName }}</td>
        <td colspan="2">签收情况</td>
        <td colspan="2">{{ order.receiptStatusName }}</td>
      </tr>
      <tr>
        <td colspan="12" style="text-align: center; white-space: pre-wrap">
          货物详情
        </td>
      </tr>
      <tr>
        <td>商品名称</td>
        <td>箱数</td>
        <td>装箱数量</td>
        <td>总件数</td>
        <td>单件商品重量/kg</td>
        <td>总重量/kg</td>
        <td>单价/元</td>
        <td>总货值</td>
        <!-- <td>单件体积</td>
        <td>总体积</td> -->
        <td>商品材料</td>
        <td>商品状态</td>
        <td colspan="2">备注</td>
      </tr>
      <tr v-for="i in orderDt" :key="i.id">
        <td>{{ i.name }}</td>
        <td>{{ i.number }}</td>
        <td>{{ i.boxNumber }}</td>
        <td>{{ i.totalNumber }}</td>
        <td>{{ i.weight }}</td>
        <td>{{ i.totalWeight }}</td>
        <td>{{ i.unitPrice }}</td>
        <td>{{ i.totalValue }}</td>
        <td>{{ i.material }}</td>
        <td>{{ getLabelByValue(i.status, dict.type.dy_order_status) }}</td>
        <td colspan="2">{{ i.remark }}</td>
      </tr>
      <tr>
        <td colspan="1">总金额(RMB)</td>
        <td colspan="3">{{ order.allFreight }}</td>
        <td colspan="1">总金额(PHP)</td>
        <td colspan="3">{{ order.allFreightPHP }}</td>
        <td colspan="2">付款方式</td>
        <td colspan="2">{{ order.paymentMethodName }}</td>
      </tr>
      <tr>
        <td colspan="12" style="text-align: center; white-space: pre-wrap">
          装箱信息
        </td>
      </tr>
      <tr>
        <td colspan="2">进仓号</td>
        <td>商品名称</td>
        <td>长/cm</td>
        <td>宽/cm</td>
        <td>高/cm</td>
        <td>单箱体积/m³</td>
        <td>总体积/m³</td>
        <td>入库箱数</td>
        <td>单箱重量/kg</td>
        <td>总重量/kg</td>
        <td>二维码</td>
      </tr>
      <tr v-for="i in boxs" :key="i.id">
        <td colspan="2">{{ i.boxNumber }}</td>
        <td>{{ i.tradeName }}</td>
        <td>{{ i.tradeLong }}</td>
        <td>{{ i.tradeWidth }}</td>
        <td>{{ i.tradeHeight }}</td>
        <td>{{ i.unitVolume }}</td>
        <td>{{ i.storageVolume }}</td>
        <td>{{ i.number }}</td>
        <td>{{ i.unitWeight }}</td>
        <td>{{ i.storageWeight }}</td>
        <td>
          <image-preview :src="i.barcodeUrl" :width="70" :height="70" />
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import { getOrderPdf } from '@/api/dy/order'

export default {
  name: 'pdf',
  dicts: ['dy_order_status'],
  data() {
    return {
      boxs: [],
      order: [],
      orderDt: [],
      dept: null,
      // 查询参数
      queryParams: {
        id: null
      }
    }
  },
  created() {
    // this.$set(this.queryParams, 'id', this.$route.params.id)
    // this.queryParams = this.$route.params.data
    this.queryParams.id = JSON.parse(this.$route.query.data)
    this.getpdf()
  },
  methods: {
    /** 查询运输订单列表 */
    getpdf() {
      getOrderPdf(this.queryParams.id).then((response) => {
        this.boxs = response.boxs
        this.order = response.order
        this.orderDt = response.orderDt
        this.dept = response.dept
      })
    },
    getLabelByValue(value, dictList) {
      for (let dict of dictList) {
        if (dict.value === value) {
          return dict.label
        }
      }
      return ''
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  // width: 100%;
  padding: 20px 0;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  font-weight: 700;
}
table {
  width: 800px;
  border: 1px solid #000; /* 表格边框 */
  border-collapse: collapse; /* 合并单元格边框 */
}

th,
td {
  border: 1px solid #000; /* 单元格边框 */
}
td {
  padding: 5px;
  width: 66px;
  text-align: center;
}
</style>
