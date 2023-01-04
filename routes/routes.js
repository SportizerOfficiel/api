import categoriesRoutes from "./categoriesRoutes.js";
import clubRoutes from "./clubRoutes.js";
import matchRoutes from "./matchRoutes.js";
import playerRoutes from "./playerRoutes.js";
import presentPlayersRoutes from "./presentPlayersRoutes.js";
import townHallRoutes from "./townHallRoutes.js";
import {body} from 'express-validator'

const routes = (app) => {

    app.use('/api', clubRoutes.routes);
    app.use('/api', townHallRoutes.routes);
    app.use('/api', playerRoutes.routes);
    app.use('/api', matchRoutes.routes);
    app.use('/api', presentPlayersRoutes.routes);
    app.use('/api', categoriesRoutes.routes);
}

export default routes