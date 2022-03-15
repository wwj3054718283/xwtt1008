module.exports = {
    plugins: {
        'postcss-pxtorem': {
            // rootValue: 37.5, // 将 多少 像素 转成 1rem
            rootValue({ file }) {
                // 如果是 vant 组件库的样式，则使用 37.5 的基准值，否则使用 75的基准值
                return file.indexOf('\node_modules\vant') > -1 ? 37.5 : 75
            },
            // propList 配置 css中需要将px转成rem的 样式属性名称
            // propList: ['width','height','font-size'],
            propList: ['*'],
            // 选择器黑名单：不被编译的 选择器，凡是符合的选择器中的px 都不会被转成 rem
            selectorBlackList: ['markdown-body'],
            // 不被编译的 css文件
            exclude: 'github-markdown'
        }
    }
}