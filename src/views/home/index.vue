<template>
  <div>
    <van-tabs v-model="orderValue" sticky>
      <van-tab
        v-for="(tab, index) in orderTab"
        :key="index"
        :title="tab.label"
        :name="tab.value"
      >
        <div v-if="expressData && expressData.length" class="card-content">
          <van-card
            v-for="(item, idx) in filterData"
            :key="idx"
            class="order-card"
            num="1"
            :tag="tagLabel(item)"
            :desc="`${item.integral}积分`"
            :title="item.productName"
            :thumb="item.pic"
          >
            <template #price>
              <div class="price">核销码: {{ item.cargocode }}</div>
            </template>
            <template #tags>
              <van-tag
                v-for="(tag, index) in item.labels.split(',')"
                :key="index"
                plain
                color="#fed1ce"
                text-color="#ff4a4a"
                class="tag"
              >
                {{ tag }}
              </van-tag>
            </template>
            <template #footer>
              <van-button
                v-if="item.expresstatus === ExpressStatusEnum.NOCHECKED"
                size="mini"
                color="#ff6633"
                @click="onConfirm(item)"
              >
                确认核销
              </van-button>
              <!-- <van-button size="mini" @click="onCheck(item)"> 查看 </van-button> -->
            </template>
          </van-card>
        </div>
      </van-tab>
    </van-tabs>
    <van-dialog
      v-model="showConfirm"
      title="确认核销该商品？"
      show-cancel-button
      :before-close="beforeClose"
    >
      <van-notice-bar
        v-if="currentExpress"
        style="margin: 1rem"
        wrapable
        color="#ff0000"
        background="#fff"
        :scrollable="false"
        :text="`当前取货码: ${currentExpress.cargocode}`"
      />
      <van-notice-bar
        style="margin: 1rem"
        wrapable
        color="#ff0000"
        background="#fff"
        :scrollable="false"
        text="请认真核对取货码与取货人,此操作不可撤销,请谨慎操作"
      />
    </van-dialog>
  </div>
</template>

<script>
import { mixins } from "@/lib/mixin";
import API from "@/api/home";
import { ExpressStatus, ExpressStatusEnum } from "@/lib/config.ts";
export default {
  name: "Order",
  components: {},
  mixins: [mixins],
  data() {
    return {
      orderValue: "all",
      expressData: [],
      orderTab: [
        {
          label: "全部订单",
          value: "all",
        },
        {
          label: "未核销",
          value: "nochecked",
        },
        {
          label: "已核销",
          value: "checked",
        },
      ],
      ExpressStatus: ExpressStatus,
      ExpressStatusEnum: ExpressStatusEnum,
      showConfirm: false,
      currentExpress: null,
      userInfo: null,
    };
  },
  computed: {
    filterData() {
      if (this.orderValue === "nochecked") {
        return this.expressData.filter(
          item => item.expresstatus === ExpressStatusEnum.NOCHECKED
        );
      }
      if (this.orderValue === "checked") {
        return this.expressData.filter(
          item => item.expresstatus === ExpressStatusEnum.CHECKED
        );
      }
      return this.expressData;
    },
  },
  mounted() {
    this.getExpress();
  },
  methods: {
    getExpress() {
      const params = {
        pageNum: 1,
        pageSize: 100,
      };
      API.getExpress(params)
        .then(res => {
          this.expressData = res && res.records;
        })
        .catch(err => {
          this.handleErr(err);
        });
    },
    tagLabel(express) {
      return ExpressStatus.find(item => item.value === express.expresstatus)
        ?.label;
    },
    onCheck(item) {
      // this.$router.push({
      //   path: "/user-orderdetail",
      //   query: { orderid: item.orderId },
      // });
    },
    onConfirm(item) {
      this.showConfirm = true;
      this.currentExpress = item;
    },
    beforeClose(action, done) {
      if (action === "confirm") {
        API.toConfirm({ expressId: this.currentExpress.expressId }).then(
          res => {
            if (res) {
              this.$toast.success("核销成功");
              this.getExpress();
              done();
            } else {
              this.$toast.fail("核销失败，请联系管理员");
              done(false);
            }
          }
        );
      } else {
        done();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.card-content {
  padding-bottom: 50px;
}
.order-card {
  margin-top: 1rem;
  .price {
    font-size: 1.3rem;
    color: #111;
    font-weight: 700;
  }
  .tag {
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
}
</style>
