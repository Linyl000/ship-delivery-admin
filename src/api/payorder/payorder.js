import request from '@/utils/request'

// 查询用户账单列表
export function listPayorder(query) {
  return request({
    url: '/payorder/list',
    method: 'get',
    params: query
  })
}

// 查询用户账单详细
export function getPayorder(id) {
  return request({
    url: '/payorder/' + id,
    method: 'get'
  })
}

// 新增用户账单
export function addPayorder(data) {
  return request({
    url: '/payorder',
    method: 'post',
    data: data
  })
}

// 修改用户账单
export function updatePayorder(data) {
  return request({
    url: '/payorder',
    method: 'put',
    data: data
  })
}

// 删除用户账单
export function delPayorder(id) {
  return request({
    url: '/payorder/' + id,
    method: 'delete'
  })
}
