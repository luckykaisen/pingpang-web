
import request from "../request"

export function searchPlayer(data) {
  return request({
    url: '/services/rs/admin/player/search',
    method: 'post',
    data: data
  })
}

export function addPlayer(data) {
  return request({
    url: '/services/rs/admin/player/create',
    method: 'post',
    data: data
  })
}

export function updatePlayer(data) {
  return request({
    url: '/services/rs/admin/player/modify',
    method: 'post',
    data: data
  })
}

export function deletePlayer(params) {
  return request({
    url: '/services/rs/admin/player/delete',
    method: 'get',
    params: params
  })
}
