import Vue from 'vue'
import Router from 'vue-router'
import Msg from '@/components/Msg'
import MsgAdd from '@/components/MsgAdd'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/msg'
    },
    {
      path: '/msg',
      name: 'Msg',
      component: Msg,
      children: [
        {
          path: 'add',
          component: MsgAdd
        }
      ]
    }
  ]
})
