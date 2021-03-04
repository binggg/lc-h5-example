import axios from 'axios'

if (process.env.isMiniprogram) {
  const adapter = require('axios-miniprogram-adapter')
  axios.defaults.adapter = adapter.default ? adapter.default : adapter
}

export const request = axios

export {
  axios
}
