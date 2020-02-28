<template>
  <div id="app">
    <transition  mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>
<script>
export default {
  data () {
    return {
      current: 0
    }
  }
}
</script>
<style lang="scss">
.v-enter{
 opacity: 0;
}
.v-enter-active{
 transition: 0.2s;
}
.v-enter-to{
 opacity: 1;
}
.v-leave{
 opacity: 1;
}
.v-leave-to{
 opacity:0;
}
.v-leave-active{
 transition: 0.2s;
}
</style>
