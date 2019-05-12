import Vue from "vue";
// 自动注册 .vue|.js 結尾的文件 https://webpack.js.org/guides/dependency-management/#requirecontext
const componentsContext = require.context(
  "./",
  true,
  /Base[A-Z]\w+\.(vue|js)$/
);
componentsContext.keys().forEach(component => {
  const componentConfig = componentsContext(component);
  /**  兼容 import export 和 require module.export 两种规范 */
  const ctrl = componentConfig.default || componentConfig;
  console.log(ctrl)
  Vue.component("r-" + ctrl.name, ctrl);
});
