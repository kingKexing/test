import request from '@/utils/request'

export function financeDay(params) {
  console.log(params);
  return request({
    method: 'get',
    url: '/Data/dataForDay',
    params
  })
}

export function financeMonth(params) {
  console.log(params);
  return request({
    method: 'get',
    url: '/Data/dataForMoth',
    params
  })
}

export function allData(params) {
  return request({
    method: 'get',
    url: '/Data/data',
    params
  })
}

export function salesList(params) {
  return request({
    method: 'get',
    url: '/Data/salespersonList',
    params
  })
}

/* export function settleList(params) {
  return request({
    method: 'get',
    url: '/settle/settleList',
    params
  })
} */

export function addSales(data) {
  return request({
    method: 'post',
    url: '/Data/addSalesperson',
    data
  })
}

export function editSales(data) {
  return request({
    method: 'put',
    url: '/Data/upSalesperson',
    data
  })
}

export function delSales(params) {
  return request({
    method: 'put',
    url: '/Data/delSalesperson',
    params
  })
}
