import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import { execute } from './models';
import routes from './routes';

const app = express();

//* Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//* Routes *//
app.use('/users', routes.user);

app.listen(process.env.PORT, () =>
  console.log(`Example app listening on port ${process.env.PORT}!`),
);



