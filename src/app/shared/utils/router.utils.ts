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
  product: {
    root: 'product',
    list: 'product/list',
    productDetail: 'product/:id/detail'
  },
  bought: {
    root: 'bought',
    list: 'bought/list',
  },
  refund: {
    root: 'refund',
    list: 'refund/list',
  },
  cart: {
    root: 'cart',
    list: 'cart/list',
    detail: 'cartDetail',
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
