const log4js = require('log4js')
const path = require('path')
const { isDev } = require('./utils')
const getLogfilePath = filename => {
  return path.resolve(process.cwd(), 'log', filename)
}
log4js.configure({
  appenders: {
    default: {
      type: 'file',
      filename: getLogfilePath('default.log'),
      removeColor: true
    },
    'hexo-editor-server': {
      type: 'file',
      filename: getLogfilePath('hexo-editor-server.log'),
      removeColor: true
    },
    console: {
      type: 'console'
    }
  },
  categories: {
    'hexo-editor-server:hexo': { appenders: ['console', 'hexo-editor-server'], level: isDev ? 'debug' : 'info' },
    default: { appenders: ['console', 'default'], level: isDev ? 'debug' : 'info' }
  }
})
