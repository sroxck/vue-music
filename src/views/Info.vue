<!--  -->
<template>
  <div>
    <div class="d-flex p-3 pb-2 ai-center border-bottom">
      <div class="logo"><img src="../assets/img/logo.svg" alt="" class="h-100"></div>
      <div class="flex-1 pl-2 fs-lg">{{Mpath === '/rank' ? '更多QQ音乐排行榜' : '更多精彩歌单' }}</div>
      <router-link tag="div" :to="Mpath" class="backRank fs-sm text-grey">{{Mpath === '/rank' ? '戳我查看' : '返回首页' }}</router-link>
    </div>
    <section class="d-flex flex-column jc-center ai-center mt-3">
      <div class="imgbox mb-4">
        <img :src="$store.state.info.coverImgUrl" alt="" class="h-100">
      </div>
      <div class="pt-1 text-center">
        <h3 class="pb-3">{{$store.state.info.name}}</h3>
        <p>更新时间: {{$store.state.info.trackUpdateTime | formdata}}</p>
      </div>
      <div>
        <div class="iconfont icon-bofangsanjiaoxing fs-xxl bofang mt-3" ></div>
      </div>
    </section>
    <section class="px-3 pt-2">
      <p class="text-grey"> 共{{$store.state.info.trackCount}}首</p>
      <ol>
        <li v-for="(item,index) in $store.state.info.tracks" :key="index" class="d-flex p-3" @click="playMusic(item.id)">
          <span class="text-chinaRed mr-3 ">{{index+1}}</span>
          <div>
            <p>{{item.name}}</p>
            <span v-for="(item1,index1) in item.ar" :key="index1" class="text-grey pt-1">{{item1.name}} </span>
          </div>
        </li>
      </ol>
    </section>
  </div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {
      Mpath: '/rank'
    }
  },
  async created () {
    if (this.$route.name === 'Info') {
      const { data: res } = await this.$http.get(`/playlist/detail?id=${this.id}`)
      console.log(res);
      this.$store.state.info = res.playlist
      this.$store.state.tracks = res.playlist.tracks
    } else if (this.$route.name === 'MusicPlay') {
      this.Mpath = '/'
      const { data: res } = await this.$http.get(`/playlist/detail?id=${this.id}`)
      this.$store.state.info = res.playlist
      this.$store.state.tracks = res.playlist.tracks
    }
  },
  mounted () {},
  methods: {
    playMusic (id) {
      this.$router.push('/music/' + id) // 点击歌曲详情进入播放页
    }
  }
}
</script>
<style scoped>
/* @import url(); 引入css类 */
.logo {
  height: 33px;
}
.backRank {
  border: 1px solid #ccc;
  padding:3px 15px;
  border-radius: 15px;
}
.imgbox {
  height: 13.6154rem;
  border-radius: 15px;
  overflow: hidden;
}
.bofang {
  height: 40px;
  width: 190px;
  background-color: #22d59c;
  box-shadow: 0 6px 32px rgba(24,213,156,.5);
  border-radius: 20px;
  position: relative;
}
.bofang::before{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  color: #fff;
}
</style>
