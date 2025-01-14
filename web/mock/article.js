const Mock = require('mockjs')

const List = []
const count = 100

const baseContent = '<p>I am testing data, I am testing data.</p><p><img src="https://wpimg.wallstcn.com/4c69009c-0fd4-4153-b112-6cb53d1cf943"></p>'
const image_uri = 'https://wpimg.wallstcn.com/e4558086-631c-425c-9430-56ffb46e70b3'

for (let i = 0; i < count; i++) {
    List.push(Mock.mock({
        'id|1000000000-99999999999': 0,
        timestamp: +Mock.Random.date('T'),
        liquid_level: '@float(300, 2000, 0, 3)',
        echo_time: '@float(1, 500, 0, 3)',
        sound_velocity: '@float(300, 500, 0, 3)',
        casing_pressure: '@float(0, 0, 3, 3)',
        voltage: '@float(11, 13, 3, 3)',
        'period|1-200': 0,
        'deep|500-2000': 0,
        author: '@first',
        reviewer: '@first',
        title: '@title(5, 10)',
        content_short: 'mock data',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['online', 'offline'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        image_uri,
        platforms: ['a-platform']
    }))
}
const listDeviceSetting = []
for (let i = 0; i < count; i++) {
    listDeviceSetting.push(Mock.mock({
        'id|1000000000-99999999999': 0,
        title: '@number(1000000000, 99999999999)',
        timestamp: +Mock.Random.date('T'),
        liquid_level: '@float(300, 2000, 0, 3)',
        echo_time: '@float(1, 500, 0, 3)',
        sound_velocity: '@float(300, 500, 0, 3)',
        casing_pressure: '@float(0, 0, 3, 3)',
        voltage: '@float(11, 13, 3, 3)',
        'period|1-200': 0,
        'deep|500-2000': 0,
        author: '@first',
        reviewer: '@first',

        content_short: 'mock data',
        content: baseContent,
        forecast: '@float(0, 100, 2, 2)',
        importance: '@integer(1, 3)',
        'type|1': ['CN', 'US', 'JP', 'EU'],
        'status|1': ['online', 'offline'],
        display_time: '@datetime',
        comment_disabled: true,
        pageviews: '@integer(300, 5000)',
        image_uri,
        platforms: ['a-platform']
    }))
}
// for (let i = 0; i < count; i++) {
//     List.push(Mock.mock({
//         id: '@increment',
//         timestamp: +Mock.Random.date('T'),
//         author: '@first',
//         reviewer: '@first',
//         title: '@title(5, 10)',
//         content_short: 'mock data',
//         content: baseContent,
//         forecast: '@float(0, 100, 2, 2)',
//         importance: '@integer(1, 3)',
//         'type|1': ['CN', 'US', 'JP', 'EU'],
//         'status|1': ['published', 'draft'],
//         display_time: '@datetime',
//         comment_disabled: true,
//         pageviews: '@integer(300, 5000)',
//         image_uri,
//         platforms: ['a-platform']
//     }))
// }
const tree = [{ "id": 100, "label": "采油厂", "children": [{ "id": 101, "label": "302小队", "children": [{ "id": 103, "label": "101小队" }, { "id": 104, "label": "10400000" }, { "id": 105, "label": "10500000" }, { "id": 106, "label": "10600000" }, { "id": 107, "label": "10700000" }] }, { "id": 102, "label": "303小队", "children": [{ "id": 108, "label": "10800000" }, { "id": 109, "label": "10900000" }] }] }]

module.exports = [
    {
        url: '/vue-element-admin/article/list',
        type: 'get',
        response: config => {
            const { importance, type, title, page = 1, limit = 20, sort } = config.query

            let mockList = List.filter(item => {
                if (importance && item.importance !== +importance) return false
                if (type && item.type !== type) return false
                if (title && item.title.indexOf(title) < 0) return false
                return true
            })

            if (sort === '-id') {
                mockList = mockList.reverse()
            }

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 0,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }
        }
    },
    // 获取树状结构
    {
        url: '/dept/treeselect',
        type: 'get',
        response: config => {



            return {
                code: 0,
                data: tree,
                message: "操作成功"
            }


        }
    },
    // 获取设备历史数据
    {
        url: '/dept/listDevice',
        type: 'get',
        response: config => {
            const { id } = config.query
            for (const article of List) {
                if (article.id === +id) {
                    return {
                        code: 0,
                        data: [{ "id": 100, "label": "若依科技", "children": [{ "id": 101, "label": "深圳总公司", "children": [{ "id": 103, "label": "研发部门" }, { "id": 104, "label": "市场部门" }, { "id": 105, "label": "测试部门" }, { "id": 106, "label": "财务部门" }, { "id": 107, "label": "运维部门" }] }, { "id": 102, "label": "长沙分公司", "children": [{ "id": 108, "label": "市场部门" }, { "id": 109, "label": "财务部门" }] }] }],
                        message: "操作成功"
                    }
                }
            }
        }
    },
    // 获取设备历史数据
    {
        url: '/dept/listDevice',
        type: 'get',
        response: config => {
            const { id } = config.query
            for (const article of List) {
                if (article.id === +id) {
                    return {
                        code: 0,
                        data: [{ "id": 100, "label": "若依科技", "children": [{ "id": 101, "label": "深圳总公司", "children": [{ "id": 103, "label": "研发部门" }, { "id": 104, "label": "市场部门" }, { "id": 105, "label": "测试部门" }, { "id": 106, "label": "财务部门" }, { "id": 107, "label": "运维部门" }] }, { "id": 102, "label": "长沙分公司", "children": [{ "id": 108, "label": "市场部门" }, { "id": 109, "label": "财务部门" }] }] }],
                        message: "操作成功"
                    }
                }
            }
        }
    },
    // 获取设备设定数据
    {
        url: '/dept/listDeviceSetting',
        type: 'get',
        response: config => {
            const { id } = config.query
            for (const article of List) {
                if (article.id === +id) {
                    return {
                        code: 0,
                        data: [{ "id": 100, "label": "若依科技", "children": [{ "id": 101, "label": "深圳总公司", "children": [{ "id": 103, "label": "研发部门" }, { "id": 104, "label": "市场部门" }, { "id": 105, "label": "测试部门" }, { "id": 106, "label": "财务部门" }, { "id": 107, "label": "运维部门" }] }, { "id": 102, "label": "长沙分公司", "children": [{ "id": 108, "label": "市场部门" }, { "id": 109, "label": "财务部门" }] }] }],
                        message: "操作成功"
                    }
                }
            }
        }
    },
    {
        url: '/vue-element-admin/article/detail',
        type: 'get',
        response: config => {
            const { id } = config.query
            for (const article of List) {
                if (article.id === +id) {
                    return {
                        code: 0,
                        data: article
                    }
                }
            }
        }
    },

    {
        url: '/vue-element-admin/article/pv',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: {
                    pvData: [
                        { key: 'PC', pv: 1024 },
                        { key: 'mobile', pv: 1024 },
                        { key: 'ios', pv: 1024 },
                        { key: 'android', pv: 1024 }
                    ]
                }
            }
        }
    },

    {
        url: '/vue-element-admin/article/create',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },

    {
        url: '/vue-element-admin/article/update',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    }
]

