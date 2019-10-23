import axios from "axios";

const AxiosService = axios.create({
  baseURL: "http://ishop.com/",
  responseType: "json"
});
// AxiosService.interceptors.request.use(config => {
//   const token = localStorage.getItem('token');
//
//   if (token) {
//     config.headers.common.Authorization = Bearer ${token};
//   }
//
//   return config;
// });
export default AxiosService;
