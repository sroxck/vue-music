<!--  -->
<template>
  <div>
    <!-- 顶部盒子 -->
    <section class="d-flex p-3 ai-center bg-white shadow">
      <div class="imgBox">
        <img src="../assets/img/logo.svg" alt="" class="h-100">
      </div>
      <div class="px-3 flex-1">
        <p class="fs-lg pb-1">你的好友</p>
        <span class="text-grey ">在用QQ音乐邀你一起</span>
      </div>
      <div class="buttonDiv text-grey" @click="$router.go(-1)">返回</div>
    </section>
    <!-- 标题盒子 -->
    <section class="d-flex flex-column ai-center jc-center mt-4 text-center">
      <div class="title mb-3 mt-1">
        <h2 class="titleH pb-3">{{songsInfo.name}}</h2>
        <span class="fs-lg text-grey ">{{songsInfo.ar}}</span>
      </div>
      <div class="titleimg box-shadow">
        <img :src="songsInfo.url" alt="" class="h-100 ">
      </div>
      <div class="play mt-4 pt-1  ">
        <a href="#" class="iconfont icon-icon_xinyong_xianxing_jijin- "></a>
        <a href="#" class="iconfont icon-bofangsanjiaoxing " @click="bofang" v-if="isBOF"></a>
        <a href="#" class="iconfont icon-zanting " @click="zanting" v-else></a>
        <a href="#" class="iconfont icon-aixin"></a>
      </div>
      <div class="pt-4 downMs">
        <a href="#" class="bg-info">下载歌曲</a>
      </div>
      <div>
        <!-- <audio :src="musicUrl" ref="audio" ></audio> -->
      </div>
    </section>
  </div>
</template>

<script>
import Bus from './Bus'
export default {

  props: ['id'],
  data () {
    return {
      musicUrl: '',
      isBOF: true,
      songsInfo: {}
    }
  },
  created () {
    this.getMusci()
    this.getMSinfo()
  },
  mounted () {},
  methods: {
    async getMusci () {
      const res = await this.$http.get('/song/url?id=' + this.id)
      this.musicUrl = res.data.data[0].url
    },
    bofang () {
      this.isBOF = false
      this.$store.state.MusicName = this.songsInfo.name
      this.$store.state.MusicUrl = this.musicUrl
      this.$store.state.paly = true
      console.log(this.$parent.$children[0]);
      setTimeout(e=>{
        this.$parent.$children[0].start()  
      },100)  
    },
    zanting () {
      this.isBOF = true
      // this.$refs.audio.pause()
    },
    async getMSinfo () {
      const { data: res } = await this.$http.get('/song/detail?ids=' + this.id)
      const result = {
        name: res.songs[0].name,
        url: res.songs[0].al.picUrl,
        ar: res.songs[0].ar[0].name
      }
      this.songsInfo = result
    }
  }
}
</script>
<style lang="scss" scoped>
/* @import url(); 引入css类 */
.buttonDiv {
  border: 1px solid #ccc;
  border-radius: 15px;
  padding: 5px 10px;
}
.imgBox {
  height: 52px;
}
.titleH {
  font-weight: normal;
}
.titleimg {
  height: 230px;
}
.play {
  a {
    display: inline-block;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border:1px solid #ccc;
    position: relative;
    margin: 0 20px
  }
  a::before{
    position: absolute;
    font-size: 20px;
    top: 50%;
    left: 52%;
    transform: translate(-50%,-50%)
  }
}
.downMs {
  a {
    display: block;
    height: 40px;
    width: 235px;
    line-height: 40px;
    font-size: 18px;
    color: #fff;
    border-radius: 20px
  }
}
</style>
