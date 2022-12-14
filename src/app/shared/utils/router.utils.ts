export const ROUTER_ACTIONS = {
  create: 'create',
  update: 'update',
  detail: 'detail',
  view: 'view',
  delete: 'delete',
};

export const ROUTER_UTILS = {
  base: {
    home: '',
    dashboard: 'dashboard',
    freeRoute: '**',
  },
  payment: {
    root: 'success-payment'
  },
  product: {
    root: 'product',
    list: 'product/list',
    productDetail: 'product/:id/detail',
    productCate: 'product/:id/cate'

  },
  bought: {
    root: 'bought',
    list: 'bought/list',
    waitconfirm: 'bought/waitconfirm',
    waitgoods: 'bought/waitgoods',
  },
  refund: {
    root: 'refund',
    list: 'refund/list',
  },
  chinhsach: {
    root: 'chinhsach',
  },
  change: {
    root: 'change',
  },
  qlUser: {
    root: 'qlUser',
  },
  login: {
    root: 'login',
  },
  cart: {
    root: 'cart',
    list: 'cart/list',
    detail: 'cartDetail',
  },
  book: {
    root: 'book',
  },
  register: {
    root: 'register',
  },
  guest: {
    root: 'guest',
    list: 'list',
    detail: ':id/detail',
    register: 'register',
    registerCreate: 'create-register',
    registerUpdate: ':id/update-register',
    registerDetail: ':id/detail-register',
  },
};
