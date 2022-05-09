import request from "../request"

export function login(data) {
  return request({
    url: '/services/rs/admin/account/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/services/rs/admin/account/info',
    method: 'get',
    params: {}
  })
}

export function logout() {
  return request({
    url: '/services/rs/admin/account/logout',
    method: 'post'
  })
}
