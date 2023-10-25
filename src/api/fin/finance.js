import request from '@/utils/request'

// 查询财务表列表
export function listFinance(query) {
  return request({
    url: '/fin/finance/list',
    method: 'get',
    params: query
  })
}

// 查询财务表详细
export function getFinance(id) {
  return request({
    url: '/fin/finance/' + id,
    method: 'get'
  })
}

// 新增财务表
export function addFinance(data) {
  return request({
    url: '/fin/finance',
    method: 'post',
    data: data
  })
}

// 修改财务表
export function updateFinance(data) {
  return request({
    url: '/fin/finance',
    method: 'put',
    data: data
  })
}

// 删除财务表
export function delFinance(id) {
  return request({
    url: '/fin/finance/' + id,
    method: 'delete'
  })
}
