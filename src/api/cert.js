import request from '@/utils/request'

export function fetchList(query) {
  return request({
    url: 'cert/list',
    method: 'get',
    params: query
  })
}

export function createCert(data) {
  return request({
    url: 'cert/save',
    method: 'post',
    data
  })
}

export function updateCert(data) {
  return request({
    url: 'cert/update',
    method: 'put',
    data
  })
}

export function deleteCert(id) {
  return request({
    url: 'cert/delete',
    method: 'delete',
    params: { id }
  })
}

export function fetchArticle(id) {
  return request({
    url: '/vue-elemcert-admin/article/detail',
    method: 'get',
    params: { id }
  })
}

export function fetchPv(pv) {
  return request({
    url: '/vue-elemcert-admin/article/pv',
    method: 'get',
    params: { pv }
  })
}

