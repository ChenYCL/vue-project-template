import { getFetch, postFetch } from "./apiConfig";
/**
 *  针对每个页面的接口进行 请求 api 的配置
 *  cancel 参数用来配置改接口是否支持 取消请求操作(其实不是真的取消了接口的请求，而是将then转为了cache操作)
 * */
export default {
  // nodejs 中文社区的测试接口,根据模块进行划分
  nodejs: {
    // 获取所有主题
    topics: params => {
      return postFetch({
        url: "v1/topics",
        params,
        interfaceKey: "topics"
      });
    },
    // 主题详情
    topicDetail: params => {
      return getFetch({
        url: "v1/topic/5433d5e4e737cbe96dcef312",
        params,
        interfaceKey: "topicDetail"
      });
    }
  }
};
