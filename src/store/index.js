import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    top: [], // 用于存放排行榜歌单数
    info: [], // 存放歌单详情
    tracks: null,
    MusicName:'',
    MusicUrl:'',
    play:false,
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
