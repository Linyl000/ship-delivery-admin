import request from '@/utils/request'

// 查询集箱信息列表
export function listBox(query) {
  return request({
    url: '/dy/box/list',
    method: 'get',
    params: query
  })
}

// 查询集箱信息详细
export function getBox(id) {
  return request({
    url: '/dy/box/' + id,
    method: 'get'
  })
}

// 新增集箱信息
export function addBox(data) {
  return request({
    url: '/dy/box',
    method: 'post',
    data: data
  })
}
// 批量修改集箱信息
export function status(data) {
  return request({
    url: '/dy/box/status',
    method: 'post',
    data: data
  })
}
// 财务同步
export function syncFinance(data) {
  return request({
    url: '/dy/box/syncFinance',
    method: 'post',
    data: data
  })
}
// 修改集箱信息
export function updateBox(data) {
  return request({
    url: '/dy/box',
    method: 'put',
    data: data
  })
}

// 删除集箱信息
export function delBox(id) {
  return request({
    url: '/dy/box/' + id,
    method: 'delete'
  })
}
