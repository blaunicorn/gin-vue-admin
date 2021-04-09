import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//获取原型对象上的push函数
const originalPush = Router.prototype.push
//修改原型对象中的push方法
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
import Layout from '@/layout'

const baseRouters = [{
    path: '/',
    redirect: '/login'
},
{
    path: "/init",
    name: 'init',
    component: () =>
        import('@/view/init/init.vue')
},
{
    path: '/login',
    name: 'login',
    component: () =>
        import('@/view/login/login.vue')
},
{
    path: '/table',
    component: Layout,
    redirect: '/table/complex-table',
    name: 'Table',
    meta: {
        title: 'Table',
        icon: 'table'
    },
    children: [
        {
            path: 'complex-table',
            component: () => import('@/view/table/complex-table'),
            name: 'ComplexTable',
            meta: { title: 'Complex Table' }
        }
    ]
},
    // {
    //     path: '/workingFluidLevel',
    //     component: Layout,
    //     redirect: '/workingFluidLevel/realTimeData',
    //     name: 'workingFluidLevel',
    //     meta: {
    //         title: '动液面应用',
    //         icon: 'table'
    //     },
    //     children: [
    //         {
    //             path: 'realTimeData',
    //             component: () => import('@/view/workingFluidLevel/index'),
    //             name: 'RealTimeData',
    //             meta: { title: '实时数据' }
    //         },
    //         {
    //             path: 'dataAnalysis',
    //             component: () => import('@/view/workingFluidLevel/dataAnalysis'),
    //             name: 'DataAnalysis',
    //             meta: { title: '数据分析' }
    //         },
    //         {
    //             path: 'historicalData',
    //             component: () => import('@/view/workingFluidLevel/historicalData'),
    //             name: 'HistoricalData',
    //             meta: { title: '历史数据' }
    //         },
    //         {
    //             path: 'deviceManagement',
    //             component: () => import('@/view/workingFluidLevel/deviceManagement'),
    //             name: 'DeviceManagement',
    //             meta: { title: '设备管理' }
    //         },
    //     ]
    // }
]

// 需要通过后台数据来生成的组件

const createRouter = () => new Router({
    routes: baseRouters
})

const router = createRouter()

export default router
