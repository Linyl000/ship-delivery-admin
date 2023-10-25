import request from '@/utils/request'

// 查询订单明细列表
export function listDt(query) {
  return request({
    url: '/dy/dt/list',
    method: 'get',
    params: query
  })
}

// 查询订单明细详细
export function getDt(id) {
  return request({
    url: '/dy/dt/' + id,
    method: 'get'
  })
}

// 新增订单明细
export function addDt(data) {
  return request({
    url: '/dy/dt',
    method: 'post',
    data: data
  })
}

// 修改订单明细
export function updateDt(data) {
  return request({
    url: '/dy/dt',
    method: 'put',
    data: data
  })
}

// 删除订单明细
export function delDt(id) {
  return request({
    url: '/dy/dt/' + id,
    method: 'delete'
  })
}
