import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'code/list',
    method: 'get',
    params: query
  })
}

export function createCode(data) {
  console.log(data)
  return request({
    url: 'code/save',
    method: 'post',
    data
  })
}

export function updateCode(data) {
  return request({
    url: 'code/update',
    method: 'put',
    data
  })
}

export function deleteCode(handle) {
  return request({
    url: 'code/delete',
    method: 'delete',
    params: { handle }
  })
}

export function queryCode(handle) {
  return request({
    url: 'code/query',
    method: 'get',
    params: { handle }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-elemcode-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-elemcode-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

