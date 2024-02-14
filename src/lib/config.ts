export const ExpressStatusEnum = {
  NOCHECKED: 1, // 1: 未核销
  CHECKED: 2, // 2：已核销
};
export const ExpressStatus = [
  {
    label: "未核销",
    value: ExpressStatusEnum.NOCHECKED,
    type: "danger",
  },
  {
    label: "已核销",
    value: ExpressStatusEnum.CHECKED,
    type: "primary",
  },
];
