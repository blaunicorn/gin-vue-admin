module.exports = file => () => { // 路由懒加载
    // return import('@/' + file)   // 可能为官方并不赞同import(`@/views/${view}`)
    return Promise.resolve(require(`@/${file}`).default)
}