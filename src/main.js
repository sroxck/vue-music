import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './assets/font/iconfont.css'
import './assets/css/style.scss'

// 卡片组件
import Card from './components/Sroxck-Card.vue'
import CardList from './components/Sroxck-Card-List.vue'

// 引入axios
import axios from 'axios'
axios.defaults.baseURL = 'http://localhost:3000'
Vue.component('m-card', Card)
Vue.component('m-card-list', CardList)
Vue.config.productionTip = false
Vue.filter('localWan', function (value) {
  const k = 10000
  if (value > k) {
    value = (value / k).toFixed(2)
    return value + '万'
  }
})
Vue.filter('sub', function (value) {
  return value
})
Vue.filter('formdata', function (value) {
  const date = new Date(1582802537096)
  const Y = date.getFullYear() + '-'
  const M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  const D = date.getDate() + ' '
  return Y + M + D
})
Vue.filter('localYi', function (value) {
  const k = 100000000
  if (value > k) {
    value = (value / k).toFixed(2)
    return value + '亿'
  } else {
    const y = 10000
    value = (value / y).toFixed(2)
    return value + '万'
  }
})
Vue.prototype.$http = axios
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
