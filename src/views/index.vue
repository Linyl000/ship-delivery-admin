<template>
  <div>
    <el-carousel :style="{ 'min-height': 'calc(100vh - 84px)' }" arrow="always">
      <el-carousel-item
        v-for="i in imgList"
        :key="i.id"
        :style="{ 'min-height': 'calc(100vh - 84px)' }"
      >
        <img :src="i.homePage" alt="" class="carousel-img" />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
import { indexBanner } from '@/api/zy/banner.js'
import { getToken } from '@/utils/auth'
import service from '@/utils/request.js'

export default {
  data() {
    return {
      // fileList: [],
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false,
      imageUrl: '',
      headers: { Authorization: 'Bearer ' + getToken() },
      imgList: [],
      action: ''
    }
  },
  created() {
    this.action = service.ip + '/common/upload'
    this.getList()
  },
  methods: {
    //获取图片列表
    getList() {
      indexBanner().then((response) => {
        this.total = response.total
        this.imgList = response.rows
        this.loading = false
      })
    },
    //删除文件
    deleteImg(i) {
      this.$confirm('确认删除该图片？')
        .then((_) => {
          //删除
          this.toDelImg(i)
          done()
        })
        .catch((_) => {})
    },
    async toDelImg(i) {
      let res = await deleteBanner(i.id)
      if (res.code === 200) {
        console.log('删除--getlist')
        this.getList()
      }
    },
    //
    getSuccess() {
      console.log(333)
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-img {
  width: 100%;
  height: 100%;
}
::v-deep .el-carousel__container {
  // height: 100%;
  min-height: calc(100vh - 84px);
}
</style>
