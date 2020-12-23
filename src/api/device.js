import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'device/list',
    method: 'get',
    params: query
  })
}

export function fetchListmessageByDevice(query) {
  return request({
    url: 'device/messageByDevice',
    method: 'get',
    params: query
  })
}

export function createDevice(data) {
  return request({
    url: 'device/save',
    method: 'post',
    data
  })
}

export function updateDevice(data) {
  return request({
    url: 'device/update',
    method: 'put',
    data
  })
}

export function unique(data) {
  return request({
    url: 'device/unique',
    method: 'post',
    data
  })
}

export function updateEntIdByIdS(data) {
  return request({
    url: 'device/updateEntIdByIds',
    method: 'put',
    data
  })
}

export function deleteDevice(id) {
  return request({
    url: 'device/delete',
    method: 'delete',
    params: { id }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-elemdevice-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-elemdevice-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

