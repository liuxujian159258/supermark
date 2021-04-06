import myHttp from '../util/request'

export function getInformatiom () {
  return myHttp({
    url: 'http://localhost:8090/admin/competitions',
    method: 'get'
  })
}
