const webpackDevServer = require('webpack-dev-server')
const webpack = require('webpack')
const os = require('os')
const fs = require('fs')
const path = require('path')
const argv = require('yargs').argv
const config = require('./webpack.web.prod')
const { appConfig } = require('../mainAppData.json')
const { window = {} } = appConfig
const isApp = <%=isApp %>


function getDevServerConf() {
  if (!argv.devServerConf) {
    return {}
  }
  if (!argv.devServerConf.endsWith('.js')) {
    console.error('参数请输入 --devServerConf config.js')
  } else {
    const devServerConfPath = path.resolve(process.cwd(), argv.devServerConf || '')
    if (!fs.existsSync(devServerConfPath)) {
      console.error(devServerConfPath, 'does not exists')
      return {}
    }
    let conf = require(devServerConfPath)
    if (!conf || typeof conf !== 'object') {
      console.error(devServerConfPath, 'must have module.exports={}')
    } else {
      return conf
    }
  }
  return {}
}

// const openBrowser = require('open');
function getIPAdress() {
  const interfaces = os.networkInterfaces()
  for (const devName in interfaces) {
    const iface = interfaces[devName]
    for (let i = 0; i < iface.length; i++) {
      const alias = iface[i]
      if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
        return alias.address
      }
    }
  }
}

const port = 8001
const ip = getIPAdress()
let basename = ''
let publicPath = ''
if (!isApp) {
  basename = window.basename || ''
  if (basename.startsWith('/')) {
    basename = basename.replace('/', '')
  }
  publicPath = window.publicPath || ''
}

console.log('>>>>>>>>>>>>>>>>>>>>> basename is ', basename)
console.log('>>>>>>>>>>>>>>>>>>>>> publicPath is:', publicPath)
const options = {
  hot: true,
  host: ip,
  hotOnly: true,
  historyApiFallback: {
    verbose: true,
    rewrites: [
      {
        from: /^\/(.*)\.(css|js)$/,
        to: function(context) {
          //  /^\/([^\.]*)\.(css|js)$/
          console.log('>>>>>>>>>>>>>>>>> got in css|js!', context.parsedUrl.pathname)
          const { assets = [] } = window
          const isInAssets = assets.includes(context.parsedUrl.pathname)
          return context.parsedUrl.pathname.replace(publicPath, '/')
        },
      },
      {
        from: new RegExp(`${basename}\/?(.*)$`),
        to: function(context) {
          console.log('>>>>>>>>>>>>>>>>> got in html!')
          return 'index.html'
        },
      },
    ],
  },
  contentBase: [path.join(__dirname, 'assets')],
  watchOptions: {
    poll: 600,
    ignored: /node_modules|preview|dist|html|webpack|gsd-kbone-react/,
  },
  open: {
    app: ['Google Chrome', '--incognito', '--other-flag'],
  },
  openPage: basename,
  disableHostCheck: true,
  compress: true
}

function startDevServer(conf) {
  console.log('start startDevServer in webpack, env:', process.env.NODE_PATH)
  let _options = Object.assign(options, conf)
  console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
  console.log('Current webpack-dev-server config is: ')
  console.log(_options)
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
  webpackDevServer.addDevServerEntrypoints(config, _options)

  const compiler = webpack(config)
  const server = new webpackDevServer(compiler, _options)

  server.listen(port, '0.0.0.0', () => {
    console.log(`调试环境端口启动在  http://${ip}:${port}/${basename}`)
  })
}

startDevServer(getDevServerConf())
