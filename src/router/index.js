import Vue from 'vue'
import Router from 'vue-router'


Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'
import {
  Table
} from 'element-ui'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [{
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },
  {
    path: '/dataManage',
    component: Layout,
    redirect: '/dataManage/finance',
    name: '数据管理',
    meta: {
      title: '数据管理',
      icon: 'example'
    },
    children: [{
      path: 'finance',
      name: 'finance',
      component: () => import('@/views/dataManage/finance'),
      meta: {
        title: '财务数据',
        icon: 'table'
      }
    }, {
      path: 'totalDate',
      name: 'TotalDate',
      component: () => import('@/views/dataManage/totalDate'),
      meta: {
        title: '数据统计',
        icon: 'table'
      }
    }, {
      path: 'salesManagement',
      name: 'salesManagement',
      component: () => import('@/views/dataManage/salesManagement'),
      meta: {
        title: '销售管理',
        icon: 'table'
      }
    }]
  },
  {
    path: '/agent',
    component: Layout,
    redirect: '/agent/agentCity',
    name: '代理商管理',
    meta: {
      title: '代理商管理',
      icon: 'example'
    },
    children: [{
        path: 'agentCity',
        name: 'agentCity',
        component: () => import('@/views/agent/agentCity'),
        meta: {
          title: '城市代理',
          icon: 'table'
        }
      },
      /* {
           path: 'agentCla',
           name: 'agentCla',
           component: () => import('@/views/agent/agentCla'),
           meta: {
             title: '代理分类',
             icon: 'table'
           }
         }, */
      {
        path: 'agentList',
        name: 'agentList',
        component: () => import('@/views/agent/agentList'),
        meta: {
          title: '代理管理员',
          icon: 'table'
        }
      }
    ]
  },
  {
    path: '/account',
    component: Layout,
    redirect: '/account/postAccount',
    meta: {
      title: '结算',
      icon: Table
    },
    children: [{
      path: 'postAccount',
      component: Layout,
      name: '申请结算',
      meta: {
        title: '申请结算',
        icon: 'table'
      },
      component: () => import('@/views/account/postAccount')
    }]
  },
  {
    path: '/install',
    component: Layout,
    redirect: '/install/management',
    meta: {
      title: '设置',
      icon: 'example'
    },
    children: [{
        path: 'management',
        component: () => import('@/views/install/management'),
        name: '账号管理',
        meta: {
          title: '账号管理',
          icon: 'table'
        }
      },
      /* {
        path: 'system',
        name: 'system',
        component: () => import('@/views/intercalate/systemsetting'),
        meta: {
          title: '系统设置',
          icon: 'table'
        }
      } */
    ]
  },
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]
console.log(1231233132);
export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({
    y: 0
  }),
  routes: constantRouterMap
})
