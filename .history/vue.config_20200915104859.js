
module.exports = {
    lintOnSave: false,
    devServer: {
        proxy: {
            '/api': {     //这里最好有一个 /
                target: 'http://t1.mengdigua.cn',  // 后台接口域名
                // ws: true,        //如果要代理 websockets，配置这个参数
                secure: false,  // 如果是https接口，需要配置这个参数
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': ''
                },
                headers: {
                    Referer: 'http://t1.mengdigua.cn'
                }
            },
           
        }
    }
}