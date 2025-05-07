import Router from '@koa/router';
import responseWrap from 'src/utils/responseWrap';

const router = new Router();

router.get('/login', (ctx, res) => {
  ctx.body = responseWrap({
    list: 'xxxxxx',
  });
});

export default router;
