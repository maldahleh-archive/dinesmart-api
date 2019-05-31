import express from 'express';

import getInspections from './inspections/inspection-provider';
import cacheMiddleware from './middleware/cache-middleware';

const app = express();
app.use(cacheMiddleware);
app.get('/inspections', (req, res) => {
    getInspections((data) => {
        res.json(data);
    });
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});