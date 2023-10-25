<template>
  <div class="container">
    <el-button type="primary" v-print="'#print-container'">点击打印</el-button>
    <div id="print-container" class="print-container">
      <div v-for="(i, index) in list" :key="index" class="print-content">
        <div>{{ i.mt }}-{{ i.tatalBox }}-{{ i.boxNumer }}</div>

        <div>{{ i.boxTime }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { seq } from '@/api/dy/printTab'

export default {
  name: 'pdf',
  dicts: ['dy_order_status'],
  data() {
    return {
      list: [],
      // 查询参数
      queryParams: {
        ids: null,
        orderId: null
      }
    }
  },
  created() {
    this.queryParams.ids = JSON.parse(this.$route.query.ids)
    this.queryParams.orderId = JSON.parse(this.$route.query.orderId)
    this.getList()
  },
  methods: {
    getList() {
      seq(this.queryParams).then((response) => {
        this.list = response.data
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.container {
  padding: 20px;
}

.print-content {
  page-break-after: always;
  text-align: center;
  font-size: 60px;
  line-height: 1.5;
}
</style>
