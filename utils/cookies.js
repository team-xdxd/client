import Cookies from 'universal-cookie'

const cookies = new Cookies();

let setSettings = {
  path: '/'
}

const cookiesApi = {
  setUserJWT: jwt => {
    let today = new Date();
    let expireDate = new Date();
    expireDate.setDate(today.getDate() + 5);
    setSettings.expires = expireDate;
    cookies.set('jwt', jwt, setSettings);
  },

  set: (key, value) =>
    cookies.set(key, value, setSettings)
  ,

  get: key =>
    cookies.get(key)
  ,

  remove: key =>
    cookies.remove(key, setSettings)
}


export default cookiesApi;
