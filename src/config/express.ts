import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "@middlewares/index";
import routes from "@routes/index";
import passport from "passport";
import Strategies from "./passport";

/**
 * Express instance
 * @public
 */
const app = express();

// Third-party lib
app.use(bodyParser.json()); // parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors()); // enable CORS - Cross Origin Resource Sharing

// Passport
app.use(passport.initialize());
passport.use(Strategies.jwtStrategy);

// Routes
app.use("/v1", routes);

// Middlewares
app.use(errorMiddleware.converter);
app.use(errorMiddleware.notFound);
app.use(errorMiddleware.handler);

export default app;
