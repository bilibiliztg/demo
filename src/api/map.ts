import { post } from '../utils/http'
enum Api {
  LIST_POSITION = '/mapList',
}


function listMapPosition(data: any): Promise<any> {
  return post(Api.LIST_POSITION, data)
}

export { listMapPosition }
