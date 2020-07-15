import morgan from 'morgan';
import express, { Request, Response } from 'express';
import { BAD_REQUEST } from "http-status-codes";
import { graphqlHTTP } from "express-graphql";

const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(
    "/graphql",
    graphqlHTTP({
        schema: ExcuseSchema,
        graphiql: true
    })
);

app.use((err: Error, req: Request, res: Response) => {
    return res.status(BAD_REQUEST).json({
        error: err.message,
    });
});

export default app;
