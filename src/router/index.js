import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Rank from '../views/Rank.vue'
import Info from '../views/Info.vue'
import Main from '../views/Main.vue'
import Music from '../views/Music.vue'
// import MusicPlay from '../views/MusicPlay.vue'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      { path: '/', name: 'Home', component: Home },
      { path: '/rank', name: 'Rank', component: Rank }
    ]
  },
  {
    path: '/info/:id',
    name: 'Info',
    component: Info,
    props: true
  },
  {
    path: '/music/:id',
    name: 'Music',
    component: Music,
    props: true
  },
  {
    path: '/musicPlays/:id',
    name: 'MusicPlay',
    component: Info,
    props: true
  }
]

const router = new VueRouter({
  routes
})

export default router
