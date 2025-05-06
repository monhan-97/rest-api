import routes from './routes';
import Koa from 'koa';

const app = new Koa();

const PORT = 3000;

routes(app);

app.listen(PORT, () => console.log(`Server ready on port ${PORT}.`));

export default app;
