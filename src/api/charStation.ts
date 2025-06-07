import { post } from '../utils/http'

interface CharStationRecord {
  name: string
  id: string
  city: string
  fast: string | number
  slow: string | number
  status: string | number
  now: string | number
  fault: string | number
  person: string
  tel: string | number
}

interface CharStationRecordReq {
  pageNo: number
  pageSize: number
  name: string
  id: string
  status: string
}

interface PageCommonResp<T> {
  total: number
  list?: T[]
  pageNo: number
  pageSize: number
}

enum Api {
  PAGE_CHAR_STATION_RECORD = '/charStation/page',
  UPDATE_CHAR_STATION_RECORD = '/charStation/update',
  ADD_CHAR_STATION_RECORD = '/charStation/add',
  DELETE_CHAR_STATION_RECORD = '/charStation/delete',
}

function pageCharStationRecord(data: CharStationRecordReq) {
  return post(Api.PAGE_CHAR_STATION_RECORD, data)
}

function updateCharStationRecord(data: CharStationRecord) {
  return post(Api.UPDATE_CHAR_STATION_RECORD, data)
}

function addCharStationRecord(data: CharStationRecord) {
  return post(Api.ADD_CHAR_STATION_RECORD, data)
}
function deleteCharStationRecord(data: any) {
  return post(Api.DELETE_CHAR_STATION_RECORD, data)
}

export type { PageCommonResp, CharStationRecord, CharStationRecordReq }
export { pageCharStationRecord, updateCharStationRecord, addCharStationRecord, deleteCharStationRecord }
