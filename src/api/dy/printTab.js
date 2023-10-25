import request from '@/utils/request'

// 获取打印标签序列
export function seq(query) {
  return request({
    url: '/dy/box/export/seq',
    method: 'get',
    params: query
  })
}
