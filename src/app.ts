import Koa from 'koa';

import routes from './routes';
import { appMiddleWares } from './middlewares';

const app = new Koa();

const PORT = 3000;

appMiddleWares(app);

routes(app);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

export default app;
