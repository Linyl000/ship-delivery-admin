import request from '@/utils/request'

// 查询主页图管理列表
export function listBanner(query) {
  return request({
    url: '/zy/banner/list',
    method: 'get',
    params: query
  })
}
// 查询主页的用
export function indexBanner(query) {
  return request({
    url: '/zy/banner/index',
    method: 'get',
    params: query
  })
}
// 查询主页图管理详细
export function getBanner(id) {
  return request({
    url: '/zy/banner/' + id,
    method: 'get'
  })
}

// 新增主页图管理
export function addBanner(data) {
  return request({
    url: '/zy/banner',
    method: 'post',
    data: data
  })
}

// 修改主页图管理
export function updateBanner(data) {
  return request({
    url: '/zy/banner',
    method: 'put',
    data: data
  })
}

// 删除主页图管理
export function delBanner(id) {
  return request({
    url: '/zy/banner/' + id,
    method: 'delete'
  })
}

// 修改启用状态
export function changeBannerStatus(id, status) {
  const data = {
    id,
    status
  }
  return request({
    url: '/zy/banner/changeBannerStatus',
    method: 'put',
    data: data
  })
}
