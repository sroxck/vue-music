<template>
  <div class="home px-3">
    <section class="pt-3 sea pb-1">
      <i class="iconfont icon-sousuo pos"></i>
      <input
        ref="searchRef"
        type="text"
        placeholder="搜索"
        class=" w-100 py-2 search  text-center text-grey " @focus="searchMS" v-model="searchKeyword" @keydown.enter="searchMusic"/>
        <a href="#" class="ml-4" @click="searchBL" v-show="isSearch">取消</a>
        <div class="mt-2" v-show="isSearch">
          <p v-for="(item,index) in searchList" :key="index" @click="$router.push(`music/${item.id}`)" class="d-flex text-grey jc-between px-4 py-2 " style="backgroundColor:#fff" >
            <span>{{item.name}}</span> 
            <span>歌手:{{item.artists[0].name}}</span>
          </p>
        </div>
        <div class="searchBox"  v-show="isSearch">
          <h4 class="mx-3 py-3">热门搜索</h4>
          <div class="hot d-flex flex-wrap" >
            <a href="#" class="bg-white px-2 mr-2 py-1 mb-3 fs-sm text-grey" v-for="(item,index) in hot" @click="goMusicPlayer(item.first)" :key="index">{{item.first}}</a>
          </div>
        </div>
    </section>
    <m-card title="官方歌单" href="#">
      <div class="removeScroll">
        <div class="song-list  d-flex">
          <div
            v-for="(item, index) in musicList"
            @click="musicPlay(item.id)"
            :key="index"
            class="song-list-item mr-2 pb-4">
            <div class="song-list-box">
              <img :src="item.imgUrl" alt="" />
              <div class="song-list-info px-2 ">
                <i class="iconfont icon-bofangsanjiaoxing  text-white fs-ssm"></i>
                <span class="fs-ssm text-white">{{item.count | localWan}}</span>
              </div>
            </div>
            <div class="text-grey mt-2">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </m-card>
    <m-card title="达人歌单" href="#">
      <div class="removeScroll">
        <div class="song-list  d-flex">
          <div
            v-for="(item, index) in darenList"
             @click="musicPlay(item.id)"
            :key="index"
            class="song-list-item mr-2 pb-4">
            <div class="song-list-box">
              <img :src="item.imgUrl" alt="" />
              <div class="song-list-info px-2 ">
                <i class="iconfont icon-bofangsanjiaoxing  text-white fs-ssm"></i>
                <span class="fs-ssm text-white">{{ item.count | localWan }}</span>
              </div>
            </div>
            <div class="text-grey mt-2">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </m-card>
     <m-card title="专区" href="#">
      <div class="removeScroll">
        <div class="song-list  d-flex">
          <div
            v-for="(item, index) in divisionList"
             @click="musicPlay(item.id)"
            :key="index"
            class="song-list-item mr-2 pb-4">
            <div class=" song-list-box divisionBox">
              <img :src="item.imgUrl" alt="" class="w-100 h-100"/>
               <div class="song-list-info px-2 ">
                <span class="fs-ssm text-white"></span>
              </div>
            </div>
            <div class="text-grey mt-2">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </m-card>
    <footer class="d-flex flex-column ai-center mt-5">
      <div class="fot">
        <img src="../assets/img/logo_ch.svg" alt="" class="h-100">
      </div>
      <div class="mt-2 text-grey fs-ssm text-center pb-5">
        <p>Copyright © 1998 - 2019 Tencent. All Rights Reserved.</p>
        <p>联系邮箱：642261686@qq.com QQ：642261686</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  watch: {
    searchKeyword(val){
      if(val ==''||val ==null||val ==undefined) return this.searchList = []
      this.searchMusic(val)
    }
  },
  data () {
    return {
      musicList: [], // 用于存储官方歌单的数组
      darenList: [], // 存储达人歌单
      hot: [],
      searchKeyword:'', // search keyword 
      divisionList: [],
      isSearch: false,
      searchList:[]
    }
  },
  methods: {
    async searchMusic(e){
     let timer = setTimeout(async res1=>{
      const res = await this.$http.get('/search', {
        params: { 
          type: 1,
          limit:12,
          keywords:this.searchKeyword
        }
      })
      console.log(res);
      this.searchList = res.data.result.songs
     },100)
    },
    async getMusicList () { // 请求歌单
      const res = await this.$http.get('/top/playlist/highquality', {
        params: { // 一次拿12条
          limit: 18
        }
      })
      if (res.status !== 200) return alert('获取官方歌单失败')
      res.data.playlists.forEach((item, index) => {
        if (index < 6) { // 达人歌单和官方歌单各分6条数据...太蠢了
          const model = {
            name: item.name,
            id: item.id,
            count: item.playCount,
            imgUrl: item.coverImgUrl
          }
          this.musicList.push(model)
        } else if (index < 12) {
          const model = {
            name: item.name,
            id: item.id,
            count: item.playCount,
            imgUrl: item.coverImgUrl
          }
          this.darenList.push(model)
        } else {
          const model = {
            name: item.name,
            id: item.id,
            count: item.playCount,
            imgUrl: item.coverImgUrl
          }
          this.divisionList.push(model)
        }
      })
    },
    musicPlay (id) { // 点击歌单详情 跳转到播放页
      this.$router.push('/musicPlays/' + id)
    },
    async goMusicPlayer (key) {
      const res = await this.$http.get('/search', {
        params: { 
          type: 1,
          limit:1,
          keywords:key
        }
      })
      this.$router.push(`music/${res.data.result.songs[0].id}`)
    },
    async getHot () {
      const { data: res } = await this.$http.get('/search/hot')
      this.hot = res.result.hots
      console.log(res);
    },
    searchMS () {
      const input = this.$refs.searchRef
      this.isSearch = true
      input.classList.add('active')
    },
    searchBL () {
      const input = this.$refs.searchRef
      this.isSearch = false
      this.searchKeyword = ''
      input.classList.remove('active')
    }
  },
  created () { // 请求歌单
    this.getMusicList()
    this.getHot()
  }
}
</script>
<style lang="scss" scope>
@import '../assets/css/home.scss'
</style>
