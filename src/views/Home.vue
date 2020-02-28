<template>
  <div class="home px-3">
    <section class="pt-3 sea">
      <i class="iconfont icon-sousuo pos"></i>
      <input
        type="text"
        placeholder="搜索"
        class=" w-100 py-2 search text-center text-grey "
      />
    </section>
    <m-card title="官方歌单" href="#">
      <div class="removeScroll">
        <div class="song-list  d-flex">
          <div
            v-for="(item, index) in musicList"
             @click="musicPlay(item.id)"
            :key="index"
            class="song-list-item mr-2 pb-4"
          >
            <div class="song-list-box">
              <img :src="item.imgUrl" alt="" />
              <div class="song-list-info px-2 ">
                <i
                  class="iconfont icon-bofangsanjiaoxing  text-white fs-ssm"
                ></i>
                <span class="fs-ssm text-white">{{
                  item.count | localWan
                }}</span>
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
            :key="index"
            class="song-list-item mr-2 pb-4"
          >
            <div class="song-list-box">
              <img :src="item.imgUrl" alt="" />
              <div class="song-list-info px-2 ">
                <i
                  class="iconfont icon-bofangsanjiaoxing  text-white fs-ssm"
                ></i>
                <span class="fs-ssm text-white">{{
                  item.count | localWan
                }}</span>
              </div>
            </div>
            <div class="text-grey mt-2">{{ item.name }}</div>
          </div>
        </div>
      </div>
    </m-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      musicList: [],
      darenList: []
    }
  },
  methods: {
    async getMusicList () {
      const res = await this.$http.get('/top/playlist/highquality', {
        params: {
          limit: 12
        }
      })
      if (res.status !== 200) return console.log('获取官方歌单失败')
      res.data.playlists.forEach((item, index) => {
        if (index < 6) {
          const model = {
            name: item.name,
            id: item.id,
            count: item.playCount,
            imgUrl: item.coverImgUrl
          }
          this.musicList.push(model)
        } else {
          const model = {
            name: item.name,
            id: item.userId,
            count: item.playCount,
            imgUrl: item.coverImgUrl
          }
          this.darenList.push(model)
        }
      })
    },
    musicPlay (id) {
      this.$router.push('/musicPlays/' + id)
    }
  },
  created () {
    this.getMusicList()
  }
}
</script>
<style lang="scss">
.search {
  border: 0;
  border-radius: 15px;
  font-size: 15px;
  outline: none;
}
.sea {
  position: relative;
}
.pos {
  position: absolute;
  top: 50%;
  left: 40%;
}
.song-list-box {
  height: 7.6923rem;
  position: relative;
  img {
    height: 100%;
  }
  .song-list-info {
    position: absolute;
    bottom: 0;
    right: 0;
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.4);
  }
}
.song-list {
  overflow-x: scroll;
  /* 解决ios手机页面滑动卡顿问题 */
  -webkit-overflow-scrolling: touch;
}
.removeScroll {
  overflow: hidden;
  height: 10.3846rem;
}
.song-list-item img {
  border-radius: 10px;
}
</style>
