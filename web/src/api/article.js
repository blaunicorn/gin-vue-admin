import request from '@/utils/request'
// 获取树状部门列表
export function treeselect(query) {
    return request({
        url: '/dept/treeselect',
        method: 'get',
        params: query
    })
}
// 获取设备历史数据列表
export function listDevice(query) {
    return request({
        url: '/dept/listDevice',
        method: 'get',
        params: query
    })
}
// 获取设备设置列表
export function listDeviceSetting(query) {
    return request({
        url: '/dept/listDeviceSetting',
        method: 'get',
        params: query
    })
}
export function fetchList(query) {
    return request({
        url: '/vue-element-admin/article/list',
        method: 'get',
        params: query
    })
}

export function fetchArticle(id) {
    return request({
        url: '/vue-element-admin/article/detail',
        method: 'get',
        params: { id }
    })
}

export function fetchPv(pv) {
    return request({
        url: '/vue-element-admin/article/pv',
        method: 'get',
        params: { pv }
    })
}

export function createArticle(data) {
    return request({
        url: '/vue-element-admin/article/create',
        method: 'post',
        data
    })
}

export function updateArticle(data) {
    return request({
        url: '/vue-element-admin/article/update',
        method: 'post',
        data
    })
}
