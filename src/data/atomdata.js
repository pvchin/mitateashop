import { atom } from "recoil";

export const itemsStae = atom({
  key: "itemsState",
  default: {}
})

export const orderItemState = atom({
  key: "orderItemState",
  default: {
    id: "",
    itemid: "",
    name: "",
    price: 0,
    nettprice: 0,
    qty: 0,
    image: "",
    addon: [],
    totalprice: 0,
    sugarlevel: "",
    icelevel: "",
    mprice: 0,
    lprice: 0,
    size: "",
  },
});

export const filtersState = atom({
  key: "filtersState",
  default: {
    filtered_products: [],
    all_products: [],
    grid_view: true,
    sort: "price-lowest",
    filters: {
      text: "",
      category: "all",
      min_price: 0,
      max_price: 0,
      price: 0,
      shipping: false,
    },
  },
});

export const orderState = atom({
  key: "currentordernState",
  default: {
    orderid: "",
    orderno: "",
    custname: "",
    phone: "",
    address1: "",
    address2: "",
    deliverymode: "",
    paymentmode: "",
    grossamount: 0,
    nettamount: 0,
    deliveryfee: 0,
    discount: 0,
    area: "",
  },
});

export const currentorderState = atom({
  key: "currentorderState",
  default: {
    currentorderid: "",
    currentorderno: "",
  },
});

export const isSidebarOpenState = atom({
  key: "isSidebarOpenState",
  default: false,
});
