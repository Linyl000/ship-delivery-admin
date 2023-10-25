import request from '@/utils/request'
export function barcode(query) {
  return request({
    url: '/logistics/records/barcode',
    headers: {
      isToken: false
    },
    method: 'get',
    params: query
  })
}
