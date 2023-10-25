import request from '@/utils/request'

// 查询运输订单列表
export function listOrder(query) {
  return request({
    url: '/dy/order/list',
    method: 'get',
    params: query
  })
}

// 查询运输订单详细
export function getOrder(id) {
  return request({
    url: '/dy/order/' + id,
    method: 'get'
  })
}

// 获取导出pdf
export function getOrderPdf(id) {
  return request({
    url: '/dy/order/exportPdf/' + id,
    method: 'get'
  })
}

// 新增运输订单
export function addOrder(data) {
  return request({
    url: '/dy/order',
    method: 'post',
    data: data
  })
}

// 修改运输订单
export function updateOrder(data) {
  return request({
    url: '/dy/order',
    method: 'put',
    data: data
  })
}

// 删除运输订单
export function delOrder(id) {
  return request({
    url: '/dy/order/' + id,
    method: 'delete'
  })
}
//历史
export function getOld(id) {
  return request({
    url: '/dy/order/getOld/' + id,
    method: 'get'
  })
}
