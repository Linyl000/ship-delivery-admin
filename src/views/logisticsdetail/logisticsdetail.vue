<template>
  <div>
    <h1 style="text-align: center">万海供应链</h1>
    <!-- <div v-if="list.length !== 0" style="text-align: center; color: #666">
      运单号：{{ list[0].logisticsId }}
    </div> -->
    <div class="box">
      <el-steps
        v-if="list.length !== 0"
        direction="vertical"
        :active="1"
        space="90px"
      >
        <el-step
          v-for="i in list"
          :key="i.id"
          :title="i.logisticsRecords"
          icon="el-icon-star-on"
          :description="`${i.createTime}`"
        ></el-step>
      </el-steps>
      <div v-else style="text-align: center">暂时没有查询到物流信息！</div>
      <!-- <el-timeline :reverse="false">
        <el-timeline-item
          v-for="(activity, index) in list"
          :key="index"
          :timestamp="activity.createTime"
          :color="index === 0 ? 'skyblue' : ''"
          :size="index === 0 ? 'large' : 'normal'"
        >
          {{ activity.logisticsRecords }}
        </el-timeline-item>
      </el-timeline> -->
    </div>
  </div>
</template>

<script>
import { barcode } from '@/api/logistics/detail.js'
export default {
  data() {
    return {
      id: '',
      list: []
    }
  },
  created() {
    // 获取 URL 中的查询参数
    const urlSearchParams = new URLSearchParams(window.location.search)
    const id = urlSearchParams.get('id')
    this.barcode(id)
  },
  methods: {
    barcode(id) {
      barcode({ logisticsId: id }).then((res) => {
        this.list = res.data
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.box {
  padding: 20px 0;
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
}
</style>
