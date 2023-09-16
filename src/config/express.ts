import bodyParser from "body-parser";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import { errorMiddleware } from "@middlewares/index";
import routes from "@routes/index";

/**
 * Express instance
 * @public
 */
const app = express();

// Middlewares
app.use(bodyParser.json()); // parse body params and attache them to req.body
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet()); // secure apps by setting various HTTP headers
app.use(cors()); // enable CORS - Cross Origin Resource Sharing
app.use(errorMiddleware.handler); // error handler, send stacktrace only during development

// Routes
app.use("/v1", routes);

export default app;
