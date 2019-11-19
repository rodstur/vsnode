import exp from 'express';
import routes from './routes';


class App {
  constructor() {
    this.server = exp();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.server.use(exp.json());
  }

  routes() {
    this.server.use(routes);
  }
}


export default new App().server;
