<!-- 卡片组件 -->
<template>
  <div class="card py-2 mt-3 ">
    <div class="card-header d-flex ai-center pb-3">
      <h3 class="fs-lg flex-1 ">{{ title }}</h3>
      <!-- 卡片的大标题 必传 -->
      <a :href="href" class="text-grey fs-sm">更多</a>
      <i class="iconfont icon-right text-grey fs-ssm"></i><!-- 后面默认是三个小点-->
    </div>
    <div class="card-body pt-1">
      <!-- 卡片主题内容-->
      <slot></slot
      ><!--插槽 主题的内容在<m-card>标签中传递过来 配合m-list-card使用最佳 -->
    </div>
  </div>
</template>

<script>
export default {
  props: {
    // 接收父组件传递过来的值 一般形式是props:[title,icon]
    title: { type: String, required: true }, // 这里规定传递过来的类型必须为字符串,是必传字段
    href: { type: String, required: true }
  }
}
</script>
<style lang="scss">
/* @import url() 引入css类 */

</style>
