<template>
  <div v-if="$store.state.MusicName">
    <div class="box p-3 d-flex jc-between ai-center">
      <div>
        <span class="">{{$store.state.MusicName}}</span>
        <audio :src="$store.state.musicUrl" ref="audio1" ></audio>
      </div>
      <div>
        <button @click="start" class="px-2 btn "  >播放</button>
        <button @click="zanting" class="px-2 ml-2 btn" >暂停</button>
      </div>
    </div>
  </div>
</template>

<script>
import Bus from './Bus'

export default {
  data () {
    return {
      play:true
    }
  },
  created(){
    Bus.$on('paly',k=>{
    if(k){
      this.start()
    }
  })
  },
 mounted () {
 },
  methods: {
    start(){
      if(this.$refs.audio1.src==''||this.$refs.audio1.src==undefined||this.$refs.audio1.src==null){
        this.$refs.audio1.src = this.$store.state.MusicUrl
      }
      this.$refs.audio1.play()
      this.play = false
    },
     zanting () {
      this.$refs.audio1.pause()
      this.play = true
    },
  }
}
</script>

<style>
  .box{
    position: fixed;
    bottom: 0px;
    width: 100vw;
    background-color:#eee;
  }
</style>