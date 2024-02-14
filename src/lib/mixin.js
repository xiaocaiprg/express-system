import http from "../api/index";
const PATH = {
  GET_EXPRESS_INFO: "haiyang/golden/token",
};
export const mixins = {
  mounted() {},
  methods: {
    getLocalStorage() {
      const authorization = window.localStorage.getItem("e-authorization");
      return authorization;
    },
    setLocalStorage(value) {
      window.localStorage.setItem("e-authorization", value);
    },
    getUserInfo() {
      const authorization = this.getLocalStorage() || "";
      if (authorization) {
        return http
          .get(`${PATH.GET_EXPRESS_INFO}`)
          .then(res => {
            if (res.code === 200) {
              return res.result;
            }
          })
          .catch(err => {
            console.log(err);
          });
      } else {
        return Promise.resolve("");
      }
    },
    handleErr(err) {
      if (err.response && err.response.status === 406) {
        this.$route.path !== "/express-my" && this.$router.push("/express-my");
      }
      console.log(err, "handleErr");
    },
  },
};
