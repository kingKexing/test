import request from '@/utils/request'

export function adminList(params) {
  return request({
    method: 'get',
    url: '/proxy/cityList',
    params
  })
}

// 注意 id 为字符串 不是对象
export function removeAdmin(params) {
  return request({
    method: 'put',
    url: '/proxy/delCityProxy',
    params
  })
}
// 修改数据
export function editAdmin(data) {
  return request({
    method: 'put',
    url: '/proxy/upCityProxy',
    data
  })
}

// 根据状态查询数据
export function searchAdmin(params) {
  return request({
    method: 'get',
    url: '/proxy/cityList',
    params
  })
}

// 根据id 查找管理员信息 
export function manager(params) {
  console.log(params);
  return request({
    method: 'get',
    url: '/proxy/manager',
    params
  })
}

// 解绑
export function delManager(params) {
  console.log(params);
  return request({
    method: 'put',
    url: '/proxy/delManager',
    params
  })
}
