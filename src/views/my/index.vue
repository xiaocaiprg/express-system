<template>
  <div class="my-page">
    <div v-if="!isLogin" class="not-login">
      <h2>请登录</h2>
      <div class="login-card">
        <van-field
          v-model="username"
          class="user-item"
          label-width="100px"
          label="请输入用户名"
          :colon="true"
          required
          clearable
          placeholder="用户名"
        />
        <van-field
          v-model="password"
          class="user-item"
          label-width="100px"
          type="password"
          :colon="true"
          required
          clearable
          label="请输入密码"
          placeholder="密码"
        />
      </div>
      <div class="user-btn">
        <van-button
          round
          type="info"
          color="#ff6633"
          style="flex: 1"
          @click="onSubmit"
        >
          登录
        </van-button>
      </div>
    </div>
    <div v-else class="has-login">
      <div class="my-account">
        <div style="display: flex; align-items: center">
          <img
            class="user-pic"
            src="http://www.enjoyclub.shop/image/47aab77b9fee4f7ca9e50410f325be5f.jpg"
            alt=""
          />
          <div class="user-wrapper">
            <div class="user-name">{{ userInfo.username }}</div>
            <div v-if="userInfo.phone" class="user-phone">
              手机号: {{ userInfo.phone }}
            </div>
          </div>
        </div>
      </div>
      <div class="ads">
        <van-icon name="like-o" style="margin-right: 0.3rem" />更多服务敬请期待
      </div>
      <div class="common-functions">
        <h1 style="margin-bottom: 1rem">常用功能</h1>
        <div class="common-function-item">
          <van-icon name="chat-o" />
          <span class="item-label">我的通知</span>
        </div>
        <van-divider style="margin: 0.5rem" />
        <div class="common-function-item">
          <van-icon name="location-o" />
          <span class="item-label">地址管理</span>
        </div>
        <van-divider style="margin: 0.5rem" />
        <div class="common-function-item">
          <van-icon name="setting-o"></van-icon>
          <span class="item-label">设置</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import API from "@/api/my";

import { mixins } from "../../lib/mixin";
export default {
  name: "My",
  mixins: [mixins],
  data() {
    return {
      username: "",
      password: "",
      isLogin: false,
      userInfo: null,
    };
  },
  computed: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.getUserInfo().then(res => {
        this.isLogin = res ? true : false;
        this.userInfo = res;
      });
    },
    onSubmit() {
      if (this.username === "" || this.password === "")
        return this.$toast("请先登录");
      API.login({ username: this.username, password: this.password }).then(
        res => {
          if (res) {
            this.$toast.success("登录成功");
            this.$router.push("/");
          } else {
            this.$toast.fail("登录失败");
          }
        }
      );
    },
  },
};
</script>

<style lang="less" scoped>
.not-login {
  display: flex;
  flex-direction: column;
  padding: 3rem;
  .login-card {
    width: 30rem;
    margin: 2rem 0;
    border-radius: 20%;

    .user-item {
      background: #fbfbfb;
    }
  }
  .user-btn {
    display: flex;
    justify-content: space-between;
  }
}

.has-login {
  .my-account {
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 13rem;
    background-image: url("../../assets/bg.jpeg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    padding: 4rem 2rem 1rem;
    .user-pic {
      height: 6rem;
      border-radius: 50%;
      width: 6rem;
      margin-right: 1rem;
    }
    .user-wrapper {
      display: flex;
      flex-direction: column;
      color: #fff;
      .user-name {
        font-family: "PingFangSC-Semibold";
        font-size: 1.5rem;
        margin-bottom: 0.2rem;
      }
    }
  }
  .ads {
    display: flex;
    padding: 1rem;
    margin: 1rem 2rem;
    background-color: #fbfbfb;
    border-radius: 1rem;
    height: 8rem;
    font-size: 1.8rem;
    align-items: center;
    font-weight: 600;
  }
  .common-functions {
    padding: 1rem;
    margin: 1rem 2rem;
    background-color: #fbfbfb;
    border-radius: 1rem;
    .common-function-item {
      display: flex;
      align-items: center;
      font-size: 1.5rem;
      height: 3rem;
      .item-label {
        font-weight: 600;
        margin-left: 0.4rem;
      }
    }
  }
}
</style>
