import queryString from 'querystring'

export default {
  encodeQueryParameters: (parameters = {}) => {
    return queryString.encode(parameters)
  },

  getQueryParameters: (url = '') => {
    if (!url) {
      const search = window.location.search
      return queryString.decode(search.substring(1, search.length))
    }
  },

  getPathId: (url = '') => {
    if (!url) {
      const splitPath = window.location.pathname.split('/')
      return splitPath[splitPath.length - 1]
    }
  }
}