<!--头部公共区域 推荐+排行tab栏  -->
<template>
  <div>
    <div id="marks" ref="marks">请使用手机端或F12手机调试查看本页面</div>
    <div id="apps" ref="apps">
      <div class="header p-3 pb-0 shadow">
        <!-- logo条 -->
        <div class="logo d-flex jc-center ai-center ">
          <!-- 左 -->
          <div class="logo-box bg-white">
            <img src="../assets/img/logo.svg" alt="">
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
          <router-link tag="div" to="/" :class="{ active: current == 0}">推荐</router-link>
          <router-link tag="div" to="rank" :class="{ active: current == 1}">排行</router-link>
        </div>
      </div>
      <!-- 路由占位符 使用过渡效果 -->
      <transition mode="out-in">
        <router-view />
      </transition>

    </div>
  </div>
</template>

<script>
import { isPhone } from './isPhone'
export default {
  
  data() {
    return {
      current: 0,
      isPhone: false,
    }
  },
  created() {},
  // 监听路由实现类名切换
  watch: {
    $route(value) {
      if (/rank/.test(value.fullPath)) {
        // 前往rank路由 添加类
        this.current = 1
      } else if (/\//.test(value.fullPath)) {
        // 前往/路由 添加类
        this.current = 0
      }
    },
  },
  methods: {
    // pc不展示本项目
    onload() {
      this.isPhone = isPhone()
      if (this.isPhone) {
        //手机端，
        this.$refs.marks.style.display = 'none'
        this.$refs.apps.style.display = 'block'
      } else {
        // pc端
        this.$refs.marks.style.display = 'block'
        this.$refs.apps.style.display = 'none'
      }
    },
  },
  // 监听路由页面刷新无效,需要在Dom加载后重新根据条件添加类
  mounted() {
    if (/rank/.test(this.$route.fullPath)) {
      this.current = 1
    } else if (/\//.test(this.$route.fullPath)) {
      this.current = 0
    }
    // 判断是pc端还是移动端
    let _this = this
    this.onload()
    window.onresize = function () {
      _this.onload()
    }
  },
}
</script>
<style lang="scss" scope >
/* @import url(); 引入css类 */
//  @media screen and (max-width:680px) {
//    #marks{
//      display: none !important;
//    }
//    #apps{
//      display: block !important;
//    }
//   }
#marks {
  width: 100vw;
  height: 100vh;
  line-height: 100vh;
  font-size: 34px;
  text-align: center;
}
#apps {
  display: none;
}
@import '../assets/css/main.scss';
</style>
