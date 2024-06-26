import axios from "axios";
import {Notify} from "vant";
export function request(config) {
  const instance = axios.create({
    baseURL: "https://api.shop.eduwork.cn",
    timeout: 5000,
  });

  // 请求拦截
  instance.interceptors.request.use(
    (config) => {
      //接口需要认证，再此设置

      //直接放行
      return config;
    },
    (err) => {}
  );

  //响应拦截
  instance.interceptors.response.use(
    (res) => {
      return res.data ? res.data : res;
    },
    (err) => {
      // 需要授权才可以访问的接口，统一去login
      //如果有错误，处理，显示错误信息
      const errMsg = err.response.data.errors[Object.keys(err.response.data.errors)[0]][0]
      Notify({type:'danger',message:errMsg})

    }
  );

  return instance(config);
}
