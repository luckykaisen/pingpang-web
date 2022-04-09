
import request from "../request"

export function searchCompetition(data) {
  return request({
    url: '/services/rs/admin/competition/search',
    method: 'post',
    data: data
  })
}

