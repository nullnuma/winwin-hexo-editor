const glob = require('glob');
const fs = require('fs')
const router = require('koa-router')();
const send = require('koa-send');
const { configService } = require('../service/config_service')
const formidable = require('formidable')
const sharp = require('sharp')
const path = require('path');
const Crypto = require("crypto");

// static hexo image assets
router.prefix('/imagemgr');


router.get('/data/:id+',async function (ctx) {
  if ('/' == ctx.path) return ctx.body = 'Try GET /package.json';
  const path = ctx.path.replace(/^\/imagemgr\/data/,"");
  await send(ctx, path,{root:configService.getHexoRoot() + '/source/assets'});
});

router.get('/dirlist', async function (ctx) {
  let result = await new Promise((resolve, reject) => {
    glob('**/' , { cwd: configService.getHexoRoot() + '/source/assets/',}, (err, files) => {
      resolve(files);
    });
  });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.get('/list/:id+', async function (ctx) {
  let result = await new Promise((resolve, reject) => {
    glob('*' , { cwd: configService.getHexoRoot() + '/source/assets/' + ctx.params.id,nodir:true}, (err, files) => {
      resolve(files);
    });
  });
  ctx.response.body = result;
  ctx.response.status = 200;
});

router.post('/upload', async function (ctx) {
  let {body, files} = ctx.request
  if (ctx.request.header.slug) {
    let dirpath = configService.getHexoRoot() + '/source/assets/' + ctx.request.header.slug
    let result = await new Promise(async (resolve) => {
      fs.mkdir(dirpath, () => {
        resolve()
      })
    })
    for (let key in files) {
      await new Promise((resolve) => {
        let filename = dirpath + '/' + path.basename(files[key].name, path.extname(files[key].name)) + ((path.extname(files[key].name) !== '.png') ? '.jpg' : '.png')
        let count = 0
        while (fs.existsSync(filename)) {
          filename = dirpath + '/' + path.basename(files[key].name, path.extname(files[key].name)) + '_' + count + ((path.extname(files[key].name) !== '.png') ? '.jpg' : '.png')
          count += 1
        }
        sharp(files[key].path)
          .rotate()
          .resize(3000, 1500, {
            fit: 'inside'
          })
          .toFile(filename, (err) => {
            console.log('err', err)
            fs.unlink(files[key].path, () => {
              resolve()
            })
          })
      })
    }
    ctx.response.status = 200
    ctx.response.body = 'OK'
  } else {
    // Error
    ctx.response.status = 500
    ctx.response.body = 'no slug'
  }
})

router.post('/rename', async function (ctx) {
  console.log(ctx.request.body)
  let err = await new Promise((resolve) => {
    let oldname = (configService.getHexoRoot() + '/source/assets' + ctx.request.body.old).replace(/\.\.\//, '')
    let newname = (configService.getHexoRoot() + '/source/assets' + ctx.request.body.new).replace(/\.\.\//, '')
    fs.rename(oldname, newname, (err) => {
      resolve(err)
    })
  })
  if (err) {
    console.log(err)
    ctx.response.body = 'err'
    ctx.response.status = 500
  } else {
    ctx.response.body = 'ok'
    ctx.response.status = 200
  }
});

router.get('/remove/:id+', async function (ctx) {
  const filename = (configService.getHexoRoot() + '/source/assets/' + ctx.params.id).replace(/\.\.\//, '')
  let err = await new Promise((resolve) => {
    fs.unlink(filename, (err) => {
      resolve(err)
    })
  });
  if (err) {
    console.log(err)
    ctx.response.body = 'err'
    ctx.response.status = 500
  } else {
    ctx.response.body = 'ok'
    ctx.response.status = 200
  }
});

module.exports = router
