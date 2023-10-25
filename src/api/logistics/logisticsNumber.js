import request from '@/utils/request'

// 查询物流运单表列表
export function listLogisticsNumber(query) {
  return request({
    url: '/logistics/logisticsNumber/list',
    method: 'get',
    params: query
  })
}

// 查询物流运单表详细
export function getLogisticsNumber(id) {
  return request({
    url: '/logistics/logisticsNumber/' + id,
    method: 'get'
  })
}

// 新增物流运单表
export function addLogisticsNumber(data) {
  return request({
    url: '/logistics/logisticsNumber',
    method: 'post',
    data: data
  })
}

// 修改物流运单表
export function updateLogisticsNumber(data) {
  return request({
    url: '/logistics/logisticsNumber',
    method: 'put',
    data: data
  })
}

// 删除物流运单表
export function delLogisticsNumber(id) {
  return request({
    url: '/logistics/logisticsNumber/' + id,
    method: 'delete'
  })
}
// 修改物流运单表pl
export function adds(data) {
  return request({
    url: '/logistics/records/adds',
    method: 'post',
    data: data
  })
}
