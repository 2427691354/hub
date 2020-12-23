import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/* Router Modules */
import componentsRouter from './modules/components'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '标识看板', icon: 'dashboard', affix: true }
      }
    ]
  },
  {
    path: '/identity',
    component: Layout,
    redirect: '/identity/index',
    meta: {
      title: '标识管理',
      icon: 'identity'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/identity/index'),
        name: 'Identity',
        meta: { title: '标识管理' }
      },
      {
        path: 'profile',
        component: () => import('@/views/profile/index2'),
        name: 'Profile2',
        hidden: true,
        meta: { title: '标识详情', noCache: true }
      },
      {
        path: 'metadataModel',
        component: () => import('@/views/identity/metadata_model'),
        name: 'MetadataModel',
        meta: { title: '模板管理', noCache: true }
      }
    ]
  },
  {
    path: '/machine',
    component: Layout,
    redirect: '/machine/index',
    name: 'Machine',
    meta: {
      title: '设备管理',
      icon: 'machine'
    },
    children: [
      {
        path: 'index',
        component: () => import('@/views/machine/index'),
        name: 'MachineIndex',
        meta: { title: '设备列表', icon: 'machine' }
      },
      {
        path: 'profile',
        component: () => import('@/views/profile/index'),
        name: 'Profile',
        hidden: true,
        meta: { title: '设备详情', icon: 'user', noCache: true }
      }
    ]
  },
  {
    path: '/company',
    component: Layout,
    redirect: '/company/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/company/index'),
        name: 'Company',
        meta: { title: '企业管理', icon: 'company' }
      }
    ]
  },
  {
    path: '/certificate',
    component: Layout,
    redirect: '/certificate/index',
    children: [
      {
        path: 'index',
        component: () => import('@/views/certificate/index'),
        name: 'Certificate',
        meta: { title: '证书管理', icon: 'certificate' }
      }
    ]
  },

  /** when your routing map is too long, you can split it into small modules **/
  componentsRouter,
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/page',
    alwaysShow: true, // will always show the root menu
    name: 'Permission',
    meta: {
      title: '权限管理',
      icon: 'lock'
    },
    children: [
      {
        path: 'page',
        component: () => import('@/views/permission/page'),
        name: 'PagePermission',
        meta: {
          title: '用户管理'
        }
      },
      {
        path: 'directive',
        component: () => import('@/views/permission/directive'),
        name: 'DirectivePermission',
        meta: {
          title: '资源管理'
          // if do not set roles, means: this page does not require permission
        }
      },
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '角色管理'
        }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }

]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
// export const asyncRoutes = [

// ]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
