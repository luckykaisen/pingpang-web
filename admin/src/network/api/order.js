
import request from "../request"

export function addOrder(data) {
  return request({
    url: '/services/rs/console/order/create',
    method: 'post',
    data: data
  })
}
