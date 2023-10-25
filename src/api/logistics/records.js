import request from '@/utils/request'

// 查询运单记录列表
export function listRecords(query) {
  return request({
    url: '/logistics/records/list',
    method: 'get',
    params: query
  })
}

// 查询运单记录详细
export function getRecords(id) {
  return request({
    url: '/logistics/records/' + id,
    method: 'get'
  })
}

// 新增运单记录
export function addRecords(data) {
  return request({
    url: '/logistics/records',
    method: 'post',
    data: data
  })
}

// 修改运单记录
export function updateRecords(data) {
  return request({
    url: '/logistics/records',
    method: 'put',
    data: data
  })
}

// 删除运单记录
export function delRecords(id) {
  return request({
    url: '/logistics/records/' + id,
    method: 'delete'
  })
}
