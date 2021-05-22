import service from "./request"

// 获取seller
export function shopType(){
  return service.request({
    method:'get',
    url:'index_category',
  })
}
