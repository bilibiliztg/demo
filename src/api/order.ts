import { post } from '../utils/http'
enum Api {
  LIST = '/orderList',
  BATCH_DELETE  = '/batchDelete',
}


function pageList(data: any): Promise<any> {
  return post(Api.LIST, data)
}

function batchDeleteApi(data: any): Promise<any> {
  return post(Api.BATCH_DELETE, data)
}

export { pageList, batchDeleteApi }
