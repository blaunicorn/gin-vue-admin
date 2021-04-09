
const tokens = {
    admin: {
        token: 'admin-token'
    },
    editor: {
        token: 'editor-token'
    }
}

const users = {
    'admin-token': {
        roles: ['admin'],
        introduction: 'I am a super administrator',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Super Admin'
    },
    'editor-token': {
        roles: ['editor'],
        introduction: 'I am an editor',
        avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
        name: 'Normal Editor'
    }
}

module.exports = [
    // user login
    {
        url: '/vue-element-admin/user/login',
        type: 'post',
        response: config => {
            const { username } = config.body
            const token = tokens[username]

            // mock error
            if (!token) {
                return {
                    code: 60204,
                    message: 'Account and password are incorrect.'
                }
            }

            return {
                code: 20000,
                data: token
            }
        }
    },

    // get user info
    {
        url: '/vue-element-admin/user/info\.*',
        type: 'get',
        response: config => {
            const { token } = config.query
            const info = users[token]

            // mock error
            if (!info) {
                return {
                    code: 50008,
                    message: 'Login failed, unable to get user details.'
                }
            }

            return {
                code: 20000,
                data: info
            }
        }
    },

    // user logout
    {
        url: '/vue-element-admin/user/logout',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },

    // captcha
    // {
    //     url: '/base/captcha',
    //     type: 'post',
    //     response: _ => {
    //         return { "code": 0, "data": { "captchaId": "t3XQSBSn7thsE8EXkh9k", "picPath": "data:image/png;base64,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" }, "msg": "验证码获取成功1" }
    //     }
    // },
    // login,暂时不用
    // {
    //     url: '/base/login',
    //     type: 'post',
    //     response: _ => {
    //         return { "code": 0, "data": { "user": { "ID": 1, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "uuid": "d44d5e74-25a8-43f1-8a31-ff67d7a5a099", "userName": "admin", "nickName": "超级管理员", "headerImg": "http://qmplusimg.henrongyi.top/gva_header.jpg", "authority": { "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "DeletedAt": null, "authorityId": "888", "authorityName": "普通用户", "parentId": "0", "dataAuthorityId": null, "children": null, "menus": null, "defaultRouter": "dashboard" }, "authorityId": "888" }, "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVVUlEIjoiZDQ0ZDVlNzQtMjVhOC00M2YxLThhMzEtZmY2N2Q3YTVhMDk5IiwiSUQiOjEsIlVzZXJuYW1lIjoiYWRtaW4iLCJOaWNrTmFtZSI6Iui2hee6p-euoeeQhuWRmCIsIkF1dGhvcml0eUlkIjoiODg4IiwiQnVmZmVyVGltZSI6ODY0MDAsImV4cCI6MTYxNzc3NzE5NywiaXNzIjoicW1QbHVzIiwibmJmIjoxNjE3MTcxMzk3fQ.C2OsZdTQytFmqlEIBda_WHOKoilp_dmoEEvYubIhcdc", "expiresAt": 1617777197000 }, "msg": "登录成功1" }
    //     }
    // },
    // getMenu
    {
        url: '/menu/getMenu',
        type: 'post',
        response: _ => {
            return {
                "code": 0, "data": {
                    "menus": [{ "ID": 22, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "https://www.gin-vue-admin.com", "name": "https://www.gin-vue-admin.com", "hidden": true, "component": "/", "sort": 0, "meta": { "keepAlive": false, "defaultMenu": false, "title": "官方网站", "icon": "s-home", "closeTab": false }, "authoritys": null, "menuId": "22", "children": null, "parameters": [] }, { "ID": 1, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "dashboard", "name": "dashboard", "hidden": false, "component": "view/dashboard/index.vue", "sort": 1, "meta": { "keepAlive": false, "defaultMenu": false, "title": "仪表盘", "icon": "setting", "closeTab": false }, "authoritys": null, "menuId": "1", "children": null, "parameters": [] }, { "ID": 3, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "admin", "name": "superAdmin", "hidden": false, "component": "view/superAdmin/index.vue", "sort": 3, "meta": { "keepAlive": false, "defaultMenu": false, "title": "应用管理", "icon": "user-solid", "closeTab": false }, "authoritys": null, "menuId": "3", "children": [{ "ID": 4, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "authority", "name": "authority", "hidden": false, "component": "view/superAdmin/authority/authority.vue", "sort": 1, "meta": { "keepAlive": false, "defaultMenu": false, "title": "角色管理", "icon": "s-custom", "closeTab": false }, "authoritys": null, "menuId": "4", "children": null, "parameters": [] }, { "ID": 19, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "dictionaryDetail/:id", "name": "dictionaryDetail", "hidden": true, "component": "view/superAdmin/dictionary/sysDictionaryDetail.vue", "sort": 1, "meta": { "keepAlive": false, "defaultMenu": false, "title": "字典详情", "icon": "s-order", "closeTab": false }, "authoritys": null, "menuId": "19", "children": null, "parameters": [] }, { "ID": 5, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "menu", "name": "menu", "hidden": false, "component": "view/superAdmin/menu/menu.vue", "sort": 2, "meta": { "keepAlive": true, "defaultMenu": false, "title": "菜单管理", "icon": "s-order", "closeTab": false }, "authoritys": null, "menuId": "5", "children": null, "parameters": [] }, { "ID": 6, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "api", "name": "api", "hidden": false, "component": "view/superAdmin/api/api.vue", "sort": 3, "meta": { "keepAlive": true, "defaultMenu": false, "title": "api管理", "icon": "s-platform", "closeTab": false }, "authoritys": null, "menuId": "6", "children": null, "parameters": [] }, { "ID": 7, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "user", "name": "user", "hidden": false, "component": "view/superAdmin/user/user.vue", "sort": 4, "meta": { "keepAlive": false, "defaultMenu": false, "title": "用户管理", "icon": "coordinate", "closeTab": false }, "authoritys": null, "menuId": "7", "children": null, "parameters": [] }, { "ID": 18, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "dictionary", "name": "dictionary", "hidden": false, "component": "view/superAdmin/dictionary/sysDictionary.vue", "sort": 5, "meta": { "keepAlive": false, "defaultMenu": false, "title": "字典管理", "icon": "notebook-2", "closeTab": false }, "authoritys": null, "menuId": "18", "children": null, "parameters": [] }, { "ID": 20, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "3", "path": "operation", "name": "operation", "hidden": false, "component": "view/superAdmin/operation/sysOperationRecord.vue", "sort": 6, "meta": { "keepAlive": false, "defaultMenu": false, "title": "操作历史", "icon": "time", "closeTab": false }, "authoritys": null, "menuId": "20", "children": null, "parameters": [] }], "parameters": [] }, {
                        "ID": 314,
                        "CreatedAt": "2021-03-04T19:44:08+08:00",
                        "UpdatedAt": "2021-03-04T19:44:08+08:00",
                        "parentId": "0",
                        "path": "workingFluidLevel",
                        "name": "workingFluidLevel",
                        "hidden": false,
                        "component": "view/workingFluidLevel/index",
                        "sort": 3,
                        "meta": {
                            "keepAlive": false,
                            "defaultMenu": false,
                            "title": "动液面应用",
                            "icon": "s-cooperation",
                            "closeTab": false
                        },
                        "authoritys": null,
                        "menuId": "314",
                        "children": [
                            {
                                "ID": 315,
                                "CreatedAt": "2021-03-04T19:44:08+08:00",
                                "UpdatedAt": "2021-03-04T19:44:08+08:00",
                                "parentId": "314",
                                "path": "realTimeData",
                                "name": "realTimeData",
                                "hidden": false,
                                "component": "view/workingFluidLevel/index",
                                "sort": 1,
                                "meta": {
                                    "keepAlive": true,
                                    "defaultMenu": false,
                                    "title": "实时数据",
                                    "icon": "cpu",
                                    "closeTab": false
                                },
                                "authoritys": null,
                                "menuId": "315",
                                "children": null,
                                "parameters": [

                                ]
                            },
                            {
                                "ID": 316,
                                "CreatedAt": "2021-03-04T19:44:08+08:00",
                                "UpdatedAt": "2021-03-04T19:44:08+08:00",
                                "parentId": "314",
                                "path": "dataAnalysis",
                                "name": "dataAnalysis",
                                "hidden": false,
                                "component": "view/workingFluidLevel/dataAnalysis",
                                "sort": 2,
                                "meta": {
                                    "keepAlive": true,
                                    "defaultMenu": false,
                                    "title": "数据分析",
                                    "icon": "magic-stick",
                                    "closeTab": false
                                },
                                "authoritys": null,
                                "menuId": "316",
                                "children": null,
                                "parameters": [

                                ]
                            },
                            {
                                "ID": 317,
                                "CreatedAt": "2021-03-04T19:44:08+08:00",
                                "UpdatedAt": "2021-03-04T19:44:08+08:00",
                                "parentId": "318",
                                "path": "historicalData"
                                ,
                                "name": "historicalData"
                                ,
                                "hidden": false,
                                "component": "view/workingFluidLevel/historicalData"
                                ,
                                "sort": 3,
                                "meta": {
                                    "keepAlive": true,
                                    "defaultMenu": false,
                                    "title": "历史数据"
                                    ,
                                    "icon": "magic-stick",
                                    "closeTab": false
                                },
                                "authoritys": null,
                                "menuId": "316",
                                "children": null,
                                "parameters": [

                                ]
                            },
                            {
                                "ID": 318,
                                "CreatedAt": "2021-03-04T19:44:08+08:00",
                                "UpdatedAt": "2021-03-04T19:44:08+08:00",
                                "parentId": "318",
                                "path": "deviceManagement"
                                ,
                                "name": "deviceManagement"
                                ,
                                "hidden": false,
                                "component": "view/workingFluidLevel/deviceManagement"
                                ,
                                "sort": 4,
                                "meta": {
                                    "keepAlive": true,
                                    "defaultMenu": false,
                                    "title": "设备管理"
                                    ,
                                    "icon": "magic-stick",
                                    "closeTab": false
                                },
                                "authoritys": null,
                                "menuId": "316",
                                "children": null,
                                "parameters": [

                                ]
                            }
                        ],
                        "parameters": [

                        ]
                    }, { "ID": 8, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "person", "name": "person", "hidden": true, "component": "view/person/person.vue", "sort": 4, "meta": { "keepAlive": false, "defaultMenu": false, "title": "个人信息", "icon": "message-solid", "closeTab": false }, "authoritys": null, "menuId": "8", "children": null, "parameters": [] }, { "ID": 14, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "systemTools", "name": "systemTools", "hidden": true, "component": "view/systemTools/index.vue", "sort": 5, "meta": { "keepAlive": false, "defaultMenu": false, "title": "系统工具", "icon": "s-cooperation", "closeTab": false }, "authoritys": null, "menuId": "14", "children": [{ "ID": 15, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "14", "path": "autoCode", "name": "autoCode", "hidden": false, "component": "view/systemTools/autoCode/index.vue", "sort": 1, "meta": { "keepAlive": true, "defaultMenu": false, "title": "代码生成器", "icon": "cpu", "closeTab": false }, "authoritys": null, "menuId": "15", "children": null, "parameters": [] }, { "ID": 16, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "14", "path": "formCreate", "name": "formCreate", "hidden": false, "component": "view/systemTools/formCreate/index.vue", "sort": 2, "meta": { "keepAlive": true, "defaultMenu": false, "title": "表单生成器", "icon": "magic-stick", "closeTab": false }, "authoritys": null, "menuId": "16", "children": null, "parameters": [] }], "parameters": [] }, { "ID": 24, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "workflow", "name": "workflow", "hidden": true, "component": "view/workflow/index.vue", "sort": 5, "meta": { "keepAlive": false, "defaultMenu": false, "title": "工作流功能", "icon": "phone", "closeTab": false }, "authoritys": null, "menuId": "24", "children": [{ "ID": 25, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "24", "path": "workflowCreate", "name": "workflowCreate", "hidden": false, "component": "view/workflow/workflowCreate/workflowCreate.vue", "sort": 0, "meta": { "keepAlive": false, "defaultMenu": false, "title": "工作流绘制", "icon": "circle-plus", "closeTab": false }, "authoritys": null, "menuId": "25", "children": null, "parameters": [] }, { "ID": 26, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "24", "path": "workflowProcess", "name": "workflowProcess", "hidden": false, "component": "view/workflow/workflowProcess/workflowProcess.vue", "sort": 0, "meta": { "keepAlive": false, "defaultMenu": false, "title": "工作流列表", "icon": "s-cooperation", "closeTab": false }, "authoritys": null, "menuId": "26", "children": null, "parameters": [] }, { "ID": 27, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "24", "path": "workflowUse", "name": "workflowUse", "hidden": true, "component": "view/workflow/workflowUse/workflowUse.vue", "sort": 0, "meta": { "keepAlive": false, "defaultMenu": false, "title": "使用工作流", "icon": "video-play", "closeTab": false }, "authoritys": null, "menuId": "27", "children": null, "parameters": [] }, { "ID": 28, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "24", "path": "started", "name": "started", "hidden": false, "component": "view/workflow/userList/started.vue", "sort": 0, "meta": { "keepAlive": false, "defaultMenu": false, "title": "我发起的", "icon": "s-order", "closeTab": false }, "authoritys": null, "menuId": "28", "children": null, "parameters": [] }, { "ID": 29, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "24", "path": "need", "name": "need", "hidden": false, "component": "view/workflow/userList/need.vue", "sort": 0, "meta": { "keepAlive": false, "defaultMenu": false, "title": "我的待办", "icon": "s-platform", "closeTab": false }, "authoritys": null, "menuId": "29", "children": null, "parameters": [] }], "parameters": [] }, { "ID": 9, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "example", "name": "example", "hidden": true, "component": "view/example/index.vue", "sort": 6, "meta": { "keepAlive": false, "defaultMenu": false, "title": "示例文件", "icon": "s-management", "closeTab": false }, "authoritys": null, "menuId": "9", "children": [{ "ID": 10, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "9", "path": "excel", "name": "excel", "hidden": false, "component": "view/example/excel/excel.vue", "sort": 4, "meta": { "keepAlive": false, "defaultMenu": false, "title": "excel导入导出", "icon": "s-marketing", "closeTab": false }, "authoritys": null, "menuId": "10", "children": null, "parameters": [] }, { "ID": 11, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "9", "path": "upload", "name": "upload", "hidden": false, "component": "view/example/upload/upload.vue", "sort": 5, "meta": { "keepAlive": false, "defaultMenu": false, "title": "媒体库（上传下载）", "icon": "upload", "closeTab": false }, "authoritys": null, "menuId": "11", "children": null, "parameters": [] }, { "ID": 12, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "9", "path": "breakpoint", "name": "breakpoint", "hidden": false, "component": "view/example/breakpoint/breakpoint.vue", "sort": 6, "meta": { "keepAlive": false, "defaultMenu": false, "title": "断点续传", "icon": "upload", "closeTab": false }, "authoritys": null, "menuId": "12", "children": null, "parameters": [] }, { "ID": 21, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "9", "path": "simpleUploader", "name": "simpleUploader", "hidden": false, "component": "view/example/simpleUploader/simpleUploader", "sort": 6, "meta": { "keepAlive": false, "defaultMenu": false, "title": "断点续传（插件版）", "icon": "upload", "closeTab": false }, "authoritys": null, "menuId": "21", "children": null, "parameters": [] }, { "ID": 13, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "9", "path": "customer", "name": "customer", "hidden": false, "component": "view/example/customer/customer.vue", "sort": 7, "meta": { "keepAlive": false, "defaultMenu": false, "title": "客户列表（资源示例）", "icon": "s-custom", "closeTab": false }, "authoritys": null, "menuId": "13", "children": null, "parameters": [] }], "parameters": [] }, { "ID": 23, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "state", "name": "state", "hidden": false, "component": "view/system/state.vue", "sort": 6, "meta": { "keepAlive": false, "defaultMenu": false, "title": "服务器状态", "icon": "cloudy", "closeTab": false }, "authoritys": null, "menuId": "23", "children": null, "parameters": [] }, { "ID": 2, "CreatedAt": "2021-03-04T19:44:08+08:00", "UpdatedAt": "2021-03-04T19:44:08+08:00", "parentId": "0", "path": "about", "name": "about", "hidden": false, "component": "view/about/index.vue", "sort": 7, "meta": { "keepAlive": false, "defaultMenu": false, "title": "关于我们", "icon": "info", "closeTab": false }, "authoritys": null, "menuId": "2", "children": null, "parameters": [] }]
                }, "msg": "获取成功"
            }
        }
    },

    // checkdb
    {
        url: '/api/init/checkdb',
        type: 'post',
        response: _ => {
            return { "code": 0, "data": { "needInit": false }, "msg": "数据库无需初始化1" }
        }
    }
]
