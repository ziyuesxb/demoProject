const {
	defineConfig
} = require("@vue/cli-service");
//// 使用 defineConfig 帮手函数，这样不用 jsdoc 注解也可以获取类型提示
module.exports = defineConfig({
	transpileDependencies: true,
	lintOnSave: false,
	publicPath: process.env.NODE_ENV === 'production' ?
		'./' :
		'/'


});
