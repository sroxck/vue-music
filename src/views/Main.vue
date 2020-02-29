<!--头部公共区域 推荐+排行tab栏  -->
<template>
  <div>
     <div class="header p-3 pb-0 shadow">
       <!-- logo条 -->
      <div class="logo d-flex jc-center ai-center ">
        <!-- 左 -->
        <div class="logo-box bg-white" >
          <img src="../assets/img/logo.svg"  alt="">
        </div>
        <!-- 中 -->
        <div class="logo-title flex-1 ml-2">
          <p class="fs-lg mb-1">QQ音乐</p>
          <p class="fs-ssm text-grey">打开APP收藏下载</p>
        </div>
        <!-- 右 -->
        <div>
          <a href="#" class="logo-button btn-qq fs-ssm  px-3 text-grey">登录</a>
        </div>
      </div>
      <!-- tab栏 -->
      <div class="nav d-flex fs-lg text-grey text-center ">
        <router-link  tag="div" to="/" :class="{ active: current == 0}">推荐</router-link>
        <router-link  tag="div" to="rank" :class="{ active: current == 1}" >排行</router-link>
      </div>
    </div>
    <!-- 路由占位符 使用过渡效果 -->
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
  // 监听路由实现类名切换
  watch: {
    $route (value) {
      if (/rank/.test(value.fullPath)) { // 前往rank路由 添加类
        this.current = 1
      } else if (/\//.test(value.fullPath)) { // 前往/路由 添加类
        this.current = 0
      }
    }
  },
  // 监听路由页面刷新无效,需要在Dom加载后重新根据条件添加类
  mounted () {
    if (/rank/.test(this.$route.fullPath)) {
      this.current = 1
    } else if (/\//.test(this.$route.fullPath)) {
      this.current = 0
    }
  }
}
</script>
<style lang="scss" scope >
/* @import url(); 引入css类 */
@import '../assets/css/main.scss';
</style>
