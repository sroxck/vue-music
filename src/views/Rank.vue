<!--排行页面  -->
<template>
  <div class="p-3 mt-2">
    <div class="top d-flex bg-white mb-3 " v-for="(item,index) in musicListTj" :key="index">
      <!-- 左边区域 -->
      <div class="top-left py-3 pl-3 flex-1 d-flex flex-column"  @click="musicIn(item.id)">
        <h3 class="pb-2">{{item.name}}</h3>
        <!-- <ol>
          <li v-for="(item1,index1) in item.top3  "  :key="index1" >
            <p class="text-grey fs-ssm"><strong class="text-black">{{index1 + 1+'.'}}</strong>{{item1.name}}</p>
          </li>
        </ol> -->
        <p class="pt-1">
          {{item.copywriter}}
        </p>
      </div>
      <!-- 右边区域 -->
      <div class="top-right">
        <div class="top-content">
          <img :src="item.picUrl" alt="" class="h-100">
          <!-- 播放量 -->
          <div class="song-list-info px-2 ">
              <i class="iconfont icon-bofangsanjiaoxing  text-white fs-ssm"></i>
              <span class="fs-ssm text-white">{{item.playCount | localYi}}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      musicListTj: [] // 存放歌单详情信息
    }
  },
  created () {
    this.getRank() // 获取歌单
  },
  mounted () {},
  methods: {
    async getRank () { // 请求歌单并获取需求的数据
    const { data: res } = await this.$http.get(`/personalized?limit=12`)
        this.musicListTj = res.result
    },
    musicIn (id) {
      this.$router.push('/info/' + id)
    }
  }
}
</script>
<style lang="scss">
/* @import url(); 引入css类 */
ol li {
  list-style: none;
}
.song-list-info {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.4);
  }
  .top-content {
    height: 7.6923rem;
    position: relative;
  }
  .top {
    border-radius: 10px;
    overflow: hidden;
  }
</style>
