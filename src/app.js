import express from 'express';
import throng from 'throng';

import { boot, getData } from './helpers/data-provider';

throng({
    workers: process.env.WEB_CONCURRENCY || 1,
    lifetime: Infinity
}, () => {
    const app = express();

    app
        .get('/inspections', (req, res) => {
            res.header('Content-Type', 'application/json');
            res.end(getData())
        })
        .listen(process.env.PORT || 3000, () => boot());
});