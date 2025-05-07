import routes from './routes';
import middlewares from './middlewares';
import Koa from 'koa';

const app = new Koa();

const PORT = 3000;

middlewares(app);

routes(app);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

export default app;
