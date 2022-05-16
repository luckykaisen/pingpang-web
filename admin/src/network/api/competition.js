
import request from "../request"

export function addCompetition(data) {
  return request({
    url: '/services/rs/admin/competition/create',
    method: 'post',
    data: data
  })
}

export function searchCompetition(data) {
  return request({
    url: '/services/rs/admin/competition/search',
    method: 'post',
    data: data
  })
}

export function getCompetitionDetail(params) {
  return request({
    url: '/services/rs/admin/competition/detail',
    method: 'get',
    params: params
  })
}

export function modifyCompetition(data) {
  return request({
    url: '/services/rs/admin/competition/modify',
    method: 'post',
    data: data
  })
}

export function deleteCompetitionPlayer(params) {
  return request({
    url: '/services/rs/admin/competition/player/delete',
    method: 'get',
    params: params
  })
}

export function joinCompetitionPlayer(data) {
  return request({
    url: '/services/rs/admin/competition/player/join',
    method: 'post',
    data: data
  })
}

export function getConsoleCompetitionDetail(params) {
  return request({
    url: '/services/rs/console/competition/detail',
    method: 'get',
    params: params
  })
}

export function JoinConsoleCompetitionPlayer(data) {
  return request({
    url: '/services/rs/console/competition/join',
    method: 'post',
    data: data
  })
}

export function deleteGroupPlayer(params) {
  return request({
    url: '/services/rs/admin/competition/group/player/delete',
    method: 'get',
    params: params
  })
}

export function addGroupPlayer(data) {
  return request({
    url: '/services/rs/admin/competition/group/player/add',
    method: 'post',
    data: data
  })
}

export function addGroup(data) {
  return request({
    url: '/services/rs/admin/competition/group/create',
    method: 'post',
    data: data
  })
}

export function addOneGroup(params) {
  return request({
    url: '/services/rs/admin/competition/group/add',
    method: 'get',
    params: params
  })
}

export function deleteGroup(params) {
  return request({
    url: '/services/rs/admin/competition/group/delete',
    method: 'get',
    params: params
  })
}

export function modifyGroup(data) {
  return request({
    url: '/services/rs/admin/competition/group/modify',
    method: 'post',
    data: data
  })
}

export function downloadGroupAgainstExcel(data) {
  return request({
    url: '/services/rs/admin/competition/group/against/excel/download',
    method: 'post',
    data: data
  })
}
