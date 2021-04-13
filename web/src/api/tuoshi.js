import request from '@/utils/request2'
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
//  模拟实时数据
export function fetchList(query) {
    return request({
        url: '/vue-element-admin/article/list',
        method: 'get',
        params: query
    })
}
//  拓实实时数据
// @Tags menu
// @Summary 根据id获取拓实实时数据
// @Security ApiKeyAuth
// @accept application/json
// @Produce application/json
// @Param data body api.GetById true "根据id获取菜单"
// @Success 200 {string} json "{"success":true,"data":{},"msg":"获取成功"}"
// @Router /menu/getApiById [post]
export function fetchTuoshiRealTimeData(data) {
    return request({
        url: 'http://web.tuoshi.net.cn:8030/OilCommunicationService.asmx/ListDevEquipmentInfosEx',
        method: 'post',
        data
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
