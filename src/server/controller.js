const { Hexo, HexoError } = require('./hexo')
const hexo = new Hexo()
const Search = require('./search')
const search = new Search(hexo)
const restrictedKeys = require('./info').restrictedKeys

exports.hexo = hexo

exports.getRestrictedKeys = async function (ctx, next) {
  ctx.body = {
    success: true,
    data: {
      restrictedKeys
    }
  }
}

exports.errorHandler = async function (ctx, next) {
  try {
    await next()
  } catch (err) {
    switch (err.code) {
      case HexoError.POST_NOT_FOUND:
        err.status = 404
        break
      case HexoError.UNINITIALIZED:
        err.status = 503
        break
      case HexoError.CANT_DEPLOY:
        err.status = 503
        break
      case HexoError.NOT_GIT_REPO:
        err.status = 503
        break
      case HexoError.BAD_PARAMS:
        err.status = 400
        break
      case HexoError.SHELL_COMMAND_FAIL:
        err.status = 503
    }
    throw err
  }
}

exports.reload = async function (ctx, next) {
  await hexo.load()
  ctx.body = {
    success: true
  }
}

exports.addPost = async function (ctx, next) {
  const post = await hexo.addPost(ctx.request.body)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.addPage = async function (ctx, next) {
  const post = await hexo.addPost(ctx.request.body, true)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.getPosts = async function (ctx, next) {
  const posts = await hexo.listArticles()
  ctx.body = {
    success: true,
    data: {
      posts: posts
    }
  }
}

exports.getPost = async function (ctx, next) {
  const post = await hexo.getPost(ctx.params.id)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.getPage = async function (ctx, next) {
  const post = await hexo.getPost(ctx.params.id, true)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.updatePost = async function (ctx, next) {
  const post = await hexo.updatePost({ _id: ctx.params.id, ...ctx.request.body })
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.updatePage = async function (ctx, next) {
  const post = await hexo.updatePost({ _id: ctx.params.id, ...ctx.request.body }, true)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.removePost = async function (ctx, next) {
  const post = await hexo.deletePost(ctx.params.id)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.removePage = async function (ctx, next) {
  const post = await hexo.deletePost(ctx.params.id, true)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.publishPost = async function (ctx, next) {
  const post = await hexo.publishPost(ctx.params.id)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.unpublishPost = async function (ctx, next) {
  const post = await hexo.unpublishPost(ctx.params.id)
  ctx.body = {
    success: true,
    data: {
      post: post
    }
  }
}

exports.getTags = async function (ctx, next) {
  const tags = await hexo.listTags()
  ctx.body = {
    success: true,
    data: {
      tags: tags
    }
  }
}

exports.getCategories = async function (ctx, next) {
  const categories = await hexo.listCategories()
  ctx.body = {
    success: true,
    data: {
      categories: categories
    }
  }
}

exports.sync = async function (ctx, next) {
  const { remote } = await hexo.syncGit()
  ctx.body = {
    success: true,
    data: { remote }
  }
}

exports.reset = async function (ctx, next) {
  await hexo.resetGit()
  ctx.body = {
    success: true
  }
}

exports.save = async function (ctx, next) {
  const { remote } = await hexo.saveGit()
  ctx.body = {
    success: true,
    data: { remote }
  }
}

exports.deploy = async function (ctx, next) {
  await hexo.deploy()
  ctx.body = {
    success: true
  }
}

exports.generate = async function (ctx, next) {
  await hexo.generate()
  ctx.body = {
    success: true
  }
}

exports.clean = async function (ctx, next) {
  await hexo.clean()
  ctx.body = {
    success: true
  }
}

exports.search = async function (ctx, next) {
  const size = parseInt(ctx.query.size)
  let data
  if (!isNaN(size)) {
    data = await search.search(ctx.query.q, size)
  } else {
    data = await search.search(ctx.query.q)
  }
  ctx.body = {
    success: true,
    data: {
      ...data,
      q: ctx.query.q
    }
  }
}
