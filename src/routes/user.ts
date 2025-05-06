import Router from '@koa/router';

const router = new Router();

router.get('/login', (ctx, res) => {
  ctx.body = {
    message: '登陆成功',
  };
});

export default router;
