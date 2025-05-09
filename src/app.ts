import Koa from 'koa';

import routes from './routes';
import middlewares from './middlewares';

const app = new Koa();

const PORT = 3000;

middlewares(app);

routes(app);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

export default app;
