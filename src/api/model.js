import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'model/list',
    method: 'get',
    params: query
  })
}

export function createModel(data) {
  return request({
    url: 'model/save',
    method: 'post',
    data
  })
}

export function updateModel(data) {
  return request({
    url: 'model/update',
    method: 'put',
    data
  })
}

export function deleteModel(data) {
  return request({
    url: 'model/delete',
    method: 'delete',
    data
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-elemmodel-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-elemmodel-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

