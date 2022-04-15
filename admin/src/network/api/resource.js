
import request from "../request"

export function getNotGroupPlayers(params) {
  return request({
    url: '/services/rs/admin/resource/not/group/players',
    method: 'get',
    params: params
  })
}

export function getNotCompetitionPlayers(params) {
  return request({
    url: '/services/rs/admin/resource/not/competition/players',
    method: 'get',
    params: params
  })
}
