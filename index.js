import express from 'express'
import cors from "cors"
import bodyParser from 'body-parser';
import 'dotenv/config';

import routes from './routes/routes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());


const port = process.env.PORT;
routes(app)

app.use((req, res) => {
    res.status(404).send({ url: req.originalUrl + ' not found !!' })
})

app.listen(port, (req, res) => {
    console.log(`Server Started at PORT ${port}`);
});