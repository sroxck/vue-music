<!-- card-list子组件 配合card组件使用最佳-->
<template>
  <!--这里使用m-card m-card需要的icon和title必须传递,而这个组件内没有,在从外界接收进来,传递给m-card -->
  <m-card :icon="icon" :title="title">
    <!--使用m-card组件 在标签中添加的内容会被传递到m-card组件的插槽位置 -->
    <div class="nav jc-between">
      <div
        class="nav-item "
        :class="{ active: active === index }"
        v-for="(item, index) in categories"
        :key="index"
        @click="active = index"
      >
        <!--循环生成tab栏的标签 数据由父组件传递进来 是个数组 数组是个对象 对象的name属性就是每一个tab标签的标题 -->
        <div class="nav-link">{{ item }}</div>
      </div>
    </div>
    <div class="pt-3">
      <swiper>
        <!-- 使用swiper组件 生成对应tab栏的轮播图 到时候对应上 可以滑动切换tab -->
        <swiper-slide v-for="(item1, index1) in categories" :key="index1">
          <!--根据父组件传递的数组循环 每一项是个对象 有一个name属性 和一个list的子数组 -->
          <slot name="items" :category="item1"></slot>
          <!-- 把当前循环项 也就是当前的子数组的数据 通过作用域插槽+具名插槽传递给父组件 父组件通过 v-slot:items="category"来接受 接收到的数据就是每一个 item1子数组-->
        </swiper-slide>
      </swiper>
    </div>
  </m-card>
</template>

<script>
export default {
  props: {
    // 从父组件接收数据
    title: { type: String, required: true }, // m-crad用的数据
    icon: { type: String, required: true }, // m-crad用的数据
    categories: { type: Array, required: true } // m-list-crad循环用的数据
  },
  data () {
    return {
      active: 0 // 当前 索引等于active的值 就添加active类
    }
  }
}
</script>
<!--使用本组件需要的数据格式 为 数组 ['xx','xx'] -->
