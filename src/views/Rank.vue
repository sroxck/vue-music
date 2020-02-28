<!--  -->
<template>
  <div class="p-3 mt-2">
    <div class="top d-flex bg-white mb-3 " v-for="(item,index) in musicListTj" :key="index" @click="musicIn(index)">
      <div class="top-left py-3 pl-3 flex-1">
        <h3 class="pb-2">{{item.name}}</h3>
        <ol>
          <li v-for="(item1,index1) in item.top3  "  :key="index1" >
            <p class="text-grey fs-ssm"><strong class="text-black">{{index1 + 1+'.'}}</strong>{{item1.name}}</p>
          </li>
        </ol>
      </div>
      <div class="top-right">
        <div class="top-content">
          <img :src="item.coverImgUrl" alt="" class="h-100">
          <div class="song-list-info px-2 ">
                <i
                  class="iconfont icon-bofangsanjiaoxing  text-white fs-ssm"
                ></i>
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
      musicListTj: []
    }
  },
  created () {
    this.getRank()
  },
  mounted () {},
  methods: {
    async getRank () {
      for (let i = 0; i < 20; i++) {
        const { data: res } = await this.$http.get(`/top/list?idx=${i}`)
        const list = {
          playlist: res.playlist.tracks,
          description: res.playlist.description,
          coverImgUrl: res.playlist.coverImgUrl,
          name: res.playlist.name,
          top3: res.playlist.tracks.splice(0, 3),
          playCount: res.playlist.playCount
        }
        this.musicListTj.push(list)
      }
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
