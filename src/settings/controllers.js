const { ds, DataServiceError } = require('../service')
const StorageService = require('../service/StorageService')
const SettingsError = require('./errors')
const { HexoError } = require('../server/hexo')

exports.errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    switch (err.code) {
      case DataServiceError.USER_NOT_EXIST:
        err.status = 404
        break
      case DataServiceError.INITIATING:
        err.status = 503
        break
      case SettingsError.INVALID_PARAMS:
        err.status = 400
        break
      case HexoError.NOT_BLOG_ROOT:
        ctx.status = 404
        ctx.body = {
          success: false,
          message: err.message,
          data: err.data
        }
        break
      default:
        throw err
    }
  }
}

exports.updateUser = async (ctx, next) => {
  const id = ctx.params.id || ctx.state.user.id
  if (!id) throw new SettingsError('id is required', SettingsError.INVALID_PARAMS)
  const username = ctx.request.body.username
  const password = ctx.request.body.password
  await ds.updateUser(id, username, password)
  const user = await ds.getUser(id)
  ctx.body = {
    success: true,
    data: {
      user
    }
  }
}

exports.getUser = async (ctx, next) => {
  const id = ctx.params.id || ctx.state.user.id
  if (!id) throw new SettingsError('id is required', SettingsError.INVALID_PARAMS)
  const user = await ds.getUser(id)
  ctx.body = {
    success: true,
    data: {
      user
    }
  }
}

exports.setHexoInfo = async (ctx, next) => {
  const HEXO_ROOT = ctx.request.body.HEXO_ROOT
  await StorageService.setHexoRoot(HEXO_ROOT)
  ctx.body = {
    success: true
  }
}

exports.getHexoInfo = async (ctx, next) => {
  const HEXO_ROOT = StorageService.getHexoRoot()
  ctx.body = {
    success: false,
    data: {
      HEXO_ROOT
    }
  }
}

exports.security = async (ctx, next) => {
  const JWT_SECRET = ctx.request.body.JWT_SECRET
  const JW_EXPIRE = ctx.request.body.JW_EXPIRE
  const JW_REFRESH = ctx.request.body.JW_REFRESH
  const APIKEY_SECRET = ctx.request.body.APIKEY_SECRET
  StorageService.setJwtSecret(JWT_SECRET)
  StorageService.setJwtExpire(JW_EXPIRE)
  StorageService.setJwtRefresh(JW_REFRESH)
  StorageService.setApikeySecret(APIKEY_SECRET)
  ctx.body = {
    success: true
  }
}