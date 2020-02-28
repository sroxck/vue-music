<!--  -->
<template>
  <div>11</div>
</template>

<script>
export default {
  props: ['id'],
  data () {
    return {}
  },
  methods: {
    async getDetail () {
      const { data: res } = await this.$http.get('/playlist/detail?id=' + this.id)
      console.log(res.playlist)
    }
  },
  created () {
    this.getDetail()
  },
  mounted () {}
}
</script>
<style scoped>
/* @import url(); 引入css类 */
</style>
