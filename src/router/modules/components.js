/** When your routing table is too long, you can split it into small modules **/

import Layout from '@/layout'

const componentsRouter = {
  path: '/components',
  component: Layout,
  redirect: 'noRedirect',
  name: 'ComponentDemo',
  meta: {
    title: '常用组件',
    icon: 'component'
  },
  children: [
    // {
    //   path: 'external-link',
    //   component: Layout,
    //   children: [
    //     {
    //       path: 'http://www.szxtzx.cn/index.php',
    //       meta: { title: '外部链接', icon: 'link' }
    //     }
    //   ]
    // },

    {
      path: '/icon',
      component: () => import('@/views/icons/index'),
      name: 'ExportExcel',
      meta: { title: '图标', icon: 'icon', noCache: true }

    },
    // {
    //   path: 'export-excel',
    //   component: () => import('@/views/excel/export-excel'),
    //   name: 'ExportExcel',
    //   meta: { title: 'Excel导出' }
    // },
    // {
    //   path: 'export-selected-excel',
    //   component: () => import('@/views/excel/select-excel'),
    //   name: 'SelectExcel',
    //   meta: { title: '选择导出' }
    // },
    {
      path: '/error',
      component: Layout,
      redirect: 'noRedirect',
      name: 'ErrorPages',
      meta: {
        title: '错误页面',
        icon: '404'
      },
      children: [
        {
          path: '401',
          component: () => import('@/views/error-page/401'),
          name: 'Page401',
          meta: { title: '401页面', noCache: true }
        },
        {
          path: '404',
          component: () => import('@/views/error-page/404'),
          name: 'Page404',
          meta: { title: '404页面', noCache: true }
        }
      ]
    }
  ]
}

export default componentsRouter
