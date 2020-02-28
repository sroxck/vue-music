<!--  -->
<template>
  <div>
     <div class="header p-3 pb-0 shadow">
      <div class="logo d-flex jc-center ai-center ">
        <div class="logo-box bg-white" >
          <img src="../assets/img/logo.svg"  alt="">
        </div>
        <div class="logo-title flex-1 ml-2">
          <p class="fs-lg mb-1">QQ音乐</p>
          <p class="fs-ssm text-grey">打开APP收藏下载</p>
        </div>
        <div>
          <a href="#" class="logo-button btn-qq fs-ssm  px-3 text-grey">登录</a>
        </div>
      </div>
      <div class="nav d-flex fs-lg text-grey text-center ">
        <router-link  tag="div" to="/" :class="{ active: current == 0}">推荐</router-link>
        <router-link  tag="div" to="rank" :class="{ active: current == 1}" >排行</router-link>
      </div>
    </div>
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
  },
  created () {},
  watch: {
    $route (value) {
      if (/rank/.test(value.fullPath)) {
        this.current = 1
      } else if (/\//.test(value.fullPath)) {
        this.current = 0
      }
    }
  },
  mounted () {
    if (/rank/.test(this.$route.fullPath)) {
      this.current = 1
    } else if (/\//.test(this.$route.fullPath)) {
      this.current = 0
    }
  }
}
</script>
<style lang="scss" >
/* @import url(); 引入css类 */
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
.header {
  background-color: #fafafa;
  position:sticky;
  top:0;
  z-index: 99;
}
.logo-box {
  height: 2.5385rem;
  background-color: #fff;
  padding: 3px;
  img{
    height: 100%;
  }
}
.btn-qq {
  border: 1px solid #ccc;
  padding: 5px 0;
  border-radius: 15px;
}
.nav {
  div {
    width: 50%;
    height:3.2308rem ;
    line-height: 3.2308rem ;
    position: relative;
  }
  .active{
    color: rgba(34,213,156,1);
  }
  .active::after{
    content: "";
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%);
    width: 1.6rem;
    height: 0.2rem;
    border-radius: .3rem;
    background: currentColor;
  }
}
</style>
