import http from "./index";

const PATH = {
  GET_EXPRESS: "haiyang/express",
  TO_CONFIRM: "haiyang/express/confirm",
};
const API = {
  getExpress(params) {
    return http
      .get(PATH.GET_EXPRESS, params)
      .then(res => {
        if (res.code === 200) {
          return res.result;
        }
      })
      .catch(err => {
        throw err;
      });
  },
  toConfirm(params) {
    return http
      .post(`${PATH.TO_CONFIRM}`, params)
      .then(res => {
        if (res.code === 200) {
          return res.success;
        }
      })
      .catch(err => {
        throw err;
      });
  },
};
export default API;
