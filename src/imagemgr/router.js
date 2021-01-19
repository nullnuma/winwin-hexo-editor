const glob = require('glob');
const router = require('koa-router')();
const send = require('koa-send');
const { configService } = require('../service/config_service')

router.prefix('/imagemgr');

// static hexo image assets

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

module.exports = router
