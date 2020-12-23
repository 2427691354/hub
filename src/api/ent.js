import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'ent/list',
    method: 'get',
    params: query
  })
}

export function createEnt(data) {
  return request({
    url: 'ent/save',
    method: 'post',
    data
  })
}

export function updateEnt(data) {
  return request({
    url: 'ent/update',
    method: 'put',
    data
  })
}

export function deleteEnt(id) {
  return request({
    url: 'ent/delete',
    method: 'delete',
    params: { id }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-element-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-element-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

